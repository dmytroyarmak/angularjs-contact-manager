import angular from 'angular';
import ngRoute from 'angular-route';
import contactManager from './contact-manager';

angular.bootstrap(document.body, [contactManager], {
  strictDi: true
});
