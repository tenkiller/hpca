var gulp = require('gulp');
var browsersync = require('browser-sync').create();

gulp.task('sync', function() {
  browsersync.init({
    server: {
      baseDir: './'
    }
  });
});