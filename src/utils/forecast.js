const request = require('request')
const fs = require('fs');
const rawdata = fs.readFileSync('../env.json');
const keys = JSON.parse(rawdata);




const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=' + keys.weather_api_key + '&query=' + latitude + ',' + longitude

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            console.log('Unable to find location')
        } else {
            callback(undefined, 'The temperature is ' + body.current.temperature + ' and there is  ' + body.current.precip + '% chance of Raining')
        }
    })

}


module.exports = forecast