const SERVER = 'https://api.covid19api.com/'
const SERVER_2 = 'https://coronavirus-tracker-api.herokuapp.com/'

/**
 * Pulls Global Summary (Confirmed, Deaths, Recovered) of the pandemic from the Postman API
 * @returns {Promise} object with latest data
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
 * Pulls latest number of confirmed cases, deaths, and recovered by country
 * Query String Parameter: id
 * @param {ID} countryID
 * @returns {Promise} object with latest data by country
 */
function requestDataByCountry(countryID) {
  return new Promise((resolve, reject) => {
    fetch(SERVER_2 + 'v2/locations/' + countryID)
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

export { requestDataByCountry, requestSummary, requestListOfCountries }
