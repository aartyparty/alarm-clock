var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

/* set up sass task for when developing locally, creates uncompressed sourcemaps */
gulp.task('sass-dev', function () {
    return gulp
        .src('./src/css/**/*.scss')
        .pipe(sass())
        .pipe(sourcemaps.init())
        .pipe(sass({errLogToConsole: true, outputStyle: 'expanded'})).on('error', sass.logError)
        .pipe(sourcemaps.write())
        .pipe(autoprefixer())
        .pipe(gulp.dest('./dist/css'));
});

/* set up sass task for use when deploying to prod, compresses files */
gulp.task('sass-prod', function () {
    return gulp
        .src('./src/css/**/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(autoprefixer())
        .pipe(gulp.dest('./dist/css'));
});

/* set up copy task */
gulp.task('copy', function() {
    return gulp
        .src([
            './src/index.html',
            './src/js/**/*.js'
        ],{
            base: 'src/'
        })
        .pipe(gulp.dest('./dist'));
});

/* set up watch task */
gulp.task('watch', function() {
    return gulp
        .watch('./src/css/**/*.scss', ['sass-dev'])
        .on('change', function(event) {
            console.log(event.path + ' was ' + event.type);
        });
});

/* set up dev task for use while developing locally */
gulp.task('dev', ['sass-dev', 'copy', 'watch']);

/* set up prod task for when deploying to production */
gulp.task('prod', ['sass-prod', 'copy']);

