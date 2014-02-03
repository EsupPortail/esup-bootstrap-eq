require('load-grunt-tasks');

//var bower = require('grunt-bower-task');
//var custom = require('custom');
module.exports = function(grunt) {
    // Project configuration
    grunt.initConfig({
    	pkg: grunt.file.readJSON('package.json'),
    	bower: {
    		install: {
    			options: {
    				targetDir: './libs',
    				layout: 'byType',
	 				install: true,
	 				verbose: false,
	 				cleanTargetDir: false,
	 				cleanBowerDir: false,
	 				bowerOptions: {}
	 			}
	 		}
	 	},

	 	custom: {
	 		bootstrap: {
	 			// src: [
	 			// '/app/components/bootstrap/dist/css/bootstrap.css',
	 			// ],
	 			// dest: '/dist/css/customBootstrap.css'
	 		}
	 	},



	 });

    // Load bower task plugin
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('custom');

    // The default task - install the bower dependencies
    grunt.registerTask('default', ['bower:install', 'custom:bootstrap']);
    
}