const SERVER = "https://coronavirus-tracker-api.herokuapp.com/"

/**
 * Pulls Latest Data (Confirmed, Deaths, Recovered) from the Tracker API
 * @returns {Promise} object with latest data
 */
function requestLatestData() {
  return new Promise((resolve, reject) => {
    fetch(SERVER + "v2/latest")
      .then(async (res) => {
        let json = await res.json()
        console.log(json)
        resolve(json)
      })
      .catch((e) => {
        reject(e)
        console.log(e)
        console.log("Network Error")
      })
  })
}

/**
 * Pulls latest number of confirmed cases, deaths, and recovered by country 
 * Query String Parameter: country_code
 * @param {String} countryCode 
 * @returns {Promose} object with latest data by country
 */
function requestDataByCountry(countryCode) {
  return new Promise((resolve, reject) => {
    fetch(SERVER + "v2/locations?country_code=" + countryCode)
      .then(async (res) => {
        let json = await res.json()
        console.log(json)
        resolve(json)
      })
      .catch((e) => {
        reject(e)
        console.error(e)
        console.log("Network Error")
      })
  })
}

export { requestDataByCountry, requestLatestData }