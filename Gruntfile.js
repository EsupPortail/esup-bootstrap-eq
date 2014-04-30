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