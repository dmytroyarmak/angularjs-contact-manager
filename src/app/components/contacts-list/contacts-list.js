(function() {
  'use strict';

  angular
    .module('contactManager.contactsList', [
      'contactManager.services.contactManagerApi'
    ])
    .controller('ContactsListController', ContactsListController);

  /* @ngInject */
  function ContactsListController(contactManagerApi) {
    var contactsList = this;
    contactsList.deleteContact = deleteContact;
    contactsList.activate = activate;
    contactsList.contacts = [];

    //////////

    function activate() {
      return _getAllContacts();
    }

    function deleteContact(contact) {
      var indexOfContact = contactsList.contacts.indexOf(contact);
      contactsList.contacts.splice(indexOfContact, 1);

      contactManagerApi.deleteContact(contact.id);
    }

    function _getAllContacts() {
      contactManagerApi
        .getAllContacts()
        .then(_onGetAllContactsSuccess);
    }

    function _onGetAllContactsSuccess(contacts) {
      contactsList.contacts = contacts;
    }
  }
}());
