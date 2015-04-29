/* jshint node: true */
'use strict';
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');
var templateCache = require('gulp-angular-templatecache');
var sourcemaps = require('gulp-sourcemaps');
var htmlmin = require('gulp-htmlmin');
var runSequence = require('run-sequence');
var paths = require('../paths');

gulp.task('build-vendor', function() {
  return gulp.src(paths.vendorJs)
    .pipe(uglify())
    .pipe(concat('contact-manager.vendor.js'))
    .pipe(gulp.dest(paths.output + '/js'));
});

gulp.task('build-templates', function() {
  return gulp.src(paths.templates)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(templateCache('contact-manager.templates.js', {
      root: '.',
      module: 'contactManager'
    }))
    .pipe(gulp.dest(paths.output + '/js'));
});

gulp.task('build-app', function() {
  return gulp.src(paths.js)
    .pipe(sourcemaps.init())
    .pipe(ngAnnotate())
    .pipe(concat('contact-manager.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.output + '/js'));
});

gulp.task('build-styles', function() {
  return gulp.src(paths.less)
    .pipe(less())
    .pipe(gulp.dest(paths.output + '/css'));
});

gulp.task('copy-fonts', function() {
  return gulp.src(paths.fonts)
    .pipe(gulp.dest(paths.output + '/fonts'));
});

gulp.task('build', function(done) {
  runSequence('clean', ['copy-fonts', 'build-app', 'build-templates', 'build-vendor', 'build-styles'], done);
});
