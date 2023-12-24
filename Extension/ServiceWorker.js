chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

});

let blockedSites = [
	{
		"url": "facebook.com"
	},
	{
		"url": "twitter.com"
	}
];

let db = null;

function createDatabase() {
	const request = window.indexedDB.open('MetisDb');

	request.onerror = function(event) {
		console.log("Problem opening DB.");
	}

	request.onupgradeneeded = function(event) {
		db = event.target.result;

		let objectStore = db.createObjectStore('BlockedSites', {
			keyPath: "url"
		});

		objectStore.transaction.oncomplete = function(event)_ {
			console.log("ObjectStore Created.")
		}
	}

	request.onsuccess = function(event) {
		db = event.target.result;

		insertRecords(blockedSites);

		console.log("DB OPENED.")
	}
}

function deleteDatabase() {
	const request = window.indexedDB.deleteDatabase('MetisDb');

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

		insertTransaction.oncomplete = function() {
			console.log("ALL INSERT TRANSACTIONS COMPLETE");
		}

		insertTransaction.onerror = function() {
			console.log("PROBLEM INSERTING RECORDS");
		}
		
		blockedSites.forEach(site => {
			let request = objectStore.add(site);

			request.onsuccess = function() {
				console.log("Added: ", site);
			}
		})
	}
}

function getRecord(url) {
	if(db) {
		const getTransaction = db.transaction("BlockedSites", "read");
		const objectStore = insertTransaction.objectStore("BlockedSites");

		getTransaction.oncomplete = function() {
			console.log("ALL INSERT TRANSACTIONS COMPLETE");
		}

		getTransaction.onerror = function() {
			console.log("PROBLEM INSERTING RECORDS");
		}
		
		blockedSites.forEach(site => {
			let request = objectStore.add(site);

			request.onsuccess = function() {
				console.log("Added: ", site);
			}
		})
	}
}
