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

document.getElementById("BlockCurrentSiteButton").addEventListener('click', event => {
	chrome.tabs.query({active: true, currentWindow: true}).then((e) => {
		(async () => {
			const src = chrome.runtime.getURL("./libs/UrlHelperScripts.js");
			const urlHelperModule = await import(src);

			chrome.runtime.sendMessage({
				message: "insert",
				payload: [{
					"url": urlHelperModule.getBaseUrl(e[0].url)
				}]
			})
		})();
	});
});
