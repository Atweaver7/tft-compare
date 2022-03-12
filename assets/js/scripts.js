var leftSearch = document.querySelector(".input-left");
var rightSearch = document.querySelector(".input-right");
var displayResults = document.querySelector('.row');

// Api request
function getAPI(summonerName) {
  let requestURL = `https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-name/${summonerName}?api_key=RGAPI-0561ded4-3020-4fec-a8c6-b33598f42810`;
  fetch(requestURL).then(function (response) {
    if (response.ok) {
      response.json().then(function (apiData) {
        var summoner = {
          Name: '',
          IconId: '',
          Id: '',
          Picture: '',
          Wins: '',
          Losses: '',
          Percent: '', 
          Tier:'',
          Rank: '',
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
        summoner.Rank = winData[0].rank;
        summoner.Tier = winData[0].tier;
        buildSummoner(summoner);
      });
    }
  });
}

// function to dynamically update HTML within boxes
function buildSummoner(summoner) {
  let displayBox = document.createElement('div');
  let header = document.createElement('h3');
  let div = document.createElement('div');
  let wins = document.createElement('p');
  let losses = document.createElement('p');
  let rank = document.createElement('p');
  let tier = document.createElement('p');

  let iconURL = `http://ddragon.leagueoflegends.com/cdn/12.5.1/img/profileicon/${summoner.IconId}.png`;
  let icon = document.createElement('img');
  icon.setAttribute('src', iconURL);
  icon.setAttribute('alt', 'Profile Icon');

  // creating HTML and populating with object data
  header.innerHTML = summoner.Name
  wins.innerHTML = "Wins: " + summoner.Wins
  losses.innerHTML = "Losses: " + summoner.Losses
  rank.innerHTML = "Rank: " + summoner.Rank
  tier.innerHTML = "Tier: " + summoner.Tier

  // append generated HTML to HTML container that exists as an HTML ID
  // the 'p' tags are being generated under the 'div'
  div.append(wins, losses, rank, tier);

  // send the above to display box
  displayBox.append(header, icon, div);
  displayResults.append(displayBox);
};

function searchButton(event) {
  event.preventDefault();
  let targetEl = event.target;
  if (targetEl.matches(".btn")) {
    let leftName = leftSearch.value;
    let rightName = rightSearch.value;
    getAPI(leftName);
    getAPI(rightName);
  }
};

document.addEventListener('click', searchButton);