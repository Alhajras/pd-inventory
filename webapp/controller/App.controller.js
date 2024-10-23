sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/library",
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
                    {
                        notes: 'Buy it now',
                        name: "John Doe",
                        link: 'https://www.youtube.com/watch?v=5YAaeOonFRI&ab_channel=Money%26Macro',
                        quantity: 6,
                        price: '5.0$'
                    },
                    {
                        notes: 'Buy it tomorrow',
                        name: "Jane Smith",
                        link: 'https://www.youtube.com/watch?v=5YAaeOonFRI&ab_channel=Money%26Macro',
                        quantity: 6,
                        price: '5.0$'
                    }]
            };

            // Create and set JSON model
            var oModel = new JSONModel(oData);
            this.getView().setModel(oModel);
        },

        onOpenDialog: function () {
            this.dialog = this.byId("userDialog");
            this.dialog.open();
        },

        // Handle the "Add" button press inside the dialog
        onAddUser: function () {
            const oModel = this.getView().getModel();
            const users = oModel.getProperty("/people");

            // Get references to the input fields
            const nameInput = this.byId("nameInput");
            const quantityInput = this.byId("quantity");
            const linkInput = this.byId("link");
            const priceInput = this.byId("price");
            const notesInput = this.byId("notes");

            const name = nameInput.getValue();
            const quantity = quantityInput.getValue();
            const link = linkInput.getValue();
            const price = priceInput.getValue();
            const notes = notesInput.getValue();

            // Perform validation
            let isValid = true;

            if (!name) {
                nameInput.setValueState(ValueState.Error);
                nameInput.setValueStateText("Name cannot be empty");
                isValid = false;
            }

            if (!link) {
                linkInput.setValueState(ValueState.Error);
                linkInput.setValueStateText("Link cannot be empty");
                isValid = false;
            }

            if (!quantity || isNaN(Number(quantity)) || Number(quantity) <= 0) {
                quantityInput.setValueState(ValueState.Error);
                quantityInput.setValueStateText("Please enter a valid quantity greater than 0");
                isValid = false;
            }

            if (!price || isNaN(Number(price)) || Number(price) <= 0) {
                priceInput.setValueState(ValueState.Error);
                priceInput.setValueStateText("Please enter a valid price greater than 0");
                isValid = false;
            }

            // If inputs are valid, add the user and close the dialog
            if (isValid) {
                users.push({name, notes, link, price: parseInt(price, 10), age: parseInt(quantity, 10)});
                oModel.setProperty("/users", users);
                MessageToast.show("User added successfully");

                // Close the dialog
                this.dialog.close();
            } else {
                MessageToast.show("Please fix the errors before adding the user.");
            }
        },

        // Handle the "Cancel" button press inside the dialog
        onCancel: function () {
            this.dialog.close();
        },

        // Handle dialog close event
        onDialogClose: function () {
            // Clear the inputs when the dialog is closed
            this.byId("nameInput").setValue("");
            this.byId("quantity").setValue("");
            this.byId("link").setValue("");
            this.byId("price").setValue("");
            this.byId("notes").setValue("");
        }
    });
});
