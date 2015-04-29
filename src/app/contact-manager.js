(function() {
  'use strict';

  angular.module('contactManager', [
    'ngNewRouter',

    'contactManager.contactsList',
    'contactManager.contactsManage'
  ]);
}());
