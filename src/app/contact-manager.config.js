'use strict';

angular
  .module('contactManager')
  .config(contactManagerComponentLoaderConfig)
  .config(contactManagerHtppConfig);

/* @ngInject */
function contactManagerComponentLoaderConfig($componentLoaderProvider) {
  $componentLoaderProvider.setTemplateMapping(componentToTemplate);

  function componentToTemplate(name) {
    var dashName = dashCase(name);
    return 'components/' + dashName + '/' + dashName + '.html';
  }

  function dashCase(str) {
    return str.replace(/([A-Z])/g, function ($1) {
      return '-' + $1.toLowerCase();
    });
  }
}

/* @ngInject */
function contactManagerHtppConfig ($httpProvider) {
  $httpProvider.defaults.withCredentials = true;
}
