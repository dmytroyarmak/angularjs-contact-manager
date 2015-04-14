var appRoot = 'src/',
	bowerRoot = 'bower_components/';

module.exports = {
  root: appRoot,
  vendorJs: [
  	bowerRoot + 'angular/angular.js'
  ],
  js: appRoot + 'app/**/*.js',
  html: appRoot + 'app/**/*.html',
  less: appRoot + 'styles/contact-manager.less',
  output: 'dist/'
};
