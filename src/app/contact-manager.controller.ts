module cm {
  'use strict';
  
  interface IContactManagerController {
  }
  
  class ContactManagerController implements IContactManagerController {
    static $routeConfig = [
      {
        path: '/',
        redirectTo: '/contacts'
      },
      {
        path: '/contacts',
        component: 'contactsList'
      },
      {
        path: '/contacts/:id',
        component: 'contactsManage'
      }
    ];
    
    static $inject = [];
  }
  
  angular
    .module('contactManager')
    .controller('contectManager.ContactManagerController', ContactManagerController);
}
