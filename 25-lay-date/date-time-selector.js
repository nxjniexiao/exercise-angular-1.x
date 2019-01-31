angular.module('myApp').directive('dateTimeSelector',[function() {
  return {
    templateUrl: './date-time-selector.template.html',
    scope: {
      date: '=',
      time: '=',
      minDate: '<?',
      minTime: '<?'
    },
    controller: ['$scope', '$timeout', '$filter', controller]
  };
  function controller($scope, $timeout, $filter) {
    $scope.dateId = 'date-' + Math.random().toString(36).substr(2);
    $scope.timeId = 'time-' + Math.random().toString(36).substr(2);
    $scope.datePicker = null;
    $scope.timePicker = null;
    $scope.timeLimit = '12:30:00';
    $timeout(function() {
      // 日期弹窗
      $scope.datePicker = laydate.render({
        elem: '#' + $scope.dateId, //指定元素
        min: 'nowTime',
        type: 'date',
        done: function (value, date, endDate) {
          $scope.date = value;
          $scope.$apply();
        }
      });
      // 时间弹窗
      $scope.timePicker = laydate.render({
        elem: '#' + $scope.timeId, //指定元素
        type: 'time',
        format: 'HH:mm',
        ready: function(date) {
          // 打开弹窗时，限制小于当前时间的的选项
          var now = new Date();
          var date = now;
          var minTime = $scope.minTime;
          if(minTime) {
            var nowArr = $filter('date')(now, 'yyyy/MM/dd HH:mm:ss').split(' ');
            nowArr.splice(1, 1, minTime + ':00');
            var minDate = new Date (nowArr.join(' '));
            date = now > minDate ? now : minDate;
          }
          $scope.timePicker.config.min = {
            year: date.getFullYear(),
            month: date.getMonth(),
            date: date.getDate(),
            hours: date.getHours(),
            minutes: date.getMinutes(),
            seconds: 0
          };
        },
        change: function(value, date, endDate) {
          var minTime = $scope.minTime;
          if(minTime) {
            var timeNum = Number(value.replace(':', '.'));
            var minTimeNum = Number(minTime.replace(':', '.'));
            if(timeNum < minTimeNum) {
              console.log('会议结束时间不能小于开始时间！');
            }
          }
        },
        done: function(value, date, endDate) {
          $scope.time = value;
          $scope.$apply();
        }
      });
    });
    // 字符串转Date对象
    $scope.convertStringToDate = function(dateStr, timeStr) {
      var dateTimeStr = dateStr + ' ' + timeStr;
      dateTimeStr = dateTimeStr.replace(/-/g, '/');
      return new Date(dateTimeStr);
    };
    // 当前时间是否满足最小要求
    $scope.isDateTimeAvailable = function() {
      var newDateTime = $scope.convertStringToDate($scope.date, $scope.time);
      var minDateTime = $scope.convertStringToDate($scope.minDate, $scope.minTime);
      if(newDateTime < minDateTime) {
        return false;
      }
      return true;
    };
    $scope.$watchGroup(['minDate', 'minTime'], function(newValue, oldValue) {
      if(newValue === oldValue) {
        return;
      }
      $scope.date = $scope.minDate;
      if (!$scope.isDateTimeAvailable()) {
        $scope.time = $scope.minTime;
      }
    });
  }
}]);