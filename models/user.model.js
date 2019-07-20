const mongoose = require('../data/db')();
const bcrypt = require('bcrypt');

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
  isSuperAuthor: {
    // TODO: Better to have role array ['author', 'superAuthor'] for scalability
    type: Boolean,
    default: false,
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
  const salt = bcrypt.genSaltSync();
  this.password = bcrypt.hashSync(this.password, salt);
  next();
});

userModel.methods.comparePasswords = (encodedPassword, password) => bcrypt.compareSync(password, encodedPassword);

// Indexing goes here
userModel.index({ email: 1 });
userModel.index({ firstName: 1, lastName: 1 });

module.exports = mongoose.model('User', userModel);
