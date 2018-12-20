import React from 'react'
import cc from 'cryptocompare'

export const AppContext = React.createContext()

export class AppProvider extends React.Component {
  defaultState = {
    page: 'dashboard',
    isFirstVisit: true,
    coinList: null,
  }

  state = {
    ...this.getSavedState(),
  }

  async componentDidMount () {
    const coinList = (await cc.coinList()).Data

    this.setState({ coinList })
  }

  actionNavigate = (page) => this.setState({ page })

  actionSetFavorites = () => {
    this.setState({ isFirstVisit: false }, this.persistState)
  }

  getSavedState () {
    const state = JSON.parse(localStorage.getItem('state'))

    if (!state) return this.defaultState
    return state
  }

  persistState () {
    const json = JSON.stringify(this.state)
    localStorage.setItem('state', json)
  }

  createContext () {
    return {
      ...this.state,
      navigate: this.actionNavigate,
      setFavorites: this.actionSetFavorites,
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
