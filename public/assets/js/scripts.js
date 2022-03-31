var leftSearch = document.querySelector(".input-left");
var rightSearch = document.querySelector(".input-right");
var displayResults = document.querySelector(".row");

// Api request
function getAPI(summonerName) {
  let requestURL = `https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-name/${summonerName}?api_key=RGAPI-0561ded4-3020-4fec-a8c6-b33598f42810`;
  fetch(requestURL).then(function (response) {
    if (response.ok) {
      response.json().then(function (apiData) {
        var summoner = {};
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

        if (summoner.Rank == "I") {
          summoner.rankValue = 3;
        }
        if (summoner.Rank == "II") {
          summoner.rankValue = 2;
        }
        if (summoner.Rank == "III") {
          summoner.rankValue = 1.5;
        }
        if (summoner.Rank == "IV") {
          summoner.rankValue = 1;
        }
        if (summoner.Rank == "V") {
          summoner.rankValue = 0.5;
        }

        summoner.leaguePoints = winData[0].leaguePoints / 100;

        if (summoner.Tier == "CHALLENGER") {
          summoner.tierValue = 20;
        }
        if (summoner.Tier == "DIAMOND") {
          summoner.tierValue = 10;
        }
        if (summoner.Tier == "PLATINUM") {
          summoner.tierValue = 6;
        }
        if (summoner.Tier == "GOLD") {
          summoner.tierValue = 4;
        }
        if (summoner.Tier == "SILVER") {
          summoner.tierValue = 3;
        }
        if (summoner.Tier == "BRONZE") {
          summoner.tierValue = 2;
        }
        if (summoner.Tier == "TIN") {
          summoner.tierValue = 1;
        }

        summoner.totalPoints = summoner.leaguePoints + summoner.rankValue + summoner.tierValue + summoner.winValue;
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

document.addEventListener("click", searchButton);
