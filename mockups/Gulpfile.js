var gulp = require("gulp");
var sass = require("gulp-sass");
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var htmlmin = require('gulp-htmlmin');
var rename = require('gulp-rename');
var pump = require('pump');

gulp.task('compile',function(cb){
  console.log('========> Compilando SCSS...');
  pump([
    gulp.src("./src/*.scss"),
    sass(),
    cssmin(),
    rename({
        suffix: '.min'
      }),
    gulp.dest('./css')
    ],
    cb
    );
});

// gulp.task('minify',['compile'], function(cb) {
//   console.log('========> Minificando CSS...');
//   pump([
//     gulp.src(['./css/**/*.css', '!./css/**/*.min.css']),
//     cssmin(),
//     rename({
//       suffix: '.min'
//     }),
//     gulp.dest('./css')
//     ],
//     cb
//     );
// });

gulp.task('minify-js', function (cb) {
  console.log('========> Minificando JS...');
  pump([
    gulp.src('./src/*.js'),
    uglify(),
    rename({
      suffix: '.min'
    }),
    gulp.dest('./js')
    ],
    cb
    );
});

gulp.task('minify-html', function (cb) {
  console.log('========> Minificando HTML...');
  pump([
    gulp.src('./src/*.html'),
    htmlmin({collapseWhitespace: true}),
    gulp.dest('./')
    ],
    cb
    );
});

gulp.task('default', function(){
  gulp.watch('./src/*.scss',['compile']);
  gulp.watch('./src/*.js',['minify-js']);
  gulp.watch('./src/*.html',['minify-html']);
});
