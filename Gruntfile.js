module.exports = function(grunt) {
	grunt.initConfig({
		// Watch task
		watch: {
			sass: {
				files: ["dev/sass/*.sass"],
				tasks: ["sass"]
			},
			js_files: {
				files: ["dev/javascript/*.js"],
				tasks: ["uglify"]	
			}
		},
		// Sass task
		sass: {
			dist: {
				options: {
					style: "compressed"
				},
				files: {
					"dev/prod/css/style.css": "dev/sass/base.sass"
				}
			}
		},
		// Uglify
		uglify: {
			my_target: {
				files: {
					"dev/prod/js/actions.min.js": ["dev/javascript/*.js"],
				}
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-contrib-sass");
	grunt.loadNpmTasks("grunt-contrib-uglify");

	// Default task
	grunt.registerTask("default", ["watch","sass","uglify"]);
};