'use strict';

var gulp = require('gulp');
var paths = gulp.paths;

var inject = require('gulp-inject');

gulp.task('inject', ['styles'], function() {
    var injectStyles = gulp.src([
        paths.tmp + '/styles/*.css'
    ], {read: false });
});
