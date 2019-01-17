angular.module('myForm', [])
  .directive('myEmailValidator', function() {
  return {
    require: '?ngModel',
    link
  };
  function link(scope, element, attrs, ngModelCtrl) {
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@example\.com$/i;
    // 当存在 ng-model 指令并添加了 email 验证时
    if (ngModelCtrl && ngModelCtrl.$validators.email) {
      // 覆盖 AngularJS 的邮箱验证
      ngModelCtrl.$validators.email = function(modelValue) {
        return ngModelCtrl.$isEmpty(modelValue) || EMAIL_REGEXP.test(modelValue);
      };
    }
  }
});
