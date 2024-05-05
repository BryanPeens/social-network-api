// routes/reaction-routes.js

const router = require('express').Router();
const {
  addReaction,
  removeReaction
} = require('../../controllers/reaction-controller');

router.route('/')
  .post(addReaction);

router.route('/:reactionId')
  .delete(removeReaction);

module.exports = router;
