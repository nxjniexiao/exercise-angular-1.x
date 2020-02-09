/**
 * source code: https://lab.bartt.me/openapp
 */
var NativeAppLauncher = (function() {
  var IOS_VERSION_RE = /OS\s+(\d)_/;
  var timers = [];
  var userAgent = window.navigator.userAgent;
  var isAndroid = function() {
    return /Android/.test(userAgent);
  };
  var isIOS = function() {
    return /(?:i(?:Phone|P(?:o|a)d))/.test(userAgent);
  };
  var iOSVersion = function() {
    return isIOS() ? parseInt(userAgent.match(IOS_VERSION_RE)[1], 10) : 0;
  };
  var isChrome = function() {
    // Opera (OPR) also identifies itself as Chrome and has to be corrected for.
    // OPR is used on Android but on iOS it is OPiOS where Opera does NOT identify as Chrome. Go figure!
    // Probably because on iOS it is Opera Mini and has all browser have to be based on Safari/WebKit.
    return /Chrome/.test(userAgent) && !/OPR/.test(userAgent);
  };
  var isFirefox = function() {
    return /Firefox/.test(userAgent);
  };

  return {
    // Stop any running timers.
    clearTimers: function() {
      console.log('Clearing timers: [' + timers.join(', ') + ']');
      timers.map(clearTimeout);
      timers = [];
    },
    // Fetch the deep link into the Twitter app.
    getDeepLink: function() {
      return isAndroid() && isFirefox()
        ? 'intent://twitter.com/_/status/584046346862100481#Intent;package=com.twitter.android;scheme=https;end;'
        : 'twitter://tweet?id=584046346862100481';
    },
    openApp: function(deeplink, storeURI) {
      var launcher = this;
      var storeLaunched = false;
      var gotStoreURI = 'string' == typeof storeURI;
      // If this handler is part of the UI thread, i.e. the `direct` result of a user action then
      // redirecting to the App Store will happen immediately. When not part of the UI thread however,
      // the redirect will bring up an Open in App dialog. Unless there is already a dialog showing,
      // in which case the redirect dialog will wait for the currently shown dialog to be dismissed.
      gotStoreURI &&
        timers.push(
          window.setTimeout(function() {
            console.log('Launching App Store: ' + storeURI);
            storeLaunched = true;
            window.top.location = storeURI;
          }, 1000)
        );
      isIOS() &&
        timers.push(
          window.setTimeout(function() {
            console.log('Reloading page');
            storeLaunched && window.location.reload();
          }, 2000)
        );
      console.log('Launching app: ' + deeplink);
      window.location = deeplink;
    },
    // Get the deep link URI to the Twitter app in the store appropriate for the OS.
    // Using a deep link guarantees that the app store opens even when using an alternate browser (e.g. Puffin or Firefox)
    getStoreURI: function() {
      return isAndroid()
        ? 'market://details?id=com.twitter.android'
        : 'https://itunes.apple.com/app/twitter/id333903271?mt=8';
    },
    // Try to launch the native app on iOS/Android. Redirect to the app store if launch fails.
    init: function() {
      var launcher = this;
      var events = ['pagehide', 'blur'];
      if (isIOS() || (isAndroid() && !isChrome())) {
        events.push('beforeunload');
      }
      console.log('Listening window events: ' + events.join(', '));
      $(window).on(events.join(' '), function(e) {
        console.log('Window event: ' + e.type);
        launcher.clearTimers();
      });
      document.getElementById('openInApp').onclick = function() {
        // Detach the app launcher from the UI thread so that the Open in App dialog won't be
        // interrupted when the delayed redirect to the App Store fires.
        setTimeout(
          function() {
            launcher.openApp.call(
              launcher,
              launcher.getDeepLink(),
              launcher.getStoreURI()
            );
          }.bind(this),
          0
        );
      };
    }
  };
})();
NativeAppLauncher.init();
