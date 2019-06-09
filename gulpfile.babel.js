import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import del from 'del';
import { getEnv } from './bin/env';

const $ = gulpLoadPlugins();

const paths = {
  scripts: {
    src: 'src/js/**/*.js',
    dest: 'dist/',
  },
  styles: {
    src: 'src/sass/**/*.scss',
    dest: 'dist/',
  },
  demo: 'demo/',
};

// create livereload server
const server = browserSync.create();

const reload = async (cb) => {
  await server.reload();
  cb();
};

const serve = async (cb) => {
  await server.init({
    open: true,
    notify: false,
    port: 8000,
    ui: {
      port: 3000,
    },
    server: {
      baseDir: './demo/',
    },
  });
  cb();
};

const clean = () => del(['dist/']);

const compileCSS = () => gulp.src(paths.styles.src)
  .pipe($.plumber())
  .pipe($.sourcemaps.init())
  .pipe($.sass.sync({
    outputStyle: 'nested', // expanded, nested, compact, compressed
    precision: 10,
    includePath: ['.'],
  }).on('error', $.sass.logError))
  .pipe($.autoprefixer())
  .pipe($.sourcemaps.write('.'))
  .pipe(gulp.dest(paths.styles.dest))
  .pipe(gulp.dest(paths.demo))
  .pipe(server.stream());

const minifyCSS = () => gulp.src(paths.styles.src)
  .pipe($.plumber())
  .pipe($.sourcemaps.init())
  .pipe($.sass.sync({
    outputStyle: 'compressed',
    precision: 10,
    includePath: ['.'],
  }).on('error', $.sass.logError))
  .pipe($.autoprefixer())
  .pipe($.rename({ suffix: '.min' }))
  .pipe(gulp.dest(paths.styles.dest))
  .pipe($.notify({
    message: 'Minify Sass Complete!',
    onLast: true,
  }));

const compileJS = () => gulp.src('.')
  .pipe($.exec('npm run dev:js'))
  .pipe($.notify({
    message: 'Compile JavaScript Complete!',
    onLast: true,
  }))
  .pipe(browserSync.stream());

const minifyJS = () => gulp.src('.')
  .pipe($.exec('npm run prod:js'))
  .pipe($.notify({
    message: 'Minify JavaScript Complete!',
    onLast: true,
  }));

const watchCSS = () => gulp.watch(
  paths.styles.src,
  { usePolling: true },
  gulp.series(compileCSS),
);

const watchJS = () => gulp.watch(
  paths.scripts.src,
  { usePolling: true },
  gulp.series(compileJS, reload),
);

const compile = gulp.parallel(
  compileCSS,
  compileJS,
);
compile.description = 'compile all sources';

const watch = gulp.parallel(
  watchCSS,
  watchJS,
);

const min = gulp.parallel(minifyCSS, minifyJS);
min.description = 'minify CSS and JS files';

const env = getEnv();

// `gulp --production` for production,
// or simply use `gulp` for development
const defaultTasks = (env === 'production')
  ? gulp.series(clean, compile, min)
  : gulp.series(clean, compile, serve, watch);

export {
  compile,
  compileCSS,
  compileJS,
  serve,
  watch,
  watchCSS,
  watchJS,
  minifyCSS,
  minifyJS,
  min,
  clean,
};

export default defaultTasks;
