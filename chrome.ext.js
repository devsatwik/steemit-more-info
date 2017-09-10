
function checkUpdate(){
  var manifestData = chrome.runtime.getManifest();
  var currentVersion = manifestData.version;
  document.body.dataset.SteemitMoreInfoCurrentVersion = currentVersion;

  $.get('https://raw.githubusercontent.com/armandocat/steemit-more-info/master/manifest.json')
    .done(function(data) {
      document.body.dataset.SteemitMoreInfoNewVersionManifest = data;

      var s = document.createElement('script');
      s.src = chrome.extension.getURL('src/check_update.js');
      document.body.appendChild(s);    
    })
    .fail(function(err) {
      console.log('checkUpdate error:', err);
    });
}


[
'vendor/toastr.min.css',
'src/main.css'
].reverse().reduce(function(next, href){
  return function(){
    var s = document.createElement('link');
    s.href = chrome.extension.getURL(href);
    s.rel = 'stylesheet';
    document.body.appendChild(s);
    next && next();
  };
}, null)();


[
'vendor/steem.min.js',
'vendor/jquery-3.2.1.min.js',
'vendor/jquery.livequery.min.js',
'vendor/lodash.min.js',
'vendor/moment.min.js',
'vendor/history-events.js',
'vendor/compare-versions.js',
'vendor/toastr.min.js',
'src/notification_popup.js',
'src/utils.js',
'src/events.js',
'src/main.js'
].reverse().reduce(function(next, script){
  return function(){
    var s = document.createElement('script');
    s.src = chrome.extension.getURL(script);
    s.onload = function() {
      next && next();
    };
    document.body.appendChild(s);
  };
}, checkUpdate)();
