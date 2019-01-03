import moment from 'moment'

export default (historical, currentFavorite, timeInterval, timeUnits) => ({
  name: currentFavorite,
  data: historical.map((ticker, index) => [
    moment().subtract({ [timeInterval]: timeUnits - index }).valueOf(),
    ticker.USD,
  ])
})
