chrome.runtime.onInstalled.addListener(function () {
    chrome.tabs.create({ url: "chrome-search://local-ntp/local-ntp.html" });
  });
  
  chrome.action.onClicked.addListener(function (tab) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: function () {
        window.open("https://example.com", "_blank");
      },
    });
  });
  