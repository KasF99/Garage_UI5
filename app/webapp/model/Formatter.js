sap.ui.define(function() {
	"use strict";

	var Formatter = {

		statusText :  function (sStatus) {
				if (sStatus === "W") {
					return "WORKING";
				} else if (sStatus === "NW") {
					return "NOT WORKING";
				} else if (sStatus === "IR"){
					return "IN REPAIR";
				} else {
					return "None";
				}
		}
	};

	return Formatter;

},  /* bExport= */ true);
