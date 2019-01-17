angular.module('myForm', [])
  .directive('integer', function() {
    return {
      require: 'ngModel',
      link
    };
    function link(scope, element, attrs, ngModelCtrl) {
      ngModelCtrl.$validators.integer = function(modelValue, viewValue) {
        const integerReg = /^-?\d+$/;
        if (ngModelCtrl.$isEmpty(modelValue)) {
          // 考虑控件中的值为空
          return true;
        }
        // viewValue 为字符串
        return integerReg.test(viewValue);
      }
    }
  }).directive('validName', ['$q', '$timeout', function($q, $timeout) {
    return {
      require: 'ngModel',
      link
    };
    function link(scope, element, attrs, ngModelCtrl) {
      let existNamesArray = ['Jim', 'John', 'Jill', 'Jack'];
      // 异步验证，如向后端发送请求
      ngModelCtrl.$asyncValidators.validName = function(modelValue, viewValue) {
        if(ngModelCtrl.$isEmpty(modelValue)) {
          // 考虑控件中的值为空
          return $q.resolve();
        }
        // 构造一个新的 deferred 实例。
        let def = $q.defer();
        $timeout(function() {
          if(existNamesArray.indexOf(modelValue) === -1) {
            // resolve(value): 把 def.promise 设为 resolved 状态
            def.resolve();
          } else {
            // reject(reason): 把 def.promise 设为 rejected 状态
            def.reject();
          }
        }, 2000);
        // 与此 deferred 相关联的 promise
        return def.promise;
      }
    }
}]);
