var dust = require('view-engine-dust').dust;
var raptorDust = require('raptor-dust');

exports.registerHelpers = function() {
    require('raptor-taglib-async/dust').registerHelpers(dust);
    require('raptor-taglib-layout/dust').registerHelpers(dust);
    require('raptor-widgets/dust').registerHelpers(dust);
    raptorDust.registerHelpers({
        'app-button': require('./components/app-button/renderer'),
        'app-weather': require('./components/app-weather/renderer'),
        'app-choose-location': require('./components/app-choose-location/renderer'),
        'app-current-conditions': require('./components/app-current-conditions/renderer'),
        'app-location-weather': require('./components/app-location-weather/renderer')
    }, dust);

    // console.log('dust helpers: ', Object.keys(dust.helpers));
};