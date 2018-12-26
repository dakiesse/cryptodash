import React from 'react'
import styled, { css } from 'styled-components'
import { SelectableTile } from '../Shared/Tile'
import { fontSize3, fontSizeBig } from '../Shared/Styles'
import { CoinHeaderGridStyled } from '../Settings/CoinHeaderGrid'

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
    ${fontSize3}
  `}
`

export default ({ price, index }) => {
  const symbol = Object.keys(price)[0]
  const data = price[symbol]['USD']

  return (
    <PriceTileStyled compact={index > 4}>
      <CoinHeaderGridStyled>
        <div>{symbol}</div>

        <ChangePercent isDecreased={data.CHANGEPCT24HOUR < 0}>
          {numFormat(data.CHANGEPCT24HOUR)}
        </ChangePercent>
      </CoinHeaderGridStyled>

      <TickerPrice>${numFormat(data.PRICE)}</TickerPrice>
    </PriceTileStyled>
  )
}

function numFormat (number) {
  return +(number + '').slice(0, 7)
}
