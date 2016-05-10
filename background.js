var disabled = {};

chrome.runtime.onMessage.addListener(function (req, src, callback) {

  console.log("msg:", req.what, src.tab);

  if (req.what === "check") {

    var tabId = (src.tab && src.tab.id) || req.tabId;
    sendState(tabId, callback);

  } else if (req.what === "refresh" && req.tabId) {

    disabled[req.tabId] = +new Date();
    console.log("Disabled tab: ", req.tabId, disabled);
    setTimeout(function () {
      delete disabled[req.tabId];
    }, 3000);
    chrome.tabs.reload(req.tabId);
  }
});

function sendState(tabId, callback) {
  var active = (typeof disabled[tabId] === 'undefined');
  //console.log('check: ', tabId, active, disabled);
  callback({
    "active": active
  });
}
