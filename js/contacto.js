const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");
const btn = document.getElementById("submit-btn");

form.addEventListener("submit", async function(event) {
    event.preventDefault(); // Evita el recargo de página
    
    btn.disabled = true;
    btn.innerText = "Enviando...";
    
    const data = new FormData(event.target);
    
    try {
        const response = await fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            status.innerHTML = "¡Mensaje enviado con éxito! Te responderé pronto.";
            status.classList.add("success");
            form.reset(); // Limpia los campos
        } else {
            status.innerHTML = "Ups! Hubo un problema al enviar.";
            status.classList.add("error");
        }
    } catch (error) {
        status.innerHTML = "Error de conexión. Inténtalo de nuevo.";
        status.classList.add("error");
    } finally {
        btn.disabled = false;
        btn.innerText = "Enviar Mensaje";
    }
});