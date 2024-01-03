import { getBaseUrl } from "./libs/UrlHelperScripts.js";

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

	if(baseUrl != null) {
		getRecord(baseUrl).then((res) => {
			if(res !== undefined)
				chrome.tabs.update(tab.id, { url: blockedSiteUrl });
		});
	}
}

let db = null;

function createDatabase() {
	const request = indexedDB.open('MetisDb');

	request.onerror = function(event) {
		console.log("Problem opening DB.");
	}

	request.onupgradeneeded = function(event) {
		db = event.target.result;

		let objectStore = db.createObjectStore('BlockedSites', {
			keyPath: "url"
		});

		objectStore.transaction.oncomplete = function(event) {
			console.log("ObjectStore Created.")
		}
	}

	request.onsuccess = function(event) {
		db = event.target.result;

		console.log("DB OPENED.")
	}
}

function deleteDatabase() {
	const request = indexedDB.deleteDatabase('MetisDb');

	request.onerror = function(event) {
		console.log("Problem deleting DB.");
	}

	request.onsuccess = function(event) {
		console.log("DB deleted.")
	}
}

function insert_records(records) {
	if(db) {
		const insertTransaction = db.transaction("BlockedSites", "readwrite");
		const objectStore = insertTransaction.objectStore("BlockedSites");

		return new Promise((resolve, reject) => {
			insertTransaction.oncomplete = function() {
				console.log("ALL INSERT TRANSACTIONS COMPLETE");
				resolve(true);
			};

			insertTransaction.onerror = function(event) {
				console.log("PROBLEM INSERTING RECORDS");
				console.log(event);
				resolve(false);
			};

			records.forEach(site => {
				let request = objectStore.add(site);

				request.onsuccess = function() {
					console.log("Added: ", site);
				}
			});
		});
	}
}

function getRecord(url) {
	if(db) {
		const getTransaction = db.transaction("BlockedSites", "readonly");
		const objectStore = getTransaction.objectStore("BlockedSites");

		return new Promise((resolve, reject) => {
			getTransaction.onerror = function() {
				console.log("PROBLEM INSERTING RECORDS");
			}

			let request = objectStore.get(url);

			request.onsuccess = function(event) {
				resolve(event.target.result);
			}
		})
	}
}

function update_record(record) {
	if(db) {
		const putTransaction = db.transaction("BlockedSites", "readwrite");
		const objectStore = insertTransaction.objectStore("BlockedSites");

		return new Promise((resolve, reject) => {
			putTransaction.oncomplete = function() {
				console.log("ALL PUT TRANSACTIONS COMPLETE");
				resolve(true);
			}

			putTransaction.onerror = function() {
				console.log("PROBLEM UPDATING RECORDS");
				resolve(false);
			}

			let request = objectStore.put(record);
		});
	}
}

function delete_record(url) {
	if(db) {
		const deleteTransaction = db.transaction("BlockedSites", "readwrite");
		const objectStore = deleteTransaction.objectStore("BlockedSites");

		return new Promise((resolve, reject) => {
			deleteTransaction.oncomplete = function() {
				console.log("ALL DELETE TRANSACTIONS COMPLETE");
				resolve(true);
			}

			deleteTransaction.onerror = function() {
				console.log("PROBLEM DELETING RECORDS");
				resolve(false);
			}

			let request = objectStore.delete(url);
		});
	}
}

createDatabase();
