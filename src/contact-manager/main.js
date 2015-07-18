import angular from 'angular';
import ngRoute from 'angular-route';
import {contactManagerHtppConfig, contactManagerRouteConfig} from './contact-manager';
import contactsList from './components/contacts-list/main';
import contactsManage from './components/contacts-manage/main';

export default angular
  .module('contactManager', [
    'ngRoute',

    contactsList,
    contactsManage
  ])
  .config(contactManagerHtppConfig)
  .config(contactManagerRouteConfig)
  .name;
