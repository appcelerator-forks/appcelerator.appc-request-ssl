var exec = require('child_process').exec;

module.exports = function(grunt) {

	var tests = ['test/**/*_test.js'];

	// Project configuration.
	grunt.initConfig({
		mochaTest: {
			options: {
				timeout: 3000,
				reporter: 'spec',
				ignoreLeaks: false,
				globals: []
			},
			src: tests
		},
		appcJs: {
			options: {
				force: true
			},
			src: ['index.js', 'lib/**/*.js', 'test/**/*.js']
		},
		kahvesi: { src: tests }
	});

	// Load grunt plugins for modules
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-appc-js');
	grunt.loadNpmTasks('grunt-kahvesi');

	// compose our various coverage reports into one html report
	grunt.registerTask('report', function() {
		var done = this.async();
		exec('./node_modules/grunt-kahvesi/node_modules/.bin/istanbul report html', function(err) {
			if (err) { grunt.fail.fatal(err); }
			grunt.log.ok('composite test coverage report generated at ./coverage/index.html');
			return done();
		});
	});

	grunt.registerTask('cover', ['kahvesi', 'report']);
	grunt.registerTask('test', ['appcJs', 'mochaTest']);
	grunt.registerTask('default', ['test']);

};
