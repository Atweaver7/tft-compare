<<<<<<< HEAD
var leftSearch = document.querySelector(".search-left-container");
var rightSearch = document.querySelector(".search-right-container");
var leftInputEl = document.querySelector('input[name="search-left"]');

var summoner = {
    name: '',
    id: '',
    image: '',
    wins: 0,
    losses: 0,
    winPercentage: ''
};

function getAPILeft(summonerName) {
    var requestURL = `https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-name/${summonerName}?api_key=RGAPI-0561ded4-3020-4fec-a8c6-b33598f42810`;
    fetch(requestURL).then(function (response) {
        if (response.ok) {
            response.json().then(function (apiData) {
                summoner.name = summonerName;
                summoner.id = apiData.id;
                secondFetch(summoner.id);
            });
        }
    });
};

function secondFetch(id) {
    var secondURL = `https://na1.api.riotgames.com/tft/league/v1/entries/by-summoner/${id}?api_key=RGAPI-0561ded4-3020-4fec-a8c6-b33598f42810`;
    fetch(secondURL).then(function (response) {
        if (response.ok) {
            response.json().then(function (apiData) {
                summoner.image = '';
                summoner.losses = apiData.losses;
            });
        }
    });
=======
let leftSearch = document.getElementsByClassName(".search-left-container");
let rightSearch = document.getElementsByClassName(".search-right-container");
let boxLeft = 
const nameLeft = document.getElementById("#sumName")
let summonerAccountID1 = [];
let summonerID1 = [];
let summonerAccountID2 = [];
let summonerID2 = [];
let puuid1 = [];
let leftName = [];


// Api request left box begin
function getAPILeft() {
  let requestURL = `https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-name/BCISTHEBEST?api_key=RGAPI-0561ded4-3020-4fec-a8c6-b33598f42810`;
  fetch(requestURL).then(function (response) {
    if (response.ok) {
      response.json().then(function (apileftData) {
        summonerID1.push(apileftData.id);
        summonerAccountID1.push(apileftData.accountId)
        puuid1.push(apileftData.puuid)
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
        leftName.push(winData[0].summonerName)
        console.log(leftName[0]);
        buildLeft();
      });
    }
  });
>>>>>>> main
}
// Api request left box end

// function to populate left player box
function buildLeft() {
  console.log(leftName[0])
  document.getElementById(sumName).innerHTML = leftName[0]
  nameLeft.innerHTML = "fuck you";
};






<<<<<<< HEAD
function printStats(event) {
    event.preventDefault();
    targetEl = event.target;
    if (targetEl.matches(".search-left")) {
        var summonerName = leftInputEl.value;
        getAPILeft(summonerName);
    }
};

leftSearch.addEventListener("click", printStats);
=======
getAPILeft();

// document.addEventListener('click',)
>>>>>>> main
