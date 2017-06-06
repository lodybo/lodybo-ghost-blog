module.exports = function (grunt) {

	grunt.initConfig({
		// Sass
		sass: {
			options: {
				sourceMap: true,
				includePaths: require("node-neat").includePaths
			},
			dev: {
				src: ["src/scss/lodybo.scss"],
				dest: "build/content/themes/lodybo-theme/assets/css/styles.css"
			},
			prod: {
				src: ["src/scss/lodybo.scss"],
				dest: "dist/lodybo-theme/assets/css/styles.css"
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
			dev: {
				src: ["<%= sass.dev.dest %>"],
				dest: "<%= sass.dev.dest %>"
			},
			prod: {
				src: ["<%= sass.prod.dest %>"],
				dest: "<%= sass.prod.dest %>"
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
		eslint: {
			production: {
				options: {
					configFile: ".eslintrc.json"
				},
				src: ["src/js/**/*.js"]
			},
			dev: {
				options: {
					configFile: ".eslintrc.json",
					rules: {
						"no-debugger": "off"
					}
				},
				src: ["src/js/**/*.js"]
			}
		},
		karma: {
			options: {
				configFile: "karma.conf.js",
				browsers: ["PhantomJS"]
			},
			unit: {
				autoWatch: false,
				background: false,
				singleRun: true
			},
			"unit-watch": {
				autoWatch: true
			}
		},
		uglify: {
			production: {
				options: {
					sourceMap: true
				},
				files: {
					"dist/lodybo-theme/assets/js/scripts.min.js": ["src/js/*.js", "!src/js/*.spec.js"]
				}
			},
			dev: {
				options: {
					mangle: false,
					compress: false,
					beautify: true
				},
				files: {
					"build/content/themes/lodybo-theme/assets/js/scripts.min.js": ["src/js/*.js", "!src/js/*.spec.js"]
				}
			}
		},

		// GENERIC
		clean: {
			dist: "dist",
			build: "build",
			sassdoc: "docs/sassdoc",
			jsdoc: "docs/jsdoc"
		},
		copy: {
			data : {},
			"ghost-configuration": {
				expand: true,
				flatten: true,
				src: "assets/configuration/config.js",
				dest: "build/"
			},
			"ghost-data": {
				expand: true,
				flatten: true,
				src: "assets/data/ghost-dev.db",
				dest: "build/content/data"
			},
			"images-prod": {
				files: [{
					expand: true,
					flatten: true,
					src: ["assets/images/**/*.jpg", "assets/images/**/***/.jpeg", "assets/images/**/*.png"],
					dest: "dist/lodybo-theme/assets/images"
				}]
			},
			"images-dev": {
				files: [{
					expand: true,
					flatten: true,
					src: ["assets/images/**/*.jpg", "assets/images/**/***/.jpeg", "assets/images/**/*.png"],
					dest: "build/content/themes/lodybo-theme/assets/images"
				}]
			},
			"templates-dev": {
				files: [
					{
						expand: true,
						flatten: true,
						src: ["src/templates/**/*.hbs"],
						dest: "build/content/themes/lodybo-theme"
					}
				]
			},
			"templates-prod": {
				files: [
					{
						expand: true,
						flatten: true,
						src: ["src/templates/**/*.hbs"],
						dest: "dist/lodybo-theme"
					}
				]
			}
		},
		watch: {
			options: {
				livereload: true
			},
			scss: {
				files: ["src/**/*.scss"],
				tasks: ["scss"]
            },
            handlebars: {
                files: ["src/**/*.hbs"],
				tasks: ["copy:templates-dev"]
			},
			js: {
				files: ["src/js/**/*.js"],
				tasks: ["eslint:dev" /*, "karma:unit"*/ , "uglify:dev"]
			}
		}
	});

	require('load-grunt-tasks')(grunt);

	// ***** GRUNT TASKS

	grunt.registerTask("create-theme-package", function () {
		var pkg = grunt.file.readJSON("package.json");
		var themePackage = {
			name: pkg.name,
			version: pkg.version
		};

		grunt.file.write("dist/lodybo-theme/package.json", JSON.stringify(themePackage));
		console.log("Written theme package.json for Lodybo Ghost Theme");
		console.log("- Theme name: ", themePackage.name);
		console.log("- Theme version: ", themePackage.version);
	});

	grunt.registerTask("scss:dev", ["scsslint", "sass:dev", "postcss:dev", "sassdoc"]);
	grunt.registerTask("scss:prod", ["scsslint", "sass:prod", "postcss:prod", "sassdoc"]);

	grunt.registerTask("js", ["test", "uglify:production"]);

	grunt.registerTask("docs", function (mode) {
		var docList = ["sassdoc", "jsdoc"];
		var cleanList = ["clean:sassdoc", "clean:jsdoc"];
		var TaskList = [];

		if (mode && mode === "sass") {
			docList.pop();
			cleanList.pop();
		}
		else if (mode && mode === "js") {
			docList.shift();
			cleanList.shift();
		}

		taskList = cleanList.concat(docList);

		grunt.task.run(taskList);
	});

	grunt.registerTask("start", ["concurrent:dev"]);
	grunt.registerTask("serve", ["watch"]);

	grunt.registerTask("test", ["eslint:production" /*, "karma:unit"*/]);
	grunt.registerTask("build", ["clean:build", "scss:dev", "js", "copy:ghost-configuration", "copy:ghost-data", "copy:images-dev", "copy:templates-dev", "create-theme-package"]);

	grunt.registerTask("default", ["serve"]);

};
