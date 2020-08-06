import { formatNum, formatStat } from './format'
const SERVER = 'https://api.covid19api.com/'

/**
 * Pulls complete global data of the pandemic from the 'Coronavirus COVID19 API'
 * @returns {Promise} Promise object with the latest global data
 */
function requestGlobalData() {
  return new Promise((resolve, reject) => {
    fetch(SERVER + 'summary')
      .then(async (res) => {
        const json = await res.json()
        resolve(json)
      })
      .catch((e) => {
        reject(e)
        console.error(e)
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
        const json = await res.json()
        let countries = []
        json.forEach((dataPoint) => {
          countries.push({
            value: dataPoint['Country'],
            slug: dataPoint['Slug'],
          })
        })
        countries.sort(function (a, b) {
          let x = a.value.toLowerCase(),
            y = b.value.toLowerCase()
          if (x < y) return -1
          if (x > y) return 1
          return 0
        })
        resolve(countries)
      })
      .catch((e) => {
        reject(e)
        console.error(e)
      })
  })
}

/**
 * Pulls the latest number of confirmed cases, deaths, and recovered by country
 * API Query Parameter: slug
 * @param {String} slug The country's unique API slug
 * @param {Object} globalData Global Data of the pandemic
 * @returns {Promise} Promise object with latest data of the country
 */
function requestDataByCountry(slug, globalData) {
  const country = globalData.find((country) => {
    return country['Slug'] === slug
  })
  return country !== undefined
    ? parseCountryData(country, slug)
    : { key: '404' }
}

/**
 * Extracts a Global summary (Confirmed, Recovered, Deaths) of the pandemic
 * @param {Object} globalData Global Data of the pandemic
 * @returns {Object}
 */
function extractGlobalSummary(globalData) {
  const json = globalData['Global']
  return {
    confirmed: json['TotalConfirmed'],
    newConfirmed: json['NewConfirmed'],
    recovered: json['TotalRecovered'],
    newRecovered: json['NewRecovered'],
    deaths: json['TotalDeaths'],
    newDeaths: json['NewDeaths'],
  }
}

/**
 * Extracts country-by-country data
 * @param {Object} globalData Global Data of the pandemic
 * @returns {Object}
 */
const extractCountryData = (globalData) => globalData['Countries']

/**
 * Parses country data to match the schema
 * @param {Array} data An array containing a country's data
 * @param {String} slug The country's unique API slug
 * @returns {Object} An object containing data conforming to the display schema
 */
function parseCountryData(data, slug) {
  if (!data['TotalConfirmed']) {
    return {
      key: '404',
    }
  } else {
    const delta = deltaCases(
      data['TotalConfirmed'],
      data['TotalConfirmed'] - data['NewConfirmed']
    )
    return {
      key: slug,
      country: data['Country'],
      delta: delta,
      confirmed: formatNum(data['TotalConfirmed']),
      recovered:
        data['Recovered'] === 0 || data['Slug'] === 'united-kingdom'
          ? 'No Data'
          : formatNum(data['TotalRecovered']),
      deaths: formatNum(data['TotalDeaths']),
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
  const delta = ((a - b) / b) * 100
  if (delta < 0) {
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
const checkIfMissing = (data) => (data['key'] === '404' ? true : false)

export {
  requestGlobalData,
  extractCountryData,
  extractGlobalSummary,
  requestDataByCountry,
  requestListOfCountries,
  checkIfMissing,
}
