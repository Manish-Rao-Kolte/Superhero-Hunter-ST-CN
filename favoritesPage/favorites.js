const favData = JSON.parse(localStorage.getItem("favorite"));
const favListEl = document.getElementById("favList");
const favList = [...favData];

//function to show favorite hero card on favorite page according to fav list.
if (favData) {
  favData.forEach((hero, index) => {
    const imgPath = `${hero.thumbnail.path}/detail.${hero.thumbnail.extension}`;
    const card = getCard(imgPath, index, hero.name, hero);
    const cardEl = document.createElement("div");
    cardEl.innerHTML = card;
    const favEl = cardEl.getElementsByTagName("i")[0];
    removeCard(favEl, cardEl, hero);
    favListEl.appendChild(cardEl);
    const detailsEl = document.getElementById(hero.id);
    detailsEl.addEventListener("click", (e) => {
      saveHero(hero);
    });
  });
}

// function to remove card if its removed form favorite list.
function removeCard(favEl, cardEl, hero) {
  favEl.addEventListener("click", () => {
    favEl.setAttribute("clicked", "false");
    favEl.classList.remove("fa-solid");
    favEl.style.color = "";
    const index = favList.findIndex((item) => item.id === hero.id);
    favList.splice(index, 1);
    localStorage.setItem("favorite", JSON.stringify(favList));
    favListEl.removeChild(cardEl);
  });
}

function saveHero(hero) {
  localStorage.removeItem("hero");
  localStorage.setItem("hero", JSON.stringify(hero));
}

function getCard(path, index, name, hero) {
  return `<div class="heroCard" id = ${index}>
      <img class="cardImg" src=${path} alt=${name}">
      <div class="heroName">${name}</div>
      <div class="detailFav">
      <a id=${hero.id} href="/Superhero-Hunter-ST-CN/detailsPage/details.html" class="detailLink">View Details</a>
      <i class="fa-solid fa-heart" style="color: #ff0000;" clicked="true"></i>
      </div>
      </div>`;
}
