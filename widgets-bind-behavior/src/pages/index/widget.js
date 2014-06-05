function Widget(config) {
    var rootEl = this.el; // this.el returns the root element that the widget is bound to
    var self = this;

    rootEl.addEventListener('click', function() {
        self.addText('You clicked on the root element!');
    });
}

Widget.prototype = {
    addText: function(text) {
        this.el.appendChild(document.createTextNode(text));
    }
};

module.exports = Widget;