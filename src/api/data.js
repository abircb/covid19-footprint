const SERVER = 'https://coronavirus-tracker-api.herokuapp.com/'

/**
 * Pulls Latest Data (Confirmed, Deaths, Recovered) from the Tracker API
 * @returns {Promise} object with latest data
 */
function requestLatestData() {
  return new Promise((resolve, reject) => {
    fetch(SERVER + 'v2/latest')
      .then(async (res) => {
        let json = await res.json()
        console.log(json)
        resolve(json)
      })
      .catch((e) => {
        reject(e)
        console.log(e)
        console.log('Network Error')
      })
  })
}

/**
 * Pulls latest number of confirmed cases, deaths, and recovered by country
 * Query String Parameter: id
 * @param {ID} countryID
 * @returns {Promise} object with latest data by country
 */
function requestDataByCountry(countryID) {
  return new Promise((resolve, reject) => {
    fetch(SERVER + 'v2/locations/' + countryID)
      .then(async (res) => {
        let json = await res.json()
        console.log(json)
        resolve(json)
      })
      .catch((e) => {
        reject(e)
        console.error(e)
        console.log('Network Error')
      })
  })
}

/**
 * Pulls all locations from the Tracker API and filters out unique country names
 * @returns {Promise} an array of objects containing country names
 */
function requestListOfCountries() {
  return new Promise((resolve, reject) => {
    fetch(SERVER + 'v2/locations')
    .then(async (res) => {
      let json = res.json()
      let uniqueLocations = new Set()
      let countries = []
      json.locations.forEach((dataPoint) => {
        uniqueLocations.add(dataPoint.country)
      })
      uniqueLocations.forEach((country) => {
        countries.push({ value: country })
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

export { requestDataByCountry, requestLatestData, requestListOfCountries }
