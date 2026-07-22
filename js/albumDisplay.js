// genres: jazz, rock, altrock, punk, postpunk, arg, fusion, prog, 70s, 80s, 90s, 00s

const container = document.getElementById("container");
const searchInput = document.getElementById("search");

function normalizeText(text) {
    return text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
}

async function loadAlbumsURL(mode=0) { // 0: URL Params, 1: Search params

    const response = await fetch("albums.json");
    let albums = await response.json();

    switch (mode) {
        case 0:
            const params = new URLSearchParams(window.location.search);
            const genre = params.get("genre");

            if (genre) {
                albums = albums.filter(album =>
                    album.genres.includes(genre)
                );
            }
        break;
        case 1: 
            const name = normalizeText(searchInput.value);
            console.log(name);

            albums = albums.filter(album => 
                normalizeText(album.title).includes(name)
            );
            container.innerHTML = ``;
            console.log(albums);
        break;
    }

    if (albums == "") container.innerHTML = `<p>No hay resultados.</p>`;

    albums.reverse().forEach(album => {
        container.innerHTML += `
            <a href="${album.link}">
                <div class="item">
                    <div style="display:flex; justify-content:center;">
                        <img src="${album.cover}" alt="${album.title}">
                    </div>

                    <div style="display:flex; justify-content:space-between;">
                        <h1>${album.title}</h1>
                        <h1>${album.rating}</h1>
                    </div>

                    <div style="display:flex; justify-content:space-between;">
                        <h3>${album.artist} - ${album.year}</h3>
                        <h3 style="margin-right:12px;">
                            ${album.genres[0]}
                        </h3>
                    </div>

                    <p>${album.description}</p>
                </div>
            </a>
        `;
    });
}

searchInput.addEventListener('keydown', (e) => {
    loadAlbumsURL(1);
});

loadAlbumsURL(0);