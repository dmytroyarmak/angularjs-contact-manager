module cm {
  'use strict';
    
  contactManagerHtppConfig.$inject = ['$httpProvider'];
  function contactManagerHtppConfig($httpProvider: ng.IHttpProvider): void {
    $httpProvider.defaults.withCredentials = true;
  }

  angular
    .module('contactManager')
    .config(contactManagerHtppConfig);
}

