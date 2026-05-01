const listaPersonajes = document.querySelector("#listaPersonajes");
const botonesHeader = document.querySelectorAll(".btn-header")

const URL = "https://dragonball-api.com/api/characters?limit=58";

fetch(URL, {cache:'default'})
    .then(response => response.json())
    .then(data => {

        data.items.forEach(perso => mostrarPersonajes(perso));
    })
    .catch(error => console.error("Error:", error));

function mostrarPersonajes(perso) {

    let persoId = perso.id.toString();

    if (persoId.length === 1) {
        persoId = "00" + persoId;
    } else if (persoId.length === 2) {
        persoId = "0" + persoId;
    }

    const div = document.createElement("div");

    div.classList.add("personajes");
    div.innerHTML = `
        <div class="personaje">
        <p class="personaje-id-back">#${persoId}</p>
        <div class="personaje-imagen">
            <img src="${perso.image}" alt="${perso.name}">
        </div>
        <div class="personaje-info">
            <div class="nombre-contenedor">
                <p class="personaje-id">#${persoId}</p>
                <h2 class="personaje-nombre">${perso.name}</h2>
            </div>
            <div class="personaje-tipo">
                <p class="tipo ${perso.race.toLowerCase()}">${perso.race}</p>
                <p class="tipo genero">${perso.gender}</p>
            </div>
            <div class="personaje-stats">
                <p class="stat">Ki base: ${perso.ki}</p>
                <p class="stat">Ki máximo: ${perso.maxKi}</p>
            </div>
        </div>
    `;
    listaPersonajes.append(div);
}



botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;

    listaPersonajes.innerHTML = "";

    fetch(URL, {cache:'default'})
        .then(response => response.json())
        .then(data => {
            if (botonId === "ver-todos") {
                data.items.forEach(perso => mostrarPersonajes(perso));
            } else {
                const filtrados = data.items.filter(perso => {

                    const botonIdLimpio = botonId.replace("-", " ").toLowerCase();
                    
                    const razaApiLimpia = perso.race.toLowerCase();

                    return razaApiLimpia === botonIdLimpio;
                });
                
                filtrados.forEach(perso => mostrarPersonajes(perso));
            }
        })
        .catch(error => console.error("Error:", error));
}));