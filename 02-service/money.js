(function(angular) {
  'use strict';
  angular.module('money', ['core']).controller('Money', ['finance', function(finance) {
    this.moneyInput = 0;
    this.fromType = "CNY";
    this.types = finance.types;
    this.convert = finance.convert;
    this.calcMoney = function(toType) {
      return this.convert(this.moneyInput, this.fromType, toType);
    }
  }]);
})(window.angular);
