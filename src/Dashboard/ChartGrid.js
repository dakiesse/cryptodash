import styled from 'styled-components'

export default styled.div.withConfig({ displayName: 'ChartGridStyled' })`
  display: grid;
  margin-top: 20px;
  grid-gap: 15px;
  grid-template-columns: 1fr 3fr;
`
