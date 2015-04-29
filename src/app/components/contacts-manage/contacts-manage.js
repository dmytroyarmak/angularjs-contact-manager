(function() {
  'use strict';

  angular
    .module('contactManager.contactsManage', [
      'contactManager.services.contactManagerApi'
    ])
    .controller('ContactsManageController', ContactsManageController);

  /* @ngInject */
  function ContactsManageController($router, $routeParams, $location, $q, contactManagerApi) {
    var contactsManage = this;
    contactsManage.activate = activate;
    contactsManage.isNew = isNew;
    contactsManage.submitForm = submitForm;
    contactsManage.contact = null;
    contactsManage.availableFaceIds = null;

    //////////

    function activate() {
      if (isNew()) {
        contactsManage.contact = {};
      } else {
        return $q.all([
          _getAvailableFaceIds(),
          _getContact()
        ]);
      }
    }

    function isNew() {
      return ($routeParams.id === 'new');
    }

    function submitForm() {
      _createOrUpdateContact(contactsManage.contact)
        .then(_goToContactsList);
    }

    function _getAvailableFaceIds() {
      return contactManagerApi
        .getAvailableFaceIds()
        .then(_onGetAvailableFaceIdsSuccess);
    }

    function _onGetAvailableFaceIdsSuccess(availableFaceIds) {
      contactsManage.availableFaceIds = availableFaceIds;
    }

    function _getContact() {
      return contactManagerApi
        .getContact($routeParams.id)
        .then(_onGetContactSuccess);
    }

    function _onGetContactSuccess(contact) {
      contactsManage.contact = contact;
    }

    function _createOrUpdateContact(contact) {
      if (isNew()) {
        return contactManagerApi.createContact(contact);
      } else {
        return contactManagerApi.updateContact(contact);
      }
    }

    function _goToContactsList() {
      var contactsListLocation = $router.generate('contactsList');
      $location.path(contactsListLocation);
    }
  }
}());
