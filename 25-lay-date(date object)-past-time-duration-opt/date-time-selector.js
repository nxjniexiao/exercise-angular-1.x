/**
 * 基于layDate的日期和时间分开选择的组件。
 * @param {Object} time - 时间，Date 对象
 * @param {Object} [minTime] - 最小时间，Date 对象。
 * @param {Object} [maxTime] - 最大时间，Date 对象。
 * @param {Object} [config] - 配置对象。
 * @param {boolean} [config.shouldInitialize] - 初始 time 为空时，是否初始化，默认为 true。
 * @param {boolean} [config.pastTimeDisabled] - 是否禁用过去的时间，优先级比minTime/maxTime的低，默认为 false。
 * @param {string} [config.mode] - 为'date' 时，只显示日期选择框，为'time' 时，只显示时间选择框。
 * @param {number} [config.minutesGradient] - 分钟梯度，用于修正默认时间。如传入的梯度为5，当前时间为08:02，则默认时间将为08:05。
 * @param {number} [config.increasedMinutes] - 增加的分钟数，用于修正默认时间。如传入60，当前时间为08:02，则默认时间将为09:02。
 * @param {boolean} [config.isDisabled] - 是否禁用选择功能，默认为 false。
 * @param {boolean} [config.hasClearBtn] - 是否有清除按钮，默认为 false。
 * @param {number} [config.minDuration] - 最小时间段(分钟数)，配合 minTime 或 maxTime 使用。
 * @param {number} [config.maxDuration] - 最大时间段(分钟数)，配合 minTime 或 maxTime 使用。
 * */
