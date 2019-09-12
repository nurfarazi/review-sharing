const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  upVote: {
    type: Number,
    required: true,
    default: 0
  },
  downVote: {
    type: Number,
    required: true,
    default: 0
  }
});

ReviewSchema
  .set('timestamps', true)
  .set('minimize', true)
  .set('autoIndex', true);

module.exports = mongoose.model('Review', ReviewSchema);
