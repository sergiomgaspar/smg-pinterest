'use strict';

describe('Component: MypicsComponent', function() {
  // load the controller's module
  beforeEach(module('smgPinterestApp.mypics'));

  var MypicsComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    MypicsComponent = $componentController('mypics', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
