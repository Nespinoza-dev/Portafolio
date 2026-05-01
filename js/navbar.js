// Función para cargar componentes
function loadNavbar() {
    const placeholder = document.querySelector("#nav-placeholder");
    
    if (placeholder) {
        fetch('componentes/navbar.html')
            .then(response => {
                if (!response.ok) throw new Error("Error al cargar el navbar");
                return response.text();
            })
            .then(data => {
                placeholder.innerHTML = data;
                // Aquí podrías ejecutar funciones de JS que el navbar necesite (como el menú hamburguesa)
            })
            .catch(error => console.error(error));
    }
}

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", loadNavbar);