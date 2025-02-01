document.addEventListener("mouseup", () => {
    let selectedText = window.getSelection().toString();
    if (selectedText) {
      chrome.runtime.sendMessage({ action: "highlight", text: selectedText });
    }
  });
  