var dataMaker = function(count) {
  var nodes = [], pid = -1,
  min = 10, max = 90, level = 0, curLevel = [], prevLevel = [], levelCount,
  i = 0,j,k,l,m;

  while (i<count) {
    if (level == 0) {
      pid = -1;
      levelCount = Math.round(Math.random() * max) + min;
      for (j=0; j<levelCount && i<count; j++, i++) {
        var n = {id:i, pid:pid, name:"Big-" +i};
        nodes.push(n);
        curLevel.push(n);
      }
    } else {
      for (l=0, m=prevLevel.length; l<m && i<count; l++) {
        pid = prevLevel[l].id;
        levelCount = Math.round(Math.random() * max) + min;
        for (j=0; j<levelCount && i<count; j++, i++) {
          var n = {id:i, pid:pid, name:"Big-" +i};
          nodes.push(n);
          curLevel.push(n);
        }
      }
    }
    prevLevel = curLevel;
    curLevel = [];
    level++;
  }
  return nodes;
}
