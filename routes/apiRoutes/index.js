const router = require('express').Router();
const summonerRoutes = require('./summonerRoutes');

router.use('/summoner', summonerRoutes);

module.exports = router;