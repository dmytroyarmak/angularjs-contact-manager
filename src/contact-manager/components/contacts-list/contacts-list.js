import contactsListTemplate from './contacts-list.html!text';

contactsListConfig.$inject = ['$routeProvider'];
export function contactsListConfig($routeProvider) {
  $routeProvider
    .when('/contacts', {
      controller: 'ContactsListController',
      controllerAs: 'contactsList',
      template: contactsListTemplate
    });
}

export class ContactsListController {
  static get $inject () {
    return ['contactManagerApi'];
  }

  constructor(contactManagerApi) {
    this.contactManagerApi = contactManagerApi;
    this.contacts = [];

    this.activate();
  }

  activate () {
    return this._getAllContacts();
  }

  deleteContact (contact) {
    var indexOfContact = this.contacts.indexOf(contact);
    this.contacts.splice(indexOfContact, 1);

    this.contactManagerApi.deleteContact(contact.id);
  }

  _getAllContacts () {
    this.contactManagerApi
      .getAllContacts()
      .then((contacts) => {
        this.contacts = contacts;
      });
  }
}
