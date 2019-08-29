/**
 * 基于 bootstrap-datepicker.js 的 angularjs 组件
 * @param {Object} startDate - 起始时间，Date 对象
 * @param {Object} endDate - 结束时间，Date 对象
 */
angular.module('myApp').directive('bootstrapDatepickerRange', [
  '$timeout',
  function ($timeout) {
    return {
      template:
        '<div ng-attr-id="{{_id}}" class="input-group input-daterange">\n' +
        '    <input type="text" class="form-control" name="start">\n' +
        '    <div class="input-group-addon">至</div>\n' +
        '    <input type="text" class="form-control" name="end">\n' +
        '</div>',
      scope: {
        startDate: '=',
        endDate: '=',
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
          var inputName = e.target.getAttribute('name');
          if (inputName === 'start') {
            if (e.date - scope.startDate !== 0) {
              scope.$apply(scope.startDate = e.date);
            }
          } else {
            if (e.date - scope.endDate !== 0) {
              scope.$apply(scope.endDate = e.date);
            }
          }
        }

        // 自定义 date picker
        function customizeDatepicker() {
          scope.customSettings = {
            format: 'yyyy-mm-dd',
            language: "zh-CN",
            todayHighlight: true,
          };
        }

        // 监听外部修改 startDate
        scope.$watch('startDate', function (newValue) {
          if (!newValue) {
            return;
          }
          // 延迟执行，防止修改 startDate 后插件自动修改 endDate ，从而触发 changeDate 事件
          $timeout(function() {
            $('#' + scope._id + ' input[name=start]')
              .datepicker(scope.customSettings)
              .datepicker('setDate', newValue);
          });
        });

        // 监听外部修改 endDate
        scope.$watch('endDate', function (newValue) {
          if (!newValue) {
            return;
          }
          $('#' + scope._id + ' input[name=end]')
            .datepicker(scope.customSettings)
            .datepicker('setDate', newValue);
        });
      }
    };
  }
]);
