const router = require('express').Router();
const summonerRoutes = require('./summonerRoutes');
const userRoutes = require('./userRoutes');

router.use('/summoner', summonerRoutes);
router.use('/user', userRoutes);

module.exports = router;