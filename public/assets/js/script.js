let leftSearch = document.querySelector(".input-left");
let rightSearch = document.querySelector(".input-right");
let formEl = document.querySelector("#form")

async function compareButtonHandler(event) {
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
      }).catch(error => {
        window.alert("Please enter valid name(leftname)")
      })
      const responseRight = await fetch('/api/summoner', {
        method: 'post',
        body: JSON.stringify({
          summonerName: rightName
        }),
        headers: { 'Content-Type': 'application/json' }
      }).catch(error => {
        window.alert("Please enter valid name(rightname)")
      });
    }
    await responses();
    document.location.replace(`/compare?leftName=${leftName}&rightName=${rightName}`);
  } else {
    alert("Please enter names for both summoners.")
  }
}

formEl.addEventListener("submit", compareButtonHandler);