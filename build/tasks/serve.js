/* jshint node: true */
'use strict';
var gulp = require('gulp');
var browserSync = require('browser-sync');
var paths = require('../paths');

gulp.task('serve', ['build'], function(done) {
  browserSync({
    port: 9000,
    server: {
      baseDir: './'
    }
  }, done);

  gulp.watch(paths.ts, ['build-app-watch']);
  gulp.watch(paths.less, ['build-styles-watch']);
  gulp.watch(paths.templates, ['build-templates-watch']);
});

gulp.task('build-app-watch', ['build-app'], browserSync.reload);
gulp.task('build-styles-watch', ['build-styles'], browserSync.reload);
gulp.task('build-templates-watch', ['build-templates'], browserSync.reload);
