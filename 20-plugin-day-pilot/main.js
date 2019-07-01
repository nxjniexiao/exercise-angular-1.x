var app = angular.module('main', ['daypilot']).controller('DemoCtrl', function ($scope) {
  $scope.resourceIndex = 0;
  $scope.resourceList =
    [
      {name: "Room A", id: "A"},
      {name: "Room B", id: "B"},
      {name: "Room C", id: "C"},
      {name: "Room D", id: "D"},
    ];
  $scope.config = {
    scale: "Day",
    days: 66,
    startDate: "2019-09-01",
    timeHeaders: [
      {groupBy: "Month"},
      {groupBy: "Cell", format: "d"}
    ],
    allowEventOverlap: false,
    // treeEnabled: true,
    resources: $scope.resourceList,
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
    },
    // 点击每行左侧的标题
    onRowClick: function(args) {
      console.log(args);
      var isChecked =
      args.resource.data.isChecked = !args.resource.data.isChecked;
      if (isChecked) {
        args.row.addClass('is-checked');
      } else {
        args.row.removeClass('is-checked');
      }
      var existingEvents = findEventsByRange(args.row.id, new Date('2019/09/01'), new Date('2019/09/30'));
      console.log(existingEvents);
    },
    //
    onBeforeResHeaderRender: function(args) {
      args.resource.html = "<i class='fa fa-check-square'></i><i class='fa fa-square-o'></i>" + args.resource.html;
      args.resource.backColor = "#ccc";
      // if (args.resource.loaded === false) {
      //   args.resource.html += " (loaded dynamically)";
      //   args.resource.backColor = "gray";
      // }
    },
    //
    onBeforeRowHeaderRender: function(args) {
      console.log(args);
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
  };

  // 根据会议室 id 找出 指定时间段的 events 数组
  function findEventsByRange(roomId, startTime, endTime) {
    var scheduler = $scope.dp;
    var row = scheduler.rows.find(roomId);
    if (!row) {
      return []; //指定 roomId 的会议室未显示在 daypilot 中
    }
    var events = row.$.row.events;
    return events.forRange(
      new DayPilot.Date(startTime, true),
      new DayPilot.Date(endTime, true)
    );
  }
});
