(function(angular) {
  'use strict';
  angular.module('myApp').component('editableField', {
    bindings: {
      fieldValue: '<',
    },
    templateUrl: 'editable-field-template.html',
    controller: EditableFieldController
  });
  function EditableFieldController() {
    this.isEditMode = false;
  }
})(window.angular);
