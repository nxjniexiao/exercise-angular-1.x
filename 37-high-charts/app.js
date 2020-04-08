var x = [],
  data = [],
  tickPositions = [],
  val,
  now = +new Date('2020/02/09 08:00');
for (var i = 0; i < 48; i++) {
  x.push(i + 1);
  val = Number((Math.random() * 100).toFixed(3));
  if (i === 40 || i === 41 || i === 42 || i === 43 || i === 44) {
    val = 50;
  }
  data.push([now + (i * 3600000), val]);
  tickPositions.push(now + (i * 3600000));
}
console.log(data);
$('#my-charts').highcharts({
  chart: {
    type: 'area'
  },
  // tooltip: {
  //   crosshairs: true,
  //   shared: true,
  //   style: {
  //     padding: 10,
  //     fontWeight: 'bold'
  //   }
  // },
  // exporting: {
  //   filename: '会议数量分析(曲线图)'
  // },
  title: {
    text: ''
  },
  // loading: false,
  // credits: {
  //   enabled: false
  // },
  plotOptions: {
    series: {
      zoneAxis: 'x'
    },
    area: {
      lineWidth: 1,
      marker: {
        radius: 0
      }
    }
  },
  legend: {
    enabled: false
  },
  tooltip: {
    // enabled: false,
    formatter: function() {
      return formatDate(this.x, 'yyyy-MM-dd hh:mm') + ': ' + this.y + '方'
    }
  },
  xAxis: {
    // type: 'category'
    // min: data[0][0],
    // max: data[47][0],
    // floor: data[0][0],
    // ceiling: data[47][0],
    // endOnTick: true,
    // startOnTick: true,
    tickPositions: tickPositions,
    // tickInterval: 60 * 60 * 1000,
    tickInterval: 1,
    labels: {
      // format: '{value} 时',
      // rotation: -45,
      formatter: function() {
        console.log(this);
        var tickPositions = this.axis.tickPositions;
        var index = tickPositions.indexOf(this.value);
        var preVal = tickPositions[index - 1]
        var formatStr = 'dd/hh:mm';
        var isSameDay;
        if (preVal) {
          isSameDay = new Date(preVal).getDate() === new Date(this.value).getDate()
          if (isSameDay) {
            formatStr = 'hh:mm';
          }
        }
        return formatDate(this.value, formatStr);
      }
    }
  },
  yAxis: {
    title: {
      text: '方数'
    }
  },
  series: [
    {
      name: '方数',
      data: data,
      zones: calcZones(50)
      // zones: [
      //   {
      //     value: 50,
      //     color: 'grey'
      //   },
      //   {
      //     color: 'red'
      //   }
      // ],
    }
  ]
});

function calcZones(max) {
  var arr = data;
  var zones = [];
  arr.forEach(function(curr, index, arr) {
    // 第一个节点
    if (index === 0) {
      return;
    }
    var colorHigh = 'red';
    var colorLow = 'grey';
    var pre = arr[index - 1];
    var pre2 = arr[index - 2];
    // 无交集
    if (
      ((pre[1] > max && curr[1] > max)
        || (pre[1] < max && curr[1] < max))
        && index !== arr.length - 1 // 非最后一个节点
    ) {
      return;
    }
    // 求交点
    var k = (curr[1] - pre[1]) / (curr[0] - pre[0]);
    if (k !== 0) {
      // 非水平
      var value = pre[0] + (max - pre[1]) / k;
      // 当前节点的前两个点等于max
      var special = pre[1] === max
        && pre2
        && pre2[1] === max;
      zones.push({
        value: value,
        color: k > 0
          ? (special ? colorHigh : colorLow)
          : colorHigh
      });
    }
    // 最后一个节点
    if (index === arr.length - 1) {
      zones.push({
        color: curr[1] < max ? colorLow : colorHigh
      });
    }
  });
  console.log(zones);
  return zones;
}

function formatDate(date, fmt) {
  // fmt: 'yyyy-MM-dd hh:mm'
  if (typeof date === 'number') {
    date = new Date(date);
  }
  // 替换年份
  if (/(y+)/.test(fmt)) {
    // 一对圆括号代表一个捕获组
    let year = date.getFullYear().toString();
    fmt = fmt.replace(RegExp.$1, year.substr(4 - RegExp.$1.length));
  }
  let obj = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes()
  };
  // 替换月、日、时、分
  for (let key in obj) {
    let pattern = new RegExp(`(${key})`);
    if (pattern.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, prefixInt(obj[key], 2));
    }
  }
  // 前面自动补零(内部函数)
  function prefixInt(num, len) {
    // substr()会把第一个负参数加上字符串长度，即取尾部len位
    return ('0000000000' + num).substr(-len);
  }
  return fmt;
}