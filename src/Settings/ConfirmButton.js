import React from 'react'
import { AppContext } from '../App/AppProvider'
import styled from 'styled-components'
import { fontSize1, greenBoxShadow, color3 } from '../Shared/Styles'

const ConfirmButtonStyled = styled.div`
  margin: 20px;
  color: ${color3};
  ${fontSize1};
  padding: 5px;
  cursor: pointer;
  
  &:hover {
    ${greenBoxShadow};
  }
`

const CenterBlock = styled.div`
  display: grid;
  justify-content: center;
`

export default function ConfirmButton () {
  return (
    <AppContext.Consumer>
      {(context) => (
        <CenterBlock>
          <ConfirmButtonStyled onClick={context.confirmFavorites}>
            Confirm favorites
          </ConfirmButtonStyled>
        </CenterBlock>
      )}
    </AppContext.Consumer>
  )
}
