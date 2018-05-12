const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const sequelize = require('sequelize');

const models = require('../models');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

/**
 * @api {post} /debates/post post a new debate
 * @apiName postDebate
 * @apiGroup debates
 *
 * @apiDescription add a new debate to the database
 *
 * @apiParam {String}   title       new debate title
 * @apiParam {String}   description new debate description
 * @apiParam {String}   topic       topic name for new debate
 * @apiParam {Number}   minUserType minimum user certification to main comment
 * @apiParam {Number}   ballotSize  number of ballot entries
 * @apiParam {Object[]} ballot      array of ballot entries
 * @apiParam {Number}   ballot.vote vote type
 * @apiParam {String}   ballot.name vote type name
**/
router.post('/post', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  models.user.findOne({
    where: { username: req.user.username }
  }).then(user => {
    if(user) {

      models.topic.findOne({
        where: { name: req.body.topic }
      }).then(topic => {

        if(topic) {

          let newDebate = {
            title: req.body.title,
            description: req.body.description,
            authorUsername: req.user.username,
            topicName: topic.name,
            minUserType: req.body.minUserType
          }

          models.debate.create(newDebate).then(debate => {
            req.body.ballot.forEach(ballot => {
              let newBallot = {
                vote: ballot.vote,
                name: ballot.name,
              }

              debate.createBallot(newBallot).then(ballot => {
              }).catch(err => {

                throw err;
              });

            });

            res.status(201).json({
              success: true,
              debateId: debate.id,
              author: debate.authorUsername,
              topic: debate.topicName
            });

          }).catch(err => {
            throw err;
            res.status(500).send('Error');
          });

        }
        else {
          res.status(404).send('TopicNotFound');
        }

      }).catch(err => {
        throw err;
        res.status(500).send('Error');
      });

    }
    else {
      res.status(404).send('UserNotFound');
    }

  }).catch(err => {
    res.status(500).send('Error');
  });
});

/**
 * @api {post} /debates/vote
 * @apiName vote
 * @apiGroup debates
 *
 * @apiDescription submit a vote on a debate
 *
 * @apiParam {Number} debateId id of debate to vote on
 * @apiParam {Number} vote     vote value
 *
 * @apiSuccess {Boolean} success flag
 * @apiSuceess {String}  msg     indicate sent or updated vote
 *
 * @apiError (404) DebateNotFound requested debate does not exist
 * @apiError (500) Error          database error
**/
router.post('/vote', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  models.debate.findById(req.body.debateId).then(debate => {
    if(debate) {

      debate.getVote({
        where: { userUsername: req.user.username }
      }).then(vote => {
        if(vote) {
          models.vote.update({
            vote: req.body.vote
          }, {
            where: { debateId: debate.id, userUsername: req.user.username }
          }).then(data => {
            res.status(201).json({ success: true, msg: "sent" });
          }).catch(err => {
            res.status(500).send("Error");
          });
        }
        else {
          let newVote = {
            vote: req.body.vote,
            debateId: debate.id,
            userUsername: req.user.username
          }

          debate.createVote(newVote).then(data => {
            res.status(201).json({ success: true, msg: "updated" });
          }).catch(err => {
            res.status(500).send("Error");
          });
        }
      }).catch(err => {
        res.status(500).send("Error");
      });
    }
    else {
      res.status(404).send("DebateNotFound");
    }
  }).catch(err => {
    res.status(500).send("Error");
    throw err;
  });
});

/**
 * @api {get} /debates/results?debateId get current vote results
 * @apiName results
 * @apiGroup debates
 *
 * @apiDescription get the current vote results
 *
 * @apiParam {Number} debateId id of debate
 *
**/
router.get('/results', (req, res, next) => {
  models.debate.findOne({
    where: { id: req.query.debateId }
  }).then(debate => {
    if(debate) {   
      models.ballot.findAll({
        attributes: ['vote', 'name'],
        where: { debateId: debate.id },
        order: [['vote', 'ASC']]
      }).then(ballot => {

        models.vote.findAll({
          attributes: [[sequelize.cast(sequelize.fn('COUNT', sequelize.col('id')), 'integer'), 'count'], 'vote'],
          where: { debateId: debate.id },
          group: ['vote'],
          order: [['vote', 'ASC']]
        }).then(data => {

          res.status(200).json({ votes: data, ballot: ballot });

        }).catch(err => {
          throw err;
          res.status(500).send("Error");
        });

      }).catch(err => {
        throw err;
        res.status(500).send("Error");
      });
    }
    else {
      res.status(404).send("DebateNotFount");
    }
  }).catch(err => {
    throw err;
    res.status(500).send("Error");
  });
});

