generators = require 'yeoman-generator'
chalk = require 'chalk'

module.exports = class DoubleExpresso extends generators.Base
    constructor: ->
        generators.Base.apply this, arguments

        @option 'frontend'

        @packageOptions =
            name: 'TestName'

    copyPackageFile: ->
        @log chalk.blue 'copying files'
        @template 'package.json', 'package.json', @packageOptions
        @copy 'gulpfile.coffee', 'gulpfile.coffee'
        if @options.frontend
            @copy '.bowerrc', '.bowerrc'
            @template 'bower.json', 'bower.json', @packageOptions

    dependencies: ->
        @log chalk.blue 'installing npm dependencies'
        @npmInstall ['express', 'ect', 'pouchdb', 'mathjs'], save: true
        @npmInstall ['gulp', 'gulp-plumber', 'gulp-coffee', 'gulp-watch', 'lazypipe'], saveDev: true
        if @options.frontend
            @npmInstall ['gulp-sass'], saveDev: true
            @bowerInstall ['jquery', 'bootstrap#v4.0.0-alpha'], save: true

    end: ->
        @log chalk.blue 'compiling gulpfile'
        @spawnCommand 'coffee', ['-c', 'gulpfile.coffee']
