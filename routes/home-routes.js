const router = require('express').Router();
const { Summoner } = require('../models');

router.get('/', (req, res) => {
    res.render('homepage')
})

router.get('/compare', (req, res) => {
    let summoners = {};
    Summoner.findOne({
        where: {
            name: req.query.leftName
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
    }).then(leftData => {
        summoners.left = leftData.get({ plain:true });
        Summoner.findOne({
            where: {
                name: req.query.rightName
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
        }).then(rightData => {
            summoners.right = rightData.get({ plain:true });
            console.log(summoners);
            // pass a single data object into the displayResults template
            res.render('displayResults', { summoners });
        });
    });  
});

module.exports = router;