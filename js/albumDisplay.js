// genres: jazz, rock, altrock, punk, postpunk, arg, fusion, prog, 70s, 80s, 90s, 00s

const container = document.getElementById("container");
const searchInput = document.getElementById("search");

async function loadAlbumsURL(mode=0) { // 0: URL Params, 1: Search params

    const response = await fetch("albums.json");
    let albums = await response.json();

    if (mode == 0) {
        const params = new URLSearchParams(window.location.search);
        const genre = params.get("genre");

        if (genre) {
            albums = albums.filter(album =>
                album.genres.includes(genre)
            );
        }
    }else if (mode == 1) {
        const name = searchInput.value.toLowerCase();

        albums = albums.filter(album => 
            album.title.toLowerCase().includes(name)
        );
        container.innerHTML = ``;
        console.log(albums);
        if (albums == "") container.innerHTML = `<p>No hay resultados.</p>`;
    }

    albums.forEach(album => {
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
    if (event.key === "Enter") {
        loadAlbumsURL(1);
    }
});

loadAlbumsURL(0);