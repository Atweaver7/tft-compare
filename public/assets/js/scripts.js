var leftSearch = document.querySelector(".input-left");
var rightSearch = document.querySelector(".input-right");
var displayResults = document.querySelector(".row");

// Api request
function getAPI(summonerName) {
  fetch('/api/summoner', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {
        summonerName: summonerName
      }
    )
  })
  .then(res => res.json())
  .then(summoner => {
    calculateWins(summoner);
  });
};

function calculateWins(summoner) {
  summoner.winValue = summoner.wins / summoner.losses;

  if (summoner.rank == "I") {
    summoner.rankValue = 3;
  }
  if (summoner.rank == "II") {
    summoner.rankValue = 2;
  }
  if (summoner.rank == "III") {
    summoner.rankValue = 1.5;
  }
  if (summoner.rank == "IV") {
    summoner.rankValue = 1;
  }
  if (summoner.rank == "V") {
    summoner.rankValue = 0.5;
  }

  summoner.leaguePointPercent = summoner.points / 100;

  if (summoner.tier == "CHALLENGER") {
    summoner.tierValue = 20;
  }
  if (summoner.tier == "DIAMOND") {
    summoner.tierValue = 10;
  }
  if (summoner.tier == "PLATINUM") {
    summoner.tierValue = 6;
  }
  if (summoner.tier == "GOLD") {
    summoner.tierValue = 4;
  }
  if (summoner.tier == "SILVER") {
    summoner.tierValue = 3;
  }
  if (summoner.tier == "BRONZE") {
    summoner.tierValue = 2;
  }
  if (summoner.tier == "TIN") {
    summoner.tierValue = 1;
  }

  summoner.totalPoints = summoner.leaguePointPercent + summoner.rankValue + summoner.tierValue + summoner.winValue;
  buildSummoner(summoner);
};

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

  let iconURL = `http://ddragon.leagueoflegends.com/cdn/12.5.1/img/profileicon/${summoner.icon_id}.png`;
  let icon = document.createElement("img");
  icon.setAttribute("src", iconURL);
  icon.setAttribute("alt", "Profile Icon");

  // creating HTML and populating with object data
  header.innerHTML = summoner.name;
  wins.innerHTML = "Wins: " + summoner.wins;
  losses.innerHTML = "Losses: " + summoner.losses;
  rank.innerHTML = "Rank: " + summoner.rank;
  points.innerHTML = "League Points: " + summoner.points;
  tier.innerHTML = "Tier: " + summoner.tier;

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

document.addEventListener("click", searchButton);
