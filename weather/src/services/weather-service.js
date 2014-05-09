var request = require('request');
var weatherServiceUtil = require('./weather-service-util');

exports.getCurrentWeather = function(options, callback) {
    var query = options.query || options.location;

    var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + query + '&mode=xml';
    request(url, function(err, response, body) {
        if (err) {
            return callback(err);
        }

        if (response.statusCode !== 200) {
            return callback('Request to ' + url + ' return status code ' + response.statusCode);
        }

        weatherServiceUtil.parseCurrentWeatherXml(body, callback);
    });
};