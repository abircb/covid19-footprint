const suffix = ['K', 'M', 'B'] // Unlikely for any of the data to go beyond the billions

/**
 * Converts a number to its Compact Number Format representation
 * (https://developer.android.com/reference/android/icu/text/CompactDecimalFormat)
 * @param  {Number} num The number to be formatted
 * @returns {String}
 */
function formatNum(num) {
  const thousands = num / 1000
  if (thousands >= 1e6) {
    return (thousands / 1e6).toFixed(1).toString() + suffix[2]
  } else if (thousands >= 1000) {
    return (thousands / 1000).toFixed(1).toString() + suffix[1]
  } else if (thousands >= 1) {
    return thousands.toFixed(1).toString() + suffix[0]
  } else {
    return num.toString()
  }
}

/**
 * Rounds the number to 1 d.p and adds a positive/negative sign (if non-zero) to it
 * @param {Number} percent
 * @returns {String}
 */
function formatStat(percent) {
  if (percent === 0) {
    return '0%'
  } else {
    return '+' + stringify(percent) + '%'
  }
}

/**
 *
 * @param {Number} percent
 * @returns {String}
 */
function stringify(percent) {
  // Unlikely for any stat to be beyond the millions (if that)
  const thousands = percent / 1000
  if (thousands >= 1000) {
    return (thousands / 1000).toFixed(1).toString() + suffix[1]
  } else if (thousands >= 1) {
    return thousands.toFixed(1).toString() + suffix[0]
  } else {
    return percent.toFixed(1).toString()
  }
}

export { formatNum, formatStat }
