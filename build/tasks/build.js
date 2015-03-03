var gulp = require('gulp');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var concat = require('gulp-concat');
var runSequence = require('run-sequence');
var paths = require('../paths');

gulp.task('build-app', function () {
  return gulp.src(paths.js)
    .pipe(uglify())
    .pipe(concat('contact-manager.js'))
    .pipe(gulp.dest(paths.output));
});

gulp.task('build-styles', function () {
  return gulp.src(paths.less)
    .pipe(less())
    .pipe(gulp.dest(paths.output));
});

gulp.task('build', function (done) {
  runSequence('clean', ['build-app', 'build-styles'], done);
});
