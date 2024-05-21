const hero = JSON.parse(localStorage.getItem("hero"));

// showing hero details on hero page.
if (hero) {
  const path = `${hero.thumbnail.path}/detail.${hero.thumbnail.extension}`;
  const detailsEl = document.getElementById("detailsContainer");
  detailsEl.innerHTML = `<div id="imgAndDetails">
                            <img src=${path} alt="">
                            <div id="details">
                                <p>Name: ${hero.name}</p>
                                <p>Comics: ${hero.comics.available}</p>
                                <p>Events: ${hero.events.available}</p>
                                <p>Series: ${hero.series.available}</p>
                                <p>Stories: ${hero.stories.available}</p>
                            </div>
                            <a id="removeBtn" href="javascript:history.back()">Back</a>
                        </div>
                        <div id="description">${hero.description}</div>`;
}
