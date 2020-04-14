import { formatNum, formatStat } from './format'
const SERVER = 'https://api.covid19api.com/'

/**
 * Pulls Global Summary (Confirmed, Deaths, Recovered) of the pandemic from the Postman API
 * @returns {Promise} Promise object with latest data
 */
function requestSummary() {
  return new Promise((resolve, reject) => {
    fetch(SERVER + 'summary')
      .then(async (res) => {
        let json = await res.json()
        resolve(json['Global'])
      })
      .catch((e) => {
        reject(e)
        console.log(e)
        console.log('Network Error')
      })
  })
}

/**
 * Pulls all locations from the Tracker API and filters out unique country names
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
 * @param {ID} slug The country's unique API slug
 * @returns {Promise} Promise object with latest data of the country
 */
function requestDataByCountry(slug) {
  return new Promise((resolve, reject) => {
    fetch(SERVER + 'total/country/' + slug)
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
  if (! dataPoint || !dataPoint['Confirmed']) {
    return {
      key: '404',
    }
  } else {
    let delta = deltaCases(dataPoint['Confirmed'], data[last - 1]['Confirmed'])
    console.log(delta)
    return {
      key: slug,
      country: dataPoint['Country'],
      delta: delta,
      confirmed: formatNum(dataPoint['Confirmed']),
      deaths: formatNum(dataPoint['Deaths']),
      recovered: formatNum(dataPoint['Recovered']),
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
  return formatStat(((a - b) / b) * 100)
}

export { requestDataByCountry, requestSummary, requestListOfCountries }
