import angular from 'angular';
import contactManagerApi from '../../services/contact-manager-api';

const MODULE_NAME = 'contactManager.contactsList';

angular
  .module(MODULE_NAME, [
    contactManagerApi
  ])
  .controller('ContactsListController', ContactsListController);

ContactsListController.$inject = ['contactManagerApi'];
function ContactsListController(contactManagerApi) {
  var contactsList = this;
  contactsList.deleteContact = deleteContact;
  contactsList.contacts = [];

  activate();

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

export default MODULE_NAME;
