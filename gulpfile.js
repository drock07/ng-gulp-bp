var gulp = require('gulp');

// load plugins
var jshint = require('gulp-jshint');
var inject = require('gulp-inject');
var es = require('event-stream');
var del = require('del');
var browserSync = require('browser-sync');

var buildConfig = require('./build.config.js');

///////////////////
//  Clean tasks  //
///////////////////

gulp.task('clean:build', function(cb) {
    del([
        buildConfig.build_dir
    ], cb);
});

gulp.task('clean:dist', function(cb) {
    del([
        buildConfig.compile_dir
    ], cb);
});

//////////////
//  JSHint  //
//////////////

gulp.task('jshint', function() {
    gulp.src(buildConfig.app_files.js)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

////////////////////
//  Browser-Sync  //
////////////////////

gulp.task('browser-sync', ['build'], function() {
    browserSync([], {
        server: {
            baseDir: buildConfig.build_dir
        }
    });
});

///////////////////
//  Build tasks  //
///////////////////

gulp.task('index:build', ['clean:build'], function() {
    var venderStream = gulp.src(buildConfig.vendor_files.js.concat(buildConfig.vendor_files.css), {read: false});
    var appStream = gulp.src(buildConfig.app_files.js, {read: false});

    return gulp.src(buildConfig.app_files.html)
        .pipe(inject(venderStream, {
            name: 'vendor',
            ignorePath: 'vendor',
            addPrefix: 'assets'
        }))
        .pipe(inject(appStream, {
            ignorePath: 'src',
            addPrefix: 'assets'
        }))
        .pipe(gulp.dest(buildConfig.build_dir));
});

gulp.task('build', ['clean:build', 'index:build'], function() {
    // copy vendor js
    gulp.src(buildConfig.vendor_files.js, {base: 'vendor/'})
        .pipe(gulp.dest(buildConfig.build_assets_dir));

    // copy app js
    gulp.src(buildConfig.app_files.js, {base: 'src'})
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(gulp.dest(buildConfig.build_assets_dir));
});

gulp.task('default', ['build']);
