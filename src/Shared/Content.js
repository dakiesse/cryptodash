import React from 'react'
import { AppContext } from '../App/AppProvider'

export default function Content (props) {
  return (
    <AppContext.Consumer>
      {({ coinList, prices, isFirstVisit }) => {
        if (!coinList) {
          return (<div>Loading Coins</div>)
        }

        if (!prices && !isFirstVisit) {
          return (<div>Loading Prices</div>)
        }

        return props.children
      }}
    </AppContext.Consumer>
  )
}
