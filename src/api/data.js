const SERVER = "https://coronavirus-tracker-api.herokuapp.com/"

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