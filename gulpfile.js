var gulp = require('gulp');

// gulp plugins and utils
var gutil = require('gulp-util');
var livereload = require('gulp-livereload');
var sourcemaps = require('gulp-sourcemaps');
var zip = require('gulp-zip');
var sass = require('gulp-sass');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');

var swallowError = function swallowError(error) {
    gutil.log(error.toString());
    gutil.beep();
    this.emit('end');
};

var nodemonServerInit = function () {
    livereload.listen(1234);
};

gulp.task('build', ['scss', 'js'], function (/* cb */) {
    return nodemonServerInit();
});

gulp.task('scss', function () {
    return gulp.src('scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions']
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('assets/css'));
});

gulp.task('js', function() {
    return gulp.src('js/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
        "presets": ["env"]
    }))
    .pipe(concat('script.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('assets/js'));
});

gulp.task('watch:sass', function() {
    gulp.watch('scss/*.scss',['scss']);
});

gulp.task('watch:js', function() {
    gulp.watch('js/*.js', ['js']);
});


gulp.task('zip', ['scss','js'], function () {
    var targetDir = 'dist/';
    var themeName = require('./package.json').name;
    var filename = themeName + '.zip';

    return gulp.src([
        '**',
        '!node_modules', '!node_modules/**',
        '!dist', '!dist/**',
        '!js', '!js/**',
        '!scss', '!scss/**'
    ])
        .pipe(zip(filename))
        .pipe(gulp.dest(targetDir));
});

gulp.task('default', ['build'], function () {
    gulp.start('watch:sass');
    gulp.start('watch:js');
});
