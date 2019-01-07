(function(angular){
  'use strict';
  angular.module('core', []);
  angular.module('core').factory('finance', function() {
    var usdToForiginRates = {
      USD: 1,
      CNY: 6.09,
      EUS: 0.74
    };
    return {
      types: ['USD', 'CNY', 'EUS'],
      convert: function(money, fromType, toType) {
        var rateFrom = usdToForiginRates[fromType];
        var rateTo = usdToForiginRates[toType];
        return (money*rateTo/rateFrom).toFixed(1);
      }
    };
  });
  angular.module('core').filter('checkMoneyName', function() {
    return function(type) {
      var res = {
        USD: '美元',
        CNY: '人民币',
        EUS: '欧元'
      };
      return res[type] || type;
    }
  });
})(window.angular);
