import React from 'react'
import Page from '../Shared/Page'
import PriceGrid from './PriceGrid'
import CoinSpotlight from './CoinSpotlight'
import ChartGrid from './ChartGrid'

export default () => (
  <Page name={'dashboard'}>
    <PriceGrid/>
    <ChartGrid>
      <CoinSpotlight/>
      <div>1231212312</div>
    </ChartGrid>
  </Page>
)
