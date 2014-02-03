var CSSOM = require('cssom');

var Customizer = {};

Customizer.CONTAINER_CLASS = ".pc",
Customizer.XS_CLASS        = ".xs",
Customizer.SM_CLASS        = ".sm",
Customizer.MD_CLASS        = ".md",
Customizer.LG_CLASS        = ".lg";

Customizer.isStyleRule = function isStyleRule(obj) {
	return obj.selectorText != undefined;
}

Customizer.isMediaRule = function isMediaRule(obj) {
	return obj.media;
}

Customizer.updateSelector = function updateSelector(CSSRule, prefix) {
	var selectorArray = CSSRule.selectorText.split(",");		
	for(var j=0; j<selectorArray.length; j++) {
		selectorArray[j] = prefix + " " + selectorArray[j].trim();
	}
	return selectorArray.toString();
}

Customizer.parseBootstrap = function parseBootstrap(plainTextData) {

	var bootstrapStylesheet = CSSOM.parse(plainTextData),
		bootstrapRules = bootstrapStylesheet.cssRules;

	// Todo

	return bootstrapStylesheet.toString();
}

Array.prototype.unset = function(val) {
	var index = this.indexOf(val);
	if(index > -1) {
		this.splice(index,1)
	}
}

module.exports = Customizer;