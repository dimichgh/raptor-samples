var template = require('raptor-templates').load(require.resolve('./template.rhtml'));

module.exports = function(req, res) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template
        .stream({
            name: 'John'
        })
        .pipe(res);
};