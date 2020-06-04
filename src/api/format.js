const suffix = ['K', 'M', 'B'] // Unlikely for any of the data to go beyond the billions

/**
 * Converts a number to its Compact Number Format representation
 * (https://developer.android.com/reference/android/icu/text/CompactDecimalFormat)
 * @param  {Number} num The number to be formatted
 * @returns {String}
 */
function formatNum(num) {
  if (num / 1e9 >= 1) {
    return (num / 1e9).toFixed(1).toString() + suffix[2]
  } else if (num / 1e6 >= 1) {
    return (num / 1e6).toFixed(1).toString() + suffix[1]
  } else if (num / 1000 >= 1) {
    return (num / 1000).toFixed(1).toString() + suffix[0]
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
  if (percent / 1e6 >= 1) {
    return (percent / 1e6).toFixed(1).toString() + suffix[1]
  } else if (percent / 1000 >= 1) {
    return (percent / 1000).toFixed(1).toString() + suffix[0]
  } else {
    return percent.toFixed(1).toString()
  }
}

export { formatNum, formatStat }
