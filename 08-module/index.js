(function (angular) {
  angular.module('myApp', ['myApp.server', 'myApp.directive', 'myApp.filter']);
  angular.module('myApp')
    // greeter 和 user 来自于 myApp.server
    .controller('MyAppController', ['$scope', 'greeter', 'user', function($scope, greeter, user) {
      $scope.message = greeter.get(user.name);
    }])
    // 注入所有模块后执行
    .run(function(greeter, user) {
      greeter.localize('欢迎');
      user.set('Nie Xiaojun');
    });
})(window.angular);
// 官方建议模块划分:
// 1. A module for each feature
//    一个特征一个模块
// 2. A module for each reusable component (especially directives and filters)
//    一个可复用组件一个模块(特别是指令和筛选)
// 3. And an application level module which depends on the above modules and contains any initialization code.
//    依赖于上述模块并包含任何初始化代码的应用程序级模块
