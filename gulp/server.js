'use strict';

var gulp = require('gulp');

gulp.task('watch', [], function() {
	gulp.watch([
		gulp.paths.src + '/*.html',
		gulp.paths.src + '/{app, components}/**/*.js',
		'!' + gulp.paths.src + '/{app, components}/**/**.spec.js'
	], []);
});

gulp.task('serve', [], function() {

});