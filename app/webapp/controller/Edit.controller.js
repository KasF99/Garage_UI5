sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/m/MessageToast",
    '../model/Formatter_number',
], (Controller, History, MessageToast, Formatter_number) => {
    "use strict";

    return Controller.extend("ui5.walkthrough.controller.Edit", {
        formatter: Formatter_number,
        onInit() {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("edit").attachPatternMatched(this.onObjectMatched, this);
            
        },

        onObjectMatched(oEvent) {
            const sPath = "/" + window.decodeURIComponent(oEvent.getParameter("arguments").carPath)
            this.getView().bindElement({
                path: sPath,
                model: "Backend"
            });

            this.sCarPath = sPath
        },

        onSavePress() {
            const oModel = this.getView().getModel("Backend");
            const sPath = this.sCarPath;
            const oContext = this.getView().getBindingContext("Backend");
            const oPrice = this.formatter.parsePrice(this.getView().byId("priceInput").getValue());

             
            // Collect the data for the update
            const oData = {
                "name": this.getView().byId("nameInput").getValue(),
                "price": oPrice,
                // "price": parseFloat(sanitizeNumber(this.getView().byId("priceInput").getValue())),
                "Member": {
                    "firstName": this.getView().byId("firstNameInput").getValue(),
                    "lastName": this.getView().byId("lastNameInput").getValue(),
                    "email": this.getView().byId("emailInput").getValue(),
                    "phone": this.getView().byId("phoneInput").getValue()
                }
            };

            // Update the context with the new data
            oContext.setProperty("name", oData.name);
            oContext.setProperty("price", oData.price);
            oContext.setProperty("Member/firstName", oData.Member.firstName);
            oContext.setProperty("Member/lastName", oData.Member.lastName);
            oContext.setProperty("Member/email", oData.Member.email);
            oContext.setProperty("Member/phone", oData.Member.phone);

            // Define success and error callback functions
            const onSuccess = () => {
        
                // Navigate to the main view and refresh the list
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("overview", {}, true);
            };

            const onError = (oError) => {
                MessageToast.show("Error saving changes.");
                console.error("Error during update: ", oError);
            };

            // Submit the batch operation
            oModel.submitBatch("updateGroup").then(onSuccess).catch(onError);
       
        },

        onNavBack() {
            const oHistory = History.getInstance();
            const sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("overview", {}, true);
            }
        },

        onCancelPress() {
            const oModel = this.getView().getModel("Backend");
            oModel.resetChanges("updateGroup");
            const oRouter = this.getOwnerComponent().getRouter();
            // oRouter.navTo("detail", { carPath: encodeURIComponent(this.sCarPath.substr(1)) }, true);
            oRouter.navTo("overview", {}, true);
        },

    });
});
