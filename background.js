chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "saveHighlight",
      title: "Save Highlighted Text",
      contexts: ["selection"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "saveHighlight") {
      chrome.storage.local.get({ highlights: [] }, (data) => {
        let highlights = data.highlights;
        highlights.push({ text: info.selectionText, url: tab.url });
        chrome.storage.local.set({ highlights });
      });
    }
  });
  