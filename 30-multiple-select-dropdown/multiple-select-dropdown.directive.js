/**
 * 下拉多选框
 * @param {Array} optionsArr 下拉菜单的可选项
 * @param {Array} selectedArr 下拉菜单的已选项
 * @param {Function} [onSelectFn]  更新已选项后调用的函数
 * @param {Object} [config] 其他配置
 * @param {string} [config.keyNameForFilter]  根据已选项判断可选项中被选中项时使用的 key 名称，默认为'id'
 * @param {string} [config.keyNameForTitle]  组成标题的 key 名称，默认为 'label'
 * @param {number} [config.maxTitleLength]  所有已选项组成的标题的最大长度，默认为10
 */
angular.module('myApp').directive('multipleSelectDropdown', ['$timeout', function ($timeout) {
  return {
    templateUrl: 'multiple-select-dropdown.template.html',
    restrict: 'E',
    scope: {
      optionsArr: '=',
      selectedArr: '=',
      onSelectFn: '&',
      config: '<?',
    },
    link
  };

  function link(scope, element, attrs) {
    init(); // 初始化

    function init() {
      var defaultConfig = {
        keyNameForFilter: 'id',
        keyNameForTitle: 'label',
        maxTitleLength: 10
      }; // 默认配置
      scope.config = angular.extend({}, defaultConfig, scope.config);
      scope.onSelectFnWrapper = throttle($timeout, scope.onSelectFn, 500);
      resetOptionsArr();
      refresh();
    }

    // 根据 selectedArr ,把 optionsArr 中相应的项的 selected 设置为 true
    function resetOptionsArr() {
      var optionsArr = scope.optionsArr || [];
      var selectedArr = scope.selectedArr || [];
      var keyName = scope.config.keyNameForFilter;
      var selectedIdsArr = [];
      var item = null;
      for (var i = 0, len = selectedArr.length; i < len; i++) {
        item = selectedArr[i];
        selectedIdsArr.push(item[keyName]);
      }
      for (var j = 0, l = optionsArr.length; j < l; j++) {
        item = optionsArr[j];
        item.selected = selectedIdsArr.indexOf(item[keyName]) > -1;
      }
    }

    // 选择、取消选择所有
    scope.toggleAll = function (event) {
      var optionsArr = scope.optionsArr;
      if (angular.isArray(optionsArr)) {
        optionsArr.forEach(function (item) {
          item.selected = !scope.areAllSelected;
        });
      }
      refresh();
      scope.onSelectFnWrapper();
      event.stopPropagation();
    };

    // 选择、取消选择单个
    scope.toggleSingle = function (event, index) {
      var optionsArr = scope.optionsArr;
      var item = optionsArr[index];
      if (item) {
        item.selected = !item.selected;
      }
      refresh();
      scope.onSelectFnWrapper();
      event.stopPropagation();
    };

    // 刷新
    function refresh() {
      var selectedArr = []; // 已选项
      var areAllSelected = true; // 是否已全选
      var titlesArr = []; // 已选项的 title 数组
      var title; // 标题
      var optionsArr = scope.optionsArr || [];
      for (var i = 0, len = optionsArr.length; i < len; i++) {
        var opt = optionsArr[i];
        if (opt.selected) {
          selectedArr.push(opt);
          titlesArr.push(opt[scope.config.keyNameForTitle])
        } else {
          areAllSelected = false;
        }
      }
      title = titlesArr.join();
      var maxTitleLength = scope.config.maxTitleLength;
      if (title.length > maxTitleLength) {
        title = title.substr(0, maxTitleLength) + '...';
      }
      scope.selectedArr = selectedArr;
      scope.areAllSelected = areAllSelected;
      scope.title = title;
    }

    // 函数节流
    function throttle($timeout, fn, delay) {
      var timerId = null;
      return function () {
        $timeout.cancel(timerId);
        timerId = $timeout(fn, delay);
      }
    }

    scope.$watchCollection('optionsArr', function (newValue, oldValue) {
      resetOptionsArr();
      refresh();
    });

    scope.$watchCollection('selectedArr', function (newValue, oldValue) {
      resetOptionsArr();
      refresh();
    });
  }
}]);
