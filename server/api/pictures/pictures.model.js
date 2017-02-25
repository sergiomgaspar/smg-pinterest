'use strict';

import mongoose from 'mongoose';

var PicturesSchema = new mongoose.Schema({
  userId: String,
  userName: String,
  imageUrl: String,
  imageComment: String,
  countLike: Number,
  likes: []
});

/* Search pictures by ID of owner */
PicturesSchema.methods.findByUser = function(cb) {  
  return this.model('Pictures').find({ userId: this.userId }, cb);
};

export default mongoose.model('Pictures', PicturesSchema);
