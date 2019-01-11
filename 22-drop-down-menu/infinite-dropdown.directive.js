angular.module('myApp').directive('infiniteDropdown', [function() {
  return {
    templateUrl: 'infinite-dropdown.template.html',
    restrict: 'E',
    scope: {
      listArray: '<'
    },
    controller: [dropdownController],
    link
  };
  function link(scope, element, attrs) {
    element.on('click', function(e) {
      console.log(e);
    });
  }
  function dropdownController() {
    //
  }
}]);
