const mongoose = require('../data/db')();

const { Schema } = mongoose;

const userModel = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tag',
    },
  ],
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

// Hooks goes here
userModel.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = '***Hashed Password***';
  next();
});

// Indexing goes here
userModel.index({ email: 1 });

module.exports = mongoose.model('User', userModel);
