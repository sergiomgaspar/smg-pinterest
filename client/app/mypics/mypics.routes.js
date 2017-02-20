'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('mypics', {
      url: '/mypics',
      template: '<mypics></mypics>'
    });
}
