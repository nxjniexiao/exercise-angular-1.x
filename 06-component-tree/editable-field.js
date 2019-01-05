(function(angular) {
  'use strict';
  angular.module('myApp').component('editableField', {
    bindings: {
      // = 为双向绑定。
      fieldValue: '=',
      // @ 多用于传入字符串，特别是不变的字符串，
      // 如 fieldType 表示 input 的类型，如 'text'。
      // ? 表示此绑定的属性为可选。
      fieldType: '@?',
    },
    templateUrl: 'editable-field-template.html',
    controller: EditableFieldController
  });
  function EditableFieldController() {
    // 初始化(重点)
    this.$onInit = function() {
      // 如果没指定 fieldType，则设定 fieldType 为 'text'
      if(!this.fieldType) {
        this.fieldType = 'text';
      }
    };
  }
})(window.angular);
