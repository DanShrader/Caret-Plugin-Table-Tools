var caretId = "fljalecfjciodhpcledpamjachpmelml";
var sendToCaret = function (command, argument, quiet) {
	var message = {
		command: command,
		argument: argument,
		quiet: quiet
	};
	chrome.runtime.sendMessage(caretId, message);
};
chrome.runtime.onMessageExternal.addListener(
	function (message, sender, sendResponse) {
		var data = message.context.selection;
		var command = message.command || 'none';
		var returnData = "";
		// This is for formatting a Markdown Table
		if (command === "Pretty-MD") {
		// 	console.log('Pretty-MD')
			// console.info(data);
			var columns = data.split("\n");
			var tabularData = [];
			var maxRowLen = [];
			columns.forEach(function (e, i) {
				if (typeof tabularData[i] == "undefined") {
					tabularData[i] = [];
				}
				var row = e.split("|");
				row.forEach(function (ee, ii) {
					if (typeof maxRowLen[ii] == "undefined") {
						maxRowLen[ii] = 0;
					}
					if (ee.indexOf("--") !== -1) {
						//tabularData[i][ii] = '-'.repeat(maxRowLen[ii]);
						tabularData[i][ii] = "--";
					} else {
						maxRowLen[ii] = Math.max(maxRowLen[ii], ee.trim().length);
						tabularData[i][ii] = ee.trim();
					}
				});
			});
			columns.forEach(function (e, i) {
				if (typeof tabularData[i] == "undefined") {
					tabularData[i] = [];
				}
				var row = e.split("|");
				row.forEach(function (ee, ii) {
					if (tabularData[i][ii].indexOf("--") !== -1) {
						tabularData[i][ii] = '-'.repeat(maxRowLen[ii]);
					} else {
						var whitespace = maxRowLen[ii] - tabularData[i][ii].length;
						if (whitespace < 0) {
							whitespace = 0;
						}
						tabularData[i][ii] = tabularData[i][ii] + ' '.repeat(whitespace);
					}
				});
			});
			tabularData.forEach(function (row, i) {
				returnData = returnData + (row.join(" | ")).trim() + "\n";
			});
		}
		// This is for converting a CSV File to markdown
		if (command === "CSV-to-MD") {
		// 	console.log('CSV-to-MD')
		// 	console.log(message)
			var optionsCSV = message.optionsCSV || {};
			var deliminator = optionsCSV.deliminator || ",";
			var header = optionsCSV.header || true;
			data = data.replace(/(?:\r\n|\r|\n)/g, '\n');
			returnData = csvToMarkdown(data, deliminator, header);
		}
		sendToCaret('editor:insert', returnData, true);
	});