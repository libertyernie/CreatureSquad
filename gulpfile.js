/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

const gulp = require("gulp");
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");
const wbBuild = require('workbox-build');
const replace = require('gulp-string-replace');

gulp.task("ts", function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("www"));
});

gulp.task('bundle-sw', () => {
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
    .then(() => {
        console.log('Service worker generated.');
    })
    .catch((err) => {
        console.log('[ERROR] This happened: ' + err);
    });
});

gulp.task("lib-copy", () => {
    return gulp.src([
        "./workbox-sw.prod.v1.0.0.js",
        "./node_modules/knockout/build/output/knockout-latest.js"
    ])
    .pipe(gulp.dest('./www'))
});

gulp.task("sw-replace", () => {
    return gulp.src(["./sw.js"])
        .pipe(replace("\\\\\\\\", "/"))
        .pipe(gulp.dest('./www'))
});

gulp.task("default", gulp.series("ts", "bundle-sw",
    gulp.parallel("sw-replace", "lib-copy")));