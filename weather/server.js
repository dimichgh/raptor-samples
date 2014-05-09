var express = require('express');
var raptorOptimizer = require('raptor-optimizer');
var config = require('./config');

config.load(function(err, config) {
    var app = express();

    raptorOptimizer.configure(config.get('raptor-optimizer'));

    var port = config.get('port');

    app.use('/static', express.static(__dirname + '/static'));

    require('./routes')(app);

    app.listen(port, function() {
        console.log('Listening on port %d', port);

        if (process.send) {
            process.send('online');
        }
    });
});