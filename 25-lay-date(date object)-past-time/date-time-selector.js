angular.module('myApp').directive('dateTimeSelector', [function () {
  return {
    templateUrl: './date-time-selector.template.html',
    scope: {
      time: '=',
      pastTimeDisabled: '<?',
      minTime: '<?',
      maxTime: '<?',
      mode: '@?',
      isSameDay: '<?',
      minutesGradient: '<?',
      increasedMinutes: '<?',
      isDisabled: '<?'
    },
    controller: ['$scope', '$timeout', '$filter', '$interval', controller]
  };

  function controller($scope, $timeout, $filter, $interval) {
    var intervalTimer = null; // 防抖用定时器(修正 input 中的时间不小于当前时间)
    var timer = null; // 防抖用定时器(设置弹窗最大、最小值)
    $scope.dateId = 'date-' + Math.random().toString(36).substr(2);
    $scope.timeId = 'time-' + Math.random().toString(36).substr(2);
    $scope.dateStr = null; // 日期字符串，如'2019-02-25'
    $scope.timeStr = null; // 时间字符串，如'11:30'
    $scope.datePicker = null;
    $scope.timePicker = null;
    $timeout(function () {
      // 日期弹窗
      $scope.datePicker = laydate.render({
        elem: '#' + $scope.dateId, // 指定元素
        eventElem: '#' + $scope.dateId + '-event',
        trigger: 'click',
        type: 'date',
        btns: ['confirm'],
        done: function (value, date, endDate) {
          $scope.dateStr = value;
          $scope.$apply();
        }
      });
      // 时间弹窗
      $scope.timePicker = laydate.render({
        elem: '#' + $scope.timeId, // 指定元素
        eventElem: '#' + $scope.timeId + '-event',
        trigger: 'click',
        type: 'time',
        format: 'HH:mm',
        btns: ['confirm'],
        ready: function (date) {
          // 控件在打开时触发(打开时修改config，弹窗在点击后才会刷新新的配置)
        },
        change: function (value, date, endDate) {
          // 年月日时间被切换时都会触发
        },
        done: function (value, date, endDate) {
          $scope.timeStr = value;
          $scope.$apply();
        }
      });
      limitPicker(); // 设置弹窗的最大、最小值
    });

    // 设置弹窗的最大、最小值
    function limitPicker() {
      if (timer) {
        $timeout.cancel(timer);
      }
      timer = $timeout(function () {
        minimumPicker(); // 设置最小值
        maximumPicker(); // 设置最大值
      }, 20);
    }

    // 设置弹窗的最小值
    function minimumPicker() {
      // 是否能选择过去时间
      var pastTimeDisabled = $scope.pastTimeDisabled;
      // 时间选择框最小值
      var minTime = $scope.minTime;
      // 无最小限制
      if (!pastTimeDisabled && !minTime) {
        return;
      }
      var now = pastTimeDisabled ? new Date() : null;
      if (pastTimeDisabled && minTime) {
        minTime = (minTime - now) ? minTime : now;
      } else {
        minTime = now || minTime;
      }
      // 打开弹窗时，设置时间不小于 minTime
      var limitForTimePicker = calcLimitForTimePicker(minTime, true);
      $scope.datePicker.config.min = getLimitForPicker(minTime);
      $scope.timePicker.config.min = getLimitForPicker(limitForTimePicker);
    }

    // 设置弹窗的最大值
    function maximumPicker() {
      var maxTime = $scope.maxTime;
      if (!maxTime) {
        return;
      }
      // 打开弹窗时，设置时间不大于 maxTime
      var limitForTimePicker = calcLimitForTimePicker(maxTime, false);
      $scope.datePicker.config.max = getLimitForPicker(maxTime);
      $scope.timePicker.config.max = getLimitForPicker(limitForTimePicker);
    }

    // 计算 laydate 最大/最小限制对象 config
    function getLimitForPicker(limitDate) {
      return {
        year: limitDate.getFullYear(),
        month: limitDate.getMonth(),
        date: limitDate.getDate(),
        hours: limitDate.getHours(),
        minutes: limitDate.getMinutes(),
        seconds: 0
      }
    }

    // 计算时间
    function calcNowDateTime() {
      var date = new Date();
      // 按分钟数增加时间
      if ($scope.increasedMinutes) {
        date = addMinutes(date, $scope.increasedMinutes);
      }
      // 根据分钟梯度修正时间
      if ($scope.minutesGradient) {
        date = fixTime(date, $scope.minutesGradient);
      }
      return date;
    }

    // 计算时间选择框的最小值
    // 注：时间选择框默认日期为当天，且无法修改，因此限制时间为当天时才有效
    function calcLimitForTimePicker(time, isMinTime) {
      var defaultTimeStr = isMinTime ? '00:00:00' : '23:59:59';
      var now = new Date();
      var nowDateStr = $filter('date')(now, 'yyyy/MM/dd');
      // 有最小日期时间限制
      var dateStr = $scope.dateStr;
      var limitDateStr = $filter('date')(time, 'yyyy-MM-dd');
      var limitTimeStr = $filter('date')(time, 'HH:mm');
      var timeStr = (dateStr === limitDateStr) ? limitTimeStr : defaultTimeStr;
      return new Date(nowDateStr + ' ' + timeStr);
    }

    // 增加时间
    function addMinutes(date, increasedMinutes) {
      var retDate = new Date(date.getTime() + increasedMinutes * 60 * 1000);
      var dateStr = $filter('date')(date, 'yyyy/MM/dd');
      var retDateStr = $filter('date')(retDate, 'yyyy/MM/dd');
      var isSameDay = $scope.isSameDay;
      if (isSameDay && dateStr !== retDateStr) {
        return new Date(dateStr + ' 23:59'); // 防止时间增加后，变为第二天
      }
      return retDate;
    }

    // 使用分钟梯度向后修正时间
    function fixTime(date, minutesGradient) {
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var divideRes = minutes / minutesGradient;
      minutes = (Math.floor(divideRes) + 1) * minutesGradient;
      var isSameDay = $scope.isSameDay;
      // 防止时间变为第二天
      if (isSameDay && hours === 23 && minutes > 59) {
        date.setMinutes(59);
      }
      date.setMinutes(minutes);
      return date;
    }

    // 字符串转Date对象
    function convertStringToDate(dateStr, timeStr) {
      var dateTimeStr = dateStr + ' ' + timeStr;
      dateTimeStr = dateTimeStr.replace(/-/g, '/');
      return new Date(dateTimeStr);
    }

    // 过去的时间不可选时，自动修正时间
    if ($scope.pastTimeDisabled) {
      // 定时器，修正时间使其不小于当前时间
      intervalTimer = $interval(autoFix, 1000);
      // 取消定时器
      $scope.$on('$destroy', function () {
        $interval.cancel(intervalTimer);
      });
    }

    // 修正选择框中的值不小于当前时间
    function autoFix() {
      var now = new Date();
      var dateStr = $scope.dateStr.replace(/-/g, '/');
      var timeStr = $scope.timeStr;
      var minutesGradient = $scope.minutesGradient;
      var secondsStr = '00';
      var date = new Date(dateStr + ' ' + timeStr + ':' + secondsStr);
      if (date > now) {
        return;
      }
      console.log('fixing...');
      minutesGradient = minutesGradient || 1; // 无分钟梯度时，向后修正1分钟
      now = fixTime(now, minutesGradient);
      $scope.dateStr = $filter('date')(now, 'yyyy-MM-dd');
      $scope.timeStr = $filter('date')(now, 'HH:mm');
      // 坑：直接给 $scope.time 赋值有时会让 angularJS 进入死循环。。
      // $scope.time = now;
      limitPicker(); // 设置弹窗的最大、最小值
    }

    // 初始化日期和时间
    function initDateTime() {
      var time = $scope.time;
      if (!time) {
        var date = calcNowDateTime();
        $scope.dateStr = $filter('date')(date, 'yyyy-MM-dd');
        $scope.timeStr = $filter('date')(date, 'HH:mm');
        return;
      }
      $scope.dateStr = $filter('date')(time, 'yyyy-MM-dd');
      $scope.timeStr = $filter('date')(time, 'HH:mm');
    }

    // 监听 dateStr
    $scope.$watch('dateStr', function () {
      var dateStr = $scope.dateStr;
      var timeStr = $scope.timeStr;
      $scope.time = convertStringToDate(dateStr, timeStr);
      // 修改了日期后，重新设定最大、最小值限制
      limitPicker(); // 设置弹窗的最大、最小值
    });

    // 监听 timeStr
    $scope.$watch('timeStr', function () {
      var dateStr = $scope.dateStr;
      var timeStr = $scope.timeStr;
      $scope.time = convertStringToDate(dateStr, timeStr);
    });

    // 监听 minTime
    $scope.$watch('minTime', function () {
      if (!$scope.minTime) {
        return;
      }
      limitPicker(); // 设置弹窗的最大、最小值
      var time = $scope.time;
      var minTime = $scope.minTime;
      if (time < minTime) {
        $scope.dateStr = $filter('date')(minTime, 'yyyy-MM-dd');
        $scope.timeStr = $filter('date')(minTime, 'HH:mm');
      }
      // dateStr 等于最小日期的 dateStr
      if ($scope.isSameDay && !$scope.maxTime) {
        $scope.dateStr = $filter('date')(minTime, 'yyyy-MM-dd');
      }
    });

    // 监听 maxTime
    $scope.$watch('maxTime', function () {
      if (!$scope.maxTime) {
        return;
      }
      limitPicker(); // 设置弹窗的最大、最小值
      var time = $scope.time;
      var maxTime = $scope.maxTime;
      if (time > maxTime) {
        $scope.dateStr = $filter('date')(maxTime, 'yyyy-MM-dd');
        $scope.timeStr = $filter('date')(maxTime, 'HH:mm');
      }
    });

    // 监听 time
    $scope.$watch('time', function () {
      var time = $scope.time;
      if (!time) {
        return;
      }
      var newDateStr = $filter('date')(time, 'yyyy-MM-dd');
      var newTimeStr = $filter('date')(time, 'HH:mm');
      if ($scope.dateStr !== newDateStr) {
        $scope.dateStr = newDateStr;
      }
      if ($scope.timeStr !== newTimeStr) {
        $scope.timeStr = newTimeStr;
      }
    });

    // 初始化 input 中的日期和时间
    initDateTime();
  }
}]);
