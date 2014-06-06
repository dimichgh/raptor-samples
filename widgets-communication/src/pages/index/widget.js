var alert = require('raptor-sample-ui-components').alert;

function Widget(config) {
    var self = this;

    this.widgets.primaryButton.on('click', function() {
        self.addAlert('You clicked on the primary button!', 'info');
    });

    this.widgets.successButton.on('click', function() {
        self.addAlert('You clicked on the success button!', 'success');
    });

    this.widgets.dangerButton.on('click', function() {
        self.addAlert('You clicked on the danger button!', 'danger');
    });
}

Widget.prototype = {
    addAlert: function(text, alertType) {
        var targetEl = this.getEl('notification-container');

        alert({
                message: text,
                dismissable: true,
                type: alertType
            })
            .appendTo(targetEl);
    }
};

module.exports = Widget;