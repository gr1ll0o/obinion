const container = document.getElementById('container-reviews');

async function loadAlbums() { 
    const response = await fetch("albums.json");
    let albums = await response.json();
    albums = albums.reverse();

    for (let i = 0; i < 3; i++) {
        container.innerHTML += `
            <a href="${albums[i].link}">
                <div class="item">
                    <div style="display:flex; justify-content:center;">
                        <img src="${albums[i].cover}" alt="${albums[i].title}">
                    </div>

                    <div style="display:flex; justify-content:space-between;">
                        <h1>${albums[i].title}</h1>
                        <h1>${albums[i].rating}</h1>
                    </div>

                    <div style="display:flex; justify-content:space-between;">
                        <h3>${albums[i].artist} - ${albums[i].year}</h3>
                        <h3 style="margin-right:12px;">
                            ${albums[i].genres[0]}
                        </h3>
                    </div>

                    <p>${albums[i].description}</p>
                </div>
            </a>
        `;
    }
}

loadAlbums();