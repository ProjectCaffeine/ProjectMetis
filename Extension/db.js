let db = null;

export function createDatabase(callback) {
	if(db) {
		callback();
		return;
	}

	const request = indexedDB.open('MetisDb', 2);

	request.onerror = function(event) {
		console.log("Problem opening DB.");
	}

	request.onupgradeneeded = function(event) {
		db = event.target.result;

		let objectStore;

		if(!db.objectStoreNames.contains("BlockedSites")) {
			objectStore = db.createObjectStore('BlockedSites', {
				keyPath: "url"
			});
		} else {
			objectStore = request.transaction.objectStore("BlockedSites");
		}

		if(!objectStore.indexNames.contains("url")) {
			objectStore.createIndex("url", "url", {unique: true});
		}

		objectStore.transaction.oncomplete = function(event) {
			console.log("ObjectStore Created.")
		}
	}

	request.onsuccess = function(event) {
		db = event.target.result;

		if(callback !== undefined)
			callback();
	}
}

export function deleteDatabase() {
	const request = indexedDB.deleteDatabase('MetisDb');

	request.onerror = function(event) {
		console.log("Problem deleting DB.");
	}

	request.onsuccess = function(event) {
		console.log("DB deleted.")
	}
}

export function insert_records(records, callback) {
	if(db) {
		const insertTransaction = db.transaction("BlockedSites", "readwrite");
		const objectStore = insertTransaction.objectStore("BlockedSites");

		return new Promise((resolve, reject) => {
			insertTransaction.oncomplete = function() {
				console.log("ALL INSERT TRANSACTIONS COMPLETE");
				resolve(true);
				callback();
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

export function getRecord(url, callback) {
	if(db) {
		const getTransaction = db.transaction("BlockedSites", "readonly");
		const objectStore = getTransaction.objectStore("BlockedSites");

		return new Promise((resolve, reject) => {
			getTransaction.onerror = function() {
				console.log("PROBLEM INSERTING RECORDS");
			}

			let request = objectStore.index('url').get(url);

			request.onsuccess = function(event) {
				resolve(event.target.result);

				if(callback !== undefined)
					callback(event.target.result);
			}
		})
	}
}

export function update_record(record) {
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

export function delete_record(url) {
	if(db) {
		const deleteTransaction = db.transaction("BlockedSites", "readwrite");
		const objectStore = deleteTransaction.objectStore("BlockedSites");

		console.log(url[0].url);
		return new Promise((resolve, reject) => {
			deleteTransaction.oncomplete = function() {
				console.log("ALL DELETE TRANSACTIONS COMPLETE");
				resolve(true);
			}

			deleteTransaction.onerror = function() {
				console.log("PROBLEM DELETING RECORDS");
				resolve(false);
			}

			let request = objectStore.delete(url[0].url);
		});
	}
}

//module.exports = {createDatabase, getRecord, insert_records}
