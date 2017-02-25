/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/pictures              ->  index
 * POST    /api/pictures              ->  create
 * GET     /api/pictures/:id          ->  show
 * PUT     /api/pictures/:id          ->  upsert
 * PATCH   /api/pictures/:id          ->  patch
 * DELETE  /api/pictures/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Pictures from './pictures.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Picturess
export function index(req, res) {
  return Pictures.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Pictures from the DB
export function show(req, res) {
  return Pictures.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Pictures in the DB
export function create(req, res) {
  return Pictures.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Pictures in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
 console.log("RECEIVED REQUEST TO UPDATE PIC");  
 console.log("PARAM_ID: "+ req.params.id);
 console.log("req.body.countLike: "+req.body.countLike);
 console.log("req.body.likes: "+req.body.likes);
 console.log("BODY:",JSON.stringify(req.body, undefined, 2));
  return Pictures.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Pictures in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Pictures.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Pictures from the DB
export function destroy(req, res) {
  return Pictures.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
