'use strict';

describe('Component: AddpicComponent', function() {
  // load the controller's module
  beforeEach(module('smgPinterestApp.addpic'));

  var AddpicComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    AddpicComponent = $componentController('addpic', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
