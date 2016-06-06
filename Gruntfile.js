module.exports = function(grunt) {

  grunt.initConfig({
    // Sass
    sass: {
	    options: {
		    sourceMap: true,
		    includePaths: require("node-neat").includePaths
	    },
	    dist: {
		    src: ["src/scss/lodybo.scss"],
		    dest: "dist/content/themes/lodybo-theme/assets/css/styles.css"
	    }
    },
    postcss: {
	    options: {
        processors: [
          require('autoprefixer-core')({
            browsers: ['last 3 versions', 'ie 9', 'ie 10']
          })
        ],
		    map: true
	    },
	    dist: {
		    src: ["<%= sass.dist.dest %>"],
		    dest: "<%= sass.dist.dest %>"
	    }
    },
    sassdoc: {
	    docs: {
		    src: ["src/scss/**/*.scss"],
		    options: {
					dest: "docs/sassdoc/",
					groups: {
							"undefined": "General",
							"colors": "Colors",
							"fonts": "Fonts"
					}
				}
    	}
    },
    scsslint: {
  		options: {
  			config: ".scss-lint-config.yml"
  		},
  		allFiles: [
  			"src/scss/**/*.scss",
        "!src/scss/settings/_normalize.scss"
  		]
  	},

    // JS
    jshint: {
	    all: ["Gruntfile.js", "src/js/**/*.js"]
    },
    jasmine: {
	    js: {
		    src: "src/js/scripts/*.js",
		    options: {
			    specs: "src/js/specs/*.js",
			    outfile: "test/jasmine/index.html",
			    vendor: [
				    "http://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js",
				    "http://cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.15/angular-resource.min.js",
				    "http://cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.15/angular-mocks.js"
			    ]
		    }
		}
    },
    uglify: {
	    js: {
		    options: {
			    sourceMap: true
		    },
		    files: {
			    "dist/content/themes/lodybo-theme/assets/js/scripts.min.js" : ["src/js/scripts/*.js"]
		    }
	    }
    },

    // GENERIC
    clean: {
			dist: "dist",
	    build: "build",
	    sassdoc: "docs/sassdoc",
	    jsdoc: "docs/jsdoc",
			ghost: "assets/heroku-preconfigured-ghost",
    },
    copy: {
			ghost: {
				expand: true,
				cwd: "assets/heroku-preconfigured-ghost",
				src: "**",
				dest: "dist/"
			},
	    images: {
		    files: [{
			    expand: true,
			    flatten: true,
			    src: ["assets/images/**/*.jpg", "assets/images/**/***/.jpeg", "assets/images/**/*.png"],
			    dest: "dist/assets/images"
		    }]
	    },
			templates: {
				files: [
					{
						expand: true,
						flatten: true,
						src: ["templates/**/*.hbs"],
						dest: "dist/content/themes/lodybo-theme"
					}
				]
			}
    },
    shell: {
			"pull-ghost": {
				command: "git clone https://github.com/lodybo/lodybo-ghost.git assets/heroku-preconfigured-ghost"
			},
			"install-ghost": {
				command: ["cd dist/", "npm install --production"].join("&&")
			},
			"run-ghost": {
				command: ["cd dist/", "npm start"].join("&&")
			}
		},
  	watch: {
  	    options: {
  		    livereload: true
  	    },
  	    scss: {
  		    files: ["src/**/*.scss"],
  		    tasks: ["scss"]
  	    }
  	}
  });

  require('load-grunt-tasks')(grunt);
	
	// ***** GRUNT TASKS
	grunt.registerTask("setup-ghost", function(run) {
		// ["clean:dist", "clean:ghost", "shell:pull-ghost", "copy:ghost", "shell:install-ghost"]
		
		console.log("Setting up Ghost..");
		
		// First clean the dist and ghost folders
		console.log("* Cleaning the dist/ and ghost/ folders");
		grunt.task.run(["clean:dist", "clean:ghost"]);
		
		// Pull ghost from server
		console.log("* Pulling Heroku-preconfigured Ghost instance from repo");
		grunt.task.run(["shell:pull-ghost"]);
		
		// Copy Ghost instance to dist folder
		console.log("* Copy Ghost instance to dist/ folder");
		grunt.task.run(["copy:ghost"]);
		
		// Finally, install Ghost
		console.log("* Running 'npm install --production' in dist/ folder");
		grunt.task.run(["shell:install-ghost"]);
		
		// If run
		if (run) {
			console.log("Running Ghost locally in dev mode");
			grunt.task.run(["shell:run-ghost"]);
		}
		
		// Done
		console.log("Done setting up Ghost..");
	});

  grunt.registerTask("scss", ["scsslint", "sass", "postcss", "sassdoc"]);

  grunt.registerTask("js", ["test", "uglify"]);

  grunt.registerTask("docs", function (mode) {
	  var docList = ["sassdoc", "jsdoc"];
	  var cleanList = ["clean:sassdoc", "clean:jsdoc"];
	  var TaskList = [];

	  if (mode && mode === "sass")
	  {
		  docList.pop();
		  cleanList.pop();
	  }
	  else if (mode && mode === "js")
	  {
		  docList.shift();
		  cleanList.shift();
	  }

  	  taskList = cleanList.concat(docList);

	  grunt.task.run(taskList);
  });

  grunt.registerTask("serve", ["php", "watch"]);

  grunt.registerTask("test", ["jshint"]);
  grunt.registerTask("build", ["clean:build", "scss", "js", "copy:templates"]);

  grunt.registerTask("default", ["serve"]);

};
