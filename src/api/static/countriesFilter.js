const fs = require('fs')

let json = JSON.parse(fs.readFileSync('./countries.json'))
let uniqueLocations = new Set()
json.locations.forEach(dataPoint => {
    uniqueLocations.add(dataPoint.country)
});
let countries = []
uniqueLocations.forEach(country => {
    countries.push({value: country})
})
