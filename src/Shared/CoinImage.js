import React from 'react'

export default ({ coin, style }) => (
  <img src={`http://cryptocompare.com/${coin.ImageUrl}`} alt={coin.CoinSymbol} style={style || { height: '50px' }}/>
)
