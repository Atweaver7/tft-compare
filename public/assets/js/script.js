let leftSearch = document.querySelector(".input-left");
let rightSearch = document.querySelector(".input-right");
let formEl = document.querySelector("#form")

function compareButtonHandler(event) {
  event.preventDefault();

  const leftName = leftSearch.value.trim();
  const rightName = rightSearch.value.trim();

  if (leftName && rightName) {
    async function responses() {
      const responseLeft = await fetch('/api/summoner', {
        method: 'post',
        body: JSON.stringify({
          summonerName: leftName
        }),
        headers: { 'Content-Type': 'application/json' }
      });
      const responseRight = await fetch('/api/summoner', {
        method: 'post',
        body: JSON.stringify({
          summonerName: rightName
        }),
        headers: { 'Content-Type': 'application/json' }
      });
      const display = await fetch(
        `/compare/${leftName}/${rightName}`,
        {
        method: 'get',
        headers: { 'Content-Type': 'application/json' }
      });
    }
    responses();
  } else {
    alert("Please enter names for both summoners.")
  }
}

formEl.addEventListener("submit", compareButtonHandler);


// let iconURL = `http://ddragon.leagueoflegends.com/cdn/12.5.1/img/profileicon/${summoner.icon_id}.png`;
//   let icon = document.createElement("img");
//   icon.setAttribute("src", iconURL);
//   icon.setAttribute("alt", "Profile Icon");
