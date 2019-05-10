var gulp = require('gulp');

var server =require('gulp-webserver');

var sass = require('gulp-sass');

gulp.task('server',function(){
	return gulp.src('./src')
	.pipe(server({
		port:9090
	}))
})

gulp.task('sass',function(){
	return gulp.src('./src/sass/*.scss')
	.pipe(sass())
	.pipe(gulp.dest('./src/css'))
})

gulp.task('watch',function(){
	return gulp.watch('./src/sass/*.scss',gulp.series('sass'))
});
gulp.task('default',gulp.series('sass','server','watch'))