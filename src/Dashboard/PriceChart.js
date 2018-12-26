import React from 'react'
import ReactHighchart from 'react-highcharts'
import HighchartConfig from './HighchartsConfig'
import { AppContext } from '../App/AppProvider'
import { Tile } from '../Shared/Tile'

export default function PriceChart () {
  return (
    <AppContext.Consumer>
      {() => (
        <Tile>
          <ReactHighchart config={HighchartConfig()}/>
        </Tile>
      )}
    </AppContext.Consumer>
  )
}
