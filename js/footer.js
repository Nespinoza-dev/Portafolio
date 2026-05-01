// Función para cargar componentes
function loadNavbar() {
    const placeholder = document.querySelector("#foot-placeholder");
    
    if (placeholder) {
        fetch('componentes/footer.html')
            .then(response => {
                if (!response.ok) throw new Error("Error al cargar el footer");
                return response.text();
            })
            .then(data => {
                placeholder.innerHTML = data;
                // Aquí podrías ejecutar funciones de JS que el footer necesite (como el menú hamburguesa)
            })
            .catch(error => console.error(error));
    }
}

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", loadNavbar);