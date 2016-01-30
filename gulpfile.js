/* File: gulpfile.js */

// grab our gulp packages
var gulp = require('gulp'),
  gutil = require('gulp-util'),
  concat = require('gulp-concat'),
  jshint = require('gulp-jshint'),
  clean = require('gulp-clean'),
  uglify = require('gulp-uglify'),
  plumber = require('gulp-plumber'),
  useref = require('gulp-useref'),  //used to replace references to individual js files
  uglifycss = require('gulp-uglifycss'),
  connect = require('gulp-connect'),
  scp = require('gulp-scp2');   //used for deployment to server
  var mainBowerFiles = require('main-bower-files');
  var gulpFilter = require('gulp-filter');
  var rename = require('gulp-rename');
  var uncss = require('gulp-uncss');
  var runSequence = require('run-sequence');
  var stripDebug = require('gulp-strip-debug');

  
var secrets = require('./secrets.json');

  
//copy the html files from root of source directory to to the dist directory, 
//  and replace references to vender js, my js, and css files  
gulp.task("html", function(){
  gulp.src("./source/*.html")
    .pipe(useref())
    .pipe(gulp.dest("./dist/"));
});

gulp.task('cleanjs', function () {
  return gulp.src(['./dist/js/*'], { read: false })
    .pipe(clean());
});

gulp.task('cleancss', function () {
  return gulp.src(['./dist/css/*'], { read: false })
    .pipe(clean());
});

gulp.task("js", ['cleanjs'], function(){
  runSequence('cleanjs', ['vendorjs', 'custjs', 'copyDatasets', 'copyWorkers']);
});


gulp.task("buildDist", function(){
  runSequence("clean", ['vendorjs', 'custjs', 'copyDatasets', 
    "html", "copyClean", "copyTopoJSONData"]);
});

//copy plain old html files to the dist directory, change js, css, etc. refs in process
gulp.task("html", function(){  gulp.src("./source/*.html")
    .pipe(plumber())
    .pipe(useref())
    .pipe(gulp.dest("./dist/"));
});

//copy plain old html files to the dist directory, change js, css, etc. refs in process
gulp.task("copyTopoJSONData", function(){  gulp.src("./source/topoJSONData/*")
    .pipe(plumber())
    .pipe(useref())
    .pipe(gulp.dest("./dist/topoJSONData/"));
});

//concat, minify, and copy all the vendor js files to the dist js directory
gulp.task("vendorjs", function(){
  var jsFilter = gulpFilter('*.js');
  
    //get the list of main Bower files
    return gulp.src(mainBowerFiles({
      paths:{
        bowerDirectory: './source/bower_components',
        bowerJson: './source/bower.json'
      }
    }))
      .pipe(plumber())
      .pipe(jsFilter)   //only want the js files
      .pipe(concat('vendor.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest("./dist/js/"));
});

gulp.task("copyDatasets", function(){
  gulp.src("./source/dataSets/*")
    .pipe(plumber())
      .pipe(gulp.dest("./dist/datasets/"));
})


//copy scatterplot.js and chloropleth.js directly
gulp.task("copyClean",  function () {
  gulp.src([
      "./source/js/datasetMetaData.js",
      "./source/js/chloropleth.js",
      "./source/js/scatterPlot.js",
      "./source/js/getDistancePlotWorker.js", 
    "./source/js/getPlotDataWorker.js",
    "./source/js/datamaps.world.min.js",
    "./source/js/getCountryData.js"
    ])
    .pipe(stripDebug())
    .pipe(gulp.dest("./dist/js/"));

});

//concat, minify, and copy all the custom js files to the dist js directory
gulp.task("custjs",  function () {
  return gulp.src(["./source/js/chloropleth.js",
    "./source/js/datasetMetaData.js",
    "./source/js/scatterPlot.js",
    "./source/js/d3.tip.v0.6.3.js",
    "./source/js/normalizeCountryNames.js",
    "./source/js/engine.js"])
    .pipe(plumber())
    .pipe(stripDebug())
    .pipe(concat('custom.js'))
    
    .pipe(gulp.dest("./dist/js/"));

});

//concat, minify, and copy css files to dist css directory
gulp.task("css", ['cleancss'], function(){
    gulp.src("./source/css/*.css")
    .pipe(plumber())
    .pipe(uncss({
      html: ['./source/*.html']
    }))
    .pipe(concat('styles.css'))
    .pipe(uglifycss({
      "max-line-len": 80
    }))
    .pipe(gulp.dest("./dist/css/"));
});

//open dev files in server
gulp.task('connectDev', function () {
  connect.server({
    root: ['source'],
    port: 8000,
    livereload: true
  });
});
 
//open dist files in server 
gulp.task('connectDist', function () {
  connect.server({
    root: 'dist',
    port: 8001,
    livereload: true
  });
});

//minimize my js files
gulp.task("minjs", ['clean'], function () {
  gulp.src("./source/myjs/*.js")
    .pipe(plumber())
    .pipe(concat('myjs.js'))
    .pipe(uglify())
    .pipe(gulp.dest("./dist/js/"));

  gulp.src("./source/js/*.js")
    .pipe(plumber())
    .pipe(gulp.dest("./dist/js/"));

  gulp.src("./source/sounds/*.js")
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest("./dist/sounds/"));

  gulp.src("./source/models/*.*")
    .pipe(plumber())
    .pipe(gulp.dest("./dist/models/"));

  gulp.src("./source/images/*.png")
    .pipe(plumber())
    .pipe(gulp.dest("./dist/images/"));

  gulp.src("./source/css/*.css")
    .pipe(plumber())
    .pipe(concat('styles.css'))
    .pipe(uglifycss({
      "max-line-len": 80
    }))
    .pipe(gulp.dest("./dist/css/"));

  gulp.src("./source/*.html")
    .pipe(plumber())
    .pipe(useref())
    .pipe(gulp.dest("./dist/"));
});

// configure the jshint task
gulp.task('jshint', function () {
  return gulp.src('./myjs/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// create a default task and just log a message
gulp.task('default', function () {
  return gutil.log('Gulp is running!')
});

gulp.task('clean', function () {
  return gulp.src(['./dist/*'], { read: false })
    .pipe(clean());
});



gulp.task('deploy', function () {
  return gulp.src('./dist/**/*')
    .pipe(plumber())
    .pipe(scp({
      //edit secrets.json file for the following params
      host: secrets.hostname,
      username: secrets.username,
      password: secrets.password,
      dest: secrets.destination
    }))
    .on('error', function (err) {
      console.log(err);
    });
});
