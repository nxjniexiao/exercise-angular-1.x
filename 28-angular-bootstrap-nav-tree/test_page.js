(function() {
  var app, deps;

  deps = ['angularBootstrapNavTree'];

  if (angular.version.full.indexOf("1.2") >= 0) {
    deps.push('ngAnimate');
  }

  app = angular.module('AbnTest', deps);

  app.controller('AbnTestController', function($scope, $timeout) {
    var apple_selected, tree, treedata_avm, treedata_geography;
    $scope.selected = {};
    $scope.selectedlabels = '';
    $scope.my_tree_handler = function(branch, event) {
      console.log(branch);
      console.log(event);
      var classes, isCheckBoxIcon, isTreeIcon, areAllChecked, areAllChildrenChecked;
      classes = event.target.getAttribute('class');
      isCheckBoxIcon = /check-box/.test(classes);
      isTreeIcon = /tree-icon/.test(classes);
      if (!isCheckBoxIcon && !isTreeIcon) {
        branch.checked = !branch.checked;
        handleBranch(branch);
      }
      if (isCheckBoxIcon) {
        areAllChildrenChecked = branch.children.every(function(item) {
          return item.checked;
        });
        areAllChecked = areAllChildrenChecked && branch.checked;
        branch.checked = !areAllChecked;
        handleBranchAndItsDescendant(branch, areAllChecked);
      }
      getSelectedLabels();
      function handleBranch(branch) {
        var checked = branch.checked;
        if (checked) {
          $scope.selected[branch.uid] = branch;
        } else {
          if ($scope.selected.hasOwnProperty(branch.uid)) {
            delete $scope.selected[branch.uid];
          }
        }
      }
      function handleBranchAndItsDescendant(branch, areAllChecked) {
        branch.checked = !areAllChecked;
        handleBranch(branch);
        var children = branch.children;
        if (children && children.length > 0) {
          children.forEach(function (item) {
            item.checked = !areAllChecked;
            handleBranchAndItsDescendant(item, areAllChecked);
          });
        }
      }
      function getSelectedLabels() {
        var arr = [];
        for(var key in $scope.selected) {
          arr.push($scope.selected[key].label);
        }
        $scope.selectedlabels = arr.join(',');
      }
    };
    apple_selected = function(branch) {
      return $scope.output = "APPLE! : " + branch.label;
    };
    treedata_avm = [
      {
        label: 'Animal',
        children: [
          {
            label: 'Dog',
            data: {
              description: "man's best friend"
            }
          }, {
            label: 'Cat',
            data: {
              description: "Felis catus"
            }
          }, {
            label: 'Hippopotamus',
            data: {
              description: "hungry, hungry"
            }
          }, {
            label: 'Chicken',
            children: ['White Leghorn', 'Rhode Island Red', 'Jersey Giant']
          }
        ]
      }, {
        label: 'Vegetable',
        data: {
          definition: "A plant or part of a plant used as food, typically as accompaniment to meat or fish, such as a cabbage, potato, carrot, or bean.",
          data_can_contain_anything: true
        },
        onSelect: function(branch) {
          return $scope.output = "Vegetable: " + branch.data.definition;
        },
        children: [
          {
            label: 'Oranges'
          }, {
            label: 'Apples',
            children: [
              {
                label: 'Granny Smith',
                onSelect: apple_selected
              }, {
                label: 'Red Delicous',
                onSelect: apple_selected
              }, {
                label: 'Fuji',
                onSelect: apple_selected
              }
            ]
          }
        ]
      }, {
        label: 'Mineral',
        children: [
          {
            label: 'Rock',
            children: ['Igneous', 'Sedimentary', 'Metamorphic']
          }, {
            label: 'Metal',
            children: ['Aluminum', 'Steel', 'Copper']
          }, {
            label: 'Plastic',
            children: [
              {
                label: 'Thermoplastic',
                children: ['polyethylene', 'polypropylene', 'polystyrene', ' polyvinyl chloride']
              }, {
                label: 'Thermosetting Polymer',
                children: ['polyester', 'polyurethane', 'vulcanized rubber', 'bakelite', 'urea-formaldehyde']
              }
            ]
          }
        ]
      }
    ];
    treedata_geography = [
      {
        label: 'Root node',
        id: 1,
        children: [
          {
            label: 'Child node 1',
            id: 11,
            children: [
              {label: 'Child node 1-1', id: 111},
              {label: 'Child node 1-2', id: 112},
              {label: 'Child node 1-3', id: 113},
              {label: 'Child node 1-4', id: 114},
            ]
          },
          {label: 'Child node 2', id: 12},
          {label: 'Child node 3', id: 13}
        ]
      },
      {
        label: 'Root node 2',
        id: 2,
        children: []
      }
    ];
    $scope.my_data = treedata_geography;
    $scope.try_changing_the_tree_data = function() {
      if ($scope.my_data === treedata_avm) {
        return $scope.my_data = treedata_geography;
      } else {
        return $scope.my_data = treedata_avm;
      }
    };
    $scope.my_tree = tree = {};
    $scope.try_async_load = function() {
      $scope.my_data = [];
      $scope.doing_async = true;
      return $timeout(function() {
        if (Math.random() < 0.5) {
          $scope.my_data = treedata_avm;
        } else {
          $scope.my_data = treedata_geography;
        }
        $scope.doing_async = false;
        return tree.expand_all();
      }, 1000);
    };
    return $scope.try_adding_a_branch = function() {
      var b;
      b = tree.get_selected_branch();
      return tree.add_branch(b, {
        label: 'New Branch',
        data: {
          something: 42,
          "else": 43
        }
      });
    };
  });

}).call(this);
