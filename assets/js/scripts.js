let leftSearch = document.getElementsByClassName(".search-left-container");
let rightSearch = document.getElementsByClassName(".search-right-container");

function getAPILeft() {
  let requestURL = `https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-name/BCISTHEBEST?api_key=RGAPI-0561ded4-3020-4fec-a8c6-b33598f42810`;
  fetch(requestURL).then(function (response) {
    if (response.ok) {
      response.json().then(function (apileftData) {});
      console.log(response);
    }
  });
  
}

getAPILeft();
