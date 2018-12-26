import React from 'react'
import styled from 'styled-components'
import { Tile } from '../Shared/Tile'
import { AppContext } from '../App/AppProvider'
import CoinImage from '../Shared/CoinImage'

const SpotlightNameStyled = styled.h2`
  text-align: center;
`

export default function CoinSpotlight () {
  return (
    <AppContext.Consumer>
      {({ currentFavorite, coinList }) => (
        <Tile>
          <SpotlightNameStyled>{coinList[currentFavorite].CoinName}</SpotlightNameStyled>
          <CoinImage coin={coinList[currentFavorite]} spotlight wasRendered={true}/>
        </Tile>
      )}
    </AppContext.Consumer>
  )
}
