'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('addpic', {
      url: '/addpic',
      template: '<addpic></addpic>'
    });
}
