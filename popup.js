// called when our popup is loaded
document.addEventListener('DOMContentLoaded', function () {

  var button = document.querySelector('#rd_button');

  // find the active chrome tab
  chrome.tabs.getSelected(null, function (tab) {

    if (/^chrome:/.test(tab.url))
      return updateButton(button, tab.id, 0);

    // check if we are active on the page
    chrome.runtime.sendMessage({

      what: "check",
      tabId: tab.id

    }, function (res) {

      updateButton(button, tab.id, res.active);
    });
  });

}); // end addEventListener

function updateButton(button, tabId, on) {

  button.innerHTML = (on ? 'Disable' : 'Disabled') + ' on this page';
  button.disabled = !on;

  if (on) {

    button.addEventListener('click', function () {

      chrome.runtime.sendMessage({
        what: "refresh",
        tabId: tabId
      });

      window.close();
    });
  }

} // end updateButton
