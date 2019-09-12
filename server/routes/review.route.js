const express = require('express');
const passport = require('passport');
const reviewCtrl = require('../controllers/review.controller');

const router = express.Router();
module.exports = router;

router.use(passport.authenticate('jwt', {session: false}));

router.route('/').post(insert);

router.route('/').get(fetch);

router.route('/:id/vote').put(vote);

async function insert(req, res) {
  const userId = req.user._id;

  let review = await reviewCtrl.insert(req.body, userId);
  res.json(review);
}

async function fetch(req, res) {
  let review = await reviewCtrl.fetch();
  res.json(review)
}

async function vote(req, res) {
  const id = req.params.id;
  const vote = req.body.vote;

  let review = await reviewCtrl.vote(id, vote);
  res.json(review)
}
