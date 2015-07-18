import contactsManageTemplate from './contacts-manage.html!text';

contactsManageConfig.$inject = ['$routeProvider'];
export function contactsManageConfig($routeProvider) {
  $routeProvider
    .when('/contacts/:id', {
      controller: 'ContactsManageController',
      controllerAs: 'contactsManage',
      template: contactsManageTemplate
    });
}

export class ContactsManageController {
  static get $inject() {
    return ['$routeParams', '$location', '$q', 'contactManagerApi'];
  }

  constructor($routeParams, $location, $q, contactManagerApi) {
    this.$routeParams = $routeParams;
    this.$location = $location;
    this.$q = $q;
    this.contactManagerApi = contactManagerApi;

    this.contact = null;
    this.availableFaceIds = null;

    this.activate();
  }

  activate() {
    return this.$q.all([
      this._getAvailableFaceIds(),
      this._getContact()
    ]);
  }

  isNew() {
    return (this.$routeParams.id === 'new');
  }

  submitForm() {
    this._createOrUpdateContact(this.contact)
      .then(() => {
        this.$location.path('contacts');
      });
  }

  _getAvailableFaceIds() {
    return this.contactManagerApi
      .getAvailableFaceIds()
      .then((availableFaceIds) => {
        this.availableFaceIds = availableFaceIds;
      });
  }

  _getContact() {
    if (this.isNew()) {
      this.contact = {};
    } else {
      return this.contactManagerApi
        .getContact(this.$routeParams.id)
        .then((contact) => {
          this.contact = contact;
        });
    }
  }

  _createOrUpdateContact(contact) {
    if (this.isNew()) {
      return this.contactManagerApi.createContact(contact);
    } else {
      return this.contactManagerApi.updateContact(contact);
    }
  }
}
