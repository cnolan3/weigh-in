const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const models = require('../models');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

/**
 * @api {get} /debates/?title get a debate from the database
 * @apiName debate
 * @apiGroup debates
 *
 * @apiDescription returns a debate by title
 *
 * @apiParam {String} title title to search for
**/
router.get('/', (req, res, next) => {
  
});

/**
 * @api {get} /debates/authorof?username get debates by user
 * @apiName authorOf
 * @apiGroup debates
 *
 * @apiDescription get debates authored by a user
 *
 * @apiParam {String} username users username
 *
 * @apiSuccess {Object[]} debates         list of debates
 * @apiSuccess {Number}   debates.id      id of debate
 * @apiSuccess {String}   debates.title   title of debate
 * @apiSuccess {Number}   debates.topicId id of debate topic
 * @apiSuccess {String}   debates.topic   name of debate topic
 *
 * @apiError (500) Error database error
**/
router.get('/authorof', (req, res, next) => {
  models.user.findOne({
    where: { username: req.query.username }
  }).then(user => {
    console.log(user);
    user.getDebates().then(debates => {
      console.log(debates);
    }).catch(err => {
      throw err;
      return res.status(500).send('Error');
    });
  }).catch(err => {
    throw err;
    return res.status(500).send('Error');
  });
});

module.exports = router;
