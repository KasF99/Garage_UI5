sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	'sap/m/MessageToast',
	'../model/Formatter',
	'../model/Formatter_color',
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"

], (Controller, JSONModel, MessageToast, Formatter, Formatter_color, Filter, FilterOperator) => {
	"use strict";

	return Controller.extend("ui5.walkthrough.controller.GarageList", {
		formatter: Formatter,
		cformatter: Formatter_color,
		onInit() {
			const oViewModel = new JSONModel({
				currency: "EUR"
			});
			this.getView().setModel(oViewModel, "view");
		},

		onListItemPress: function (oEvent) {
			const oItem = oEvent.getSource();
			const oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("detail", {
				carPath: window.encodeURIComponent(oItem.getBindingContext("Backend").getPath().substr(1))
			})
		},



		onFilterCars(oEvent) {
			// build filter array
			const aFilter = [];
			const sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("name", FilterOperator.Contains, sQuery));
			}

			// filter binding
			const oList = this.byId("garageList");
			const oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		},

		onCreateRel: function () {


			var oContext = this.getView().byId("garageList").getBinding("items")
				.create({
					name: "TEST FRONT",
					Member: {
						name: "New Owner"
					},
					price: 20000
				})

			// Note: This promise fails only if the transient entity is canceled, 
			//   i.e. deleted by either deleting the transient context or by resetting pending changes
			oContext.created().then(function () {
				// Sales order successfully created, refresh the list
			}.bind(this), function (oError) {
				// handle rejection of entity creation; if oError.canceled === true then the transient entity has been deleted
				if (!oError.canceled) {
					throw oError; // unexpected error
				}
			}.bind(this));
		},

		onCreate: function () {
			var oSo = this.getView().byId("idName").getValue();
			var oPrice = this.getView().byId("idPrice").getValue();
			var oMember = this.getView().byId("idMember").getSelectedKey();
			var oStatus = this.getView().byId("idStatus").getSelectedKey();

			if (oSo !== "") {
				var iPrice = parseInt(oPrice, 10);
				var oContext = this.getView().byId("garageList").getBinding("items")
					.create({
						name: oSo,
						price: iPrice,
						status_code: oStatus, 
						Member: {
							ID: oMember
						}     
					});
				oContext.created()
					.then(() => {
						this.getView().byId("OpenDialog").close();
					});

			} else {
				MessageToast.show("So cannot be blank");
			}

		},

		onCancelDialog: function (oEvent) {
			oEvent.getSource().getParent().close();
		},

		async onOpenDialog() {
			// create dialog lazily
			this.oDialog ??= await this.loadFragment({

				name: "ui5.walkthrough.view.AddCar"
			});

			this.oDialog.open();
		},

		onDelete: function () {
			var oContext,
				oSelected = this.byId("garageList").getSelectedItem(),
				sID;

			if (oSelected) {
				oContext = oSelected.getBindingContext("Backend");
				sID = oContext.getProperty("ID");
				MessageToast.show(sID);
				oContext.delete().then(function () {
					MessageToast.show("Car with ID: " + sID + " has been deleted");
				}.bind(this), function (oError) {

					if (oError.canceled) {
						throw oError.canceled;
					}
				}.bind(this));
			}
		},
	});
});