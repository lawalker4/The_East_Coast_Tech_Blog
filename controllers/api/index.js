const router = require('express').Router();

const userRoutes = require('./user-routes');
const postRoutes = require('/urcoding/projects/The_East_Coast_Tech_Blog/controllers/api/post-routes');
const commentRoutes = require('../api/comment-routes');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comment', commentRoutes);

module.exports = router;