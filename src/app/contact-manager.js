import angular from 'angular';
import ngRoute from 'angular-route';
import contactList from './components/contacts-list/contacts-list';
import contactManage from './components/contacts-manage/contacts-manage';

const MODULE_NAME = 'contactManager';

angular
  .module('contactManager', [
    'ngRoute',

    contactList,
    contactManage
  ])
  .config(contactManagerHtppConfig)
  .config(contactManagerRouteConfig);

contactManagerHtppConfig.$inject = ['$httpProvider'];
function contactManagerHtppConfig($httpProvider) {
  $httpProvider.defaults.withCredentials = true;
}

contactManagerRouteConfig.$inject = ['$routeProvider'];
function contactManagerRouteConfig($routeProvider) {
  $routeProvider
    .when('/contacts', {
      controller: 'ContactsListController',
      controllerAs: 'contactsList',
      templateUrl: 'src/app/components/contacts-list/contacts-list.html'
    })
    .when('/contacts/:id', {
      controller: 'ContactsManageController',
      controllerAs: 'contactsManage',
      templateUrl: 'src/app/components/contacts-manage/contacts-manage.html'
    })
    .otherwise('/contacts');
}

export default MODULE_NAME;
