sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/m/MessageToast"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("com.test.employee.controller.Root", {
      onInit: function () {
        let oModel = this.getOwnerComponent().getModel();
        console.log(oModel);
      },

      onSelectEmployee: function (oEvent) {
        // Getting the Selected Item context
        const oPath = oEvent
            .getSource()
            .getSelectedItem()
            .getBindingContext().sPath,
          oView = this.getView(),
          oForm = oView.byId("idEmployeeForm");
        // Binding the Selected Item.
        oForm.bindElement({
          path: oPath,
          parameters: {
            expand: "",
          },
        });

        // var sEmployeeID = oEvent.getSource().getSelectedItem().mAggregations.cells[0].mProperties.text;
        this.getView().byId("idEmployeeAddBtn").setVisible(false);
        this.getView().byId("idEmployeeDeleteBtn").setVisible(true);
        this.getView().byId("idEmployeeUpdateBtn").setVisible(true);
        //  this.onDeleteEmployeeApplication(oPath);
      },

      onAddEmployeeApplication: function () {
        let sName = this.getView()
          .byId("idEmployeeStaffUserNameInput")
          .getValue();
        let sPhone = this.getView()
          .byId("idEmployeePhoneNumberInput")
          .getValue();
        let sGender = this.getView().byId("idEmployeeGenderInput").getValue();
        let sAge = this.getView().byId("idEmployeeAgeInput").getValue();
        let sAddressLine = this.getView()
          .byId("idEmployeeAddressLineInput")
          .getValue();
        let sPincode = this.getView().byId("idEmployeePincodeInput").getValue();
        let sDepartment = this.getView()
          .byId("idEmployeeDepartmentInput")
          .getSelectedItem()
          .getKey();

        let oModel = this.getView().getModel();

        const oPayload = {
          ID: crypto.randomUUID(),
          Name: sName,
          Age: parseInt(sAge),
          Gender: sGender,
          Phone: parseInt(sPhone),
          Department_ID: sDepartment,
        };
        const oAddressPayload = {
          ID: crypto.randomUUID(),
          AddressLine: sAddressLine,
          Pincode: parseInt(sPincode),
          Employee_ID: oPayload.ID,
        };

        /**
         * oModel to create a new employee
         */
        oModel.create("/Employee", oPayload, {
          success: () => {
            // MessageToast.show(` Employee Sucessfully Added`);
          },
          error: (oErrorData) => {
            MessageToast.show(` Error Occured : ${oErrorData}`);
          },
        });
        /**
         * oModel to add address to new employee Added
         */
        oModel.create("/Address", oAddressPayload, {
          success: () => {
            MessageToast.show(` Employee Sucessfully Added`);
          },
          error: (oErrorData) => {
            MessageToast.show(` Error Occured : ${oErrorData}`);
          },
        });

        // $.ajax({
        //   url: "http://localhost:4004/Employee/Employee",
        //   type: "POST",
        //   dataType: "json",
        //   contentType: "application/json; charset=utf-8",
        //   data: JSON.stringify({
        //     ID: crypto.randomUUID(),
        //     Name: sName,
        //     Age: parseInt(sAge),
        //     Gender: sGender,
        //     Phone: parseInt(sPhone),
        //     Department_ID: sDepartment,
        //   }),
        //   success: function (result) {
        //     MessageToast.show(`${sName} Employee Sucessfully Added`);
        //   },
        //   error: function (err) {
        //     MessageToast.show(err.responseText);
        //   },
        // });
      },

      onDeleteEmployeeApplication: function () {
        let oView = this.getView(),
          oForm = oView.byId("idEmployeeForm");

        const sEmployeePath = oForm.mObjectBindingInfos.undefined.path;

        let oModel = this.getView().getModel();

        oModel.remove(sEmployeePath, {
          success: () => {
            MessageToast.show(`Employee Sucessfully Removed`);
          },
          error: (oErrorData) => {
            MessageToast.show(` Error Occured : ${oErrorData}`);
          },
        });

        // $.ajax({
        //   url: `http://localhost:4004/Employee${sEmployeePath}`,
        //   type: "DELETE",
        //   success: function (result) {
        //     MessageToast.show(`Employee Sucessfully Deleted`);
        //   },
        //   error: function (err) {
        //     MessageToast.show(err.responseText);
        //   },
        // });
      },

      onUpdateEmployeeApplication: function () {
        let oView = this.getView(),
          oForm = oView.byId("idEmployeeForm");
        let sName = this.getView()
          .byId("idEmployeeStaffUserNameInput")
          .getValue();
        let sPhone = this.getView()
          .byId("idEmployeePhoneNumberInput")
          .getValue();
        let sGender = this.getView().byId("idEmployeeGenderInput").getValue();
        let sAge = this.getView().byId("idEmployeeAgeInput").getValue();
        let sAddressLine = this.getView()
          .byId("idEmployeeAddressLineInput")
          .getValue();
        let sPincode = this.getView().byId("idEmployeePincodeInput").getValue();
        let sDepartment = this.getView()
          .byId("idEmployeeDepartmentInput")
          .getSelectedItem()
          .getKey();

        let oModel = this.getView().getModel();

        const sEmployeePath = oForm.mObjectBindingInfos.undefined.path,
        sEmployeeID = sEmployeePath.split(')')[0].split('\'')[1]

        const oEmployeePayload = {
          Age: parseInt(sAge),
          Phone: parseInt(sPhone),
          Department_ID: sDepartment,
        };
        const oAddressPayload = {
          ID: crypto.randomUUID(),
          AddressLine: sAddressLine,
          Pincode: parseInt(sPincode),
          Employee_ID: sEmployeeID,
        };

        /**
         * oModel to update a employee
         */
        oModel.update(sEmployeePath, oEmployeePayload, {
          success: () => {
            MessageToast.show(` Employee Sucessfully Updated`);
          },
          error: (oErrorData) => {
            MessageToast.show(` Error Occured : ${oErrorData}`);
          },
        });
        /**
         * oModel to add address to new employee Added
         */
        oModel.create("/Address", oAddressPayload, {
          success: () => {
            // MessageToast.show(` Address Sucessfully Added`);
          },
          error: (oErrorData) => {
            MessageToast.show(` Error Occured : ${oErrorData}`);
          },
        });
      },
    });
  }
);
