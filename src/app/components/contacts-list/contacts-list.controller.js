'use strict';

angular
  .module('contactManager.contactsList')
  .controller('ContactsListController', ContactsListController);

/* @ngInject */
function ContactsListController(contactManagerApi) {
  var contactsList = this;
  contactsList.activate = activate;
  contactsList.contacts = [];

  //////////

  function activate () {
    return getAllContacts();
  }

  function getAllContacts () {
    contactManagerApi
      .getAllContacts()
      .then(_onGetAllContactsSuccess);
  }

  function _onGetAllContactsSuccess (contacts) {
    contactsList.contacts = contacts;
  }
}
