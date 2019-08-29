/**
 * 基于 bootstrap-datepicker.js 的 angularjs 组件
 * @param {Object} date - 时间，Date 对象
 * @param {Object} [config] - 配置对象。
 * @param {string} [config.iconClass] - input 框后面图标字体的 class 名。
 */
angular.module('myApp').directive('bootstrapDatepicker', [
  '$timeout',
  function ($timeout) {
    return {
      template:
        '<div ng-attr-id="{{_id}}" class="input-group date">\n' +
        '  <input type="text" class="form-control">\n' +
        '  <div ng-if="config.icon" class="input-group-addon">\n' +
        '    <span class="{{config.icon}}"></span>\n' +
        '  </div>\n' +
        '</div>\n',
      scope: {
        date: '=',
        config: '=?',
      },
      link: function (scope, element, attrs) {
        scope._id = 'picker-' + Math.random().toString(36).substr(2);
        customizeDatepicker();
        $timeout(function () {
          $('#' + scope._id)
            .datepicker(scope.customSettings)
            .on('changeDate', onChange)
            .on('hide', onChange);
        });

        // changeDate/hide 事件的回调函数
        function onChange(e) {
          if (e.date - scope.date !== 0) {
            scope.$apply(scope.date = e.date);
          }
        }

        // 自定义 date picker
        function customizeDatepicker() {
          scope.customSettings = {
            format: 'yyyy-mm-dd',
            language: "zh-CN",
            todayHighlight: true,
            autoclose: true,
            startDate: new Date(),
          };
        }

        // 监听外部修改date
        scope.$watch('date', function (newValue) {
          if (!newValue) {
            return;
          }
          $('#' + scope._id)
            .datepicker(scope.customSettings)
            .datepicker('setDate', newValue);
        });
      }
    };
  }
]);
