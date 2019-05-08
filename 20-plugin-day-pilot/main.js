var app = angular.module('main', ['daypilot']).controller('DemoCtrl', function ($scope) {
  $scope.resourceIndex = 0;
  $scope.resourceList = [
    [
      {name: "Room A", id: "A"},
      {name: "Room B", id: "B"},
      {name: "Room C", id: "C"},
      {name: "Room D", id: "D"},
      {name: "Room E", id: "E"},
      {name: "Room F", id: "F"},
      {name: "Room G", id: "G"},
      {name: "Room H", id: "H"},
      {name: "Room I", id: "I"},
      {name: "Room J", id: "J"},
      {name: "Room K", id: "K"},
      {name: "Room L", id: "L"},
      {name: "Room M", id: "M"},
      {name: "Room N", id: "N"},
      {name: "Room O", id: "O"},
      {name: "Room P", id: "P"},
      {name: "Room Q", id: "Q"},
      {name: "Room R", id: "R"},
      {name: "Room S", id: "S"},
      {name: "Room T", id: "T"},
      {name: "Room U", id: "U"},
      {name: "Room V", id: "V"},
      {name: "Room W", id: "W"},
      {name: "Room X", id: "X"},
      {name: "Room Y", id: "Y"},
      {name: "Room Z", id: "Z"},
      {name: "Room a", id: "a"},
      {name: "Room b", id: "b"},
      {name: "Room c", id: "c"},
      {name: "Room d", id: "d"},
      {name: "Room e", id: "e"},
      {name: "Room f", id: "f"},
      {name: "Room g", id: "g"},
      {name: "Room h", id: "h"},
      {name: "Room i", id: "i"},
      {name: "Room j", id: "j"},
      {name: "Room k", id: "k"},
      {name: "Room l", id: "l"},
      {name: "Room m", id: "m"},
      {name: "Room n", id: "n"},
      {name: "Room o", id: "o"},
      {name: "Room p", id: "p"},
      {name: "Room q", id: "q"},
      {name: "Room r", id: "r"},
      {name: "Room s", id: "s"},
      {name: "Room t", id: "t"},
      {name: "Room u", id: "u"},
      {name: "Room v", id: "v"},
      {name: "Room w", id: "w"},
      {name: "Room x", id: "x"},
      {name: "Room y", id: "y"},
      {name: "Room z", id: "z"},
    ],
    [
      {name: "Room 1", id: "1"},
      {name: "Room 2", id: "2"},
      {name: "Room 3", id: "3"},
    ]
  ];
  $scope.config = {
    scale: "Day",
    days: 66,
    startDate: "2014-09-01",
    timeHeaders: [
      {groupBy: "Month"},
      {groupBy: "Cell", format: "d"}
    ],
    allowEventOverlap: false,
    resources: $scope.resourceList[$scope.resourceIndex],
    eventClickHandling: "Select",
    // 鼠标右键菜单
    contextMenu: new DayPilot.Menu([
      // $scope.dp 是通过在 <daypilot-scheduler> 元素中的 id="dp" 来指定的
      {text:"Delete", onclick: function() { $scope.dp.events.remove(this.source); } },
      {text:"Show event ID", onclick: function() {alert("Event value: " + this.source.value());} },
      {text:"Show event text", onclick: function() {alert("Event text: " + this.source.text());} },
      {text:"Show event start", onclick: function() {alert("Event start: " + this.source.start().toStringSortable());} },
      {text:"Go to google.com", href: "http://www.google.com/?q={0}"},
      {text:"CallBack: Delete this event", command: "delete"},
    ]),
    // 事件被移动后执行
    onEventMoved: function (args) {
      $scope.dp.message("Event moved: " + args.e.text());
    },
    // 事件被点击后执行
    onEventSelected: function (args) {
      $scope.selectedEvents = $scope.dp.multiselect.events();
      $scope.$apply();
    },
    // 选择时间区间后执行
    onTimeRangeSelected: function(args) {
      let {start, end, resource} = args;
      $scope.currentSelectedEvent = {start, end, resource};
      // $scope.add();
      // $scope.$apply();
    }
  };

  $scope.events = [
    // {
    //   start: new DayPilot.Date("2014-09-05T00:00:00"),
    //   end: new DayPilot.Date("2014-09-06T00:00:00"),
    //   id: DayPilot.guid(),
    //   resource: "B",
    //   text: "One-Day Event"
    // }
  ];
  // 新增事件
  $scope.add = function () {
    let {start, end, resource} = $scope.currentSelectedEvent;
    $scope.events.push(
      {
        start,
        end,
        id: DayPilot.guid(),
        resource,// 对应$scope.resources中的id
        text: "One-Day Event"
      }
    );
  };

  $scope.move = function () {
    var event = $scope.events[0];
    event.start = event.start.addDays(1);
    event.end = event.end.addDays(1);
  };

  $scope.rename = function () {
    $scope.events[0].text = "New name";
  };

  $scope.scale = function (val) {
    $scope.config.scale = val;
  };
  $scope.changeResource = function() {
    console.log($scope.dp);
    // $scope.dp.Init();
    // console.log($scope.dp.rows.selection.get());
    // 重置所选
    $scope.dp.clearSelection();
    // $scope.dp.cleanSelection();
    $scope.resourceIndex = ($scope.resourceIndex + 1) % 2;
    $scope.config.resources = $scope.resourceList[$scope.resourceIndex];
  }
});
