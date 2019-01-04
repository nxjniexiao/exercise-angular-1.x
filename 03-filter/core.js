(function(angular) {
  'use strict';
  angular.module('core', []).filter('reverse', function() {
    return function(input, shouldUppercase) {
      var res = '';
      for (var i = 0, len = input.length; i < len; i++) {
        res = input.charAt(i) + res;
      }
      if (shouldUppercase) {
        return res.toUpperCase();
      }
      return res;
    };
  });
})(window.angular);
