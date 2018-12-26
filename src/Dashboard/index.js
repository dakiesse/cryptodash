import React from 'react'
import Page from '../Shared/Page'
import PriceGrid from './PriceGrid'
import CoinSpotlight from './CoinSpotlight'
import ChartGrid from './ChartGrid'
import PriceChart from './PriceChart'

export default () => (
  <Page name={'dashboard'}>
    <PriceGrid/>
    <ChartGrid>
      <CoinSpotlight/>
      <PriceChart/>
    </ChartGrid>
  </Page>
)
