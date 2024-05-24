sap.ui.define(function() {
	"use strict";

	var Formatter = {

		status : function(sStatus) {
            if (sStatus === "W") {
                return "Success";
            } else if (sStatus === "NW") {
                return "Error";
            } else if (sStatus === "IR"){
                return "Warning";
            } else {
                return "None";
            }
        },
	};

	return Formatter;

},  /* bExport= */ true);
