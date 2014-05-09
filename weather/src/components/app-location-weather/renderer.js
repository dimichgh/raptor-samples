var template = require('raptor-templates').load(require.resolve('./template.rhtml'));

module.exports = function render(data, context) {
    var weatherData = data.weatherData;

    var location = weatherData.location;

    template.render({
        weatherData: weatherData,
        location: location
    }, context);
};