import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

import { User, addUser } from '../models/user';

const router = express.Router();

//Register
router.post('/register', (req, res, next) => {
  const { name, username, email, password } = req.body;
  const newUser = new User({
    name, username, email, password
  });

  addUser(newUser, (err, user) => {
    if(err) {
      res.status(401).json({error: {global: err}})
    } else {
      res.json({ msg: 'User registered' })
    }
  });
});

//Authenticate
router.post('/authenticate', (req, res, next) => {
  res.send('Authenticate')
});

//Profile
router.get('/profile', (req, res, next) => {
  res.send('Profile')
});

//Validation
router.get('/validate', (req, res, next) => {
  res.send('Validate')
});

export default router;