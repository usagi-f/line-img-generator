'use strict'

var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    connect = require('gulp-connect'),
    gjslint = require('gulp-gjslint');

gulp.task('connect', function() {
    connect.server({
        port : 8080,
        root : 'views',
        livereload : true
    });
});

gulp.task('sass', function() {
    return sass('src/scss/', {
        style : 'expanded'
    })
        .on('error', function(err) { console.log('ERROR') })
        .pipe(gulp.dest('views/assets/style'));
});

gulp.task('reload', function() {
    gulp.src('views/*.html')
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch([
        'src/scss/*.scss',
        'src/js/*.js',
        'views/*.html'
    ], ['sass', 'jscopy', 'reload']);
});

gulp.task('jscopy', function() {
    gulp.src('src/js/*.js')
        .pipe(gjslint())
        .pipe(gjslint.reporter('console'))
        .pipe(gulp.dest('views/assets/script'));
});

gulp.task('init', function() {
    gulp.src([
        'node_modules/angular/angular.min.js',
    ])
        .pipe(gulp.dest('views/assets/script/lib'));
});

gulp.task('default', ['connect', 'watch']);