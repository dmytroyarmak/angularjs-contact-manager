/// <reference path="../../typings/tsd.d.ts" />

module cm {
  'use strict';
  
  angular.module('contactManager', [
    'ngNewRouter',

    'contactManager.contactsList',
    'contactManager.contactsManage'
  ]);
}