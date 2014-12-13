var gulp = require('gulp');
var pkg = require('./package.json');
var browserSync = require('browser-sync');
var stylus = require('gulp-stylus');
var rename = require('gulp-rename');
var del = require('del');
var inject = require('gulp-inject');
var es = require('event-stream');
var angularFilesort = require('gulp-angular-filesort');
var concat = require('gulp-concat');
var order = require('gulp-order');
var html2js = require('gulp-html2js');

//////////////////
//  File paths  //
//////////////////
var filepaths = {
    app: {
        js: [
            './src/app/**/*.js',
            '!./src/app/**/*.spec.js'
        ],
        tpl: [
          './src/app/**/*.tpl.html'
        ],
        stylus: './src/stylus/main.styl',
        assets: './src/assets/**/*.*',
        fonts: './src/fonts/**/*.*'
    },
    vendor: {
        css: [
            './vendor/bootstrap/dist/css/bootstrap.css'
        ],
        fonts: [
            './vendor/bootstrap/dist/fonts/glyphicons-halflings-regular.{ttf,eot,svg,woff}'
        ],
        assets: [
        ],
        js: [
            './vendor/angular/angular.js'
        ]
    },
    buildDir: './build',
    distDir: './dist'
};

///////////////////
//  BrowserSync  //
///////////////////

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: filepaths.buildDir
        }
    });
});

/////////////
//  Clean  //
/////////////

gulp.task('clean:build', function(cb) {
    del([filepaths.buildDir], cb);
});

gulp.task('clean:dist', function(cb) {
    del([filepaths.distDir], cb);
});

/////////////////
//  CLI Tasks  //
/////////////////

gulp.task('build', ['clean:build'], function() {

    // copy vendor stuff
    var vendorJs = gulp.src(filepaths.vendor.js, {base: 'vendor'})
                       .pipe(gulp.dest(filepaths.buildDir+'/vendor'));

    var vendorCss = gulp.src(filepaths.vendor.css, {base: 'vendor'})
                        .pipe(rename(function(path) {
                            path.dirname = '';
                        }))
                       .pipe(gulp.dest(filepaths.buildDir+'/assets'));

    gulp.src(filepaths.vendor.assets, {base:'vendor'})
        .pipe(rename(function(path) {
            path.dirname = '';
        }))
        .pipe(gulp.dest(filepaths.buildDir+'/assets'));

    gulp.src(filepaths.vendor.fonts, {base:'vendor'})
        .pipe(rename(function(path) {
            path.dirname = '';
        }))
        .pipe(gulp.dest(filepaths.buildDir+'/fonts'));

    // copy app stuff
    var appCss = gulp.src(filepaths.app.stylus)
                     .pipe(stylus())
                     .pipe(rename(pkg.name+'.'+pkg.version+'.css'))
                     .pipe(gulp.dest(filepaths.buildDir+'/assets'));

    var appTpl = gulp.src(filepaths.app.tpl)
                     .pipe(html2js({
                      outputModuleName: 'App.Templates',
                      useStrict: true
                     }))
                     .pipe(concat('templates.js'));

    var appJs = es.merge(gulp.src(filepaths.app.js, {base:'src'}), appTpl)
                    .pipe(gulp.dest(filepaths.buildDir))
                    .pipe(angularFilesort());

    gulp.src(filepaths.app.assets)
        .pipe(gulp.dest(filepaths.buildDir+'/assets'));

    gulp.src(filepaths.app.fonts)
        .pipe(gulp.dest(filepaths.buildDir+'/fonts'));

    return gulp.src('./src/index.html')
               .pipe(inject(es.merge(vendorCss, vendorJs), {name:'vendor', ignorePath:'build'}))
               .pipe(inject(es.merge(appCss, appJs), {ignorePath:'build'}))
               .pipe(gulp.dest(filepaths.buildDir));

});

gulp.task('dist', ['clean:dist'], function() {
    var vendorJs = gulp.src(filepaths.vendor.js)
                       .pipe(concat('vendor.js'))
                       .pipe(gulp.dest(filepaths.distDir+'/assets'));

    var appTpl = gulp.src(filepaths.app.tpl)
                     .pipe(html2js({
                      outputModuleName: 'App.Templates',
                      useStrict: true
                     }));
    var appJs = es.merge(gulp.src(filepaths.app.js), appTpl)
                    .pipe(angularFilesort())
                    .pipe(concat(pkg.name+'.'+pkg.version+'.js'))
                    .pipe(gulp.dest(filepaths.distDir+'/assets'));

    var js = es.merge(vendorJs, appJs).pipe(order(['vendor.js', pkg.name+'.'+pkg.version+'.js']));

    var appCss = gulp.src(filepaths.app.stylus)
                     .pipe(stylus({compress:true}));

    var css = es.merge(gulp.src(filepaths.vendor.css), appCss)
                  .pipe(order([
                    'vendor/**/*.css'
                  ]))
                  .pipe(concat(pkg.name+'.'+pkg.version+'.css'))
                  .pipe(gulp.dest(filepaths.distDir+'/assets'));

    gulp.src(filepaths.app.assets)
        .pipe(gulp.dest(filepaths.distDir+'/assets'));

    gulp.src(filepaths.app.fonts)
        .pipe(gulp.dest(filepaths.distDir+'/fonts'));

    return gulp.src('./src/index.html')
               .pipe(inject(es.merge(js,css), {ignorePath:'dist'}))
               .pipe(gulp.dest(filepaths.distDir));
});

gulp.task('default', ['build', 'browser-sync'], function() {
    gulp.watch('./src/**/*.styl', function() {
        return gulp.src(filepaths.app.stylus)
                   .pipe(stylus())
                   .pipe(rename(pkg.name+'.'+pkg.version+'.css'))
                   .pipe(gulp.dest(filepaths.buildDir+'/assets'))
                   .pipe(browserSync.reload({stream:true}));
    });

    gulp.watch(filepaths.app.js, ['build', browserSync.reload]);
    gulp.watch(filepaths.app.tpl, ['build', browserSync.reload]);
    gulp.watch('./src/index.html', ['build', browserSync.reload]);
});
