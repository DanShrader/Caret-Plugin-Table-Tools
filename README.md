# Caret-Plugin-Table-Tools
This Caret plugin currently allows for CSV to be converted to Markdown and soon for easy Markdown table formatting.  Eventually it will allow for HTML formatting as well.

Here's the [link](https://chrome.google.com/webstore/search/npkbhkdbgkoanfjllmookbonhfpckdel) to the extension on the chrome webstore.

The options for [CSV To Markdown Table](https://github.com/donatj/CsvToMarkdownTable) are passed via "optionsCSV"

**Note:** the patten for formatting a Markdown Table is influenced by [CSV To Markdown Table](https://github.com/donatj/CsvToMarkdownTable).


## To use with Caret

You'll need to add the following to your api.json file, under settings menu.  This plugin
can pass the same options that JS-Beautify does in the 'options' tag.  **Note:** The id is the id found under extensions. The one in here is for hte plugin on the webstore.

### api.json

```JavaScript
{
	"sampleMessage": {
		"id": "extension id goes here",
		"message": {
			"data": "message can be any JSON object passable to chrome.runtime.sendMessageExternal"
		}
	},"CSV-to-MD": {
		"id": "npkbhkdbgkoanfjllmookbonhfpckdel",
		"message": {
		  "command":"CSV-to-MD",
			"optionsCSV": {
				// "deliminator": "\t", //tab
				"deliminator": ",", //,
				// "header": false
				"header": true
			}
		},
		"sendEditorContext": true
	}
	,"Pretty-MD": {
		"id": "npkbhkdbgkoanfjllmookbonhfpckdel",
	  "message": {
	    "command":"Pretty-MD"
	  },
		"sendEditorContext": true
	}
}
```

### menus.json

This is optional, but allows the command to be accessable in menu system.

```JavaScript
{
	"label": "MD Table Beautify",
	"command": "api:execute",
	"argument": "Pretty-MD"
},
{
	"label": "Format SQL",
	"command": "api:execute",
	"argument": "format-SQL"
}
```



## The following have contributed works

Without the following, this plug-in would not exist.  Thanks to their works.

- [Caret](https://github.com/thomaswilburn/Caret)
- [CSV To Markdown Table](https://github.com/donatj/CsvToMarkdownTable) - their pattern is the base for the markdown formatting.
