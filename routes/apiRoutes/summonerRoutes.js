const router = require("express").Router();
const { Summoner } = require("../../models");
require("dotenv").config();
const apiKey = process.env.API_KEY;
const axios = require("axios");

router.get("/", (req, res) => {
  // Access our User model and run .findAll() method)
  Summoner.findAll()
    .then((dbSummonerData) => res.json(dbSummonerData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", async (req, res) => {
    let summoner = await axios(
        `https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-name/${req.body.summonerName}?api_key=${apiKey}`
    )
    .catch(function (error) {
        if (error == 404) {
            console.alert("Please enter valid name");
        } 
    });
    let winData = await axios(
        `https://na1.api.riotgames.com/tft/league/v1/entries/by-summoner/${summoner.data.id}?api_key=${apiKey}`
    )
    .catch(err => {
        console.log(err)
    });
    
    Summoner.create({
      name: summoner.data.name,
      riot_id: summoner.data.id,
      icon_id: summoner.data.profileIconId,
      wins: winData.data[0].wins,
      losses: winData.data[0].losses,
      points: winData.data[0].leaguePoints,
      rank: winData.data[0].rank,
      tier: winData.data[0].tier,
    })
      .then((dbSummonerData) => {
        let summoner = dbSummonerData.calculateWins();
        res.json(summoner);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
});
module.exports = router;
