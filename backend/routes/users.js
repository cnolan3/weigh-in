const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const models = require('../models');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

/**
 * Adapted from my other project, Project Redshift
 *
 * @api {post} /users/register register a new user
 * @apiName register
 * @apiGroup users
 *
 * @apiDescription Accepts user data and creates a new user
 * in the database if the username is not already taken.
 *
 * @apiParam {String} username  new users username
 * @apiParam {String} firstname new users first name
 * @apiParam {String} lastname  new users last name
 * @apiParam {String} email     new users email
 * @apiParam {String} password  new users password
 *
 * @apiSuccess (201) {Boolean} success       success status of registration
 * @apiSuccess (201) {String}  token         user authentication token
 * @apiSuccess (201) {Object}  user          user data
 * @apiSuccess (201) {Number}  user.id       user database id
 * @apiSuccess (201) {String}  user.username username
 *
 * @apiError (400) IncompleteUserObject the user data that whas sent is incomplete
 * @apiError (400) UserAlreadyExits     user with requested username already exists
 * @apiError (500) Error                database error
**/
router.post('/register', (req, res, next) => {
  /// check of the username already exists
  models.user.findOne({
    where: { username: req.body.username },
    attributes: ['id'],
  }).then((user) => {
    if(!user) {
      /// check for complete info
      if(!req.body.username ||
         !req.body.firstName ||
         !req.body.lastName ||
         !req.body.email ||
         !req.body.password)
        return res.status(400).send('IncompleteUserObject');

      /// create new user object
      let newUser = {
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        role: 'user'
      }
      
      /// add new user
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err) throw err;
          newUser.password = hash;
          models.user.create(newUser).then(user => {

            const token = jwt.sign(user.toJSON(), config.secret, { expiresIn: 604800 });

            res.status(201).json({
              success: true,
              token: 'JWT' + token,
              user: {
                id: user.id,
                username: user.username
              }
            });
          });
        });
      });
    }
    else {
      return res.status(400).send('UserAlreadyExists');
    }
  }).catch((err) => {
    throw err;
    return res.status(500).send('Error');
  });
});

/**
 * Adapted from my other project, Project Redshift
 *
 * @api {post} /users/authenticate authenticate a user
 * @apiName authenticate
 * @apiGroup users
 *
 * @apiDescription Takes a username and password and checks them
 * against the database, returns an auth token if a match is found.
 *
 * @apiParam {String} username users username
 * @apiParam {String} password users password
 *
 * @apiSuccess {Boolean} success       success status of response
 * @apiSuccess {String}  token         authentication token
 * @apiSuccess {Object}  user          user data
 * @apiSuccess {Number}  user.id       user database id
 * @apiSuccess {String}  user.username username
 * @apiSuccess {String}  user.role     user role
 *
 * @apiError (404) UserNotFound         requested username does not belong to any user
 * @apiError (400) IncompleteUserObject user login information incomplete
 * @apiError (401) WrongPassword        incorrect password used
 * @apiError (500) Error                database error
**/
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  /// look for username
  models.user.findOne({ 
    where: { username: username }, 
    attributes: ['id', 'username', 'firstName', 'lastName', 'email', 'password', 'role']
  }).then((user) => {
    if(!user) {
      return res.status(404).send('UserNotFound');
    }

    /// check for complete user object
    if(!req.body.username ||
       !req.body.password)
      return res.status(400).send('IncompleteUserObject');

    /// validate hashed password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if(isMatch) {
        const token = jwt.sign(user.toJSON(), config.secret, { expiresIn: 604800 });

        res.status(200).json({
          success: true,
          token: 'JWT' + token,
          user: {
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role
          }
        });
      }
      else {
        return res.status(401).send('WrongPassword');
      }
    });
  }).catch((err) => {
    throw err;
    return res.status(500).send('Error'); 
  });
});

/**
 * @api {get} /users/usertype?topic&username get user type for a topic
 * @apiName userType
 * @apiGroup users
 *
 * @apiDescription Get the user type for a username and a specific topic. user types
 * can be basic, certified or expert.
 *
 * @apiParam {String} topic    topic to check for
 * @apiParam {String} username users username to check for
 *
 * @apiSuccess {String} type user type in topic
 *
 * @apiError (404) TopicNotFound the requested topic does not exist
 * @apiError (404) UserNotFound  the requested user does not exist
 * @apiError (500) Error         server error
**/
router.get('/usertype', (req, res, next) => {
  const topic = req.query.topic;
  const username = req.query.username;

  // check if topic exists
  models.topic.findOne({
    where: { name: topic }
  }).then(t => {
    if(t) {
      // search for users associated with the topic
      t.getUsers({
        where: { username: username }
      }).then(user => {
        // check if the user exists
        models.user.findOne({
          where: { username: username }
        }).then(u => {
          if(u) {
            // return user type on topic,
            // if the user exists and is not associated
            // with this topic, 'basic' is returned,
            // otherwise, the user type is returned
            if(user[0])
              return res.status(200).json({ type: user[0].cert_list.type });
            else
              return res.status(200).json({ type: 'basic' });
          }
          else
            return res.status(404).send('UserNotFound');
        }).catch(err => {
          throw err;
          return res.status(500).send('Error');
        });
      }).catch(err => {
        throw err;
        return res.status(500).send('Error');
      });
    }
    else
      return res.status(404).send('TopicNotFound');
  }).catch(err => {
    throw err;
    return res.status(500).send('Error');
  });
});

module.exports = router;
