const data = JSON.parse(localStorage.getItem("favorite"));
const favListEl = document.getElementById("favList");
const favList = [...data];

if (data) {
  data.forEach((hero, index) => {
    const imgPath = `${hero.thumbnail.path}/detail.${hero.thumbnail.extension}`;
    const card = getCard(imgPath, index, hero.name);
    const cardEl = document.createElement("div");
    cardEl.innerHTML = card;
    const favEl = cardEl.getElementsByTagName("i")[0];
    removeCard(favEl, cardEl, hero);
    favListEl.appendChild(cardEl);
  });
}

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

function getCard(path, index, name) {
  return `<div class="heroCard" id = ${index}>
      <img class="cardImg" src=${path} alt=${name}">
      <div class="heroName">${name}</div>
      <div class="detailFav">
      <a href="" class="detailLink">View Details</a>
      <i class="fa-solid fa-heart" style="color: #ff0000;" clicked="true"></i>
      </div>
      </div>`;
}
