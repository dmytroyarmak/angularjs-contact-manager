/// <reference path="../../../../typings/tsd.d.ts" />
/// <reference path="../../../../src/app/services/contact-manager-api.ts" />

module cm.contactsList {
  'use strict';
  
  interface IContactsListController {
    contacts: cm.services.contactManagerApi.IContact[];    
    activate: () => ng.IPromise<any>;
    deleteContact: (contact: cm.services.contactManagerApi.IContact) => void;
  }

  class ContactsListController implements IContactsListController {
    contacts: cm.services.contactManagerApi.IContact[];    
    
    static $inject = [
      'contactManagerApi'
    ];
    constructor(
      private contactManagerApi: cm.services.contactManagerApi.IContactManagerApiService
    ) {
      
    }

    activate(): ng.IPromise<any> {
      return this.getAllContacts();
    }

    deleteContact(contact: cm.services.contactManagerApi.IContact): void {
      var indexOfContact = this.contacts.indexOf(contact);
      this.contacts.splice(indexOfContact, 1);

      this.contactManagerApi.deleteContact(contact);
    }

    private getAllContacts(): ng.IPromise<void> {
      return this.contactManagerApi
        .getAllContacts()
        .then((contacts: cm.services.contactManagerApi.IContact[]) => {
          this.contacts = contacts;
        });
    }
  }
  
  angular
    .module('contactManager.contactsList', [
      'contactManager.services.contactManagerApi'
    ])
    .controller('ContactsListController', ContactsListController);
}
