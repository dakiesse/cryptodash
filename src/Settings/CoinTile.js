import React from 'react'
import { AppContext } from '../App/AppProvider'
import { DeletableTile, DisabledTile, SelectableTile } from '../Shared/Tile'
import CoinHeaderGrid from './CoinHeaderGrid'
import CoinImage from '../Shared/CoinImage'

// The CoinImage component will be re-rendered with LazyImage
// behave all the time. To avoid this the code will fix the very
// first render. And fixing will occur at the module level!
const wasRenderedForSymbol = new Set()

function clickCoinHandler (topSection, coinKey, addCoin, removeCoin) {
  return () => topSection ? removeCoin(coinKey) : addCoin(coinKey)
}

export default function CoinTile ({ coinKey, topSection }) {
  return (
    <AppContext.Consumer>
      {({ coinList, addCoin, removeCoin, hasFavorites }) => {
        const coin = coinList[coinKey]

        let TileClass = SelectableTile
        if (topSection) {
          TileClass = DeletableTile
        } else if (hasFavorites(coinKey)) {
          TileClass = DisabledTile
        }

        let wasRendered = true
        if (!wasRenderedForSymbol.has(coin.Symbol)) {
          wasRenderedForSymbol.add(coin.Symbol)
          // wasRendered = false
        }

        return (
          <TileClass onClick={clickCoinHandler(topSection, coinKey, addCoin, removeCoin)}>
            <CoinHeaderGrid topSection={topSection} name={coin.CoinName} symbol={coin.Symbol}/>
            <CoinImage coin={coin} wasRendered={wasRendered}/>
          </TileClass>
        )
      }}
    </AppContext.Consumer>
  )
}
