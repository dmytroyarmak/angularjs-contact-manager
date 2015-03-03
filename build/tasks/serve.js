var gulp = require("gulp");
var browserSync = require("browser-sync");

gulp.task("serve", ["build"], function(done) {
    browserSync({
    	port: 9000,
        server: {
            baseDir: "./"
        }
    }, done);
});
