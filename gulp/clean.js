'use strict';

var gulp = require('gulp');

var del = require('del');

gulp.task('clean', function(cb) {
	del([gulp.paths.buildDir, gulp.paths.distDir], cb);
});