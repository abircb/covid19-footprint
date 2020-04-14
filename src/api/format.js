const suffix = ["K", "M", "B"]; // Unlikely for any of the data to go beyond a billion

/**
 * Converts a number to its Compact Number Format representation
 * (https://developer.android.com/reference/android/icu/text/CompactDecimalFormat)
 * @param  {Number} num The number to be formatted
 * @returns {String}
 */
function formatNum(num) {
  if (num / 1e9 >= 1) {
    return (num / 1e9).toFixed(1).toString() + suffix[2];
  } else if (num / 1e6 >= 1) {
    return (num / 1e6).toFixed(1).toString() + suffix[1];
  } else if (num / 1000 >= 1) {
    return (num / 1000).toFixed(1).toString() + suffix[0];
  } else {
    return num.toFixed(1).toString();
  }
}

/**
 * Rounds the number to 1 d.p and adds a positive/negative sign (if non-zero) to it
 * @param {Number} percent 
 * @returns {String}
 */
function formatStat(percent) {
  if (percent < 0) {
    return '-' + formatNum(percent) + '%'
  } else if (percent > 0) {
    return '+' + formatNum(percent) + '%'
  } else {
    return '0%'
  }
}

export { formatNum, formatStat };
