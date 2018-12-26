import React from 'react'
import styled, { css } from 'styled-components'
import { LazyImage } from 'react-lazy-images'

const loaderUrl = 'https://samherbert.net/svg-loaders/svg-loaders/oval.svg'

const CoinImageStyled = styled.img`
  height: 50px;
  
  ${props => props.spotlight && css`
    height: 200px;
    margin: auto;
    display: block;
  `}
`

export default function CoinImage ({ coin, style, spotlight, wasRendered = false }) {
  const imageLink = `http://cryptocompare.com/${coin.ImageUrl}`
  style = style || { height: '50px' }

  if (wasRendered) {
    return (
      <CoinImageStyled spotlight={spotlight} src={imageLink} alt={coin.CoinSymbol}/>
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
