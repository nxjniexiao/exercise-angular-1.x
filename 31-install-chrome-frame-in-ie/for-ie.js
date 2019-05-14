// window.attachEvent('onload', function () {
//   CFInstall.check(
//     {
//       mode: 'overlay',
//       user: true,
//       url: './google-chrome-frame-installation.html'
//     }
//   );
// });

// 阻塞式
CFInstall.check({
  preventPrompt: true,
  onmissing: function () {
    //当检测到插件未安装时要执行的动作
    if (confirm('您的浏览器版本过低，需要安装插件才能使用会管系统。是否安装？')) {
      // 下载插件
      window.location.href = "../lib/chrome-frame//GoogleChromeframeStandaloneEnterprise.msi";
    } else {
      // 跳转到插件下载页面
      window.location.href = './google-chrome-frame-installation.html';
    }
  }
});

// // 自带 iframe
// CFInstall.check(
//   {
//     mode: 'overlay',
//     user: true,
//     url: './google-chrome-frame-installation.html'
//   }
// );
