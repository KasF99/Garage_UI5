sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/m/MessageToast",
    '../model/Formatter_number',
    '../model/Formatter_carName',
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/odata/v4/ODataModel",

], (Controller, History, MessageToast, Formatter_number, Formatter_carName, JSONModel, ODataModel) => {
    "use strict";

    return Controller.extend("ui5.walkthrough.controller.Edit", {
        formatter: Formatter_number,
        formatter_carName: Formatter_carName,
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
            const oContext = this.getView().getBindingContext("Backend");
            const oName = this.getView().byId("nameInput").getValue()
            const oPrice = this.formatter.parsePrice(this.getView().byId("priceInput").getValue());
            const oMemberID = this.getView().byId("idMemberInput").getSelectedKey()

            // Collect the data for the update
            const oData = {
                "name": oName,
                "price": oPrice,
                "Member": {
                    "ID": oMemberID
                }
            };

            // Update the context with the new data
            oContext.setProperty("name", oData.name);
            oContext.setProperty("price", oData.price)
            oContext.setProperty("Member_ID", oData.Member.ID)


            // Define success and error callback functions
            const onSuccess = () => {

                const oHistory = History.getInstance();
                const sPreviousHash = oHistory.getPreviousHash();

                if (sPreviousHash !== undefined) {
                    window.history.go(-1);
                }

            };

            const onError = (oError) => {
                MessageToast.show("Error saving changes.");
                console.error("Error during update: ", oError);
            };

            // Submit the batch operation
            oModel.submitBatch("$auto").then(onSuccess).catch(onError);

        },

        loadCarData: function () {
            // Load initial data into the model
            var oCarData = {
                carName: "BMW",
                carPrice: 109
            };
            var oCarModel = new JSONModel(oCarData);
            this.getView().setModel(oCarModel, "carModel");
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
            oModel.resetChanges("$auto");
            this.onNavBack()
        },

        onMemberChange: function () {
            // Create OData model
            // var oModel = new ODataModel({
            //     serviceUrl: "http://localhost:4004/odata/v4/garage/",
            //     synchronizationMode: "None"
            // });

            // var oModelApi = this.getView().getModel("Backend");
            // let memberID = this.getView().byId("idMemberInput").getSelectedKey()
            // var sPath = `/Member(${memberID})`;

            // // Create a context binding to the specific entity
            // var oContextBinding = oModel.bindContext(sPath);

            // oContextBinding.requestObject().then(function (oData) {
            //     // Optionally, set the temporary data to a JSON model for binding
            //     var oMemberModel = new JSONModel(oData);
            //     this.getView().setModel(oMemberModel, "MemberData");
            //     var memberData = oMemberModel.getData();
            //     var oContextCars = this.getView().getBindingContext("Backend")
            //     const oMemberValues = {
            //         "Member": {
            //             "ID": memberData.ID,
            //             "firstName": memberData.firstName,
            //             "lastName": memberData.lastName,
            //             "email": memberData.email,
            //             "phone": memberData.phone
            //         }
            //     };
            //     oContextCars.setProperty("Member_ID",oMemberValues.Member.ID);
            //     MessageToast.show(oModelApi)
            //     // oModelApi.submitBatch("$auto").then().catch();

            // }.bind(this)).catch(function (oError) {
            //     console.error("Error retrieving data: ", oError);
            // });
        },

    });
});
