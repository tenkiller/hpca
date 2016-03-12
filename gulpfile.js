var gulp = require('gulp');
var browsersync = require('browser-sync').create();
var reload = browsersync.reload;

gulp.task('sync', function() {
  browsersync.init({
    server: {
      baseDir: './'
    }
  });
  
  gulp.watch('*.html').on('change', reload);
});