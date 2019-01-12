angular.module('myApp').directive('infiniteDropdownSubmenu', [function() {
  return {
    templateUrl: 'infinite-dropdown-submenu.template.html',
    restrict: 'E',
    scope: {
      listArray: '<'
    }
  };
}]);
