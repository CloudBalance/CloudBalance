// Use gulp to automate the build process
// $ npm install gulp gulp-browserify gulp-concat react reactify
  // TODO: create package.json

var gulp = require('gulp');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');

gulp.task('browserify', function() {
  gulp.src('public/js/main.js')
    // the following will convert all JSX to JS
    .pipe(browserify({transform: 'reactify'}))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('copy', function() {
  gulp.src('public/index.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['browserify', 'copy']);

gulp.task('watch', function() {
  gulp.watch('public/**/*.*', ['default']);
});