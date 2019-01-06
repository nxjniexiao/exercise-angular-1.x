(function(angular) {
  angular
    .module("templateModule", [])
    .controller("MyController", [
      "$scope",
      function($scope) {
        $scope.customerA = {
          name: "name 1",
          address: "address 1"
        };
        $scope.customerB = {
          name: "name 2",
          address: "address 2"
        };
      }
    ])
    .directive("myCustomerA", function() {
      return {
        template:
          "<div>Name: {{customerA.name}} <br> Address: {{customerA.address}}</div>"
      };
    })
    .directive("myCustomerB", function() {
      return {
        template:
          "<div>Name: {{customerB.name}} <br> Address: {{customerB.address}}</div>"
      };
    });
})(window.angular);
