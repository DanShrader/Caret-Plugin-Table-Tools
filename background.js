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
		var options = message.options || {};
		var deliminator = options.deliminator || ",";
		var header = options.header || true;
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
					// console.log("text String is : " + tabularData[i][ii]);
					// console.log("data length is : " + tabularData[i][ii].length);
					// console.log(" row length is : " + maxRowLen[ii]);
					var whitespace = maxRowLen[ii] - tabularData[i][ii].length;
					if (whitespace < 0) {
						whitespace = 0
					}
					// console.log(whitespace);
					tabularData[i][ii] = tabularData[i][ii] + ' '.repeat(whitespace);
				}
			});
		});
		var returnData = "";
		tabularData.forEach(function (row, i) {
			returnData = returnData + (row.join(" | ")).trim() + "\n";
		});
		sendToCaret('editor:insert', returnData, true);
	});