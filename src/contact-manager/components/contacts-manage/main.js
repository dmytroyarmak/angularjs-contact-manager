import angular from 'angular';
import {ContactsManageController, contactsManageConfig} from './contacts-manage';
import contactManagerApi from '../../services/contact-manager-api/main';

export default angular
  .module('contactManager.contactsManage', [
    contactManagerApi
  ])
  .config(contactsManageConfig)
  .controller('ContactsManageController', ContactsManageController)
  .name;
