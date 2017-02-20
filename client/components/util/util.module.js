'use strict';

import angular from 'angular';
import {
  UtilService
} from './util.service';

export default angular.module('smgPinterestApp.util', [])
  .factory('Util', UtilService)
  .name;
