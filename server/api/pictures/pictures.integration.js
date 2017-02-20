'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newPictures;

describe('Pictures API:', function() {
  describe('GET /api/pictures', function() {
    var picturess;

    beforeEach(function(done) {
      request(app)
        .get('/api/pictures')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          picturess = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(picturess).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/pictures', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/pictures')
        .send({
          name: 'New Pictures',
          info: 'This is the brand new pictures!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newPictures = res.body;
          done();
        });
    });

    it('should respond with the newly created pictures', function() {
      expect(newPictures.name).to.equal('New Pictures');
      expect(newPictures.info).to.equal('This is the brand new pictures!!!');
    });
  });

  describe('GET /api/pictures/:id', function() {
    var pictures;

    beforeEach(function(done) {
      request(app)
        .get(`/api/pictures/${newPictures._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          pictures = res.body;
          done();
        });
    });

    afterEach(function() {
      pictures = {};
    });

    it('should respond with the requested pictures', function() {
      expect(pictures.name).to.equal('New Pictures');
      expect(pictures.info).to.equal('This is the brand new pictures!!!');
    });
  });

  describe('PUT /api/pictures/:id', function() {
    var updatedPictures;

    beforeEach(function(done) {
      request(app)
        .put(`/api/pictures/${newPictures._id}`)
        .send({
          name: 'Updated Pictures',
          info: 'This is the updated pictures!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedPictures = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPictures = {};
    });

    it('should respond with the updated pictures', function() {
      expect(updatedPictures.name).to.equal('Updated Pictures');
      expect(updatedPictures.info).to.equal('This is the updated pictures!!!');
    });

    it('should respond with the updated pictures on a subsequent GET', function(done) {
      request(app)
        .get(`/api/pictures/${newPictures._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let pictures = res.body;

          expect(pictures.name).to.equal('Updated Pictures');
          expect(pictures.info).to.equal('This is the updated pictures!!!');

          done();
        });
    });
  });

  describe('PATCH /api/pictures/:id', function() {
    var patchedPictures;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/pictures/${newPictures._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Pictures' },
          { op: 'replace', path: '/info', value: 'This is the patched pictures!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedPictures = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedPictures = {};
    });

    it('should respond with the patched pictures', function() {
      expect(patchedPictures.name).to.equal('Patched Pictures');
      expect(patchedPictures.info).to.equal('This is the patched pictures!!!');
    });
  });

  describe('DELETE /api/pictures/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/pictures/${newPictures._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when pictures does not exist', function(done) {
      request(app)
        .delete(`/api/pictures/${newPictures._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
