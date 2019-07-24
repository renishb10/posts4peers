const mongoose = require('../data/db')();

const { Schema } = mongoose;

const postModel = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tag',
    },
  ],
  type: {
    type: String,
    default: 'normal',
  },
  createdAt: {
    type: Date,
    required: false,
    default: new Date().toISOString(),
  },
  updatedAt: {
    type: Date,
    required: false,
    default: new Date().toISOString(),
  },
});

// Indexing goes here
postModel.index({ title: 1 });
postModel.index({ author: 1 });
postModel.index({ tags: 1 });

module.exports = mongoose.model('Post', postModel);
