var express = require('express');
var raptorOptimizer = require('raptor-optimizer');
var viewEngine = require('view-engine');
var config = require('./config');



// Asynchronously load environment-specific configuration data before starting the app
config.load(function(err, config) {
    var app = express();

    raptorOptimizer.configure(config.get('raptor-optimizer'));
    viewEngine.configure(config.get('view-engine'));

    require('./src/dust-helpers').registerHelpers();
    require('./src/dust-helpers-server').registerHelpers();

    var port = config.get('port');

    app.use(express.compress());
    app.use('/static', express.static(__dirname + '/static'));

    require('./routes')(app);

    app.listen(port, function() {
        console.log('Listening on port %d', port);

        if (process.send) {
            process.send('online');
        }
    });
});