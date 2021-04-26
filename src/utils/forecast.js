const request = require('request')
require('dotenv').config()



const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=' + process.env.WEATHER_API_KEY + '&query=' + latitude + ',' + longitude

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