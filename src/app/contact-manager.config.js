'use strict';

angular
  .module('contactManager')
  .config(contactManagerHtppConfig);

/* @ngInject */
function contactManagerHtppConfig($httpProvider) {
  $httpProvider.defaults.withCredentials = true;
}
