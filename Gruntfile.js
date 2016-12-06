module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            js: {
                src: ['!app/js/globalcrm.js', 'app/**/*.js'],
                dest: 'app/js/<%= pkg.name %>.js'
            },
            css: {
                src: ['app/sass/files/**/*.scss'],
                dest: 'app/sass/main.scss'//ignore it for now
            }
        },
        sass: {
            options: {
                sourceMap: true,
				outputStyle: 'compressed'
            },
            dist: {
                files: {
                    'assets/css/main.min.css': 'app/sass/files/test.scss'
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
				mangle: false//prevent changes to your variable and function names.
            },
            dist: {
                files: {
                    'assets/js/<%= pkg.name %>.min.js': ['<%= concat.js.dest %>']
                }
            }
        },
		watch: {
			js: {
				files: ['!app/js/globalcrm.js', 'app/**/*.js'],
				task: ['clean', 'concat', 'uglify']
			},
			css: {
				files: ['app/sass/files/test.scss'],
				task: ['sass']
			}
		},
		clean: {
			build: {
				src: ['app/js/globalcrm.js', 'assets/js/globalcrm.min.js']
			}
		}
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-sass');
    //grunt.loadNpmTasks('grunt-contrib-jshint');
    //grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch'); 
    grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-clean');


    //grunt.registerTask('test', ['jshint', 'qunit']);
    grunt.registerTask('test', ['clean']);//grunt test
    //grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
    grunt.registerTask('default', ['clean', 'concat', 'sass', 'uglify']);//run default one by one
};
