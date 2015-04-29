(function() {
  'use strict';

  angular
    .module('contactManager.services.contactManagerApi', [])
    .factory('contactManagerApi', contactManagerApi);

  /* @ngInject */
  function contactManagerApi($http, $q) {
    var CONTACT_MANAGER_API_HOST = 'http://api-contact-manager.herokuapp.com';
    var CONTACTS_URL = CONTACT_MANAGER_API_HOST + '/contacts';
    var CONTACT_URL = CONTACT_MANAGER_API_HOST + '/contacts/{{id}}';
    var THUMBNAIL_URL = CONTACT_MANAGER_API_HOST + '/img/faces/{{faceId}}.jpg';

    var AVAILABLE_FACE_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

    var service = {
      getAllContacts: getAllContacts,
      getContact: getContact,
      createContact: createContact,
      updateContact: updateContact,
      deleteContact: deleteContact,
      getAvailableFaceIds: getAvailableFaceIds
    };

    return service;

    //////////

    function getAllContacts() {
      return $http.get(CONTACTS_URL)
        .then(_getDataFromResponse)
        .then(_parseContacts);
    }

    function createContact(contact) {
      return $http.post(CONTACTS_URL, contact)
        .then(_getDataFromResponse)
        .then(_parseContact);
    }

    function getContact(contactId) {
      var contactUrl = _getContactUrl(contactId);
      return $http.get(contactUrl)
        .then(_getDataFromResponse)
        .then(_parseContact);
    }

    function updateContact(contact) {
      var contactUrl = _getContactUrl(contact.id);
      return $http.put(contactUrl, contact)
        .then(_getDataFromResponse)
        .then(_parseContact);
    }

    function deleteContact(contactId) {
      var contactUrl = _getContactUrl(contactId);
      return $http.delete(contactUrl);
    }

    function getAvailableFaceIds() {
      return $q.when(AVAILABLE_FACE_IDS);
    }

    function _getDataFromResponse(resp) {
      return resp.data;
    }

    function _parseContacts(contacts) {
      return contacts.map(_parseContact);
    }

    function _parseContact(contact) {
      return angular.extend(contact, {
        thumbnailUrl: _getContactThumbnailUrl(contact)
      });
    }

    function _getContactThumbnailUrl(contact) {
      return THUMBNAIL_URL.replace('{{faceId}}', contact.faceId);
    }

    function _getContactUrl(contactId) {
      return CONTACT_URL.replace('{{id}}', contactId);
    }
  }
}());
