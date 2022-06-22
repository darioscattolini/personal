var gulp = require('gulp');
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var watchify = require("watchify");
var fancy_log = require("fancy-log");
var tsify = require("tsify");

var watchedBrowserify = watchify(
  browserify({
    basedir: ".",
    debug: true,
    entries: ["src/main.ts"],
    cache: {},
    packageCache: {},
  }).plugin(tsify)
);

watchedBrowserify.on("update", bundle);
watchedBrowserify.on("log", fancy_log);

gulp.task("default", bundle);

function bundle() {
  return watchedBrowserify
    .bundle()
    .on("error", fancy_log)
    .pipe(source("main.js"))
    .pipe(gulp.dest("./"));
}
