const SERVER = "https://coronavirus-tracker-api.herokuapp.com/"

function bundleData(json) {
  let result = []
  for (let bundle of json) {
    result = result.concat(bundle.entry)
    return result
  }
}

function requestDataByCountry(countryCode) {
  return new Promise((resolve, reject) => {
    fetch(SERVER + "v2/locations?country_code=" + countryCode)
      .then(async (res) => {
        let json = await res.json()
        console.log(json)
        json = bundleData(json)
        resolve(json)
      })
      .catch((e) => {
        reject(e)
        console.error(e)
        console.log("Network Error")
      })
  })
}

export { requestDataByCountry }