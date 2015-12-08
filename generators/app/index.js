(function() {
  var DoubleExpresso, chalk, generators,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  generators = require('yeoman-generator');

  chalk = require('chalk');

  module.exports = DoubleExpresso = (function(superClass) {
    extend(DoubleExpresso, superClass);

    function DoubleExpresso() {
      generators.Base.apply(this, arguments);
      this.option('frontend');
      this.packageOptions = {
        name: 'TestName'
      };
    }

    DoubleExpresso.prototype.copyPackageFile = function() {
      this.log(chalk.blue('copying files'));
      this.template('package.json', 'package.json', this.packageOptions);
      this.copy('gulpfile.coffee', 'gulpfile.coffee');
      if (this.options.frontend) {
        this.copy('.bowerrc', '.bowerrc');
        return this.template('bower.json', 'bower.json', this.packageOptions);
      }
    };

    DoubleExpresso.prototype.dependencies = function() {
      this.log(chalk.blue('installing npm dependencies'));
      this.npmInstall(['express', 'ect', 'pouchdb', 'mathjs'], {
        save: true
      });
      this.npmInstall(['gulp', 'gulp-plumber', 'gulp-coffee', 'gulp-watch', 'lazypipe'], {
        saveDev: true
      });
      if (this.options.frontend) {
        this.npmInstall(['gulp-sass'], {
          saveDev: true
        });
        return this.bowerInstall(['jquery', 'bootstrap@4.0.0-alpha'], {
          save: true
        });
      }
    };

    DoubleExpresso.prototype.end = function() {
      this.log(chalk.blue('compiling gulpfile'));
      return this.spawnCommand('coffee', ['-c', 'gulpfile.coffee']);
    };

    return DoubleExpresso;

  })(generators.Base);

}).call(this);
