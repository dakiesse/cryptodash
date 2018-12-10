import React from 'react'
import { AppContext } from '../App/AppProvider'
import styled from 'styled-components'

const CenterBlock = styled.div`
  margin: 20px;
  color: green;
`

const ConfirmButtonStyled = styled.div`
  display: grid;
  justify-content: center;
  cursor: pointer;
`

export default () => (
  <AppContext.Consumer>
    {(context) => (
      <CenterBlock>
        <ConfirmButtonStyled onClick={context.setFavorites}>
          Confirm favorites
        </ConfirmButtonStyled>
      </CenterBlock>
    )}
  </AppContext.Consumer>
)
