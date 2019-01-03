import React from 'react'
import styled from 'styled-components'
import { AppContext } from '../App/AppProvider'
import CoinTile from './CoinTile'

const CoinGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  grid-gap: 15px;
  margin-top: 40px;
`

function geLowerSectionCoins (coinList, filteredCoins) {
  const result = filteredCoins ? filteredCoins : coinList

  return Object.keys(result).slice(0, 100)
}

function getCoinsToDisplay (coinList, topSection, favorites, filteredCoins) {
  return topSection ? Array.from(favorites) : geLowerSectionCoins(coinList, filteredCoins)
}

export default function CoinGrid ({ topSection = false }) {
  return (
    <AppContext.Consumer>
      {({ coinList, favorites, filteredCoins }) => (
        <CoinGridStyled>
          {getCoinsToDisplay(coinList, topSection, favorites, filteredCoins).map((coinKey) => (
            <CoinTile key={coinKey} coinKey={coinKey} topSection={topSection}/>
          ))}
        </CoinGridStyled>
      )}
    </AppContext.Consumer>
  )
}
