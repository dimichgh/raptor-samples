var template = require('view-engine').load(require.resolve('./template.rhtml'));

module.exports = function(req, res) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    
    template
        .stream({
            name: 'Frank',
            count: 30
        })
        .pipe(res);
};