/*
 * simpGrunt - https://github.com/arthurcamara1/simpGrunt
 * Gruntfile.js
 */

module.exports = function(grunt) {

	//options
	var src_folder_name = grunt.option('src') || 'src';

	//definitions
	var SRC = src_folder_name +'/',
		SRC_LAYOUTS = SRC + 'layouts/',
		SRC_PAGES = SRC + 'pages/',
		SRC_PARTIALS = SRC + 'partials/',
		SRC_LESS = SRC + 'less/',
		SRC_IMG = SRC + 'img/',
		SRC_JS = SRC + 'js/',
		SRC_DATA = SRC + 'data/',
		SRC_LIBS = SRC + 'libs/',
		TARGET = 'web/',
		TARGET_CSS = TARGET + 'css/',
		TARGET_JS = TARGET + 'js/',
		TARGET_IMG = TARGET + 'img/';
		TARGET_LIBS = TARGET + 'libs/';

    // Project configuration and Tasks
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        //concatenate javascript
        concat: {
	    	options: {
	    		separator: ';'
	    	},
	    	dist: {
	    		src: [ SRC_JS + '/**/*.js' ],
	    		dest: TARGET_JS + 'scripts.js'
	      	}
	    },

	    //uglify javascript
	    uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			production: {
				files: {
				  '<%= concat.dist.dest %>': ['<%= concat.dist.dest %>']
				}
			},
			development: {   
				options: {
					beautify : true 
				},   
				files : {
					'<%= concat.dist.dest %>': ['<%= concat.dist.dest %>']
				}
			}
	    },

	    //assemble handlebars templates
        assemble: {
            options: {
                layout: SRC_LAYOUTS + 'default.hbs',
                partials: [SRC_PARTIALS + '/**/*.hbs' ],
                data: SRC_DATA + '*.json',
                flatten: true
            },
            pages: {
                files: {
                    'web/': [ SRC_PAGES +'*.hbs' ]
                }
            }
        },
        clean: {
			all: ['web/**']
		},

		//minify less files
		less: {
			production: {
				options: {
					paths: ["src/less"],
					yuicompress: true,
					compress: true
				},
				files: {
					"web/css/style.css": SRC_LESS + "main.less"
				}
			},
			development: {
				options: {
					paths: ["src/less"]
				},
				files: {
					"web/css/style.css": SRC_LESS + "main.less"
				}
			}
		},

		//minify html files in web directory
		htmlmin: {                                     
		    dist: {                                       
		      options: {                                  
		        removeComments: true,
		        collapseWhitespace: true
		      },
		      files: [{
		          expand: true,      
		          cwd: TARGET,       
		          src: '*.html',  
		          dest: TARGET,    
		      }],
		    }
	  	},

	  	//optimize images
	  	imagemin: {                           
		    dist: {                            
		      options: {                       
		        optimizationLevel: 3
		      },
		      files: [{
		          expand: true,      
		          cwd: SRC_IMG,       
		          src: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif'],   
		          dest: TARGET_IMG,    
		      }],
		    }
		},

		//watch mode
		watch: {
			files: [ SRC + '**/*'],
			tasks: ['default'],
		},

		//copy libraries
		copy: {
			main: {
				files: [
					// includes files within path and its sub-directories
					{expand: true, cwd: SRC_LIBS, src: ['**'], dest: TARGET_LIBS}
				]
			}
		}
	}
    );

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('assemble');

    // Default task.
  	grunt.registerTask('default', ['build', 'watch']);

    grunt.registerTask('build', ['clean', 'assemble', 'concat', 'uglify:production', 'less:production', 'htmlmin', 'imagemin', 'copy']);

    grunt.registerTask('build-development', ['clean', 'assemble', 'concat', 'uglify:development', 'less:development', 'copy']);


};