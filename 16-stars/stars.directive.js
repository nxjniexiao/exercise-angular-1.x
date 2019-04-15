angular.module('myApp').directive('stars', [function () {
  return {
    templateUrl: './stars.template.html',
    scope: {
      score: '=',
      size: '@?',
      color: '@?',
      isClickAvailable: '=?'
    },
    controller: ['$scope', controller]
  };

  function controller($scope) {
    var totalScore = 5;
    var starFull = "fa fa-star";
    var starEmpty = "fa fa-star-o";

    $scope.clickStar = function (index) {
      if (!$scope.isClickAvailable) {
        return false;
      }
      setRating(index + 1);
    };

    // 修改分数
    function setRating(score) {
      if (score == null) {
        return;
      }
      score = parseInt(score);
      if (typeof score !== 'number') {
        return;
      }
      $scope.score = score;
      var stars = createStarsArray(score, true);
      var starsLeft = createStarsArray(totalScore - score, false);
      $scope.stars = stars.concat(starsLeft);
    }

    // 创建包含图标字体 class 名称的数组
    function createStarsArray(starsNum, isFullStar) {
      var star = isFullStar ? starFull : starEmpty;
      var stars = [];
      for (var i = 0; i < starsNum; i++) {
        stars.push(star);
      }
      return stars;
    }

    // 设置图标字体颜色
    function createIconStyle() {
      var size = $scope.size || '12px';
      var color = '#' + $scope.color || '000';
      return {
        'font-size': size,
        'line-height': size,
        'color': color
      }
    }

    function initScore() {
      if ($scope.score == null) {
        $scope.score = totalScore
      }
    }

    initScore();
    setRating($scope.score);
    $scope.iconStyle = createIconStyle();
  }
}]);
