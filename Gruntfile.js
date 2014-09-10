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

module.exports = function(grunt) {

	'use strict';

	/* Load Tasks */

	var Customizer = require('./modules/Customizer');

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-cssbeautifier');

	/* Tasks Configuration */ 

    grunt.initConfig({

	 	customize : {},
	 	
	 	copy : {
	 		main : {
	 			files : [
	 				{
	 					expand: true,
	 					flatten : true,
	 					src : ['lib/bootstrap/dist/fonts/*'],
	 					dest : 'dist/bootstrap/fonts'
	 				},
	 				{
	 					expand: true,
	 					flatten : true,
	 					src : ['lib/bootstrap/dist/js/*'],
	 					dest : 'dist/bootstrap/js'
	 				}
	 			]
	 		}
	 	},
	 	
	 	cssmin : {
	 	  combine : {
	 	  	files : {
	 	  		'dist/bootstrap/css/bootstrap.min.css' : ['dist/bootstrap/css/bootstrap.css']
	 	  	}
	 	  }
	 	},
	 	
	 	cssbeautifier : {
		  files : ["dist/bootstrap/css/bootstrap.css"]
		}
	
	});

    /* Tasks */ 

	grunt.registerTask('customize', 'customize bootstrap for a portal context', function() {
		var plainTextCustomBootstrap = Customizer.parseBootstrap(grunt.file.read('lib/bootstrap/dist/css/bootstrap.css', { encoding : 'utf8' }));
		grunt.file.write('dist/bootstrap/css/bootstrap.css', plainTextCustomBootstrap);
	});

    grunt.registerTask('build', ['copy', 'customize', 'cssmin', 'cssbeautifier']);
}