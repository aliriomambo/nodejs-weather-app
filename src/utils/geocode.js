const request = require('request')
const path = require('path')

const fs = require('fs');
const envPath = path.join(__dirname, '../../env.json')
const rawdata = fs.readFileSync(envPath);
const keys = JSON.parse(rawdata);


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=' + keys.mapbox_api_key + '&limit=1'

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to geo services', undefined)
            //console.log('Unable to connect to geo services')
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            const latitude = body.features[0].center[0]
            const longitude = body.features[0].center[1]
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }

    })
}

module.exports = geocode