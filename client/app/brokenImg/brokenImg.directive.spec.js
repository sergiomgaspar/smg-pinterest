'use strict';

describe('Directive: brokenImg', function() {
  // load the directive's module
  beforeEach(module('smgPinterestApp.brokenImg'));

  var element,
    scope;

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function($compile) {
    element = angular.element('<broken-img></broken-img>');
    element = $compile(element)(scope);
    expect(element.text()).to.equal('this is the brokenImg directive');
  }));
});
