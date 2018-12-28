import React from 'react'
import styled, { css } from 'styled-components'
import { SelectableTile } from '../Shared/Tile'
import { fontSize2, fontSizeBig, greenBoxShadow } from '../Shared/Styles'
import { CoinHeaderGridStyled } from '../Settings/CoinHeaderGrid'
import { AppContext } from '../App/AppProvider'

const ChangePercent = styled.div`
  justify-self: right;
  color: green;
  
  ${props => props.isDecreased && css`
    color: red;
  `}
`

const TickerPrice = styled.div`
  ${fontSizeBig}
`

const PriceTileStyled = styled(SelectableTile)`
  ${props => props.compact && css`
    ${fontSize2}
    
    ${TickerPrice} {
      ${fontSize2};
      justify-self: center;
    }
  `}
  
  ${props => props.selected && css`
    ${greenBoxShadow};
    pointer-events: none;
  `}
`

export default ({ price, index }) => {
  const symbol = Object.keys(price)[0]
  const data = price[symbol]['USD']

  return (
    <AppContext.Consumer>
      {({ currentFavorite, setCurrentFavorite }) => {
        const isCompact = index > 4

        return (
          <PriceTileStyled compact={isCompact}
                           selected={currentFavorite === symbol}
                           onClick={() => setCurrentFavorite(symbol)}>
            <CoinHeaderGridStyled compact={isCompact}>
              <div>{symbol}</div>

              {isCompact && (
                <TickerPrice>${numFormat(data.PRICE)}</TickerPrice>
              )}

              <ChangePercent isDecreased={data.CHANGEPCT24HOUR < 0}>
                {numFormat(data.CHANGEPCT24HOUR)}
              </ChangePercent>
            </CoinHeaderGridStyled>

            {!isCompact && (
              <TickerPrice>${numFormat(data.PRICE)}</TickerPrice>
            )}
          </PriceTileStyled>
        )
      }}
    </AppContext.Consumer>
  )
}

function numFormat (number) {
  return +(number + '').slice(0, 7)
}
