import mongoose, { Schema } from 'mongoose';
import { hashSync, compareSync } from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';

import constants from '../config/constants';

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  firstName: String,
  lastName: String,
  avatar: String,
  password: String,
  email: String
}, { timestamps: true });

UserSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    this.password = this._hashPassword(this.password);
    return next();
  }

  return next();
});

UserSchema.methods = {
  _hashPassword(password) {
    return hashSync(password);
  },
  authenticateUser(password) {
    return compareSync(password, this.password);
  },
  createToken() {
    return jwt.sign(
      {
        _id: this._id
      },
      constants.JWT_SECRET
    )
  }
};

UserSchema.statics = {
  incUserIsFollowingCount(userId) {
    return this.findByIdAndUpdate(userId, { $inc: { isFollowingCount: 1 } }, { new: true });
  },
  decUserIsFollowingCount(userId) {
    return this.findByIdAndUpdate(userId, { $inc: { isFollowingCount: -1 } }, { new: true });
  }
};

export default mongoose.model('User', UserSchema);