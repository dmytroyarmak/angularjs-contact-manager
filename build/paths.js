var appRoot = 'src/',
	bowerRoot = 'bower_components/';

module.exports = {
  root: appRoot,
  vendorJs: [
  	bowerRoot + 'angular/angular.js',
    bowerRoot + 'angular-new-router/dist/router.es5.js'
  ],
  js: [
    appRoot + 'app/**/!(*.controller|*.config).js',
    appRoot + 'app/**/*.js'
  ],
  templates: appRoot + 'app/**/*.html',
  html: appRoot + 'app/**/*.html',
  less: appRoot + 'styles/contact-manager.less',
  output: 'dist/'
};
