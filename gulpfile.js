var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    gutil = require('gulp-util'),
    ftp = require('vinyl-ftp');

gulp.task('deployCSS', function() {
    var conn = ftp.create({
        host:      '192.168.1.250',
        user:      'gvz',
        password:  '2wsx@WSX',
        parallel:  10,
        log: gutil.log
    });

    var globs = [
        'src/css/*.css'
    ];
    return gulp.src(globs, {buffer: false})
        .pipe(conn.dest('/lider/css/'));
});
gulp.task('deployHTML', function() {
    var conn = ftp.create({
        host:      '192.168.1.250',
        user:      'gvz',
        password:  '2wsx@WSX',
        parallel:  10,
        log: gutil.log
    });

    var globs = [
        'src/*.html'
    ];
    return gulp.src(globs, {buffer: false})
        .pipe(conn.dest('/lider/'));
});
gulp.task('deployIMG', function() {
    var conn = ftp.create({
        host:      '192.168.1.250',
        user:      'gvz',
        password:  '2wsx@WSX',
        parallel:  10,
        log: gutil.log
    });

    var globs = [
        'src/images/**/*'
    ];
    return gulp.src(globs, {buffer: false})
        .pipe(conn.dest('/lider/images'));
});
gulp.task('deployJS', function() {
    var conn = ftp.create({
        host:      '192.168.1.250',
        user:      'gvz',
        password:  '2wsx@WSX',
        parallel:  10,
        log: gutil.log
    });

    var globs = [
        'src/js/*.js'
    ];
    return gulp.src(globs, {buffer: false})
        .pipe(conn.dest('/lider/js/'));
});
gulp.task('sass', function(){ // Создаем таск "sass"
    return gulp.src('src/css/sass/style.sass') // Берем источник
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(autoprefixer({
            browsers: ['last 50 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('src/css/')) // Выгружаем результата в папку app/css
        .pipe(browserSync.reload({stream: true}))
});
gulp.task('buildHTML', function() {
    gulp.src('src/*.html')
        .pipe(browserSync.reload({stream: true}))
});
gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browser Sync
        server: { // Определяем параметры сервера
            baseDir: 'src/'
        },
        notify: false // Отключаем уведомления
    });
});

gulp.task('watch', ['browser-sync', 'sass'], function() {
    gulp.watch('src/css/sass/**/*.sass', ['sass']); // Наблюдение за sass файлами
    gulp.watch('src/*.html', ['buildHTML']);
    gulp.watch('src/css/*.css', ['deployCSS']);
});
gulp.task('default', ['watch'] );
