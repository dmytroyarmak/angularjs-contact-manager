/* jshint node: true */
'use strict';
var appRoot = 'src/',
	bowerRoot = 'bower_components/';

module.exports = {
  root: appRoot,
  vendorJs: [
    bowerRoot + 'angular/angular.js',
    bowerRoot + 'angular-new-router/dist/router.es5.js'
  ],
  ts: [
    appRoot + 'app/**/!(*.controller|*.config).ts',
    appRoot + 'app/**/*.ts'
  ],
  templates: appRoot + 'app/**/*.html',
  html: appRoot + 'app/**/*.html',
  less: appRoot + 'styles/contact-manager.less',
  fonts: 'bower_components/bootstrap/dist/fonts/*',
  output: 'dist/'
};
