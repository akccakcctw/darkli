const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync').create(); // browser auto reload

const $ = gulpLoadPlugins();

gulp.task('default', ['js', 'css', 'demo', 'min']);

gulp.task('localhost', () => {
  browserSync.init({
    notify: false,
    open: false,
    port: 8000,
    server: {
      baseDir: 'demo',
    },
  });
});

gulp.task('browserSync', ['default', 'localhost']);

gulp.task('watch', ['browserSync'], () => {
  gulp.watch('src/**/*.js', ['js', 'js-min']);
  gulp.watch('src/**/*.scss', ['css', 'css-demo', 'css-min']);
});

gulp.task('min', ['js-min', 'css-min']);

gulp.task('js', () => {
  $.run('npm run build:js').exec()
    .pipe($.notify({
      message: 'Compile Javascript Complete!',
      onLast: true,
    }))
    .pipe(browserSync.stream());
});

gulp.task('js-min', () => {
  $.run('npm run compress:js').exec()
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
    .pipe(gulp.dest('dist')) // output folder
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
    .pipe(gulp.dest('dist')) // output folder
    .pipe($.notify({
      message: 'Minify Sass Complete!',
      onLast: true,
    }));
});

// for demo
gulp.task('demo', ['css-demo']);

gulp.task('css-demo', () => {
  gulp.src('src/sass/**/*.scss')
    .pipe($.sass.sync({
      outputStyle: 'nested',
      precision: 10,
      includePath: ['.'],
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({ browsers: ['last 2 versions'] }))
    .pipe(gulp.dest('demo')) // output folder
    .pipe($.notify({
      message: 'Compile Sass Complete!',
      onLast: true,
    }))
    .pipe(browserSync.stream());
});

// lint
gulp.task('lint', () => {
  gulp.src('src/js/**/*.js')
    .pipe($.eslint())
    .pipe($.eslint.format());
});
