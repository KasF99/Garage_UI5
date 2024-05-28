sap.ui.define([], function() {
    "use strict";
    return {
        formatPrice: function (value) {
            // Ensure the value is a string and remove any non-digit characters
            return value ? value.toString().replace(/[^\d]/g, '') : value;
        },
        parsePrice: function (value) {
            // Parse the value back to an integer
            return parseInt(value, 10);
        }
    };
});
