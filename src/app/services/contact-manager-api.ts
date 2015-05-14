module cm.services.contactManagerApi {
  'use strict';
  
  interface IContactData {
    id?: string;
    name: string;
    email: string;
    tel: string;
    faceId: string;
  }
  
  export interface IContact extends IContactData {
    thumbnailUrl: string;
  }
  
  export interface IContactManagerApiService {
    getAllContacts: () => ng.IPromise<IContact[]>;
    getContact: (contactId: string) => ng.IPromise<IContact>;
    createContact: (contact: IContact) => ng.IPromise<IContact>;
    updateContact: (contact: IContact) => ng.IPromise<IContact>;
    deleteContact: (contact: IContact) => ng.IPromise<any>;
    getAvailableFaceIds: () => ng.IPromise<number[]>;
  }
  
  class ContactManagerApiService implements IContactManagerApiService {
    private static CONTACT_MANAGER_API_HOST = 'http://api-contact-manager.herokuapp.com';
    private static CONTACTS_URL = ContactManagerApiService.CONTACT_MANAGER_API_HOST + '/contacts';
    private static CONTACT_URL = ContactManagerApiService.CONTACT_MANAGER_API_HOST + '/contacts/{{id}}';
    private static THUMBNAIL_URL = ContactManagerApiService.CONTACT_MANAGER_API_HOST + '/img/faces/{{faceId}}.jpg';
    private static AVAILABLE_FACE_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    
    static $inject = ['$http', '$q'];
    constructor(private $http: ng.IHttpService, private $q: ng.IQService) {}
    
    getAllContacts(): ng.IPromise<IContact[]> {
      return this.$http
        .get(ContactManagerApiService.CONTACTS_URL)
        .then((resp: ng.IHttpPromiseCallbackArg<IContactData[]>) => {
          return this.parseContacts(resp.data);
        });
    }
    
    getContact(contactId: string): ng.IPromise<IContact> {
      var contactUrl = this.getContactUrl(contactId);
      return this.$http
        .get(contactUrl)
        .then((resp: ng.IHttpPromiseCallbackArg<IContactData>) => {
          return this.parseContact(resp.data);
        });
    }
    
    createContact(contact: IContact): ng.IPromise<IContact> {
      return this.$http
        .post(ContactManagerApiService.CONTACTS_URL, contact)
        .then((resp: ng.IHttpPromiseCallbackArg<IContactData>) => {
          return this.parseContact(resp.data);
        });
    }

    updateContact(contact: IContact): ng.IPromise<IContact> {
      var contactUrl = this.getContactUrl(contact.id);
      
      return this.$http.put(contactUrl, contact)
        .then((resp: ng.IHttpPromiseCallbackArg<IContactData>) => {
          return this.parseContact(resp.data);
        });
    }

    deleteContact(contact: IContact): ng.IPromise<void> {
      var contactUrl = this.getContactUrl(contact.id);
      
      return this.$http
        .delete(contactUrl)
        .then(angular.noop);
    }

    getAvailableFaceIds() {
      return this.$q.when(ContactManagerApiService.AVAILABLE_FACE_IDS);
    }

    private getContactUrl(contactId: string): string {
      return ContactManagerApiService.CONTACT_URL.replace('{{id}}', contactId);
    }
       
    private parseContacts(contacts: IContactData[]): IContact[] {
      return contacts.map((contact: IContact) => {
        return this.parseContact(contact);
      });
    }
    
    private parseContact(contact: IContactData): IContact {
      return angular.extend(contact, {
        thumbnailUrl: this.getContactThumbnailUrl(contact)
      });
    }
    
    private getContactThumbnailUrl(contact: IContactData) {
      return ContactManagerApiService.THUMBNAIL_URL.replace('{{faceId}}', contact.faceId);
    }
  }
  
  angular
    .module('contactManager.services.contactManagerApi', [])
    .service('contactManagerApi', ContactManagerApiService);
}
