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
    element.on('click', function(event) {
      let label = event.toElement.dataset.companyName;
      let id = event.toElement.dataset.companyId;
      if(!id) {
        return;
      }
      scope.selectedItem = {
        label,
        id
      };
      scope.$apply();
    });
  }
}]);