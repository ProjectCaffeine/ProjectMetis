import { insert_records, update_record, getRecord, delete_record, createDatabase } from "./db.js";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if(request.message === "insert") {
		let insert_request = insert_records(request.payload);

		insert_request.then(res => {
			chrome.runtime.sendMessage({
				message: "insert_success",
				payload: res
			});
		});
	} else if(request.message === "update") {
		let update_request = update_record(request.payload);

		update_request.then(res => {
			chrome.runtime.sendMessage({
				message: "update_success",
				payload: res
			});
		});
	}
	else if(request.message === "delete") {
		let delete_request = delete_record(request.payload);

		delete_request.then(res => {
			chrome.runtime.sendMessage({
				message: "delete_success",
				payload: res
			});
		});
	}
	else if(request.message === "get") {
		let get_request = getRecord(request.payload);

		get_request.then(res => {
			chrome.runtime.sendMessage({
				message: "get_success",
				payload: res
			});
		});
	}
});

chrome.tabs.onActivated.addListener(function(activeInfo) {
	chrome.tabs.get(activeInfo.tabId, function(tab) {
		redirectToBlockedSitePage(tab);
		console.log("on Activated");
	})
})

chrome.tabs.onUpdated.addListener((tabid, changeInfo, tab) => {
	if(tab.active &&
		changeInfo.status !== undefined &&
		changeInfo.status.toLowerCase().trim() === "complete") {
		console.log("updated");
		redirectToBlockedSitePage(tab);
	}

});

function redirectToBlockedSitePage(tab) {
	const blockedSiteUrl = chrome.runtime.getURL("BockedPage.html");
	const baseUrl = getBaseUrl(tab.url);
	console.log("base URL: " + baseUrl);

	if(baseUrl != null) {
		getRecord(baseUrl).then((res) => {
			if(res !== undefined)
				chrome.tabs.update(tab.id, { url: blockedSiteUrl });
		});
	}
}


function getBaseUrl(url) {
	// Regular expression to match the main URL
	const urlRegex = /^(https?:\/\/[^/]+)/;

	// Use the exec method of the regular expression to extract the matched part
	const matches = urlRegex.exec(url);

	return matches ? matches[1] : null;
}

createDatabase(function() {

});
