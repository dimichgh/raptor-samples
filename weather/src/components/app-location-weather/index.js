var raptorRenderer = require('raptor-renderer');
var renderer = require('./renderer');

exports.render = function(data, callback) {
    return raptorRenderer.render(renderer, data, callback);
};