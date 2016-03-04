/* globals require */
/*jslint sloppy: true */

var // const
    TEMPLATES = './public/templates/**/*.hbs',
    TEMPLATES_FILE_NAME = 'project-templates.js',
    TEMPLATES_MINIFIED_FILE_NAME = 'project-templates.min.js',
    STYLES_BUILD_PATH = './build/css/',
    JS_LIB_FILES = './lib-scripts.json',
    JS_LIB_FILE_NAME = 'lib-scripts.js',
    JS_LIB_MINIFIED_FILE_NAME = 'lib-scripts.min.js',
    JS_PROJECT_FILES = './project-scripts.json',
    JS_PROJECT_FILE_NAME = 'project-scripts.js',
    JS_PROJECT_MINIFIED_FILE_NAME = 'project-scripts.min.js'
    JS_BUILD_PATH = './public/build/js/',
    gulp = require('gulp'),
    stylish = require('jshint-stylish'),
    $ = require('gulp-load-plugins')(),
    serveStatic = require('serve-static'),
    qunit = require('gulp-qunit'),
    bower = require('gulp-bower'),
    debug = require('gulp-debug'),
    runSequence = require('run-sequence'),
    libScripts = require(JS_LIB_FILES),
    projectScripts = require(JS_PROJECT_FILES);

gulp.task('templates', ['clean-templates'], function () {
    return gulp.src([TEMPLATES])
        .pipe($.handlebars())
        .pipe($.defineModule('plain'))
        .pipe($.declare({
            namespace: 'PROJECT.templates'
        }))
        .pipe($.concat(TEMPLATES_FILE_NAME))
        .pipe(gulp.dest(JS_BUILD_PATH))
        .pipe($.concat(TEMPLATES_MINIFIED_FILE_NAME))
        .pipe($.uglify())
        .pipe(gulp.dest(JS_BUILD_PATH));
});

gulp.task('clean-templates', function () {
    gulp.src(JS_BUILD_PATH + TEMPLATES_FILE_NAME, {read: false})
        .pipe($.rimraf());
});

gulp.task('unify-lib', function () {
    return gulp.src(libScripts)
        .pipe($.concat(JS_LIB_FILE_NAME))
        .pipe(gulp.dest(JS_BUILD_PATH));
});

gulp.task('uglify-lib', function () {
    return gulp.src(JS_BUILD_PATH + JS_LIB_FILE_NAME)
        .pipe($.uglify())
        .pipe($.concat(JS_LIB_MINIFIED_FILE_NAME))
        .pipe(gulp.dest(JS_BUILD_PATH));
});

gulp.task('clean-js-lib', function () {
    gulp.src(JS_BUILD_PATH + JS_LIB_FILE_NAME, {read: false})
        .pipe($.rimraf());
});


gulp.task('unify', function () {
    return gulp.src(projectScripts)
        .pipe($.concat(JS_PROJECT_FILE_NAME))
        .pipe(gulp.dest(JS_BUILD_PATH));
});

gulp.task('uglify', function () {
    return gulp.src(JS_BUILD_PATH + JS_PROJECT_FILE_NAME)
        .pipe($.uglify())
        .pipe($.concat(JS_PROJECT_MINIFIED_FILE_NAME))
        .pipe(gulp.dest(JS_BUILD_PATH));
});

gulp.task('clean-js', function () {
    gulp.src([	JS_BUILD_PATH + JS_PROJECT_FILE_NAME,
        JS_BUILD_PATH + JS_PROJECT_MINIFIED_FILE_NAME], {read: false})
        .pipe($.rimraf());
});

gulp.task('default', function() {
    runSequence(
        ['templates', 'clean-js-lib', 'clean-js'],
        ['unify-lib', 'unify'],
        ['uglify-lib', 'uglify']
    );
});

function reloadJson(jsonFilePath) {
    delete require.cache[require.resolve(jsonFilePath)];
    return require(jsonFilePath);
}
