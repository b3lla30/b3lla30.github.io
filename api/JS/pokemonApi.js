const API_ALBUM = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";

function getAlbum(api) {
    fetch(api)
        .then((response) => response.json())
        .then((json) => {
            fillData(json.results);
            pagination(json.previous, json.next);
        })
        .catch((error) => {
            console.log(error, "Error consumiendo la API");
        });
}

async function fillData(results) {
    let cards = "";

    for (let i = 0; i < results.length; i++) {
        const res = await fetch(results[i].url);
        const pokemon = await res.json();

        cards += `<div class="col">
            <div class="card h-100" style="width: 12rem;">
                <img src="${pokemon.sprites.front_default}" class="card-img-top" alt="${pokemon.name}">
                <h2 class="card-title">${pokemon.name.toUpperCase()}</h2>
                <div class="card-body">
                    <h5 class="card-title">Especie: ${pokemon.species.name}</h5>
                    <h5 class="card-title">Status:</h5>
                    <ul>
                        ${pokemon.stats
                            .map(stat => `<li>${stat.stat.name}: ${stat.base_stat}</li>`)
                            .join("")}
                    </ul>
                </div>
            </div>
        </div>`;
    }

    document.getElementById("dataAlbum").innerHTML = cards;
}

function pagination(prev, next) {
    let prevDisabled = "";
    let nextDisabled = "";

    if (!prev) {
        prevDisabled = "disabled";
    }
    if (!next) {
        nextDisabled = "disabled";
    }

    let html = `
        <li class="page-item ${prevDisabled}">
            <a class="page-link" onclick="getAlbum('${prev}')">Anterior</a>
        </li>
        <li class="page-item ${nextDisabled}">
            <a class="page-link" onclick="getAlbum('${next}')">Siguiente</a>
        </li>
    `;

    document.getElementById("pagination").innerHTML = html;
}

// Llamada inicial
getAlbum(API_ALBUM);
