'use strict';

angular
  .module('contactManager.services.contactManagerApi', [])
  .factory('contactManagerApi', contactManagerApi);

/* @ngInject */
function contactManagerApi($http) {
  var CONTACT_MANAGER_API_HOST = 'http://api-contact-manager.herokuapp.com';
  var CONTACTS_URL = CONTACT_MANAGER_API_HOST + '/contacts';
  var CONTACT_URL = CONTACT_MANAGER_API_HOST + '/contacts/{{id}}';
  var THUMBNAIL_URL = CONTACT_MANAGER_API_HOST + '/img/faces/{{faceId}}.jpg'

  var service = {
    getAllContacts: getAllContacts
  };

  return service;

  //////////

  function getAllContacts() {
    return $http.get(CONTACTS_URL)
      .then(_getDataFromResponse)
      .then(_parseContacts);
  }

  function _getDataFromResponse (resp) {
    return resp.data;
  }

  function _parseContacts (contacts) {
    return contacts.map(_parseContact);
  }

  function _parseContact (contact) {
    return angular.extend(contact, {
      thumbnailUrl: _getContactThumbnailUrl(contact)
    });
  }

  function _getContactThumbnailUrl (contact) {
    return THUMBNAIL_URL.replace('{{faceId}}', contact.faceId);
  }

}
