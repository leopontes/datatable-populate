
var gulp   = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('package', function(){
	return gulp.src('js/*.js')
	           .pipe(concat('datatable-populate.js'))
	           .pipe(gulp.dest('dist/js'));
});

gulp.task('package-min', function(){
	return gulp.src('js/*.js')
	           .pipe(concat('datatable-populate.min.js'))
	           .pipe(uglify())
	           .pipe(gulp.dest('dist/js'));
});

gulp.task('default', ['package', 'package-min']);