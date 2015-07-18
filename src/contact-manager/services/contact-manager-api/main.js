import angular from 'angular';
import {ContactManagerApi} from './contact-manager-api';

export default angular
  .module('contactManager.services.contactManagerApi', [])
  .service('contactManagerApi', ContactManagerApi)
  .name;
