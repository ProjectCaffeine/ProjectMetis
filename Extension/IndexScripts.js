chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if(request.message === "insert") {
		if(request.payload) {
			alert("Successful insert.");
			console.log("successful insert");
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
	event.preventDefault();

	chrome.runtime.sendMessage({
		message: "insert",
		payload: [{
			"url": "test.com"
		}]
	})
});
