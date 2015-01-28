// Use gulp to automate the build process
// $ npm install gulp gulp-browserify gulp-concat react reactify
  // TODO: create package.json

var gulp = require('gulp');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');

gulp.task('lint', function() {
  return gulp.src('./lib/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('browserify', function() {
  gulp.src('public/js/main.js')
    // the following will convert all JSX to JS
    .pipe(browserify({transform: 'reactify'}))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js'));
  gulp.src('public/js/login.js')
    // the following will convert all JSX to JS
    .pipe(browserify({transform: 'reactify'}))
    .pipe(concat('login.js'))
    .pipe(gulp.dest('dist/js'));
  gulp.src('public/js/signup.js')
    // the following will convert all JSX to JS
    .pipe(browserify({transform: 'reactify'}))
    .pipe(concat('signup.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('copy', function() {
  gulp.src('public/index.html')
    .pipe(gulp.dest('dist'));
  gulp.src('public/login.html')
    .pipe(gulp.dest('dist'));
  gulp.src('public/signup.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['lint', 'browserify', 'copy']);

gulp.task('watch', function() {
  gulp.watch('public/**/*.*', ['default']);
});



gulp.task('browserify-stock', function(){
  gulp.src('public/js/main-stock.js')
    .pipe(browserify({transform: 'reactify'}))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/stock/js'));
});
gulp.task('copy-stock', function() {
  gulp.src('public/index.html')
    .pipe(gulp.dest('dist/stock'));  
});

gulp.task('stock', ['browserify-stock', 'copy-stock']);

gulp.task('watch-stock', function() {
  gulp.watch('public/**/*.*', ['stock']);
});



