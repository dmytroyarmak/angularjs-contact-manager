(function() {
  'use strict';

  angular
    .module('contactManager')
    .config(contactManagerHtppConfig)
    .config(contactManagerRouteConfig);

  /* @ngInject */
  function contactManagerHtppConfig($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
  }

  /* @ngInject */
  function contactManagerRouteConfig($routeProvider) {
    $routeProvider
      .when('/contacts', {
        controller: 'ContactsListController',
        controllerAs: 'contactsList',
        templateUrl: './components/contacts-list/contacts-list.html'
      })
      .when('/contacts/:id', {
        controller: 'ContactsManageController',
        controllerAs: 'contactsManage',
        templateUrl: './components/contacts-manage/contacts-manage.html'
      })
      .otherwise('/contacts');
  }
}());
