var dust = require('view-engine-dust').dust;

exports.registerHelpers = function() {
    require('raptor-optimizer/dust').registerHelpers(dust);
};