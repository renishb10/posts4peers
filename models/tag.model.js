const mongoose = require('../data/db')();

const { Schema } = mongoose;

const tagModel = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
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
tagModel.index({ name: 1 });

module.exports = mongoose.model('Tag', tagModel);
