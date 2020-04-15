const fs = require('fs')

let json = JSON.parse(fs.readFileSync('./countries.json'))
let uniqueLocations = new Set()
json.locations.forEach((dataPoint) => {
  uniqueLocations.add(dataPoint.country)
})
let countries = []
uniqueLocations.forEach((country) => {
  countries.push({ value: country })
})

let summary = JSON.parse(fs.readFileSync('./summary.json'))
summary = summary.data
let obj = {
  confirmed: parseInt(summary['total_cases'].split(",").join("")),
  recovered: parseInt(summary['recovery_cases'].split(",").join("")),
  deaths: parseInt(summary['death_cases'].split(",").join("")),
}
console.log(obj)