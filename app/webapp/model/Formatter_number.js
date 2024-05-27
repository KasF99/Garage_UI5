sap.ui.define([], function() {
    "use strict";
    return {
        removeComma: function(value) {
            if (value) {
                return value.replace(/,/g, "");
            }
            return value;
        }
    };
});
