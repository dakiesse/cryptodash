import React from 'react'
import { AppContext } from '../App/AppProvider'
import { DeletableTile, SelectableTile } from '../Shared/Tile'
import CoinHeaderGrid from './CoinHeaderGrid'
import CoinImage from '../Shared/CoinImage'

export default ({ coinKey, topSection }) => {
  return (
    <AppContext.Consumer>
      {({ coinList }) => {
        const coin = coinList[coinKey]

        let TileClass = SelectableTile
        if (topSection) {
          TileClass = DeletableTile
        }

        return (
          <TileClass>
            <CoinHeaderGrid topSection={topSection} name={coin.CoinName} symbol={coin.Symbol}/>
            <CoinImage coin={coin}/>
          </TileClass>
        )
      }}
    </AppContext.Consumer>
  )
}
