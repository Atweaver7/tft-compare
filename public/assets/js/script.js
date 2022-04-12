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

async function logout(event) {
  event.preventDefault();

  const response = await fetch('/api/user/logout', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' }
  });
  if (response.ok) {
      document.location.replace('/');
  } else {
      alert(response.statusText);
  }
}

formEl.addEventListener("submit", compareButtonHandler);