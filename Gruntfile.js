module.exports = function(grunt) {

  grunt.initConfig({
    // HTML
  	codekit: {
  	    html: {
  		    files: [{
  			    expand: true,
  			    cwd: "src/kit/",
  			    src: "*.kit",
  			    dest: "build",
  			    ext: ".php"
  		    }]
  		},
  	    wp: {
  		    files: [{
  			    expand: true,
  			    cwd: "src/kit/wp/",
  			    src: "*.kit",
  			    dest: "build",
  			    ext: ".php"
  		    }]
  		}
  	},

    // Sass
    sass: {
	    options: {
		    sourceMap: true,
		    includePaths: require("node-neat").includePaths
	    },
	    dist: {
		    src: ["src/scss/lodybo.scss"],
		    dest: "build/style.css"
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
			    "build/js/scripts.min.js" : ["src/js/scripts/*.js"]
		    }
	    }
    },

    // GENERIC
    clean: {
	    build: "build",
	    sassdoc: "docs/sassdoc",
	    jsdoc: "docs/jsdoc"
    },
    copy: {
	    assets: {
		    files: [{
			    expand: true,
			    flatten: true,
			    src: ["src/assets/**/*.js"],
			    dest: "build/js"
		    }, {
			    expand: true,
			    flatten: true,
			    src: ["src/assets/**/*.css"],
			    dest: "build/css"
		    }, {
			    expand: true,
			    flatten: true,
			    src: ["src/assets/**/*.jpg", "src/assets/**/*.jpeg", "src/assets/**/*.png"],
			    dest: "build/assets/images"
		    }]
	    }
    },
    php: {
  	    server: {
  		    options: {
  			    port: "8080",
  			    base: "build",
  			    livereload: true,
            open: true
  		    }
  	    },
  	    docs : {
  		    options: {
  			    port: "4153", // stands for "DOC"
  			    base: "docs/sassdoc"
  		    }
  	    }
  	},
  	watch: {
  	    options: {
  		    livereload: true
  	    },
  	    html: {
  		    files: ["src/kit/*.kit"],
  		    tasks: ["kit:html"]
  	    },
  	    wp: {
  		    files: ["src/kit/wp/*.kit"],
  		    tasks: ["kit:wp"]
  	    },
  	    scss: {
  		    files: ["src/**/*.scss"],
  		    tasks: ["scss"]
  	    }
  	}
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask("kit", function (mode) {
    if (mode) {
      grunt.task.run(["codekit:" + mode]);
    } else {
      grunt.task.run(["codekit"]);
    }
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
  grunt.registerTask("build", ["clean:build", "kit", "scss", "js", "copy"]);

  grunt.registerTask("default", ["serve"]);

};
