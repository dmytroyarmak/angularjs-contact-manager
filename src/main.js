import angular from 'angular';
import contactManager from './contact-manager/main';

angular.bootstrap(document.body, [contactManager], {
  strictDi: true
});
