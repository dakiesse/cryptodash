import moment from 'moment'

export default (historical, currentFavorite, timeUnits) => ({
  name: currentFavorite,
  data: historical.map((ticker, index) => [
    moment().subtract({ months: timeUnits - index }).valueOf(),
    ticker.USD,
  ])
})
