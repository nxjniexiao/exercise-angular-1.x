angular.module('myApp')
  .directive('onScrollBottom', ['$timeout', function ($timeout) {
    return {
      restrict: 'A',
      link: function (scope, elm, attr) {
        var timer;
        var raw = elm[0];
        console.log(raw);
        elm.scroll(function () {
          if (timer) {
            return;
          }
          console.log('scrolling...');
          timer = $timeout(function () {
            if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
              // attr.onScrollBottom(); // 报错：'attr.onScrollBottom'不是函数
              scope.$apply(attr.onScrollBottom);
            }
            timer = null;
            console.log('clear timer');
          }, 500);
        });
      }
    }
  }
  ]);
