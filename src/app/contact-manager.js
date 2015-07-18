(function() {
  'use strict';

  angular.module('contactManager', [
    'ngRoute',

    'contactManager.contactsList',
    'contactManager.contactsManage'
  ]);
}());
