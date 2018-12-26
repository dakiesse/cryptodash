import React from 'react'
import { LazyImage } from 'react-lazy-images'

const loaderUrl = 'https://samherbert.net/svg-loaders/svg-loaders/oval.svg'

export default function CoinImage ({ coin, style, wasRendered = false }) {
  const imageLink = `http://cryptocompare.com/${coin.ImageUrl}`
  style = style || { height: '50px' }

  if (wasRendered) {
    return (
      <img src={imageLink} alt={coin.CoinSymbol} style={style}/>
    )
  }

  return (
    <LazyImage
      src={imageLink}
      alt={coin.CoinSymbol}
      placeholder={({ imageProps, ref }) => (<img ref={ref} src={loaderUrl} alt={imageProps.alt}/>)}
      actual={({ imageProps }) => (<img alt={imageProps.alt} {...imageProps}/>)}
      style={style}/>
  )
}
