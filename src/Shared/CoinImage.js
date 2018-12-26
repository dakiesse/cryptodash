import React from 'react'
import { LazyImage } from 'react-lazy-images'

const loaderUrl = 'https://samherbert.net/svg-loaders/svg-loaders/oval.svg'

export default function CoinImage ({ coin, style, wasRendered = false }) {
  if (wasRendered) {
    debugger
    return (
      <img src={`http://cryptocompare.com/${coin.ImageUrl}`} alt={coin.CoinSymbol} style={style || { height: '50px' }}/>
    )
  }

  return (
    <LazyImage
      src={`http://cryptocompare.com/${coin.ImageUrl}`}
      alt={coin.CoinSymbol}
      placeholder={({ imageProps, ref }) => (<img ref={ref} src={loaderUrl} alt={imageProps.alt}/>)}
      actual={({ imageProps }) => (<img alt={imageProps.alt} {...imageProps}/>)}
      style={style || { height: '50px' }}/>
  )
}
