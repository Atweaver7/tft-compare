var leftInputEl = document.querySelector('input[name="search-left"]');

var leftSearch = document.querySelector(".input-left");
var rightSearch = document.querySelector(".input-right");
const nameLeft = document.getElementById("#sumName")
const rightBox = document.getElementById("right-display-box");
var leftBox = document.getElementById("left-display-box");
let summonerID1 = [];
let leftSummonerData = [];
let summonerID2 = [];

let summoner1 = {
  Name: '',
  Picture: '',
  Wins: '',
  Losses: '',
  Percent: '', 
  Tier:'',
  Rank: '',
};

// Api request left box begin
function getAPILeft(leftName) {
  let requestURL = `https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-name/${leftName}?api_key=RGAPI-0561ded4-3020-4fec-a8c6-b33598f42810`;
  fetch(requestURL).then(function (response) {
    if (response.ok) {
      response.json().then(function (apileftData) {
        summonerID1.push(apileftData.id);
        localStorage.setItem("ID", summonerID1);
        getWins();
      //  console.log(apileftData)
      //  console.log(puuid1)
      });
    }
  });
}

function getWins(apileftData) {
    let requestURL = `https://na1.api.riotgames.com/tft/league/v1/entries/by-summoner/${summonerID1}?api_key=RGAPI-0561ded4-3020-4fec-a8c6-b33598f42810`;
  fetch(requestURL).then(function (response) {
    if (response.ok) {
      response.json().then(function (winData) {
        leftSummonerData.push(winData)
        console.log(leftSummonerData);
        summonerLeft(leftSummonerData);
      });
    }
  });
}
// Api request left box end

// function to populate Summoner Left object
function summonerLeft(leftSummonerData){
  summoner1.Name = leftSummonerData[0][0].summonerName.toUpperCase()
  summoner1.Wins = leftSummonerData[0][0].wins
  summoner1.Losses = leftSummonerData[0][0].losses
  summoner1.Rank = leftSummonerData[0][0].rank
  summoner1.Tier = leftSummonerData[0][0].tier
  buildSummonerLeft(summoner1);
  // console.log(summoner1);
};

// function to dynamically update HTML within boxes
function buildSummonerLeft(summoner1) {
let header = document.createElement('h3');
let div = document.createElement('div')
let par = document.createElement('p')
let wins = document.createElement('p')
let losses = document.createElement('p')
let rank = document.createElement('p')
let tier = document.createElement('p')

// // assign classes to dynamically created HTML
// header.setAttribute('');
// div.setAttribute('');
// par.setAttribute('');

// creating HTML and populating with object data
header.innerHTML = summoner1.Name
wins.innerHTML = "Wins: " + summoner1.Wins
losses.innerHTML = "Losses: " + summoner1.Losses
rank.innerHTML = "Rank: " + summoner1.Rank
tier.innerHTML = "Tier: " + summoner1.Tier

// append generated HTML to HTML container that exists as an HTML ID
// the 'p' tags are being generated under the 'div'
div.append(wins, losses, rank, tier)



// send the above to left box
leftBox.append(header, div)
};

function leftSearchButton(event){
// event.preventDefault();
let targetEl = event.target
if (targetEl.matches(".btn")) {
let leftName = leftSearch.value
console.log(leftSearch.value)
  getAPILeft(leftName);
}
};

function printStats(event) {
    event.preventDefault();
    targetEl = event.target;
    if (targetEl.matches(".search-left")) {
        var summonerName = leftInputEl.value;
        getAPILeft(summonerName);
    }
};

document.addEventListener('click', leftSearchButton)