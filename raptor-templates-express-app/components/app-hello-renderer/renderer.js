module.exports = function render(input, context) {
    context.write('[app-hello-renderer] Hello ' + input.name + '!');
};