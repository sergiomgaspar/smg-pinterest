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

export default mongoose.model('Pictures', PicturesSchema);
