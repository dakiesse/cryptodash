import React from 'react'
import styled, { css } from 'styled-components'
import { AppContext } from './AppProvider'

const Logo = styled.div`
  font-size: 1.5em;
`
const Bar = styled.div`
  display: grid;
  grid-template-columns: 180px auto 100px 100px;
`

const NavigationButtonStyled = styled.div`
  cursor: pointer;
  ${props => props.active && css`
    color: blue;
  `}
`

const NavigationButton = ({ navkey, name }) => (
  <AppContext.Consumer>
    {(context) => (
      <NavigationButtonStyled active={context.page === navkey}
                              onClick={() => context.navigate(navkey)}>
        {name}
      </NavigationButtonStyled>
    )}
  </AppContext.Consumer>
)

export default () => (
  <Bar>
    <Logo>CryptoDash</Logo>
    <div/>
    <NavigationButton navkey="dashboard" name="Dashboard"/>
    <NavigationButton navkey="settings" name="Settings"/>
  </Bar>
)
