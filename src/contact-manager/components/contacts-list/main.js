import angular from 'angular';
import {ContactsListController, contactsListConfig} from './contacts-list';
import contactManagerApi from '../../services/contact-manager-api/main';

export default angular
  .module('contactManager.contactsList', [
    contactManagerApi
  ])
  .config(contactsListConfig)
  .controller('ContactsListController', ContactsListController)
  .name;
