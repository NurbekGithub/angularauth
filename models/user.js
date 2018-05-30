import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import config   from '../config/database';

//User Schema
const UserSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
    password: {
      type: String,
    required: true
  }
});

export const User = mongoose.model('User', UserSchema);

export const getUserById = (id, callback) => {
  User.findById(id, callback);
}

export const getUserByUsername = (username, callback) => {
  const query = { username };
  User.findOne(query, callback);
}

export const addUser = (user, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt)
      .then(hash => {
        user.password = hash;
        user.save(callback);
      })
      .catch(err => {
        console.log(err);
        throw err;
      })
  })
}