import React from 'react'
import cc from 'cryptocompare'

export const AppContext = React.createContext()
const MAX_FAVORITES = 10

export class AppProvider extends React.Component {
  defaultState = {
    page: 'dashboard',
    isFirstVisit: true,
    coinList: null,
    favorites: new Set(['BTC', 'ETH', 'DOGE', 'LTC', 'XRP'])
  }

  state = { ...this.getSavedState() }

  async componentDidMount () {
    const coinList = (await cc.coinList()).Data

    this.setState({ coinList })
  }

  actionNavigate = (page) => this.setState({ page })

  actionSetFavorites = () => {
    this.setState({ isFirstVisit: false }, this.persistState)
  }

  actionHasFavorites = (key) => {
    return this.state.favorites.has(key)
  }

  actionAddCoin = (coinKey) => {
    let favorites = new Set(this.state.favorites)
    if (favorites.size < MAX_FAVORITES) {
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

  getSavedState () {
    const restoredState = JSON.parse(localStorage.getItem('state'))

    if (restoredState !== null && restoredState.favorites) {
      restoredState.favorites = new Set(restoredState.favorites)
    }

    return { ...this.defaultState, ...restoredState }
  }

  persistState () {
    const { favorites, isFirstVisit } = this.state
    const json = JSON.stringify({ favorites: Array.from(favorites), isFirstVisit })

    localStorage.setItem('state', json)
  }

  createContext () {
    return {
      ...this.state,
      navigate: this.actionNavigate,
      setFavorites: this.actionSetFavorites,
      hasFavorites: this.actionHasFavorites,
      addCoin: this.actionAddCoin,
      removeCoin: this.actionRemoveCoin,
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
