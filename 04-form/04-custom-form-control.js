angular.module('myForm', []).directive('editable',function() {
  return {
    require: 'ngModel',
    link
  };
  function link(scope, element, attrs, ngModelCtrl) {
    // view -> model
    element.on('blur', function() {
      // 每当用户与控件交互时，模型都需要更新，通常在 DOM 事件侦听器中完成。
      ngModelCtrl.$setViewValue(element.html())
    });
    // model -> view (可以省略，原因未知)
    // 在视图需要更新时调用，ng-model指令的用户将实现此方法。
    ngModelCtrl.$render = function() {
      element.html(ngModelCtrl.$viewValue);
    };
    // 用 DOM 中的值初始化 model 中的值(content)
    ngModelCtrl.$setViewValue(element.html());
  }
});
