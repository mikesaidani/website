gulp    = require('gulp');
connect = require('gulp-connect');
stylus  = require('gulp-stylus');
prefix  = require('gulp-autoprefixer');

jeet    = require('jeet');
rupture = require('rupture');

gulp.task('stylesheets', function() {
  return gulp.src('./src/assets/stylesheets/main.styl')
  .pipe(stylus({
    use: [jeet(), rupture()]
  }))
  .pipe(prefix("last 2 versions", "> 1%", "ie 9", "ie 8", { cascade: true }))
  .pipe(gulp.dest('./build/assets/stylesheets/'))
  .pipe(connect.reload());
});

gulp.task('webserver', function() {
  return connect.server({
    root: 'build',
    port: 4444,
    livereload: {
      port: 4443
    }
  });
});

gulp.task('fonts', function() {
  return gulp.src('./src/assets/fonts/**/*')
  .pipe(gulp.dest('./build/assets/fonts'))
  .pipe(connect.reload());
});

gulp.task('images', function() {
  return gulp.src('./src/assets/images/**/*')
  .pipe(gulp.dest('./build/assets/images'))
  .pipe(connect.reload());
});

gulp.task('html', function() {
  return gulp.src('./src/**/*.html')
  .pipe(gulp.dest('./build'))
  .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch('src/assets/stylesheets/*.styl', ['stylesheets']);
  gulp.watch('src/assets/fonts/**/*', ['fonts']);
  gulp.watch('src/assets/images/**/*', ['images']);
  gulp.watch('src/**/*.html', ['html']);
});

gulp.task('start', ['html', 'fonts', 'images','stylesheets', 'webserver', 'watch']);
