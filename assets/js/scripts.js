var leftSearch = document.querySelector(".input-left");
var rightSearch = document.querySelector(".input-right");
var displayResults = document.querySelector(".row");

// Api request
function getAPI(summonerName) {
  let requestURL = `https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-name/${summonerName}?api_key=RGAPI-0561ded4-3020-4fec-a8c6-b33598f42810`;
  fetch(requestURL).then(function (response) {
    if (response.ok) {
      response.json().then(function (apiData) {
        var summoner = {
          Name: "",
          IconId: "",
          Id: "",
          Picture: "",
          Wins: "",
          Points: "",
          Losses: "",
          Percent: "",
          Tier: "",
          Rank: "",
          // start winner stats
          winValue:"",
          rankValue: "",
          leaguePoints: "",
          tierValue: "",
          totalPoints: "", 


        };
        summoner.IconId = apiData.profileIconId;
        summoner.Id = apiData.id;
        getWins(summoner);
      });
    }
  });
}

function getWins(summoner) {
  let requestURL = `https://na1.api.riotgames.com/tft/league/v1/entries/by-summoner/${summoner.Id}?api_key=RGAPI-0561ded4-3020-4fec-a8c6-b33598f42810`;
  fetch(requestURL).then(function (response) {
    if (response.ok) {
      response.json().then(function (winData) {
        summoner.Name = winData[0].summonerName.toUpperCase();
        summoner.Wins = winData[0].wins;
        summoner.Losses = winData[0].losses;
        summoner.Points = winData[0].leaguePoints;
        summoner.Rank = winData[0].rank;
        summoner.Tier = winData[0].tier;
        summoner.winValue = winData[0].wins / winData[0].losses;
        summoner.rankValue = 
        summoner.leaguePoints = winData[0].leaguePoints / 100;
        summoner.tierValue = {}
          if (summoner.tier == "Challenger") {
          } summoner.rankValue = 20
          if (summoner.tier == "Diamond") {
          } summoner.rankValue = 10
          if (summoner.tier == "Platinum") {
          } summoner.rankValue = 6
          if (summoner.tier == "Gold") {
          } summoner.rankValue = 4
          if (summoner.tier == "Silver") {
          } summoner.rankValue = 3
          if (summoner.tier == "Bronze") {
          } summoner.rankValue = 2
          if (summoner.tier == "Tin") {
          } summoner.rankValue = 1;
       
           summoner.totalPoints = winValue + rankValue + leaguePoints + tierValue;

        buildSummoner(summoner);
        console.log(summoner);
      });
    }
  });
}

// function to dynamically update HTML within boxes
function buildSummoner(summoner) {
  let displayBox = document.createElement("div");
  let header = document.createElement("h3");
  let div = document.createElement("div");
  let wins = document.createElement("p");
  let losses = document.createElement("p");
  let rank = document.createElement("p");
  let tier = document.createElement("p");
  let points = document.createElement("p");

  let iconURL = `http://ddragon.leagueoflegends.com/cdn/12.5.1/img/profileicon/${summoner.IconId}.png`;
  let icon = document.createElement("img");
  icon.setAttribute("src", iconURL);
  icon.setAttribute("alt", "Profile Icon");

  // creating HTML and populating with object data
  header.innerHTML = summoner.Name;
  wins.innerHTML = "Wins: " + summoner.Wins;
  losses.innerHTML = "Losses: " + summoner.Losses;
  rank.innerHTML = "Rank: " + summoner.Rank;
  points.innerHTML = "League Points: " + summoner.Points;
  tier.innerHTML = "Tier: " + summoner.Tier;

  // append generated HTML to HTML container that exists as an HTML ID
  // the 'p' tags are being generated under the 'div'
  div.append(wins, losses, rank, points, tier);

  // send the above to display box
  displayBox.append(header, icon, div);
  displayResults.append(displayBox);
  
}

function searchButton(event) {
  event.preventDefault();
  let targetEl = event.target;
  if (targetEl.matches(".btn")) {
    let leftName = leftSearch.value;
    let rightName = rightSearch.value;
    getAPI(leftName);
    getAPI(rightName);
  }
}

// Math functions to calculate winner

// function winnerObject(summoner) {
//   var winner = {
//     Name: "",
//     IconId: "",
//     Id: "",
//     Picture: "",
//     Wins: "",
//     Points: "",
//     Losses: "",
//     Percent: "",
//     Tier: "",
//     Rank: "",
//     WinPercent: "",

//   };
// }


function winnerMath(summoner) {
  (summoner) => {
    if (summoner.tier === "Challenger") {
    }
    if (summoner.tier === "Platinum") {
    }
    if (summoner.tier === "Gold") {
    }
    if (summoner.tier === "Silver") {
    }
    if (summoner.tier === "Bronze") {
    }
    if (summoner.tier === "Tin") {
    }
  };
  console.log(winnerMath);
}

document.addEventListener("click", searchButton);
