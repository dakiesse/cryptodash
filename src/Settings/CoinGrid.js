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

function getCoinsToDisplay (coinList, topSection, favorites) {
  return topSection ? Array.from(favorites) : Object.keys(coinList).slice(0, topSection ? 10 : 100)
}

export default ({ topSection = false }) => {
  return (
    <AppContext.Consumer>
      {({ coinList, favorites }) => (
        <CoinGridStyled>
          {getCoinsToDisplay(coinList, topSection, favorites).map((coinKey) => (
            <CoinTile key={coinKey} coinKey={coinKey} topSection={topSection}/>
          ))}
        </CoinGridStyled>
      )}
    </AppContext.Consumer>
  )
}
