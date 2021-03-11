'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const sourcemap = require('gulp-sourcemaps');

gulp.task('sass', function () {
  return gulp.src('sass/style.scss')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.stream());
});

gulp.task('html', function () {
  return gulp.src('*.html')
    .pipe(gulp.dest('build/'))
    .pipe(browserSync.stream());
});

gulp.task('serve', function () {
  browserSync.init({
    server: 'build/'
  });
  gulp.watch('sass/**/*.scss', gulp.series('sass'));
  gulp.watch('*.html', gulp.series('html'));
});
