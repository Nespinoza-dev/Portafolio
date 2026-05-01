const BASE_URL = "https://personal-bkrxatyj-dev.outsystems.app/GameStockManager/rest/GameStock/stocks";
const USERNAME = 'Nicolas'; 
const PASSWORD = 'Nico';

const headers = new Headers();
headers.set('Authorization', 'Basic ' + btoa(USERNAME + ":" + PASSWORD));
headers.set('Content-Type', 'application/json');

let editMode = false;
let currentEditId = null;

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', getStocks);

// --- 1. OBTENER JUEGOS (READ) ---
async function getStocks() {
    try {
        const response = await fetch(BASE_URL, { method: 'GET', headers: headers });
        const games = await response.json();
        renderTable(games);
    } catch (error) {
        console.error('Error al obtener datos:', error);
    }
}

// --- 2. RENDERIZAR TABLA ---
function renderTable(games) {
    const tableBody = document.getElementById('gameTableBody');
    tableBody.innerHTML = '';

    games.forEach(game => {

        tableBody.innerHTML += `
            <tr>
                <td>${game.id}</td>
                <td>${game.gameTitle}</td>
                <td><span class="badge bg-info text-dark">${game.platform}</span></td>
                <td>${game.status}</td>
                <td class="text-center">
                    <button class="btn btn-sm btn-warning me-2" onclick='prepararEdicion(${JSON.stringify(game)})'>Editar</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteStock(${game.id})">Eliminar</button>
                </td>
            </tr>
        `;
    });
}


// --- 3. GUARDAR O ACTUALIZAR (CREATE / UPDATE) ---
async function guardarJuego() {
    const titulo = document.getElementById('titulo').value;
    const plataforma = document.getElementById('plataforma').value;
    const estado = document.getElementById('estado').value;

    if (!titulo || plataforma === "null" || estado === "null") {
        alert("Completa todos los campos");
        return;
    }

    // Armamos el objeto exactamente como pide tu captura de pantalla
    const gameData = {
        "gameTitle": titulo,
        "platform": plataforma,
        "status": estado
    };

    // Si estamos editando, incluimos el ID
    if (editMode) {
        gameData.id = currentEditId;
    }

    try {
        const method = editMode ? 'PATCH' : 'POST';
        const response = await fetch(BASE_URL, {
            method: method,
            headers: headers,
            body: JSON.stringify(gameData)
        });

        if (response.ok) {
            alert(editMode ? 'Actualizado correctamente' : 'Guardado correctamente');
            resetForm();
            getStocks();
        } else {
            const errorText = await response.text();
            console.error("Error de la API:", errorText);
        }
    } catch (error) {
        console.error('Error en la petición:', error);
    }
}

// --- 4. ELIMINAR (DELETE) ---
async function deleteStock(id) {
    if (!id) {
        console.error("ID no válido");
        return;
    }

    if (!confirm('¿Eliminar este videojuego?')) return;

    try {
        const response = await fetch(`${BASE_URL}?Id=${id}`, {
            method: 'DELETE',
            headers: headers
        });

        if (response.ok) {
            getStocks(); // Recargar la tabla
        } else {
            const error = await response.text();
            console.error("Error de la API al eliminar:", error);
        }
    } catch (error) {
        console.error('Error al eliminar:', error);
    }
}

// --- FUNCIONES EXTRA ---
function prepararEdicion(game) {
    document.getElementById('titulo').value = game.gameTitle;
    document.getElementById('plataforma').value = game.platform;
    document.getElementById('estado').value = game.status;
    document.getElementById('formTitle').innerText = "Editando: " + game.gameTitle;
    editMode = true;
    currentEditId = game.id;
}

function resetForm() {
    document.getElementById('gameForm').reset();
    document.getElementById('formTitle').innerText = "Agregar Nuevo Juego";
    editMode = false;
    currentEditId = null;
}