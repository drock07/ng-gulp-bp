'use strict';

var gulp = require('gulp');
var paths = gulp.paths;

var browserSync = require('browser-sync');

gulp.task('serve', ['watch'], function() {
    browserSync({
        server: {
            baseDir: paths.buildDir
        }
    });
});
