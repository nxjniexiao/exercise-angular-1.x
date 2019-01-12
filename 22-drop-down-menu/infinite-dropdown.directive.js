angular.module('myApp').directive('infiniteDropdown', [function() {
  return {
    templateUrl: 'infinite-dropdown.template.html',
    restrict: 'E',
    scope: {
      selectedItem: '=',
      listArray: '<'
    },
    link
  };
  function link(scope, element, attrs) {
    element.on('click', function($event) {
      console.log($event);
      console.log($event.target);
      console.log($event.target.getAttribute("companyId"));
    });
  }
}]);