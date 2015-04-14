var gulp = require('gulp');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');
var templateCache = require('gulp-angular-templatecache');
var runSequence = require('run-sequence');
var paths = require('../paths');

gulp.task('build-vendor', function () {
  return gulp.src(paths.vendorJs)
    .pipe(uglify())
    .pipe(concat('contact-manager.vendor.js'))
    .pipe(gulp.dest(paths.output));
});

gulp.task('build-templates', function () {
  return gulp.src(paths.templates)
    .pipe(templateCache('contact-manager.templates.js', {
      module: 'contactManager'
    }))
    .pipe(gulp.dest(paths.output));
});

gulp.task('build-app', function () {
  return gulp.src(paths.js)
    .pipe(ngAnnotate())
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
  runSequence('clean', ['build-app', 'build-templates', 'build-vendor', 'build-styles'], done);
});
