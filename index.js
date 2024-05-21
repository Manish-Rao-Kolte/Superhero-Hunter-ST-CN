const pubicKey = "28fe1aa6fe785c16bcc9d0de336a275f";
const privateKey = "61a8b2021cb56f19043926a6cad307bff328a675";
const ts = new Date().getTime();
const hash = md5(ts + privateKey + pubicKey);
const route = `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&limit=100&apikey=${pubicKey}&hash=${hash}`;
const heroList = [];
const favList = [];
const searchedList = [];
const favData = JSON.parse(localStorage.getItem("favorite"));
// localStorage.removeItem("heroList");
const storedHeroList = JSON.parse(localStorage.getItem("heroList"));

// checking if device storage has favorite list and pushing that data in the local list.
if (favData) {
  favData?.forEach((hero) => {
    favList.push(hero);
  });
}

// function to get data from marvel api. using fetch function provided by JS.
async function getData(route) {
  const response = fetch(route);
  const data = (await response).json();
  return data;
}

// showing loading screen while data is fetched.
const heroListEl = document.getElementById("heroList");
heroListEl.innerHTML = `<h1>Loading...</h1>`;

// checking if device storage has previosely fetched data. Then showing it on home page in list.
if (!storedHeroList || storedHeroList.length === 0) {
  getData(route).then((res) => {
    showHeroesList(res.data.results);
  });
} else {
  showHeroesList(storedHeroList);
}

// Below function will show the hero list on home page.
async function showHeroesList(data) {
  heroListEl.textContent = "";
  data.forEach((hero, index) => {
    heroList.push(hero);
    const imgPath = `${hero.thumbnail.path}/detail.${hero.thumbnail.extension}`;
    const card = getCard(imgPath, index, hero.name, hero);
    const cardEl = document.createElement("div");
    cardEl.innerHTML = card;
    const favEl = cardEl.getElementsByTagName("i")[0];
    addEvent(favEl, hero);
    const ind = favList.findIndex((item) => item.id === hero.id);
    if (ind !== -1) {
      favEl.setAttribute("clicked", "true");
      favEl.classList.add("fa-solid");
      favEl.style.color = "#ff0000";
    }
    heroListEl.appendChild(cardEl);
    const detailsEl = document.getElementById(hero.id);
    detailsEl.addEventListener("click", (e) => {
      saveHero(hero);
    });
  });
  localStorage.setItem("heroList", JSON.stringify(heroList));
}

const searchFormEl = document.getElementById("searchForm");
const searchInputEl = document.getElementById("searchInput");
const searchBtnEl = document.getElementById("searchBtn");

// using IIFE to add event listener on the form element.
(function searchHero() {
  searchFormEl.addEventListener("submit", (e) => {
    e.preventDefault();
    const textSearched = e.target[0].value;
    //if no character is entered then stored data is shown in search result.
    if (textSearched === "") {
      heroList = [];
      showHeroesList(storedHeroList);
    } else {
      const searchRoute = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&nameStartsWith=${textSearched}&limit=25&apikey=${pubicKey}&hash=${hash}`;
      getData(searchRoute).then((res) => {
        heroListEl.textContent = "";
        res.data.results.forEach((hero, index) => {
          searchedList.push(hero);
          const imgPath = `${hero.thumbnail.path}/detail.${hero.thumbnail.extension}`;
          const card = getCard(imgPath, index, hero.name, hero);
          const cardEl = document.createElement("div");
          cardEl.innerHTML = card;
          const favEl = cardEl.getElementsByTagName("i")[0];
          addEvent(favEl, hero);
          const ind = favList.findIndex((item) => item.id === hero.id);
          if (ind !== -1) {
            favEl.setAttribute("clicked", "true");
            favEl.classList.add("fa-solid");
            favEl.style.color = "#ff0000";
          }
          heroListEl.appendChild(cardEl);
          const detailsEl = document.getElementById(hero.id);
          detailsEl.addEventListener("click", (e) => {
            saveHero(hero);
          });
        });
        localStorage.setItem("heroList", JSON.stringify(heroList));
      });
    }
  });
})();

// function to push hero card in to local fav list and mark it favorite and to remove from favorite.

function addEvent(favEl, hero) {
  favEl.addEventListener("click", () => {
    if (favEl.attributes.clicked.nodeValue === "false") {
      favEl.setAttribute("clicked", "true");
      favEl.classList.add("fa-solid");
      favEl.style.color = "#ff0000";
      favList.push(hero);
    } else {
      favEl.setAttribute("clicked", "false");
      favEl.classList.remove("fa-solid");
      favEl.style.color = "";
      const index = favList.findIndex((item) => item.id === hero.id);
      favList.splice(index, 1);
    }
    localStorage.setItem("favorite", JSON.stringify(favList));
  });
}

// function to set hero in loacal storage to populate it on details page.
function saveHero(hero) {
  localStorage.removeItem("hero");
  localStorage.setItem("hero", JSON.stringify(hero));
}

//funvtion to get card data.
function getCard(path, index, name, hero) {
  return `<div class="heroCard" id = ${index}>
    <img class="cardImg" src=${path} alt=${name}">
    <div class="heroName">${name}</div>
    <div class="detailFav">
    <a id=${hero.id} href="/detailsPage/details.html" class="detailLink">View Details</a>
    <i class="fa-regular fa-heart" clicked="false"></i>
    </div>
    </div>`;
}
