
export function getBaseUrl(url) {
	// Regular expression to match the main URL
	const urlRegex = /^(https?:\/\/[^/]+)/;

	// Use the exec method of the regular expression to extract the matched part
	const matches = urlRegex.exec(url);

	return matches ? matches[1] : null;
}
