module.exports = function(app) {
    app.get('/api/weather/:location', require('./src/api/weather'));
    app.get('/weather/:location', require('./src/pages/index'));
    app.get('/', require('./src/pages/index'));

};