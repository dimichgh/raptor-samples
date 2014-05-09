var template = require('raptor-templates').load(require.resolve('./template.rhtml'));
var tempConv = require('temp-units-conv');

module.exports = function render(data, context) {

    var weatherData = data.weatherData;

    var currentTempK = weatherData.tempCurrent;
    var lowTempK = weatherData.tempLow;
    var highTempK = weatherData.tempHigh;

    var precipitationType = weatherData.precipitationType;
    precipitationType = precipitationType.charAt(0).toUpperCase() + precipitationType.substring(1);

    var precipitationRate = weatherData.precipitationRate;

    if (!precipitationRate) {
        precipitationRate = 'None';
        precipitationType = 'Precipitation';
    }

    var viewModel = {
        temp: parseInt(tempConv.k2f(currentTempK)+0.5, 10) + ' °F',
        low: parseInt(tempConv.k2f(lowTempK)+0.5, 10) + ' °F',
        high: parseInt(tempConv.k2f(highTempK)+0.5, 10) + ' °F',
        iconUrl: weatherData.iconUrl,
        description: weatherData.desc,
        humidity: weatherData.humidity,
        cloudiness: weatherData.cloudsDesc,
        pressure: weatherData.pressure,
        windSpeed: weatherData.windSpeed,
        windSpeedDesc: weatherData.windSpeedDesc,
        windDegrees: weatherData.windDegrees,
        windDirection: weatherData.windDirection,
        precipitationRate: precipitationRate,
        precipitationType: precipitationType
    };

    template.render(viewModel, context);
};