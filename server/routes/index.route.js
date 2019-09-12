const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const reviewRoutes = require('./review.route');

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/reviews', reviewRoutes);

module.exports = router;
