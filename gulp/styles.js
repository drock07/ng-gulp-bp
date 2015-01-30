'use strict';

var gulp = require('gulp');
var paths = gulp.paths;

var inject = require('gulp-inject');
var stylus = require('gulp-stylus');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('styles', [], function() {

    var injectFiles = gulp.src([
        paths.src + '/{app,components}/**/*.styl'
    ], {read: false});

    var injectOptions = {
        transform: function(filepath) {
            filepath = '..' + filepath.replace(paths.src, '');
            return '@import \'' + filepath + '\';';
        },
        starttag: '// injector',
        endtag: '// endinjector',
        addRootSlash: false
    };

    return gulp.src(
        paths.src + '/stylus/main.styl'
    )
    .pipe(inject(injectFiles, injectOptions))
    .pipe(stylus())
        .on('error', function handleError(err) {
            console.error(err.toString());
            this.emit('end');
        })
    .pipe(autoprefixer())
        .on('error', function handleError(err) {
            console.error(err.toString());
            this.emit('end');
        })
    .pipe(gulp.dest(paths.tmp + '/styles/'));
});
