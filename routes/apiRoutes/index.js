// boiler plater
const router = require('express').Router();
const summonerRoutes = require('./summonerRoutes');
// const productRoutes = require('./product-routes');
// const tagRoutes = require('./tag-routes');

router.use('/summoner', summonerRoutes);
// router.use('/products', productRoutes);
// router.use('/tags', tagRoutes);

module.exports = router;
// boiler plater