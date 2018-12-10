import React from 'react'
import { AppContext } from '../App/AppProvider'

export default () => (
  <AppContext.Consumer>
    {(context) => {
      return context.isFirstVisit
        ? <div>Welcome to CryptoDash, please select your favorite coins to begin.{' '}</div>
        : null
    }}
  </AppContext.Consumer>
)
