import React from 'react'
import cc from 'cryptocompare'
import moment from 'moment'
import convertHistoricalToHighchartsData from '../Utils/convertHistoricalToHighchartsData'

export const AppContext = React.createContext()
const MAX_FAVORITES = 10
const TIME_UNITS = 10

export default class AppProvider extends React.Component {
  defaultState = {
    page: 'dashboard',
    isFirstVisit: true,
    coinList: null,
    prices: [],
    historical: null,
    filteredCoins: null,
    favorites: new Set(['BTC', 'ETH', 'DOGE', 'LTC', 'XRP']),
    currentFavorite: 'BTC',
  }

  state = { ...this.getSavedState() }

  async componentDidMount () {
    this.fetchCoins()
    this.fetchPrices()
    this.fetchHistorical()
  }

  actionNavigate = (page) => this.setState({ page })

  actionConfirmFavorites = () => {
    const currentFavorite = this.state.favorites.values().next().value

    this.setState({ isFirstVisit: false, currentFavorite, historical: null }, () => {
      this.fetchPrices()
      this.persistState()
    })
  }

  actionHasFavorites = (key) => {
    return this.state.favorites.has(key)
  }

  actionSetCurrentFavorite = (symbol) => {
    this.setState({ currentFavorite: symbol, historical: null }, () => {
      this.fetchHistorical()
      this.persistState()
    })
  }

  actionAddCoin = (coinKey) => {
    let favorites = new Set(this.state.favorites)
    if (favorites.size <= MAX_FAVORITES) {
      favorites.delete(coinKey) // for sending to the end
      favorites.add(coinKey)

      this.setState({ favorites })
    }
  }

  actionRemoveCoin = (coinKey) => {
    let favorites = new Set(this.state.favorites)
    favorites.delete(coinKey)
    this.setState({ favorites })
  }

  actionSetFilteredCoins = (filteredCoins) => this.setState({ filteredCoins })

  getSavedState () {
    const restoredState = JSON.parse(localStorage.getItem('state'))

    if (restoredState !== null && restoredState.favorites) {
      restoredState.favorites = new Set(restoredState.favorites)
    }

    return { ...this.defaultState, ...restoredState }
  }

  persistState () {
    const { favorites, currentFavorite, isFirstVisit } = this.state
    const json = JSON.stringify({ favorites: Array.from(favorites), isFirstVisit, currentFavorite })

    localStorage.setItem('state', json)
  }

  fetchCoins = async () => {
    const coinList = (await cc.coinList()).Data
    this.setState({ coinList })
  }

  fetchPrices = async () => {
    let prices = []

    let promises = Array.from(this.state.favorites).map((coinSymbol) => {
      return cc.priceFull(coinSymbol, 'USD')
    })

    // permit in .then() for Promise.all =)
    promises = promises.map(p => p.catch((error) => ({ error })))

    const coinPrices = await Promise.all(promises)
    prices = prices
      .concat(coinPrices)
      .filter(data => !Boolean(data.error))

    this.setState({ prices })
  }

  fetchHistorical = async () => {
    const promises = []
    const { currentFavorite } = this.state

    for (let units = TIME_UNITS; units > 0; units--) {
      const promise = cc.priceHistorical(
        currentFavorite,
        ['USD'],
        moment().subtract({ months: units }).toDate()
      )

      promises.push(promise)
    }

    const historical = await Promise.all(promises)

    this.setState({ historical: convertHistoricalToHighchartsData(historical, currentFavorite, TIME_UNITS) })
  }

  createContext () {
    return {
      ...this.state,
      navigate: this.actionNavigate,
      confirmFavorites: this.actionConfirmFavorites,
      hasFavorites: this.actionHasFavorites,
      setCurrentFavorite: this.actionSetCurrentFavorite,
      addCoin: this.actionAddCoin,
      removeCoin: this.actionRemoveCoin,
      setFilteredCoins: this.actionSetFilteredCoins,
    }
  }

  render () {
    const { children } = this.props

    return (
      <AppContext.Provider value={this.createContext()}>
        {children}
      </AppContext.Provider>
    )
  }
}
