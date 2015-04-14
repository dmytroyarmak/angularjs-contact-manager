'use strict';

angular
  .module('contactManager')
  .controller('ContactManagerController', ContactManagerController);

/* @ngInject */
function ContactManagerController($router) {
  $router.config([
    {
      path: '/',
      redirectTo: '/contacts'
    },
    {
      path: '/contacts',
      component: 'contactsList'
    },
    {
      path: '/contacts/:contectId',
      component: 'contactsManage'
    }
  ]);
}
