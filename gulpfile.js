(function () {
	'use strict';

	var gulp = require('gulp'),
		babelify = require('babelify'),
		browserify = require('browserify'),
		browserSync = require('browser-sync').create(),
		buffer = require('vinyl-buffer'),
		sequence = require('gulp-sequence'),
		source = require('vinyl-source-stream');

	gulp.task('scripts', function () {
		var bundler = browserify('./index.js');
		bundler.transform(babelify);
		bundler.bundle()
			.pipe(source('index.js'))
			.pipe(buffer())
			.pipe(gulp.dest('./dist'));
	});

	gulp.task('js-watch', ['scripts'], function (done) {
		browserSync.reload();
		done();
	});

	gulp.task('browser-sync', function () {
		browserSync.init({
			server: {
				baseDir: './'
			}
		});

		gulp.watch(['./index.js', './js/*.js'], ['js-watch']);
	});

	gulp.task('default', sequence('scripts', 'browser-sync'));
}());
