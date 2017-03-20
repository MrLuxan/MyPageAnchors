chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.insertCSS(null, {file:"Styles.css"})
	chrome.tabs.executeScript(null, {file: "InsertScript.js"});
});


