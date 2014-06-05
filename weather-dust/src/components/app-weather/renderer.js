var template = require('view-engine').load(require.resolve('./template.dust'));
var widgetPath = require.resolve('./widget');

module.exports = function render(data, context) {
    template.render({
        weatherData: data.weatherData,
        widgetPath: widgetPath
    }, context);
};