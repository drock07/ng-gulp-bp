var gulp = require('gulp');

gulp.pkg = require('./package.json');
// var pkg = require('./package.json');

// var stylus = require('gulp-stylus');
// var rename = require('gulp-rename');
// var del = require('del');
// var inject = require('gulp-inject');
// var es = require('event-stream');
// var angularFilesort = require('gulp-angular-filesort');
// var concat = require('gulp-concat');
// var order = require('gulp-order');
// var html2js = require('gulp-html2js');
// var jshint = require('gulp-jshint');
// var plumber = require('gulp-plumber');

//////////////////
//  File paths  //
//////////////////
gulp.paths = {
    templateModuleName: 'App.Templates',
    src: 'src',
    tmp: '.tmp',
    dist: 'dist',
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

require('require-dir')('./gulp');

gulp.task('default', ['clean'], function() {
  gulp.start('serve');
});

/////////////////
//  CLI Tasks  //
/////////////////

// gulp.task('build', ['clean:build'], function() {

//     // copy vendor stuff
//     var vendorJs = gulp.src(config.vendor.js, {base: 'vendor'})
//                        .pipe(gulp.dest(config.buildDir+'/vendor'));

//     var vendorCss = gulp.src(config.vendor.css, {base: 'vendor'})
//                         .pipe(rename(function(path) {
//                             path.dirname = '';
//                         }))
//                        .pipe(gulp.dest(config.buildDir+'/assets'));

//     gulp.src(config.vendor.assets, {base:'vendor'})
//         .pipe(rename(function(path) {
//             path.dirname = '';
//         }))
//         .pipe(gulp.dest(config.buildDir+'/assets'));

//     gulp.src(config.vendor.fonts, {base:'vendor'})
//         .pipe(rename(function(path) {
//             path.dirname = '';
//         }))
//         .pipe(gulp.dest(config.buildDir+'/fonts'));

//     // copy app stuff
//     var appCss = gulp.src(config.app.stylus)
//                      .pipe(stylus())
//                      .pipe(rename(pkg.name+'.'+pkg.version+'.css'))
//                      .pipe(gulp.dest(config.buildDir+'/assets'));

//     var appTpl = gulp.src(config.app.tpl)
//                      .pipe(html2js({
//                       outputModuleName: config.templateModuleName,
//                       useStrict: true,
//                       base: './src/app'
//                      }))
//                      .pipe(concat('templates.js'));

//     var tempAppJs = gulp.src(config.app.js, {base:'src'})
//                         .pipe(plumber())
//                         .pipe(jshint())
//                         .pipe(jshint.reporter('jshint-stylish'))

//     var appJs = es.merge(tempAppJs, appTpl)
//                     .pipe(gulp.dest(config.buildDir))
//                     .pipe(angularFilesort());

//     gulp.src(config.app.assets)
//         .pipe(gulp.dest(config.buildDir+'/assets'));

//     gulp.src(config.app.fonts)
//         .pipe(gulp.dest(config.buildDir+'/fonts'));

//     return gulp.src('./src/index.html')
//                .pipe(inject(es.merge(vendorCss, vendorJs), {name:'vendor', ignorePath:'build'}))
//                .pipe(inject(es.merge(appCss, appJs), {ignorePath:'build'}))
//                .pipe(gulp.dest(config.buildDir));

// });

// gulp.task('dist', ['clean:dist'], function() {
//     var vendorJs = gulp.src(config.vendor.js)
//                        .pipe(concat('vendor.js'))
//                        .pipe(gulp.dest(config.distDir+'/assets'));

//     var appTpl = gulp.src(config.app.tpl)
//                      .pipe(html2js({
//                       outputModuleName: config.templateModuleName,
//                       useStrict: true,
//                       base: './src/app'
//                      }));
//     var appJs = es.merge(gulp.src(config.app.js), appTpl)
//                     .pipe(angularFilesort())
//                     .pipe(concat(pkg.name+'.'+pkg.version+'.js'))
//                     .pipe(gulp.dest(config.distDir+'/assets'));

//     var js = es.merge(vendorJs, appJs).pipe(order(['vendor.js', pkg.name+'.'+pkg.version+'.js']));

//     var appCss = gulp.src(config.app.stylus)
//                      .pipe(stylus({compress:true}));

//     var css = es.merge(gulp.src(config.vendor.css), appCss)
//                   .pipe(order([
//                     'vendor/**/*.css'
//                   ]))
//                   .pipe(concat(pkg.name+'.'+pkg.version+'.css'))
//                   .pipe(gulp.dest(config.distDir+'/assets'));

//     gulp.src(config.app.assets)
//         .pipe(gulp.dest(config.distDir+'/assets'));

//     gulp.src(config.app.fonts)
//         .pipe(gulp.dest(config.distDir+'/fonts'));

//     return gulp.src('./src/index.html')
//                .pipe(inject(es.merge(js,css), {ignorePath:'dist'}))
//                .pipe(gulp.dest(config.distDir));
// });

// gulp.task('default', ['build', 'browser-sync'], function() {
//     gulp.watch('./src/**/*.styl', function() {
//         return gulp.src(config.app.stylus)
//                    .pipe(stylus())
//                    .pipe(rename(pkg.name+'.'+pkg.version+'.css'))
//                    .pipe(gulp.dest(config.buildDir+'/assets'))
//                    .pipe(browserSync.reload({stream:true}));
//     });

//     gulp.watch(config.app.js, ['build', browserSync.reload]);
//     gulp.watch(config.app.tpl, ['build', browserSync.reload]);
//     gulp.watch('./src/index.html', ['build', browserSync.reload]);
// });
