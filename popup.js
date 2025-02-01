document.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById("highlightsList");
  const clearAllBtn = document.getElementById("clearAll");

  function loadHighlights() {
    chrome.storage.local.get("highlights", (data) => {
      let highlights = data.highlights || [];
      list.innerHTML = ""; // Clear list before adding items

      highlights.forEach((item, index) => {
        let li = document.createElement("li");

        li.innerHTML = `
          <a href="${item.url}" target="_blank">${item.text}</a>
          <button class="delete-btn" data-index="${index}">❌</button>
        `;

        list.appendChild(li);
      });

      // Add event listeners to delete buttons
      document.querySelectorAll(".delete-btn").forEach((button) => {
        button.addEventListener("click", (e) => {
          let index = e.target.getAttribute("data-index");
          deleteHighlight(index);
        });
      });
    });
  }

  function deleteHighlight(index) {
    chrome.storage.local.get("highlights", (data) => {
      let highlights = data.highlights || [];
      highlights.splice(index, 1);
      chrome.storage.local.set({ highlights }, loadHighlights);
    });
  }

  clearAllBtn.addEventListener("click", () => {
    chrome.storage.local.set({ highlights: [] }, loadHighlights);
  });

  loadHighlights();
});

  