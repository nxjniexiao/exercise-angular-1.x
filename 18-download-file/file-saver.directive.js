angular.module('myApp').directive('fileSaver', [function () {
  return {
    restrict: 'A',
    link: link
  };

  function link(scope, elem, attrs) {
    console.log(url);
    var url = attrs.fileSaver;
    elem.on('click', function (event) {
      saveAs(url);
    });
  }
}]);
