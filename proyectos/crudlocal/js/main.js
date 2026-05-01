// 1. Empezamos con el inventario totalmente vacío
let inventario = [];
let proximoId = 1; 

// 2. Función para capturar los datos y agregar al array (CREATE)
function guardarJuego() {
    // Obtenemos las referencias a los inputs
    const inputTitulo = document.getElementById('titulo'); // El ID que le diste al input
    const selectPlat = document.getElementById('plataforma');
    const selectEstado = document.getElementById('estado');

    // Validación simple: Si el título está vacío, no hace nada
    if (inputTitulo.value.trim() === "") {
        alert("Por favor, ingresa un título.");
        return;
    }

    // Creamos el objeto del nuevo juego
    const nuevoJuego = {
        id: proximoId,
        titulo: inputTitulo.value,
        plataforma: selectPlat.value,
        estado: selectEstado.value
    };

    // Lo agregamos a nuestra "lista" y subimos el contador del ID
    inventario.push(nuevoJuego);
    proximoId++;

    // Limpiamos el input de texto para el siguiente
    inputTitulo.value = "";
    // Actualizamos la visualización
    renderizarTabla();
}

// 3. Función para dibujar la tabla en el HTML (READ)
function renderizarTabla() {
    const tabla = document.getElementById('gameTableBody');
    
    // Limpiamos la tabla por completo antes de redibujar
    tabla.innerHTML = "";

    // Recorremos el array y creamos las filas
    inventario.forEach((juego) => {
        tabla.innerHTML += `
            <tr>
                <td>${juego.id}</td>
                <td>${juego.titulo}</td>
                <td>${juego.plataforma}</td>
                <td><span class="badge bg-info ${juego.estado.toLowerCase()}">${juego.estado}</span></td>
                <td class="text-center">
                    <button class="btn btn-sm btn-warning me-2 btn-editar" onclick="prepararEdicion(${juego.id})">Editar</button>
                    <button class="btn btn-sm btn-danger btn-eliminar" onclick="eliminarJuego(${juego.id})">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

// 4. Función para borrar un juego (DELETE)
function eliminarJuego(id) {
    // Filtramos: "Quédate con todos los juegos que NO tengan este ID"
    inventario = inventario.filter(juego => juego.id !== id);
    renderizarTabla();
}