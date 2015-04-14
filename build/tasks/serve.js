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

    gulp.watch(paths.js, ['build-app-watch']);
});

gulp.task('build-app-watch', ['build-app'], browserSync.reload);
