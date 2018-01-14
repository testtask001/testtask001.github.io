var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    rigger = require('gulp-rigger'),
    // cssnano = require('gulp-cssnano'),
    less = require('gulp-less'),
    rimraf = require('rimraf'),
    imagemin = require('gulp-imagemin');


var path = {
    dist: { // Куда складывать готовые файлы после сборки
        html: 'dist/',
        js: 'dist/js/',
        css: 'dist/css/',
        img: 'dist/i/',
        fonts: 'dist/fonts/'
    },
    src: { // Откуда брать исходники
        html: 'src/*.html',
        js: 'src/js/**/*.js',
        css: 'src/css/style.less',
        img: 'src/i/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: { // За изменениями каких файлов мы хотим наблюдать
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        css: 'src/css/**/*.less',
        img: 'src/i/**/*.*',
        fonts: 'src/css/fonts/**/*.*'
    },
    clean: './dist'
};


gulp.task('html:dist', function () {
    gulp.src(path.src.html) // Выберем файлы по нужному пути
        .pipe(rigger()) // Прогоним через rigger
        .pipe(gulp.dest(path.dist.html)); // Переместим их в папку dist
});


gulp.task('js:dist', function () {
    gulp.src(path.src.js) // Выберем файлы по нужному пути
        .pipe(rigger()) // Прогоним через rigger
        .pipe(uglify()) // Сожмем js
        .pipe(gulp.dest(path.dist.js)); // Переместим готовый файл в dist
});


gulp.task('css:dist', function () {
    gulp.src(path.src.css) // Выберем наш style.less
        .pipe(less()) // Скомпилируем
        .pipe(prefixer()) // Добавим вендорные префиксы
        //.pipe(cssnano({zindex: false})) // Сожмем
        .pipe(gulp.dest(path.dist.css)); // Переместим в dist
});


gulp.task('image:dist', function () {
    gulp.src(path.src.img) // Выберем наши картинки
        .pipe(imagemin({ // Сожмем их
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            interlaced: true
        }))
        .pipe(gulp.dest(path.dist.img)); // Переместим в dist
});


gulp.task('fonts:dist', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.dist.fonts)) // Переместим шрифты в dist
});


gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});


gulp.task('build', [
    'html:dist',
    'js:dist',
    'css:dist',
    'fonts:dist',
    'image:dist'
]);


gulp.task('watch', function() {
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:dist');
    });
    watch([path.watch.css], function(event, cb) {
        gulp.start('css:dist');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:dist');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:dist');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:dist');
    });
});
