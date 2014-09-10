/**
 *  Licensed to ESUP-Portail under one or more contributor license
 *  agreements. See the NOTICE file distributed with this work for
 *  additional information regarding copyright ownership.
 * 
 *  ESUP-Portail licenses this file to you under the Apache License,
 *  Version 2.0 (the "License"); you may not use this file except in
 *  compliance with the License. You may obtain a copy of the License at:
 *  
 *  http://www.apache.org/licenses/LICENSE-2.0
 *  
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

var CSSOM = require('cssom');

var Customizer = {

	// Constants definition
	CONTAINER_CLASS : '.pc',
	XS_CLASS : '.xs',
	SM_CLASS : '.sm',
	MD_CLASS : '.md',
	LG_CLASS : '.lg',

	// Utils
	isStyleRule : function(rule) {
		return rule.hasOwnProperty('selectorText');
	},
	isMediaQuery : function(mq) {
		return mq.hasOwnProperty('media') && mq.media[0] !='print';
	},
	arrayUnset : function(arr, val) {
		var index = arr.indexOf(val);
		return index > -1 ? arr.splice(index,1) : arr;
	},
	/**
	 * [determinePrefix : Choose correct prefix to append base on the media query rule]
	 * 
	 * @param  {Object} MediaQuery object extracted from the CSS Object Model. 
	 * @return {Array}  Returns an array containing all CSS class to prepend to the CSS selectors.
	 */
	determinePrefix : function(mediaQuery) {
		var prefixes = {
			'480' : [Customizer.XS_CLASS],
			'767' : [Customizer.XS_CLASS],
			'768' : [Customizer.SM_CLASS, Customizer.MD_CLASS, Customizer.LG_CLASS],
			'768,991' : [Customizer.SM_CLASS],
			'992,1199' : [Customizer.MD_CLASS],
			'992' : [Customizer.MD_CLASS, Customizer.LG_CLASS],
			'1200' : [Customizer.LG_CLASS]
		};

		return prefixes[mediaQuery.match(/[0-9]+/g).join(',')].map(function(el) {
			return Customizer.CONTAINER_CLASS + el;
		});
	},
	/**
	 * [updateSelectors]
	 * 
	 * @param  {Object} CSSRule object extracted from the CSS Object Model
	 * @param  {Array}  Prefixes to prepend to the CSS selector
	 * @return {String} A stringified CSS selector with the correct CSS class added
	 */
	updateSelectors : function(CSSRule, prefixes) {
		var selectors = CSSRule.selectorText.split(',');
		
		return selectors.map(function(selector) {
			return prefixes.map(function(prefix) {
				return prefix + ' ' + selector.trim();
			}).join(',');
		}).join(',');
	},
	/**
	 * [flattenMediaQuery description]
	 * 
	 * @param  {Object} mq      MediaQuery object extracted from the CSS Object Model
	 * @param  {Number} indexMQ current index from the parent loop
	 * @param  {Array}  arr     Array containing all CSS and Media Query rules
	 * @return {Number}         Length of the MediaQuery css rules
	 */
	flattenMediaQuery : function(mq, indexMQ, arr) {
		var prefixes = Customizer.determinePrefix(mq.media[0]),
			mqRules = mq.cssRules;

		mqRules.forEach(function(cssRule, k, array) {

			cssRule.selectorText = Customizer.updateSelectors(cssRule, prefixes);
			arr.splice(k+indexMQ, 0, cssRule);
		});
		return mq.cssRules.length - 1;
	},
	/**
	 * [parseBootstrap : Will parse the bootstrap and update it]
	 * 
	 * @param  {[type]} Stringified representation of Twitter Bootstrap framework
	 * @return {String} Stringified representation of the updated Twitter Bootstrap framework
	 */
	parseBootstrap : function(plainTextBootstrap) {

		var bs = CSSOM.parse(plainTextBootstrap),
			rules = bs.cssRules;	

		for(var i = 0, rule; rule = rules[i]; i++) {
			if(Customizer.isStyleRule(rule)) {
				rule.selectorText = Customizer.updateSelectors(rule, [Customizer.CONTAINER_CLASS]);
			}
			if(Customizer.isMediaQuery(rule)) {
				i += Customizer.flattenMediaQuery(rule, i, rules);
				Customizer.arrayUnset(rules, rule);
			}
		}
		return bs.toString();
	}
};

module.exports = Customizer;