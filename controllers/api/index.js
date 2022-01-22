const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
// added postRoutes
const postRoutes = require('./postRoutes');
// changed router to user and posts 
router.use('/users', userRoutes);
router.use('/posts', postRoutes);

module.exports = router;
