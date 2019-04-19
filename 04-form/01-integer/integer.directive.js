angular.module('Integer', []).directive('integer', [function () {
  return {
    restrict: 'A',
    require: '?ngModel',
    link: function (scope, element, attrs, ngModelCtrl) {
      if (!ngModelCtrl) {
        return;
      }
      // (Summarize: parsers change how view values will be saved in the model.)
      // ngModelCtrl.$parsers is array of functions to execute, as a pipeline,
      // whenever the control reads value from the DOM.
      ngModelCtrl.$parsers.push(function (value) {
        var validValue = value.replace(/[^0-9]+/g, '');
        // Update the view value.
        ngModelCtrl.$setViewValue(validValue);
        // Called when the view needs to be updated
        ngModelCtrl.$render();
        return validValue;
      });
      element.bind('keypress', function (event) {
        // 防止输入空格
        if (event.keyCode === 32) {
          event.preventDefault();
        }
      });
    }
  };
}]);
