'use strict';
const angular = require('angular');

export default angular.module('smgPinterestApp.brokenImg', [])
  .directive('brokenImg', function() {
   /* return {
      template: '<div></div>',
      restrict: 'EA',
      link: function(scope, element, attrs) {
        element.text('this is the brokenImg directive');
      }
    };*/
    var fallbackSrc = {
      link: function postLink(scope, iElement, iAttrs) {
        iElement.bind('error', function() {
          angular.element(this).attr("src", iAttrs.fallbackSrc);
        });
      }
    }
    return fallbackSrc;
  })
  .name;
