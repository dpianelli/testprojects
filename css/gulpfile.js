var gulp = require('gulp'),
    watch = require('gulp-watch'),
    connect = require('gulp-connect');;

var paths = {
    scripts: ['./*.js', './**/*.js'],
    css: ['./**/*.css'],
    html: ['./*.html', './**/*.html']
};

gulp.task('scripts', function () {
    gulp.src(paths.scripts)
        .pipe(connect());
});

gulp.task('connect', function () {
    connect.server({
        root: './',
        livereload: true
    });
});

gulp.task('html', function () {
    gulp.src(paths.html)
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch(paths.html, ['html']);
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.css);
});

gulp.task('default', ['connect', 'watch']);