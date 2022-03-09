let leftSearch = document.getElementsByClassName(".search-left-container");
let rightSearch = document.getElementsByClassName(".search-right-container");
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
}
// Api request left box end

// function to populate left player box
function buildLeft() {
  console.log(leftName[0])
  document.getElementById(sumName).innerHTML = leftName[0]
  // nameLeft.innerHTML = "fuck you";
};






getAPILeft();

// document.addEventListener('click',)