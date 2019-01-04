(function(angular) {
  'use strict';
  angular.module('myController', ['core']).controller('MyController', [
    'reverseFilter',
    function(reverseFilter) {
      // reverseFilter 为 core 模块中的 reverse。
      this.myInput = 'hello';
      this.filteredInput = reverseFilter(this.myInput, true);
    }
  ]);
})(window.angular);
