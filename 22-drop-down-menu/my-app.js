(function(angular) {
  angular.module("myApp", []).controller("myController", [
    "$scope",
    function($scope) {
      $scope.companiesArray = [
        {
          label: 'Root node',
          value: 1,
          children: [
            {
              label: 'Child node 1',
              value: 11,
              children: [
                {label: 'Child node 1-1', value: 111},
                {label: 'Child node 1-2', value: 112},
                {label: 'Child node 1-3', value: 113},
                {label: 'Child node 1-4', value: 114},
              ]
            },
            {label: 'Child node 2', value: 12},
            {label: 'Child node 3', value: 13}
          ]
        },
        {
          label: 'Root node 2',
          value: 2,
        }
      ];
      $scope.selectedCompany = {
        value: 2,
        label: "Root node 2"
      };
    }
  ]);
})(window.angular);
