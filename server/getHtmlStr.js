function getHtmlStr(prevPath, filesArr) {
  const htmlPre =
    '<!DOCTYPE html>' +
    '<html lang="en">' +
    '<head>' +
    '<meta charset="UTF-8">' +
    '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
    '<meta http-equiv="X-UA-Compatible" content="ie=edge">' +
    '<title>文件列表</title>' +
    '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">' +
    '</head>' +
    '<body>' +
    '<div class="list-group center-block" style="width:900px">';
  const htmlLatter = "</div></body></html>";
  liArr = [];
  if (prevPath !== "/") {
    prevPath = prevPath + "/";
  }
  for (let i = 0, len = filesArr.length; i < len; i++) {
    liArr.push(
      `<a class="list-group-item" href="${prevPath}${filesArr[i]}">${filesArr[i]}</a>`
    );
  }
  liStr = liArr.join('');
  return htmlPre + liStr + htmlLatter;
}
module.exports = getHtmlStr;
