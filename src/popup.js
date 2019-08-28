function addData() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { message: "add_data" });
  });
}

function downloadData() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { message: "download_file" });
  });
}

function clearSelection() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { message: "clear_selection" });
  });
}

function addFileType() {
  var file = document.getElementById("file");
  var value = file.options[file.selectedIndex].value;
  file.options[file.selectedIndex].selected = true;
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      message: "file_type_selection",
      payload: value
    });
  });
  getFileType();
}

function getFileType() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { message: "get_selected_file_type" },
      function(response) {
        if (response.type == "txt") {
          document.getElementById("active-file-type").innerHTML =
            "Text document";
        } else if (response.type == "doc") {
          document.getElementById("active-file-type").innerHTML =
            "Word document";
        } else if (response.type == "odt") {
          document.getElementById("active-file-type").innerHTML =
            "OpenOffice document";
        } else {
          document.getElementById("active-file-type").innerHTML = "empty";
        }
      }
    );
  });
}

document.addEventListener("DOMContentLoaded", function() {
  getFileType();
  document.getElementById("button1").addEventListener("click", addData);
  document.getElementById("button2").addEventListener("click", downloadData);
  document.getElementById("button3").addEventListener("click", clearSelection);
  document.getElementById("file").addEventListener("click", addFileType);
});