var CSSOM = require('cssom');

var Customizer = {};

// variables prefix
Customizer.CONTAINER_CLASS = ".pc",
Customizer.XS_CLASS        = ".xs",
Customizer.SM_CLASS        = ".sm",
Customizer.MD_CLASS        = ".md",
Customizer.LG_CLASS        = ".lg";

// @Return : Boolean
// return if an object is a style rule
Customizer.isStyleRule = function isStyleRule(obj) {
	return obj.selectorText != undefined;
}

// @Return : Boolean
// return if an object is a media rule
Customizer.isMediaRule = function isMediaRule(obj) {
	return obj.media != undefined && obj.media[0] !='print';
}

// @Return : String
// return an array of selectors prefixed
Customizer.updateSelectors = function updateSelectors(CSSRule, prefix) {
	var selectorArray = CSSRule.selectorText.split(",");
	
	// for each selector
	for(var i=0; i<selectorArray.length; i++){
		
		// selector at index i
		var selector = selectorArray[i];
	
		var updatedSelectors="";
		
		for(var j=0; j<prefix.length; j++) {
			
			updatedSelectors += prefix[j]+" "+selector.trim(); 
			//  The last one mustn't have a coma
			updatedSelectors += ((j!=prefix.length-1) ? "," : "").trim();
		}
		// update selector
		selectorArray[i]= updatedSelectors.toString();
	}
	return selectorArray.toString();
}

/* @Return : String */
/* Will loop over all the CSS, and custom it */
Customizer.parseBootstrap = function parseBootstrap(plainTextData) {
	/* Create an array representing the CSS Object Model */
	var bootstrapStylesheet = CSSOM.parse(plainTextData),
		bootstrapRules = bootstrapStylesheet.cssRules;

	// Loop all over the array
	for(var i=0, bootstrapCSSRule; bootstrapCSSRule = bootstrapRules[i]; i++) {

		if(this.isStyleRule(bootstrapCSSRule)) {
			bootstrapCSSRule.selectorText = this.updateSelectors(bootstrapCSSRule, [this.CONTAINER_CLASS]);
		}

		// If the current rule is a media query, then we go here
		if(this.isMediaRule(bootstrapCSSRule)) {
			
			// an array wich contains prefixes
			var prefix = [];
			
			switch(bootstrapCSSRule.media[0]) {
				case "(max-width: 767px)": // XS
					prefix.push(this.XS_CLASS);
					break;
				case "(min-width: 768px)" : // SM, MD, LG
				case "screen and (min-width: 768px)" : // SM, MD, LG
					prefix.push(this.CONTAINER_CLASS+this.SM_CLASS, this.CONTAINER_CLASS+this.MD_CLASS, this.CONTAINER_CLASS+this.LG_CLASS);
					break;
				case "(min-width: 768px) and (max-width: 991px)" : // SM
					prefix.push(this.CONTAINER_CLASS+this.SM_CLASS);
					break;	
				case "(min-width: 992px)" : // MD, LG
					prefix.push(this.CONTAINER_CLASS+this.MD_CLASS, this.CONTAINER_CLASS+this.LG_CLASS);
					break;
				case "(min-width: 992px) and (max-width: 1199px)" : // MD
					prefix.push(this.CONTAINER_CLASS+this.MD_CLASS);
					break;
				case "(min-width: 1200px)" : // LG
					prefix.push(this.CONTAINER_CLASS+this.LG_CLASS);
					break;
			}

			// loop over all rules of the current media query
			for(var k=0, cssRule; cssRule = bootstrapCSSRule.cssRules[k]; k++) {

				cssRule.selectorText = this.updateSelectors(cssRule, prefix);
				
				// if we don't increment i by k, the cssRules will be desc.
				bootstrapRules.splice(i+k, 0, cssRule);
			}
			// remove the media query
			bootstrapRules.unset(bootstrapCSSRule);

			// increment i to not prefix a second time selectors inherited from the media
			i += bootstrapCSSRule.cssRules.length - 1;
		}

	}

	return bootstrapStylesheet.toString();
}

// Extends Array Class
// Unset an element by it's value
Array.prototype.unset = function(val) {
	var index = this.indexOf(val);
	if(index > -1) {
		this.splice(index,1)
	}
}

// Export this object as a Node Module
module.exports = Customizer;