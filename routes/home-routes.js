const router = require('express').Router();
const { Summoner } = require('../models');

router.get('/', (req, res) => {
    res.render('homepage')
})

router.get('/login', (req, res) => {
    res.render('login');
  });
  

router.get('/compare/:leftName/:rightName', async (req, res) => {
    let summoners = [];
    summoners += await Summoner.findOne({
        where: {
            name: JSON.stringify(req.params.leftName)
        },
        attributes: [
            'id',
            'name',
            'riot_id',
            'icon_id',
            'wins',
            'losses',
            'points',
            'rank',
            'tier'
        ]
    });
    summoners += await Summoner.findOne({
        where: {
            name: JSON.stringify(req.params.rightName)
        },
        attributes: [
            'id',
            'name',
            'riot_id',
            'icon_id',
            'wins',
            'losses',
            'points',
            'rank',
            'tier'
        ]
    })
    res.render('displayResults', summoners);
});

module.exports = router;