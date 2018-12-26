import React from 'react'
import ReactHighcharts from 'react-highcharts'
import HighchartsConfig from './HighchartsConfig'
import { AppContext } from '../App/AppProvider'
import { Tile } from '../Shared/Tile'
import HighchartsTheme from './HighchartsTheme'

ReactHighcharts.Highcharts.setOptions(HighchartsTheme)

export default function PriceChart () {
  return (
    <AppContext.Consumer>
      {() => (
        <Tile>
          <ReactHighcharts config={HighchartsConfig()}/>
        </Tile>
      )}
    </AppContext.Consumer>
  )
}
