'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './mypics.routes';

export class MypicsComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('smgPinterestApp.mypics', [uiRouter])
  .config(routes)
  .component('mypics', {
    template: require('./mypics.html'),
    controller: MypicsComponent,
    controllerAs: 'mypicsCtrl'
  })
  .name;
