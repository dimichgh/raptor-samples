var confit = require('confit');
var nodePath = require('path');

function parseArgs() {
    return require('raptor-args')
        .createParser({
            '--help': {
                type: 'string',
                description: 'Show this help message'
            },
            '--port -p': {
                type: 'number',
                description: 'Port number to listen on'
            }
        })
        .usage('Usage: $0 server [options]')
        .example(
            'Start the server on port 8080',
            '$0 server --port 8080')
        .validate(function(result) {
            if (result.help) {
                this.printUsage();
                process.exit(0);
            }
        })
        .onError(function(err) {
            this.printUsage();
            console.error(err);
            process.exit(1);
        })
        .parse();  
}


exports.load = function(callback) {
    var args = parseArgs();

    var configDir = nodePath.join(__dirname, 'config');
    confit(configDir).create(function(err, config) {
        if (err) {
            return callback(err);
        }

        config.use(args);
        callback(null, config);
    });
};