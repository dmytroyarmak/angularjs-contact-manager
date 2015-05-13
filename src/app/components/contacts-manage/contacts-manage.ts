/// <reference path="../../../../typings/tsd.d.ts" />
/// <reference path="../../../../src/app/services/contact-manager-api.ts" />

module cm.contactsManage {
  'use strict';
  
  interface IContactsManageController {
    contact: cm.services.contactManagerApi.IContact;
    availableFaceIds: number[];
    
    activate: () => ng.IPromise<any>;
    isNew: () => boolean;
    submitForm: () => void;
  }
  
  interface IContactsManageRouteParams {
    id: string;
  }
  
  class ContactsManageController implements IContactsManageController {
    contact: cm.services.contactManagerApi.IContact;
    availableFaceIds: number[];
    
    static $inject = [
      '$q', 
      '$location',
      '$router',
      '$routeParams',
      'contactManagerApi'
    ];
    constructor(
      private $q: ng.IQService,
      private $location: ng.ILocationService, 
      private $router: any,
      private $routeParams: IContactsManageRouteParams,
      private contactManagerApi: cm.services.contactManagerApi.IContactManagerApiService
    ) {
      this.activate = null;
      this.availableFaceIds = null;
    }
    
    activate() {
      if (this.isNew()) {
        this.contact = <cm.services.contactManagerApi.IContact>{};
      } else {
        return this.$q.all([
          this.getAvailableFaceIds(),
          this.getContact()
        ]);
      }
    }

    isNew(): boolean {
      return (this.$routeParams.id === 'new');
    }

    submitForm(): void {
      this.createOrUpdateContact(this.contact)
        .then(this.goToContactsList.bind(this));
    }

    private getAvailableFaceIds(): ng.IPromise<void> {
      return this.contactManagerApi
        .getAvailableFaceIds()
        .then((availableFaceIds: number[]) => {
          this.availableFaceIds = availableFaceIds;
        });
    }

    private getContact(): ng.IPromise<void> {
      return this.contactManagerApi
        .getContact(this.$routeParams.id)
        .then((contact: cm.services.contactManagerApi.IContact) => {
          this.contact = contact;
        });
    }

    private createOrUpdateContact(contact: cm.services.contactManagerApi.IContact): ng.IPromise<cm.services.contactManagerApi.IContact> {
      if (this.isNew()) {
        return this.contactManagerApi.createContact(contact);
      } else {
        return this.contactManagerApi.updateContact(contact);
      }
    }

    private goToContactsList(): void {
      var contactsListLocation = this.$router.generate('contactsList');
      this.$location.path(contactsListLocation);
    }
  }
  
  angular
    .module('contactManager.contactsManage', [
      'contactManager.services.contactManagerApi'
    ])
    .controller('ContactsManageController', ContactsManageController);
}
