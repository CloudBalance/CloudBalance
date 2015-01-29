// Use gulp to automate the build process
// $ npm install gulp gulp-browserify gulp-concat react reactify
  // TODO: create package.json

var gulp = require('gulp');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
// var clean = require('gulp-clean')

gulp.task('lint', function() {
  return gulp.src('./lib/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// gulp.task('clean', function(){        // maybe should be using rimraf or del instead of clean
//   return gulp.src(['dist/*'], {read:false})
//   .pipe(clean());
// });

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
  gulp.src('public/*.html')
    .pipe(gulp.dest('dist'));
  // gulp.src('public/login.html')
    // .pipe(gulp.dest('dist'));
  // gulp.src('public/signup.html')
    // .pipe(gulp.dest('dist'));
  gulp.src('public/css/*.css')
    .pipe(gulp.dest('dist/css'));
  gulp.src('public/assets/*.*')
    .pipe(gulp.dest('dist/assets'));
  // gulp.src('public/bower_components/**/dist/*.min.js')    //, { base: './**/*' }) 
    // .pipe(gulp.dest('dist/bower_components'));      
      // No variations are putting the bower component files into the right place right now - moved manually
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
  gulp.src('public/css/*.css')
    .pipe(gulp.dest('dist/stock/css'));  
  gulp.src('public/assets/*.*')
    .pipe(gulp.dest('dist/stock/assets'))

});

gulp.task('stock', ['browserify-stock', 'copy-stock']);

gulp.task('watch-stock', function() {
  gulp.watch('public/**/*.*', ['stock']);
});



