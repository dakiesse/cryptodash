import React from 'react'
import styled from 'styled-components'
import { backgroundColor2, fontSize2 } from '../Shared/Styles'
import { AppContext } from '../App/AppProvider'
import _debounce from 'lodash/debounce'
import _pickBy from 'lodash/pickBy'
import _includes from 'lodash/includes'
import fuzzy from 'fuzzy'

const SearchGridStyled = styled.div`
  display: grid;
  grid-template-columns: 200px 200px 150px 1fr;
`

const SearchInputStyled = styled.input`
  ${backgroundColor2};
  ${fontSize2};
  border: 1px solid;
  height: 25px;
  color: #1163c9;
  place-self: center left;
`

const ClearButtonStyled = styled.button`
  ${fontSize2};
  border: 1px solid;
  height: 25px;
  place-self: center left;
`

const FoundAmountStyled = styled.div`
  ${fontSize2};
  place-self: center left;
`

function filterCoins (inputValue, setFilteredCoins, coinList) {
  if (!inputValue) {
    return setFilteredCoins(null)
  }

  handlerFilter(inputValue, setFilteredCoins, coinList)
}

function clearSearch (searchRef, setFilteredCoins) {
  searchRef.value = ''
  setFilteredCoins(null)
}

const handlerFilter = _debounce((inputValue, setFilteredCoins, coinList) => {
  const coinSymbols = Object.keys(coinList)
  const coinNames = coinSymbols.map(symbol => coinList[symbol].CoinName)

  const allStringToSearch = coinSymbols.concat(coinNames)

  const fuzzyResult = fuzzy
    .filter(inputValue, allStringToSearch, {})
    .map(result => result.string)

  const filteredCoins = _pickBy(coinList, (result, symbolKey) => {
    const coinName = result.CoinName

    return (_includes(fuzzyResult, symbolKey) || _includes(fuzzyResult, coinName))
  })

  setFilteredCoins(filteredCoins)
}, 300)

export default function Search () {
  let searchRef

  return (
    <AppContext.Consumer>
      {({ setFilteredCoins, coinList, filteredCoins }) => (
        <SearchGridStyled>
          {console.log(filteredCoins)}
          <h2>Search all coins</h2>

          <SearchInputStyled onKeyUp={(e) => filterCoins(e.target.value, setFilteredCoins, coinList)}
                             ref={ref => searchRef = ref}/>

          <ClearButtonStyled onClick={() => clearSearch(searchRef, setFilteredCoins)}>
            Clear the search
          </ClearButtonStyled>

          {filteredCoins !== null && (
            <FoundAmountStyled>was found {Object.keys(filteredCoins).length} coins</FoundAmountStyled>)
          }
        </SearchGridStyled>
      )}
    </AppContext.Consumer>
  )
}
