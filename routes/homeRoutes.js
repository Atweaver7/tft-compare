const router = require('express').Router();
const { Summoner} = require('../models');

router.get('/', (req, res) => {
    res.render('homepage', { loggedIn: req.session.loggedIn} )
})
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('loginPage');
});

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
            'icon_url',
            'wins',
            'losses',
            'points',
            'rank',
            'tier',
            'total_points'
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
                'icon_url',
                'wins',
                'losses',
                'points',
                'rank',
                'tier',
                'total_points'
            ]
        }).then(rightData => {
            summoners.right = rightData.get({ plain:true });
            if (summoners.left.total_points > summoners.right.total_points) {
                summoners.winner = summoners.left;
            } else {
                summoners.winner = summoners.right;
            }
            // pass a single data object into the displayResults template
            res.render('displayResults', { summoners, loggedIn: req.session.loggedIn });
        });
    })
    .catch(err => {
        console.log(err)
    });;  
});


module.exports = router;