var template = require('view-engine').load(require.resolve('./template.dust'));
var layoutTemplate = require('view-engine').load(require.resolve('../../layouts/default-layout.dust'));
var weatherService = require('../../services/weather-service');
var optimizerPackagePath = require.resolve('./optimizer.json');

module.exports = function(req, res) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    
    var location = req.params.location || req.query.location;

    function weatherDataProvider(arg, callback) {
        if (!location) {
            process.nextTick(function() {
                callback();
            });
            return;
        }

        weatherService.getCurrentWeather({query: location}, callback);    
        
    }

    template
        .stream({
            layoutTemplate: layoutTemplate,
            weatherDataProvider: weatherDataProvider,
            optimizerPackagePath: optimizerPackagePath
        })
        .pipe(res);
};