const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');


gulp.task('default', ['copy-html', 'css', 'images', 'concat-scripts'], () => {
  gulp.watch('./src/index.html', ['copy-html']);
  gulp.watch('./src/images/*', ['images']);
  gulp.watch('./src/css/style.css', ['css']);
  gulp.watch('./src/js/*.js', ['concat-scripts']);
});

// CSS
gulp.task('css', () =>
  gulp.src('./src/css/style.css')
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('./dist/css/'))
);

// IMAGES
gulp.task('images', () =>
  gulp.src('./src/images/*')
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.jpegtran({ progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      { verbose: true }
    ]))
    .pipe(gulp.dest('./dist/images/'))
);

// JS
gulp.task('babel-myscript', () => {
  return gulp.src('./src/js/app.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('concat-scripts', ['babel-myscript'], () => {
  return gulp.src(['./src/js/resources.js', './dist/js/app.js', './src/js/engine.js'])
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js/'));
});

// HTML 
gulp.task('copy-html', () => {
  gulp.src('./src/index.html')
    .pipe(gulp.dest('./dist/'));
});