import React from 'react'
import ReactHighcharts from 'react-highcharts'
import styled from 'styled-components'
import highchartsConfig from './HighchartsConfig'
import { AppContext } from '../App/AppProvider'
import { Tile } from '../Shared/Tile'
import HighchartsTheme from './HighchartsTheme'
import ChartSelect from './ChartSelect'

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
      {({ historical, timeInterval, changeChartSelect }) => (
        <Tile>
          <ChartSelect defaultValue={timeInterval} onChange={e => changeChartSelect(e.target.value)}>
            <option value="days">Days</option>
            <option value="weeks">Weeks</option>
            <option value="months">Months</option>
          </ChartSelect>

          {historical
            ? <ReactHighcharts config={highchartsConfig(historical)}/>
            : <LoadingDataStyled>Loading Historical Data</LoadingDataStyled>
          }
        </Tile>
      )}
    </AppContext.Consumer>
  )
}
