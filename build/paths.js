/* jshint node: true */
'use strict';
var appRoot = 'src/',
	bowerRoot = 'bower_components/';

module.exports = {
  root: appRoot,
  vendorJs: [
    bowerRoot + 'angular/angular.js',
    bowerRoot + 'angular-route/angular-route.js'
  ],
  js: [
    appRoot + 'app/**/!(*.controller|*.config).js',
    appRoot + 'app/**/*.js'
  ],
  templates: appRoot + 'app/**/*.html',
  html: appRoot + 'app/**/*.html',
  less: appRoot + 'styles/contact-manager.less',
  fonts: 'bower_components/bootstrap/dist/fonts/*',
  output: 'dist/'
};
