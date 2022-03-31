const router = require('express').Router();
const { Summoner } = require("../../models");

router.get('/', (req, res) => {
    // Access our User model and run .findAll() method)
    Summoner.findAll()
    .then(dbSummonerData => res.json(dbSummonerData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;