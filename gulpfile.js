'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src(['src/sass/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest("public/css"))
        .pipe(browserSync.stream());
});


// Move the javascript files into our /src/js folder
gulp.task('js', function() {
    return gulp.src(['src/js/*.js'])
        .pipe(gulp.dest("public/js"))
        .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./public"  
    });

    gulp.watch(['src/sass/*.scss'], ['sass']);
    gulp.watch("public/*.html").on('change', browserSync.reload);
});

gulp.task('default', ['js','serve']);
