var gulp = require('gulp');
var concat = require('gulp-concat');
var composer = require('gulp-uglify/composer');
var uglifyjs = require('uglify-es');
var minifyCSS = require('gulp-csso');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var gutil = require('gulp-util');
var browserSync = require('browser-sync').create();

var minifyJS = composer(uglifyjs, console);
gulp.task('clean', function() {
  return del(['build']);
});

gulp.task('scripts', ['clean'], function() {
  return gulp.src('public/javascripts/*.js')
    .pipe(sourcemaps.init())
    .pipe(minifyJS())
    .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    .pipe(concat('index.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/javascripts'));
});

gulp.task('css', function(){
  return gulp.src('public/stylesheets/*.sass')
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(gulp.dest('build/stylesheets'))
});

gulp.task('watch', function() {
  gulp.watch('public/javascripts/**/*.js', ['scripts']);
  gulp.watch('public/stylesheets/**/*.sass', ['css']);
});

// Rerun the task when a file changes
// gulp.task('watch', function() {
//   gulp.watch(paths.scripts, ['scripts']);
//   gulp.watch(paths.images, ['images']);
// });

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'scripts', 'css']);
gulp.task('production', ['scripts', 'css']);
