// genders: jazz, rock, altrock, punk, postpunk, arg, fusion, prog, 70s, 80s, 90s, 00s

let container = document.getElementById("container");

async function loadAlbums() {
    const response = await fetch("albums.json");
    const albums = await response.json();

    albums.forEach(album => {
        container.innerHTML += `
            <a href="${album.page}">
                <div class="item">
                    <div style="display:flex; justify-content:center;">
                        <img src="${album.cover}" alt="${album.title}">
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <h1>${album.title}</h1>
                        <h1>${album.rating}</h1>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <h3>${album.artist} - ${album.year}</h3>
                        <h3 style="margin-right: 12px;">${album.genders[0]}</h3>
                    </div>
                    <p>${album.description}</p>
                </div>
            </a>
        `;
    });
}

loadAlbums();