/**
 * @api {get} /debates/getvotes?debateId get all votes on a debate
 * @apiName getVotes
 * @apiGroup debates
 *
 * @apiDescription return all votes on a debate and stats on them
 *
 * @apiParam {Number} debateId id of debate
 *
 * @apiSuccess {Number}   totalCount      total number of votes
 * @apiSuccess {Object[]} stats           array of vote stats, one entry for each vote type, ascending order by vote type
 * @apiSuccess {Number}   stats.count     count of votes for one vote type
 * @apiSuccess {Number}   stats.vote      vote type
 * @apiSuccess {Object[]} votes           array of votes, descending order by timestamp
 * @apiSuccess {Number}   votes.vote      vote type
 * @apiSuceess {Date}     votes.createdAt timestamp of vote
 * @apiSuccess {Object[]} ballot          array of ballot entries
 * @apiSuccess {Number}   ballot.vote     vote type
 * @apiSuccess {String}   ballot.name     vote type name
 *
 * @apiError (500) Error database error
**/
router.get('/getvotes', (req, res, next) => {
  models.vote.findAndCountAll({
    attributes: ['vote', 'createdAt'],
    where: { debateId: req.query.debateId },
    order: [['createdAt', 'DESC']]
  }).then(allVotes => {

    models.vote.findAll({
      attributes: [[sequelize.cast(sequelize.fn('count', sequelize.col('id')), 'integer'), 'count'], 'vote'],
      where: { debateId: req.query.debateId },
      group: ['vote'],
      order: [['vote', 'ASC']]
    }).then(voteData => {

      models.ballot.findAll({
        attributes: ['vote', 'name'],
        where: { debateId: req.query.debateId },
        order: [['vote', 'ASC']]
      }).then(ballots => {
        res.status(200).json({ 
          totalCount: allVotes.count,
          stats: voteData,
          votes: allVotes.rows,
          ballot: ballots
        });
      }).catch(err => {
        throw err;
        res.status(500).send('Error');
      });

    }).catch(err => {
      throw err;
      res.status(500).send('Error');
    });

  }).catch(err => {
    throw err;
    res.status(500).send('Error');
  });
});

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
 *
 * @apiSuccess {Number}   count               number of debates returned
 * @apiSuccess {Object[]} debates             list of debates
 * @apiSuccess {Number}   debates.id          id of debate
 * @apiSuccess {String}   debates.title       title of debate
 * @apiSuccess {String}   debates.description description of debate
 * @apiSuccess {String}   debates.author      author username
 * @apiSuccess {Number}   debates.topic       name of debate topic
 *
 * @apiError (500) Error database error
**/
router.get('/', (req, res, next) => {
  models.debate.findAndCountAll({
    where: { title: { $like: '%' + req.query.title + '%' } },
    attributes: ['id', 'title', 'description', ['authorUsername', 'author'], ['topicName', 'topic']],
    limit: req.query.num,
    offset: req.query.off,
    order: [['createdAt', 'DESC']]
  }).then(debates => {
    res.status(200).json({ count: debates.count, debates: debates.rows });
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
 * @apiSuccess {Number}   debates.topic   name of debate topic
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
        where: { authorUsername: user.username },
        attributes: ['id', 'title', ['topicName', 'topic']]
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

/**
 * @api {post} /debates/comment submit main comment
 * @apiName commentOn
 * @apiGroup debates
 *
 * @apiDescription add a main comment to a debate
 *
 * @apiParam {Number} debateId debate id
 * @apiParam {String} text     comment text
 *
 * @apiSuccess (201) {Boolean} success success flag
 * 
 * @apiError (500) Error            database error
 * @apiError (401) Unauthorized     user is not signed in
 * @apiError (401) UserNotQualified user is not qualified to submit main comment here
 * @apiError (404) UserNotFound     user not found
 * @apiError (404) DebateNotFound   debate id not found
**/
router.post('/comment', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  // find debate
  models.debate.findOne({
    where: { id: req.body.debateId }
  }).then(debate => {

    if(debate) {

      // find user
      models.user.findOne({
        where: { username: req.user.username }
      }).then(user => {

        if(user) {
          
          models.cert_list.findOne({
            where: { userUsername: user.username, topicName: debate.topicName },
          }).then(cert => {

            if(user.username == debate.authorUsername || (cert && cert.type >= debate.minUserType)) {
              let newComm = {
                debateId: req.body.debateId,
                userUsername: user.username,
                text: req.body.text
              }

              models.comment.create(newComm).then(comm => {

                return res.status(201).json({
                  success: true
                });
              }).catch(err => {
                throw err;
                res.status(500).send('Error');
              });
            }
            else {
              res.status(401).send('UserNotQualified');
            }
          }).catch(err => {
            throw err;
            res.status(500).send('Error');
          });

        }
        else {
          return res.status(404).send('UserNotFound');
        }
      }).catch(err => {
        throw err;
        return res.status(500).send('Error');
      });

    }
    else {
      return res.status(404).send('DebateNotFound');
    }

  }).catch(err => {
    throw err;
    return res.status(500).send('Error');
  });
});

/**
 * @api {get} /debates/getcomments?debateId&num&off get main comments
 * @apiName getComments
 * @apiGroup debates
 *
 * @apiDescription get all of the main comments of a debate
 *
 * @apiParam {Number} debateId id of debate
 * @apiParam {Number} num      number of comments to get
 * @apiParam {Number} off      number to offset by
 *
 * @apiSuccess {Number}   count             number of returned comments
 * @apiSuccess {Object[]} comments          comment object array
 * @apiSuccess {Number}   comments.id       id of comment
 * @apiSuccess {String}   comments.text     text of comment
 * @apiSuccess {Number}   comments.debateId id of comment debate
 * @apiSuccess {String}   comments.user     username
 *
 * @apiError (500) Error database error
**/
router.get('/getcomments', (req, res, next) => {
  let debateId = req.query.debateId;
  let num = req.query.num;
  let off = req.query.off;

  models.comment.findAndCountAll({
    where: { debateId: debateId },
    attributes: ['id', 'text', ['userUsername', 'user']],
    limit: num,
    offset: off,
    order: [['createdAt', 'ASC']]
  }).then(coms => {
    return res.status(200).json({ count: coms.count, comments: coms.rows });
  }).catch(err => {
    throw err;
    return res.status(500).send('Error');
  });
});

module.exports = router;