import getSymbolFromCurrency from 'currency-symbol-map'
import { intervalToDuration } from 'date-fns'

export function getCurrencySymbol(currencyCode: string) {
  const currency = getSymbolFromCurrency(currencyCode)
  if (currency) {
    return currency
  } else {
    return currencyCode
  }
}

export function getDate(date: string) {
  const convertedDate = convertDate(date)
  return (
    convertedDate.day + '/' + convertedDate.month + '/' + convertedDate.year
  )
}

export function getDays(checkInDate: string, checkOutDate: string) {
  return intervalToDuration({
    start: getDateConversion(checkInDate),
    end: getDateConversion(checkOutDate),
  }).days
}

export function getDateConversion(date: string) {
  return new Date(date.slice(0, 10))
}

export function getDayConversion(date: string) {
  if (date) {
    const convertedDate = getDateConversion(date)
    const month = convertedDate.toLocaleString('default', { month: 'short' })
    return convertedDate.getDate() + ' ' + month
  }
  return ''
}
function convertDate(date: string) {
  return (([year, month, day]) => ({ day, month, year }))(
    date.slice(0, 10).split('-'),
  )
}

export function getRateTolerance(initialRate: number, finalRate: number) {
  if (finalRate > initialRate) {
    const rateDifference = finalRate - initialRate
    return (rateDifference * 100) / initialRate
  }
  return 0
}
