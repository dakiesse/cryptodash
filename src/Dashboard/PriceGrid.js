import React from 'react'
import styled from 'styled-components'
import { AppContext } from '../App/AppProvider'
import PriceTile from './PriceTile'

const PriceGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 15px;
  margin-top: 40px;
`

export default function PriceGrid () {
  return (
    <AppContext.Consumer>
      {({ prices }) => (
        <PriceGridStyled>
          {prices.map((price, index) => {
            const key = Object.keys(price)[0]

            return (<PriceTile key={key} price={price} index={index}/>)
          })}
        </PriceGridStyled>
      )}
    </AppContext.Consumer>
  )
}
