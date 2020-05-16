import { formatNum, formatStat } from './format'
const SERVER = 'https://api.covid19api.com/'
const SERVER_2 = 'https://corona.lmao.ninja/v2/'

/**
 * Pulls Global Summary (Confirmed, Deaths, Recovered) of the pandemic from the 'Novel COVID API'
 * @returns {Promise} Promise object with the latest global data
 */
function requestGlobalSummary() {
  return new Promise((resolve, reject) => {
    fetch(SERVER_2 + 'all')
      .then(async (res) => {
        let json = await res.json()
        let summary = {
          confirmed: json['cases'],
          recovered: json['recovered'],
          deaths: json['deaths'],
        }
        resolve(summary)
      })
      .catch((e) => {
        reject(e)
        console.log(e)
        console.log('Network Error')
      })
  })
}

/**
 * Pulls all locations from the 'Coronavirus COVID19 API' and filters out unique country names
 * @returns {Promise} An array of objects containing country names
 */
function requestListOfCountries() {
  return new Promise((resolve, reject) => {
    fetch(SERVER + 'countries')
      .then(async (res) => {
        let json = await res.json()
        let countries = []
        json.forEach((dataPoint) => {
          countries.push({
            value: dataPoint['Country'],
            slug: dataPoint['Slug'],
          })
        })
        countries.sort(function (a, b) {
          let x = a.value.toLowerCase(), y = b.value.toLowerCase()
          if (x < y) return -1
          if (x > y) return 1
          return 0
        })
        resolve(countries)
      })
      .catch((e) => {
        reject(e)
        console.error(e)
        console.log('Network Error')
      })
  })
}

/**
 * Pulls latest number of confirmed cases, deaths, and recovered by country
 * API Query Parameter: slug
 * @param {String} slug The country's unique API slug
 * @returns {Promise} Promise object with latest data of the country
 */
function requestDataByCountry(slug) {
  return new Promise((resolve, reject) => {
    fetch(SERVER + 'total/dayone/country/' + slug)
      .then(async (res) => {
        let json = await res.json()
        resolve(parseCountryData(json, slug))
      })
      .catch((e) => {
        reject(e)
        console.error(e)
        console.log('Network Error')
      })
  })
}

/**
 * Parses country data to match the schema
 * @param {Array} data An array containing a country's data
 * @param {String} slug The country's unique API slug
 * @returns {Object} An object containing data conforming to the display schema
 */
function parseCountryData(data, slug) {
  let last = data.length - 1
  let dataPoint = data[last]
  if (!dataPoint || !dataPoint['Confirmed'] || dataPoint['Confirmed'] === 0) {
    return {
      key: '404',
    }
  } else {
    let delta =
      data.length > 1
        ? deltaCases(dataPoint['Confirmed'], data[last - 1]['Confirmed'])
        : '0%'
    return {
      key: slug,
      country: dataPoint['Country'],
      delta: delta,
      confirmed: formatNum(dataPoint['Confirmed']),
      recovered:
        dataPoint['Recovered'] === 0
          ? 'Unknown'
          : formatNum(dataPoint['Recovered']),
      deaths: formatNum(dataPoint['Deaths']),
    }
  }
}

/**
 * Calculates the relative change between two numbers
 * @param {Number} a Current number of confirmed cases
 * @param {Number} b Number of confirmed cases found in the previous update
 * @returns {String} The (relative) change between the two numbers, formatted according to the display requirements
 */
function deltaCases(a, b) {
  let delta = ((a - b) / b) * 100
  if (delta < -1) {
    return 'Disputed'
  } else {
    return formatStat(delta)
  }
}

/**
 * Checks if the data is missing values (Confirmed, Recovered, Deaths, etc.)
 * @param {Object} data Data for the country
 * @returns {Boolean}
 */
function checkIfMissing(data) {
  if (data['key'] === '404') {
    return true
  }
  return false
}

export {
  requestGlobalSummary,
  requestDataByCountry,
  requestListOfCountries,
  checkIfMissing,
}
