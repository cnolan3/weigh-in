const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const models = require('../models');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

/**
 * @api {get} /debates/?title&num&off get debates from the database
 * @apiName debate
 * @apiGroup debates
 *
 * @apiDescription searches for num debates by title
 *
 * @apiParam {String} title title to search for
 * @apiParam {Number} num   number of debates to get
 * @apiParam {Number} off   number to offset by
**/
router.get('/', (req, res, next) => {
  models.debate.findAll({
    where: { title: req.query.title },
    limit: req.query.num,
    offset: req.query.off
  }).then(debates => {
    res.status(200).json(debates);
  }).catch(err => {
    throw err;
    res.status(500).send('Error');
  });
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
 *
 * @apiError (404) UserNotFound user with requested username does not exist
 * @apiError (500) Error        database error
**/
router.get('/authorof', (req, res, next) => {
  models.user.findOne({
    where: { username: req.query.username }
  }).then(user => {

    if(user) {
      models.debate.findAll({
        where: { authorId: user.id },
        attributes: ['id', 'title', 'topicId']
      }).then(debates => {

        res.status(200).json(debates);

      }).catch(err => {
        throw err;
        res.status(500).send('Error');
      });
    }
    else {
      res.status(404).send('UserNotFound');
    }

  }).catch(err => {
    throw err;
    return res.status(500).send('Error');
  });
});

module.exports = router;
