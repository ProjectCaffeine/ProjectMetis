chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if(request.message === "insert") {
		if(request.payload) {
			alert("Successful insert.");
		}
	} else if(request.message === "update") {
		if(request.payload) {
			alert("Successful update.");
		}
	}
	else if(request.message === "delete") {
		if(request.payload) {
			alert("Successful delete.");
		}
	}
	else if(request.message === "get") {
		if(request.payload) {
			alert("Successful get.");
		}
	}
});

function getBaseUrl(url) {
	// Regular expression to match the main URL
	const urlRegex = /^(https?:\/\/[^/]+)/;

	// Use the exec method of the regular expression to extract the matched part
	const matches = urlRegex.exec(url);

	return matches ? matches[1] : null;
}

document.getElementById("BlockCurrentSiteButton").addEventListener('click', event => {
	chrome.tabs.query({active: true, currentWindow: true}).then((e) => {
		(async () => {
			var url = getBaseUrl(e[0].url);

			chrome.runtime.sendMessage({
				message: "insert",
				payload: [{
					"url": url
				}]
			})
		})();
	});
});

document.getElementById("UnBlockSiteButton").addEventListener('click', event => {
	chrome.tabs.query({active: true, currentWindow: true}).then((e) => {
		(async () => {
			var url = document.getElementById("UnBlockSiteInput").value;
			

			console.log(url);

			chrome.runtime.sendMessage({
				message: "delete",
				payload: [{
					"url": url
				}]
			})
		})();
	});
});
