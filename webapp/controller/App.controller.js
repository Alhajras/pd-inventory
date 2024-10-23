sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
], function (Controller, MessageToast, JSONModel) {
    "use strict";

    return Controller.extend("ui5.walkthrough.controller.App", {
        onInit: function () {
            // Define initial data
            var oData = {
                recipient: {
                    name: "World"
                },
                people: [
                    { name: "John Doe", age: 25 },
                    { name: "Jane Smith", age: 30 },
                    { name: "Bob Johnson", age: 45 }
                ]
            };

            // Create and set JSON model
            var oModel = new JSONModel(oData);
            this.getView().setModel(oModel);
        },

        // Open the dialog to add a new user
        onOpenDialog: function () {
            if (!this._oDialog) {
                this._oDialog = this.byId("userDialog");
            }
            this._oDialog.open();
        },

        // Handle the OK button click on the dialog
        onDialogOk: function () {
            // Get the input values
            var oInputName = this.byId("inputName");
            var oInputAge = this.byId("inputAge");

            var sName = oInputName.getValue();
            var iAge = parseInt(oInputAge.getValue(), 10);

            if (sName && iAge) {
                // Get the model and current data
                var oModel = this.getView().getModel();
                var aPeople = oModel.getProperty("/people");

                // Add the new person to the array
                aPeople.push({ name: sName, age: iAge });

                // Update the model
                oModel.setProperty("/people", aPeople);

                // Close the dialog
                this._oDialog.close();

                // Clear the inputs
                oInputName.setValue("");
                oInputAge.setValue("");
            } else {
                MessageToast.show("Please enter both a name and age.");
            }
        },

        // Handle the Cancel button click on the dialog
        onDialogCancel: function () {
            this._oDialog.close();
        },

        // Reset the dialog inputs when it is closed
        onDialogClose: function () {
            var oInputName = this.byId("inputName");
            var oInputAge = this.byId("inputAge");

            oInputName.setValue("");
            oInputAge.setValue("");
        }
    });
});
