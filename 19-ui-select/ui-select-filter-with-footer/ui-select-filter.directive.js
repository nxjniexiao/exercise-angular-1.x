angular.module('uiSelectFilter', ['ui.select']).directive('uiSelectFilter', ['$filter', function ($filter) {
  return {
    template:
      '<ui-select ng-model="selectedItem" on-select="selectItem($item)" uis-open-close="onOpenClose(isOpen)">\n' +
      '  <ui-select-match>\n' +
      '    <span ng-bind="$select.selected.name"></span>\n' +
      '  </ui-select-match>\n' +
      '  <ui-select-choices repeat="item in optionsArrCopy track by $index"\n' +
      '                     refresh="updateArr($select)"\n' +
      '                     refresh-delay="300">\n' +
      '    <div ng-bind="item.name" title="{{item.name}}"></div>\n' +
      '  </ui-select-choices>\n' +
      '  <ui-select-footer>\n' +
      '    <button\n' +
      '      ng-disabled="!hasMore"\n' +
      '      class="btn btn-xs btn-success"\n' +
      '      style="width: 100%; margin-top: 5px;"\n' +
      '      ng-click="updateArr($select, $event);"\n' +
      '    >\n' +
      '      显示更多\n' +
      '    </button>\n' +
      '  </ui-select-footer>\n' +
      '</ui-select>'
    ,
    scope: {
      optionsArr: '=',
      selectedItem: '=',
      keyNameForSearching: '@',
      onSelect: '&'
    },
    link: link
  };

  function link(scope, element, attr) {
    scope.displayedNumber = 10;
    scope.optionsArrCopy = scope.optionsArr.slice(0, scope.displayedNumber);
    scope.keyNameForSearching = scope.keyNameForSearching || 'name';
    scope.hasMore = true;

    scope.updateArr = function (select, event) {
      var keyWords = select.search;
      var filteredArr = $filter('filter')(scope.optionsArr, {[scope.keyNameForSearching]: keyWords});
      if (event) {
        var displayedNumber = scope.displayedNumber;
        if (displayedNumber < filteredArr.length) {
          scope.displayedNumber = displayedNumber + 10;
        }
        event.stopPropagation();
      }
      scope.hasMore = scope.displayedNumber < filteredArr.length;
      scope.optionsArrCopy = filteredArr.slice(0, scope.displayedNumber);
    };

    scope.selectItem = function (item) {
      scope.selectedItem = item;
      scope.onSelect({item: item});
    };

    scope.onOpenClose = function(isOpen) {
      if(!isOpen) {
        scope.displayedNumber = 10;
      }
    }
  }
}]);
