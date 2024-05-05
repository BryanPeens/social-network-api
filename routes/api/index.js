const router = require('express').Router();

const userRoutes = require('./userRoutes');
const reactioRoutes = require('./reaction-routes');
const thoughtRoutes = require('./thought-routes');

router.use('/users', userRoutes);
router.use('/reactions', reactioRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;
