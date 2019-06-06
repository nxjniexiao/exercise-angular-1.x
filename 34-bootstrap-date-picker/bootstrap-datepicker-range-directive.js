/**
 * 基于 bootstrap-datepicker.js 的 angularjs 组件
 * @param {Object} date - 时间，Date 对象
 * @param {Object} [config] - 配置对象。
 * @param {string} [config.iconClass] - input 框后面图标字体的 class 名。
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
              scope.startDate = e.date;
              scope.$apply();
            }
          } else {
            if (e.date - scope.endDate !== 0) {
              scope.endDate = e.date;
              scope.$apply();
            }
          }
        }

        // 自定义 date picker
        function customizeDatepicker() {
          scope.customSettings = {
            format: 'yyyy-mm-dd',
            language: "zh-CN",
            inputs: $('#' + scope._id + ' input'),
            // todayHighlight: true,
            // autoclose: true,
          };
        }

        // 监听外部修改date
        scope.$watch('startDate', function (newValue) {
          if (!newValue) {
            return;
          }
          console.log($.fn.datepicker.defaults);
          // $('#' + scope._id + ' input[name="start"]')
          //   .datepicker(scope.customSettings)
          //   .datepicker('setDate', newValue);
        });
        scope.$watch('endDate', function (newValue) {
          if (!newValue) {
            return;
          }
          console.log($('#' + scope._id).datepicker());
          // $('#' + scope._id + ' input[name="end"]')
          //   .datepicker(scope.customSettings)
          //   .datepicker('setDate', newValue);
        });
      }
    };
  }
]);
