/**
 * Pictures model events
 */

'use strict';

import {EventEmitter} from 'events';
import Pictures from './pictures.model';
var PicturesEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PicturesEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Pictures.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    PicturesEvents.emit(event + ':' + doc._id, doc);
    PicturesEvents.emit(event, doc);
  };
}

export default PicturesEvents;
