const CONTACT_MANAGER_API_HOST = 'http://api-contact-manager.herokuapp.com';
const CONTACTS_URL = CONTACT_MANAGER_API_HOST + '/contacts';
const CONTACT_URL = CONTACT_MANAGER_API_HOST + '/contacts/{{id}}';
const THUMBNAIL_URL = CONTACT_MANAGER_API_HOST + '/img/faces/{{faceId}}.jpg';

const AVAILABLE_FACE_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

export class ContactManagerApi {
  static get $inject() {
    return ['$http', '$q'];
  }

  constructor($http, $q) {
    this.$http = $http;
    this.$q = $q;
  }

  getAllContacts() {
    return this.$http.get(CONTACTS_URL)
      .then(::this._getDataFromResponse)
      .then(::this._parseContacts);
  }

  createContact(contact) {
    return this.$http.post(CONTACTS_URL, contact)
      .then(::this._getDataFromResponse)
      .then(::this._parseContact);
  }

  getContact(contactId) {
    var contactUrl = this._getContactUrl(contactId);
    return this.$http.get(contactUrl)
      .then(::this._getDataFromResponse)
      .then(::this._parseContact);
  }

  updateContact(contact) {
    var contactUrl = this._getContactUrl(contact.id);
    return this.$http.put(contactUrl, contact)
      .then(::this._getDataFromResponse)
      .then(::this._parseContact);
  }

  deleteContact(contactId) {
    var contactUrl = this._getContactUrl(contactId);
    return this.$http.delete(contactUrl);
  }

  getAvailableFaceIds() {
    return this.$q.when(AVAILABLE_FACE_IDS);
  }

  _getDataFromResponse(resp) {
    return resp.data;
  }

  _parseContacts(contacts) {
    return contacts.map(::this._parseContact);
  }

  _parseContact(contact) {
    return Object.assign(contact, {
      thumbnailUrl: this._getContactThumbnailUrl(contact)
    });
  }

  _getContactThumbnailUrl(contact) {
    return THUMBNAIL_URL.replace('{{faceId}}', contact.faceId);
  }

  _getContactUrl(contactId) {
    return CONTACT_URL.replace('{{id}}', contactId);
  }
}
