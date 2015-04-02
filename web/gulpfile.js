/* Variables */
var gulp            = require('gulp'),
    // sass         = require('gulp-ruby-sass'),
    // autoprefixer     = require('gulp-autoprefixer'),
    // minifycss      = require('gulp-minify-css'),
    jshint          = require('gulp-jshint'),
    uglify          = require('gulp-uglify'),
    rename          = require('gulp-rename'),
    concat          = require('gulp-concat'),
    notify          = require('gulp-notify'),
    // cache        = require('gulp-cache'),
    livereload      = require('gulp-livereload'),
    del             = require('del'),
    // stylus       = require('gulp-stylus'),
    connect         = require('gulp-connect'),
    jade            = require('gulp-jade'),
    less            = require('gulp-less'),
    historyApiFallback  = require('connect-history-api-fallback');

/* Compresion de Css */
gulp.task('css', function () {
    gulp.src('assets/css/*.css')
        .pipe(less())
        .pipe(concat('main.css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('assets/css'))
        .pipe(connect.reload());
});

/* Compresion de Js */
gulp.task('js', function () {
    return gulp.src('assets/js/*.js')
        .pipe(jshint())
        .pipe(concat('main.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('assets/js/'))
        .pipe(connect.reload());
});

// Recarga el navegador cuando hay cambios en el HTML
gulp.task('html', function() {
    return gulp.src('*.html')
        .pipe(connect.reload());
});

/* Limpieza de produccion */
gulp.task('clean', function(cb) {
    del([
        'assets/css/main.min.css',
        'assets/js/main.min.js'
    ], cb)
});

/* Init GulpServer */
gulp.task('default', ['clean'], function() {
    gulp.start('html', 'js', 'css', 'watch', 'webserver');
});

/* Cambio de archivos */
gulp.task('watch', function() {
    gulp.watch('assets/css/*.css', ['css']),
    gulp.watch('assets/js/*.js', ['js']),
    gulp.watch(['*.html'], ['html']);
});

/* LocalServer */
gulp.task('webserver', function() {
    connect.server({
        root: './deploy',
        hostname: '0.0.0.0',
        port: 9000,
        livereload: true,
        middleware: function(connect, opt) {
            return [ historyApiFallback ];
        }
    });
});