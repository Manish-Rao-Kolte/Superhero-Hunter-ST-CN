const pubicKey = "28fe1aa6fe785c16bcc9d0de336a275f";
const privateKey = "61a8b2021cb56f19043926a6cad307bff328a675";
const ts = new Date().getTime();
const hash = md5(ts + privateKey + pubicKey);
const route = `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&limit=100&apikey=${pubicKey}&hash=${hash}`;
const heroList = [];
const favList = [];
const searchedList = [];
const data = JSON.parse(localStorage.getItem("favorite"));

if (data) {
  data?.forEach((hero) => {
    favList.push(hero);
  });
}

// let textSearched = "";

async function getData(route) {
  const response = fetch(route);
  const data = (await response).json();
  return data;
}

const heroListEl = document.getElementById("heroList");
heroListEl.innerHTML = `<h1>Loading...</h1>`;
function showHeroesList() {
  getData(route).then((res) => {
    heroListEl.textContent = "";
    res.data.results.forEach((hero, index) => {
      heroList.push(hero);
      const imgPath = `${hero.thumbnail.path}/detail.${hero.thumbnail.extension}`;
      const card = getCard(imgPath, index, hero.name);
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
    });
  });
}

showHeroesList();

const searchFormEl = document.getElementById("searchForm");
const searchInputEl = document.getElementById("searchInput");
const searchBtnEl = document.getElementById("searchBtn");
(function searchHero() {
  searchFormEl.addEventListener("submit", (e) => {
    e.preventDefault();
    const textSearched = e.target[0].value;
    if (textSearched === "") {
      showHeroesList();
    } else {
      const searchRoute = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&nameStartsWith=${textSearched}&apikey=${pubicKey}&hash=${hash}`;
      getData(searchRoute).then((res) => {
        console.log(res.data.results);
      });
    }
  });

  // searchInputEl.addEventListener(
  //   "change",
  //   (e) => (textSearched = e.target.value)
  // );
  // getData(searchRoute).then((res) => {
  //   res.data.results.forEach((hero, index) => {});
  // });
  // searchBtnEl.addEventListener("click", () => {
  //   console.log(searchInputEl);
  // });
})();

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

function getCard(path, index, name) {
  return `<div class="heroCard" id = ${index}>
    <img class="cardImg" src=${path} alt=${name}">
    <div class="heroName">${name}</div>
    <div class="detailFav">
    <a href="" class="detailLink">View Details</a>
    <i class="fa-regular fa-heart" clicked="false"></i>
    </div>
    </div>`;
}
