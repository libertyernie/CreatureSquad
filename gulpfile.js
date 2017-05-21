/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var wbBuild = require('workbox-build');
var replace = require('gulp-string-replace');
var del = require('del');

gulp.task("ts", function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("www"));
});

gulp.task('bundle-sw', function () {
    return wbBuild.generateSW({
        globDirectory: 'www',
        swDest: 'sw.js',
        staticFileGlobs: ['**\/*.{html,js,css,png,svg}'],
        globIgnores: [
            "sw.js",
	        "apple-touch-icon.png",
	        "apple-touch-icon.svg",
	        "favicon.png",
	        "favicon.svg"
        ],
        modifyUrlPrefix: {
            '/': ''
        }
    })
    .catch(function (err) {
        console.log('[ERROR] This happened: ' + err);
    });
});

gulp.task("lib-copy", function () {
    return gulp.src([
        "./workbox-sw.prod.v1.0.0.js",
        "./node_modules/knockout/build/output/knockout-latest.js"
    ])
    .pipe(gulp.dest('./www'))
});

gulp.task("sw-replace", function () {
    return gulp.src(["./sw.js"])
        .pipe(replace("\\\\\\\\", "/"))
        .pipe(gulp.dest('./www'))
});

gulp.task("sw-clean", function () {
    return del(["./sw.js", "./workbox-sw.prod.v1.0.0.js"]);
});

gulp.task("default", gulp.series(
    "ts",
    "bundle-sw",
    gulp.parallel("sw-replace", "lib-copy"),
    "sw-clean"));