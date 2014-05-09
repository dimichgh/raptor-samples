var template = require('view-engine').load(require.resolve('./template.rhtml'));
var weatherService = require('../../services/weather-service');

module.exports = function(req, res) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    
    var location = req.params.location || req.query.location;

    function weatherDataProvider(arg, callback) {
        if (!location) {
            return callback();
        }
        
        weatherService.getCurrentWeather({query: location}, callback);
    }

    template
        .stream({
            weatherDataProvider: weatherDataProvider
        })
        .pipe(res);
};