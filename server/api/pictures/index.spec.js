'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var picturesCtrlStub = {
  index: 'picturesCtrl.index',
  show: 'picturesCtrl.show',
  create: 'picturesCtrl.create',
  upsert: 'picturesCtrl.upsert',
  patch: 'picturesCtrl.patch',
  destroy: 'picturesCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var picturesIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './pictures.controller': picturesCtrlStub
});

describe('Pictures API Router:', function() {
  it('should return an express router instance', function() {
    expect(picturesIndex).to.equal(routerStub);
  });

  describe('GET /api/pictures', function() {
    it('should route to pictures.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'picturesCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/pictures/:id', function() {
    it('should route to pictures.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'picturesCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/pictures', function() {
    it('should route to pictures.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'picturesCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/pictures/:id', function() {
    it('should route to pictures.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'picturesCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/pictures/:id', function() {
    it('should route to pictures.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'picturesCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/pictures/:id', function() {
    it('should route to pictures.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'picturesCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
