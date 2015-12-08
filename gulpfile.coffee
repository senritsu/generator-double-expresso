gulp = require 'gulp'
coffee = require 'gulp-coffee'
plumber = require 'gulp-plumber'
watch = require 'gulp-watch'
lazypipe = require 'lazypipe'

srcWatch = (glob) ->
    gulp.src glob
    .pipe watch glob
    .pipe plumber()

gulp.task 'default', ->
    srcWatch 'src/*/*.coffee'
    .pipe coffee()
    .pipe gulp.dest 'generators/'

    srcWatch 'src/*/templates/**/*.*'
    .pipe gulp.dest 'generators/'
