import React from 'react'
import ReactHighcharts from 'react-highcharts'
import styled from 'styled-components'
import highchartsConfig from './HighchartsConfig'
import { AppContext } from '../App/AppProvider'
import { Tile } from '../Shared/Tile'
import HighchartsTheme from './HighchartsTheme'

ReactHighcharts.Highcharts.setOptions(HighchartsTheme)

const LoadingDataStyled = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`

export default function PriceChart () {
  return (
    <AppContext.Consumer>
      {({ historical }) => (
        <Tile>
          {historical
            ? <ReactHighcharts config={highchartsConfig(historical)}/>
            : <LoadingDataStyled>Loading Historical Data</LoadingDataStyled>
          }
        </Tile>
      )}
    </AppContext.Consumer>
  )
}
