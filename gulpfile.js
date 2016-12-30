/* eslint no-param-reassign:0 */

const gulp = require('gulp');
const compass = require('gulp-compass'); // gulp-compass
const babel = require('gulp-babel');
const uglify = require('gulp-uglify'); // minify js
const cssnano = require('gulp-cssnano'); // minify css
const rename = require('gulp-rename'); // rename file
const plumber = require('gulp-plumber'); // error handler
const notify = require('gulp-notify'); // notify message
const livereload = require('gulp-livereload'); // livereload browser

gulp.task('default', ['js', 'css']);

gulp.task('min', ['js-min', 'css-min']);

gulp.task('watch', () => {
  livereload.listen();
  gulp.watch('src/**/*.js', ['js', 'js-demo']);
  gulp.watch('src/**/*.scss', ['css', 'css-demo']);
});

gulp.task('js', () => {
  gulp.src('src/**/*.js')
    .pipe(plumber())
    .pipe(babel({
      presets: ['es2015'],
    }))
    .pipe(gulp.dest('dist/')) // output folder
    .pipe(notify('Build Javascript Complete!'))
    .pipe(livereload());
});

gulp.task('js-min', () => {
  gulp.src('src/**/*.js')
    .pipe(plumber())
    .pipe(babel({
      presets: ['es2015'],
    }))
    .pipe(uglify()) // minify
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/')) // output folder
    .pipe(notify('Minify Javascript Complete!'))
    .pipe(livereload());
});

gulp.task('css', () => {
  gulp.src('src/**/*.scss')
    .pipe(plumber())
    .pipe(compass({
      config_file: './config.rb',
      sass: 'src/sass/',
      css: 'dist/css/',
    }))
    .pipe(gulp.dest('dist/css')) // output folder
    .pipe(notify('Compile Sass Complete!'))
    .pipe(livereload());
});

gulp.task('css-min', () => {
  gulp.src('src/**/*.scss')
    .pipe(plumber())
    .pipe(compass({
      config_file: './config.rb',
      sass: 'src/sass/',
      css: 'dist/css/',
    }))
    .pipe(cssnano()) // minify css
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/css')) // output folder
    .pipe(notify('Minify Sass Complete!'))
    .pipe(livereload());
});

// for demo
gulp.task('demo', ['js-demo', 'css-demo']);

gulp.task('js-demo', () => {
  gulp.src('src/js/*.js')
    .pipe(babel({
      presets: ['es2015'],
    }))
    // .pipe(uglify()) //minify
    .pipe(gulp.dest('demo/')) // output folder
    .pipe(notify('Build Javascript Complete!'))
    .pipe(livereload());
});

gulp.task('css-demo', () => {
  gulp.src('src/**/*.scss')
    .pipe(compass({
      config_file: './config.rb',
      sass: 'src/sass/',
      css: 'demo/',
    }))
    .pipe(gulp.dest('demo/')) // output folder
    .pipe(notify('Compile Sass Complete!'))
    .pipe(livereload());
});
