import React from 'react'
import { LazyImage } from 'react-lazy-images'

const loaderUrl = 'https://samherbert.net/svg-loaders/svg-loaders/oval.svg'

export default ({ coin, style }) => (
  <LazyImage
    src={`http://cryptocompare.com/${coin.ImageUrl}`}
    alt={coin.CoinSymbol}
    placeholder={({ imageProps, ref }) => (<img ref={ref} src={loaderUrl} alt={imageProps.alt}/>)}
    actual={({ imageProps }) => (<img alt={imageProps.alt} {...imageProps}/>)}
    style={style || { height: '50px' }}/>
)
