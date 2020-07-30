var gulp = require('gulp');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');
var pug = require('gulp-pug');
var stylus = require('gulp-stylus');
var notify  = require('gulp-notify');
var webpack = require('webpack')
var webpackStream = require("webpack-stream");
var babel  = require('gulp-babel');
var developDir = './develop/';
var publicDir = './public/';

gulp.task('pug', done => {
  var option = {
    pretty: true
  }
  gulp.src(developDir + 'pug/**/[^_]*.pug')
  .pipe(plumber({
    errorHandler: notify.onError('Error: <%= error.message %>')
  }))
  .pipe(pug(option))
  .pipe(gulp.dest(publicDir))

  browserSync.reload();
  done();
});

gulp.task('stylus', done => {
  gulp.src(developDir + 'assets/stylus/index.styl')
  .pipe(plumber({
    errorHandler: notify.onError('Error: <%= error.message %>')
  }))
  .pipe(stylus())
  .pipe(gulp.dest(publicDir + 'assets/css/'));

  browserSync.reload();
  done();
});


var webpackConfig = require('./webpack.config.js');
gulp.task('webpack', done => {
  gulp.src(developDir + 'assets/scripts/index.js')
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(babel())
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest(publicDir + 'assets/scripts/'))
  
  browserSync.reload();
  done();
});


var webpackConfigProduction = require('./webpack.config.production.js');
gulp.task('webpack_production', done => {
  gulp.src(developDir + 'assets/scripts/index.js')
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(babel())
    .pipe(webpackStream(webpackConfigProduction, webpack))
    .pipe(gulp.dest(publicDir + 'assets/scripts/'))
  
  browserSync.reload();
  done();
});


gulp.task('images', done => {
  gulp.src(developDir + 'assets/images/**/*')
  .pipe(gulp.dest(publicDir + 'assets/images/'))
  browserSync.reload();
  done();
});


gulp.task('browser-sync', done => {
  browserSync({
    server: {
      baseDir: './public',
      index: './index.html'
    }
  });
  done();
});

gulp.task('watch', done => {
  gulp.watch(developDir + 'pug/**/*.pug', gulp.task('pug'))
  gulp.watch(developDir + 'assets/stylus/**/*.styl', gulp.task('stylus'))
  gulp.watch(developDir + 'assets/scripts/**/*.js', gulp.task('webpack'))
  gulp.watch(developDir + 'assets/images/**/*', gulp.task('images'))
  done();
})
gulp.task('default', gulp.series('pug', 'stylus', 'webpack', 'images', 'browser-sync', 'watch'));
gulp.task('publish', gulp.series('pug', 'stylus', 'webpack_production', 'images'));
