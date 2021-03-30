/* gulpfile.js on hexo root */

// Add require
var gulp      = require('gulp');
var minifycss = require('gulp-clean-css');
var uglify    = require('gulp-uglify');
var htmlmin   = require('gulp-htmlmin');
var htmlclean = require('gulp-htmlclean');
var imagemin  = require('gulp-imagemin');

// Compress public/**/*.html
gulp.task('minify-html', function() {
    return gulp.src('./public/**/*.html')
        .pipe(htmlclean())
        .pipe(htmlmin({
            removeComments: true,
            collapseWhitespace: true,
            collapseBooleanAttributes: true,
            removeEmptyAttributes: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true
        }))
        .pipe(gulp.dest('./public'))
});

// Compress public/**/*.css
gulp.task('minify-css', function() {
    return gulp.src('./public/**/*.css')
        .pipe(minifycss())
        .pipe(gulp.dest('./public'));
});

// Compress public/**/*.js
gulp.task('minify-js', function() {
    return gulp.src('./public/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./public'));
});

gulp.task('minify-images', function() {
    return gulp.src('./public/images/**/*.*')
        .pipe(imagemin([
            imagemin.gifsicle({
                interlaced: true,
                optimizationLevel: 3
            }),
            imagemin.mozjpeg({
                quality: 75,
                progressive: true
            }),
            imagemin.optipng({
                optimizationLevel: 7
            }),
            imagemin.svgo({
                plugins: [{
                    removeViewBox: true,
                    cleanupIDs: false
                }]
            })
        ], { 'verbose': true }))
        .pipe(gulp.dest('./public/images'));
});

// Execute gulp task: gulp
gulp.task('default', gulp.parallel(
    'minify-html',
    'minify-css',
    'minify-js',
    'minify-images'
));