angular.module('myApp').directive('dateTimeSelector', [
  '$timeout',
  '$filter',
  '$interval',
  function($timeout, $filter, $interval) {
    return {
      templateUrl: './date-time-selector.template.html',
      scope: {
        time: '=',
        minTime: '<?',
        maxTime: '<?',
        config: '<?'
      },
      link: link
    };

    function link(scope, element, attrs) {
      var intervalTimer = null; // 防抖用定时器(修正 input 中的时间不小于当前时间)
      var timer = null; // 防抖用定时器(设置弹窗最大、最小值)
      var watchTimeIgnored = false; // 不触发对 scope.time 的监听
      scope.dateId =
        'date-' +
        Math.random()
          .toString(36)
          .substr(2);
      scope.timeId =
        'time-' +
        Math.random()
          .toString(36)
          .substr(2);
      scope.dateStr = null; // 日期字符串，如'2019-02-25'
      scope.timeStr = null; // 时间字符串，如'11:30'
      scope.datePicker = null;
      scope.timePicker = null;
      var btns = scope.config.hasClearBtn ? ['clear', 'confirm'] : ['confirm'];
      // 弹窗初始最小值
      var INITIAL_MIN = {
        year: 1900,
        month: 0,
        date: 1,
        hours: 0,
        minutes: 0,
        seconds: 0
      };
      // 弹窗初始最大值
      var INITIAL_MAX = {
        year: 2099,
        month: 11,
        date: 31,
        hours: 0,
        minutes: 0,
        seconds: 0
      };
      $timeout(function() {
        // 日期弹窗
        scope.datePicker = laydate.render({
          elem: '#' + scope.dateId, // 指定元素
          eventElem: '#' + scope.dateId + '-event',
          trigger: 'click',
          type: 'date',
          btns: btns,
          done: function(value, date, endDate) {
            scope.selectDateTime('dateStr', value);
          }
        });
        // 时间弹窗
        scope.timePicker = laydate.render({
          elem: '#' + scope.timeId, // 指定元素
          eventElem: '#' + scope.timeId + '-event',
          trigger: 'click',
          type: 'time',
          format: 'HH:mm',
          btns: [],
          minutesGradient: scope.config.minutesGradient,
          ready: function(date) {
            // 控件在打开时触发(打开时修改config，弹窗在点击后才会刷新新的配置)
          },
          change: function(value, date, endDate) {
            // 年月日时间被切换时都会触发
            scope.selectDateTime('timeStr', value);
          },
          done: function(value, date, endDate) {
            // 点击确定后触发
          }
        });
        limitPicker(); // 设置弹窗的最大、最小值
      });

      scope.styleWidth100 = {
        float: 'left',
        width: '100%'
      };

      scope.styleWidth50Left = {
        float: 'left',
        width: '50%',
        'padding-right': '5px'
      };

      scope.styleWidth50Right = {
        float: 'left',
        width: '50%',
        'padding-left': '5px'
      };

      // 设置弹窗的最大、最小值
      function limitPicker() {
        scope.minTimeForPicker = getMinTime();
        scope.maxTimeForPicker = getMaxTime();
        if (timer) {
          $timeout.cancel(timer);
        }
        timer = $timeout(function() {
          minimumPicker(scope.minTimeForPicker); // 设置最小值
          maximumPicker(scope.maxTimeForPicker); // 设置最大值
        }, 20);
      }

      // 获取最小时间
      function getMinTime() {
        // 时间选择框最小/大值
        var minTime = scope.minTime;
        var maxTime = scope.maxTime;
        // 最小/大时间段
        var minDuration = scope.config.minDuration;
        var maxDuration = scope.config.maxDuration;
        // 是否能选择过去时间
        var pastTimeDisabled = scope.config.pastTimeDisabled;
        // 1.有最小值
        if (minTime) {
          return addOrMinusMinutes(minTime, minDuration);
        }
        // 2.最小时间：最大值 - 最大时间段
        if (maxTime && maxDuration) {
          return addOrMinusMinutes(maxTime, -maxDuration);
        }
        // 3.过去时间不可用
        if (pastTimeDisabled) {
          return fixTime(new Date(), scope.config.minutesGradient);
        }
        return null;
      }

      // 获取最大时间
      function getMaxTime() {
        // 时间选择框最小/大值
        var minTime = scope.minTime;
        var maxTime = scope.maxTime;
        // 最小/大时间段
        var minDuration = scope.config.minDuration;
        var maxDuration = scope.config.maxDuration;
        // 1.有最大值
        if (maxTime) {
          return addOrMinusMinutes(maxTime, -minDuration);
        }
        // 2.最大时间：最小值 + 最大时间段
        if (minTime && maxDuration) {
          return addOrMinusMinutes(minTime, maxDuration);
        }
        return null;
      }

      // 设置弹窗的最小值
      function minimumPicker(minTime) {
        if (!minTime) {
          scope.datePicker.config.min = INITIAL_MIN;
          scope.timePicker.config.min = INITIAL_MIN;
          return;
        }
        // 打开弹窗时，设置时间不小于 minTime
        var limitForTimePicker = calcLimitForTimePicker(minTime, true);
        scope.datePicker.config.min = getLimitForPicker(minTime);
        scope.timePicker.config.min = getLimitForPicker(limitForTimePicker);
      }

      // 设置弹窗的最大值
      function maximumPicker(maxTime) {
        if (!maxTime) {
          scope.datePicker.config.max = INITIAL_MAX;
          scope.timePicker.config.max = INITIAL_MAX;
          return;
        }
        // 打开弹窗时，设置时间不大于 maxTime
        var limitForTimePicker = calcLimitForTimePicker(maxTime, false);
        scope.datePicker.config.max = getLimitForPicker(maxTime);
        scope.timePicker.config.max = getLimitForPicker(limitForTimePicker);
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
        };
      }

      // 计算时间选择框的最大或最小值
      // 注：时间选择框默认日期为当天，且无法修改，因此限制时间为当天时才有效
      function calcLimitForTimePicker(time, isMinTime) {
        var defaultTimeStr = isMinTime ? '00:00:00' : '23:59:59';
        var now = new Date();
        var nowDateStr = $filter('date')(now, 'yyyy/MM/dd');
        // 有最小日期时间限制
        var dateStr = scope.dateStr;
        var limitDateStr = $filter('date')(time, 'yyyy-MM-dd');
        var limitTimeStr = $filter('date')(time, 'HH:mm');
        var timeStr = dateStr === limitDateStr ? limitTimeStr : defaultTimeStr;
        return new Date(nowDateStr + ' ' + timeStr);
      }

      // 增加或减少时间
      function addOrMinusMinutes(date, increasedMinutes) {
        if (!increasedMinutes) {
          return date;
        }
        var retDate = new Date(date.getTime() + increasedMinutes * 60 * 1000);
        return retDate;
      }

      // 使用分钟梯度向后修正时间
      function fixTime(date, minutesGradient) {
        if (!minutesGradient) {
          return date;
        }
        var minutes = date.getMinutes();
        var divideRes = minutes / minutesGradient;
        minutes = (Math.floor(divideRes) + 1) * minutesGradient;
        date.setMinutes(minutes);
        return date;
      }

      // 字符串转Date对象
      function convertStringToDate(dateStr, timeStr) {
        if (!dateStr) {
          return null;
        }
        timeStr = timeStr || '';
        var dateTimeStr = dateStr + ' ' + timeStr;
        dateTimeStr = dateTimeStr.replace(/-/g, '/');
        return new Date(dateTimeStr);
      }

      // 过去的时间不可选时，自动修正时间
      if (scope.config.pastTimeDisabled) {
        // 定时器，修正时间使其不小于当前时间
        intervalTimer = $interval(autoFix, 1000);
        // 取消定时器
        scope.$on('$destroy', function() {
          $interval.cancel(intervalTimer);
        });
      }

      // 修正选择框中的值不小于当前时间
      function autoFix() {
        if (scope.config.isDisabled) {
          return;
        }
        var now = new Date();
        if (scope.config.mode === 'date') {
          now.setHours(0, 0, 0, 0);
        }
        var minutesGradient = scope.config.minutesGradient;
        var date = convertStringToDate(scope.dateStr, scope.timeStr);
        if (date >= now) {
          return;
        }
        console.log('fixing...');
        if (scope.dateStr !== $filter('date')(now, 'yyyy-MM-dd')) {
          fixTimePickerDate(now); // 修正时间选择弹窗里的日期
        }
        minutesGradient = minutesGradient || 1; // 无分钟梯度时，向后修正1分钟
        now = fixTime(now, minutesGradient);
        scope.time = now;
        limitPicker(); // 设置弹窗的最大、最小值
      }

      // 修正时间选择插件里的日期
      function fixTimePickerDate(date) {
        var dateTime = scope.timePicker.config.dateTime;
        if (dateTime) {
          dateTime.year = date.getFullYear();
          dateTime.month = date.getMonth();
          dateTime.date = date.getDate();
        }
      }

      // 计算时间
      function calcNowDateTime() {
        var date = new Date();
        // 按分钟数增加时间
        date = addOrMinusMinutes(date, scope.config.increasedMinutes);
        // 根据分钟梯度修正时间
        date = fixTime(date, scope.config.minutesGradient);
        return date;
      }

      // laydate 中修改 dateStr 或 timeStr
      scope.selectDateTime = function(strType, value) {
        watchTimeIgnored = true;
        scope[strType] = value;
        var newTime = convertStringToDate(scope.dateStr, scope.timeStr);
        scope.time = checkTime(newTime);
        setDateTimeStr();
        if (strType === 'dateStr') {
          limitPicker(); // 设置弹窗的最大、最小值
        }
      };

      // 检查 time 是否满足最大最小值要求
      function checkTime(time) {
        time = time || scope.time;
        var minTimeForPicker = scope.minTimeForPicker;
        var maxTimeForPicker = scope.maxTimeForPicker;
        if (maxTimeForPicker && time > maxTimeForPicker) {
          return maxTimeForPicker;
        }
        if (minTimeForPicker && time < minTimeForPicker) {
          return minTimeForPicker;
        }
        return time;
      }

      // 根据 scope.time 计算 scope.dateStr 和 scope.timeStr
      function setDateTimeStr() {
        scope.dateStr = $filter('date')(scope.time, 'yyyy-MM-dd');
        scope.timeStr = $filter('date')(scope.time, 'HH:mm');
      }

      // 自动初始化默认为true
      if (scope.config.shouldInitialize == null) {
        scope.config.shouldInitialize = true;
      }
      if (scope.config.shouldInitialize) {
        // 初始化 input 中的日期和时间
        initDateTime();
      }

      // 初始化日期和时间
      function initDateTime() {
        if (!scope.time) {
          scope.time = calcNowDateTime();
        }
      }

      // 监听 minTime
      scope.$watch('minTime', function(newValue) {
        limitPicker(); // 设置弹窗的最大、最小值
        scope.time = checkTime();
      });

      // 监听 maxTime
      scope.$watch('maxTime', function(newValue) {
        limitPicker(); // 设置弹窗的最大、最小值
        scope.time = checkTime();
      });

      // 监听 time
      scope.$watch('time', function() {
        var time = scope.time;
        if (!time) {
          return;
        }
        if (watchTimeIgnored) {
          return (watchTimeIgnored = false); //重置 watchTimeIgnored
        }
        // 组件外部修改了 scope.time
        scope.time = checkTime();
        setDateTimeStr();
        limitPicker(); // 设置弹窗的最大、最小值
      });
    }
  }
]);
