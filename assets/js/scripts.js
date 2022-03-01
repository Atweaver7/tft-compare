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
}

function printStats(event) {
    event.preventDefault();
    targetEl = event.target;
    if (targetEl.matches(".search-left")) {
        var summonerName = leftInputEl.value;
        getAPILeft(summonerName);
    }
};

leftSearch.addEventListener("click", printStats);