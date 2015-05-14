module cm {
  'use strict';
  
  interface IContactManagerController {
  }
  
  class ContactManagerController implements IContactManagerController {    
    static $inject = ['$router'];
    constructor($router: any) {
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
          path: '/contacts/:id',
          component: 'contactsManage'
        }
      ]);
    }
  }
  
  angular
    .module('contactManager')
    .controller('ContactManagerController', ContactManagerController);
}
