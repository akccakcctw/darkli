/* eslint no-param-reassign:0 */
const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync').create(); // browser auto reload

const $ = gulpLoadPlugins();

gulp.task('default', ['js', 'css', 'demo']);

gulp.task('browserSync', ['default'], () => {
  browserSync.init({
    notify: false,
    port: 8000,
    server: {
      baseDir: 'demo',
    },
  });
});

gulp.task('watch', ['browserSync'], () => {
  gulp.watch('src/**/*.js', ['js', 'js-demo']);
  gulp.watch('src/**/*.scss', ['css', 'css-demo']);
});

gulp.task('min', ['js-min', 'css-min']);

gulp.task('js', () => {
  gulp.src('src/js/**/*.js')
    .pipe($.plumber())
    .pipe($.babel({
      presets: ['es2015'],
    }))
    .pipe(gulp.dest('dist/js')) // output folder
    .pipe($.notify({
      message: 'Compile Javascript Complete!',
      onLast: true,
    }));
});

gulp.task('js-min', () => {
  gulp.src('src/js/**/*.js')
    .pipe($.plumber())
    .pipe($.babel({
      presets: ['es2015'],
    }))
    .pipe($.uglify()) // minify
    .pipe($.rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/js')) // output folder
    .pipe($.notify({
      message: 'Minify Javascript Complete!',
      onLast: true,
    }));
});

gulp.task('css', () => {
  gulp.src('src/sass/**/*.scss')
    .pipe($.plumber())
    .pipe($.sass.sync({
      outputStyle: 'nested', // expanded, nested, compact, compressed
      precision: 10,
      includePath: ['.'],
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({ browsers: ['last 2 versions'] }))
    .pipe(gulp.dest('dist/css')) // output folder
    .pipe($.notify({
      message: 'Compile Sass Complete!',
      onLast: true,
    }));
});

gulp.task('css-min', () => {
  gulp.src('src/sass/**/*.scss')
    .pipe($.plumber())
    .pipe($.sass.sync({
      outputStyle: 'compressed',
      precision: 10,
      includePath: ['.'],
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({ browsers: ['last 2 versions'] }))
    .pipe($.cssnano()) // minify css
    .pipe($.rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/css')) // output folder
    .pipe($.notify({
      message: 'Minify Sass Complete!',
      onLast: true,
    }));
});

// for demo
gulp.task('demo', ['js-demo', 'css-demo']);

gulp.task('js-demo', () => {
  gulp.src('src/js/**/*.js')
    .pipe($.babel({
      presets: ['es2015'],
    }))
    .pipe(gulp.dest('demo')) // output folder
    .pipe($.notify({
      message: 'Compile Javascript Complete!',
      onLast: true,
    }))
    .pipe(browserSync.stream());
});

gulp.task('css-demo', () => {
  gulp.src('src/sass/**/*.scss')
    .pipe($.sass.sync({
      outputStyle: 'nested',
      precision: 10,
      includePath: ['.'],
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({ browsers: ['last 2 versions'] }))
    .pipe(gulp.dest('demo/')) // output folder
    .pipe($.notify({
      message: 'Compile Sass Complete!',
      onLast: true,
    }))
    .pipe(browserSync.stream());
});
