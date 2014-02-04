var CSSOM = require('cssom');

var Customizer = {};

// variables prefix
Customizer.CONTAINER_CLASS = ".pc",
Customizer.XS_CLASS        = ".xs",
Customizer.SM_CLASS        = ".sm",
Customizer.MD_CLASS        = ".md",
Customizer.LG_CLASS        = ".lg";

// return if an object is a style rule
Customizer.isStyleRule = function isStyleRule(obj) {
	return obj.selectorText != undefined;
}

// return if an object is a media rule
Customizer.isMediaRule = function isMediaRule(obj) {
	return obj.media;
}

// return an array of selectors prefixed
// 
Customizer.updateSelectors = function updateSelectors(CSSRule, prefix){
	var selectorArray = CSSRule.selectorText.split(",");
	
	// for each selector
	for(var i=0; i<selectorArray.length; i++){
		
		// selector at index i
		var selector = selectorArray[i];
		
		var temp= "";
		var selectors="";
		
		for(var j=0; j<prefix.length; j++){
			temp = prefix[j]+" "+selector.trim() + ((j!=prefix.length-1) ? "," : "").trim();
			selectors+=temp;
		}
		// update selector
		selectorArray[i]= selectors.toString();
	}
	return selectorArray.toString();
}

Customizer.parseBootstrap = function parseBootstrap(plainTextData) {

	console.log("Beginning of the process.");

	var bootstrapStylesheet = CSSOM.parse(plainTextData),
		bootstrapRules = bootstrapStylesheet.cssRules;

	for(var i=0, bootstrapCSSRule; bootstrapCSSRule = bootstrapRules[i]; i++) {

			if(this.isStyleRule(bootstrapCSSRule)) {
				bootstrapCSSRule.selectorText = this.updateSelectors(bootstrapCSSRule, [this.CONTAINER_CLASS]);
			}

			// bootstrapCSSRule => media query
			if(bootstrapCSSRule.media != undefined && bootstrapCSSRule.media[0] !='print')
			{
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

				// return the content of a media query
				for(var k=0, cssRule; cssRule = bootstrapCSSRule.cssRules[k]; k++) {

					// cssRules => selectorss in the media query
					cssRule.selectorText = this.updateSelectors(cssRule, prefix);
					
					// to insert cssRules in the good order we have to increment i of k
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

// unset an element by its index
Array.prototype.unset = function(val) {
	var index = this.indexOf(val);
	if(index > -1) {
		this.splice(index,1)
	}
}

module.exports = Customizer;