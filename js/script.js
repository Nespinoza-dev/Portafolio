document.addEventListener("DOMContentLoaded", () => {
    const targets = document.querySelectorAll(".scroll-reveal");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const rect = entry.target.getBoundingClientRect();
            
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            } else {
                // Reset desde abajo
                if (rect.top > window.innerHeight) {
                    entry.target.classList.remove("active");
                }
            }
        });
    }, { threshold: 0.1 });

    targets.forEach((target) => observer.observe(target));

    // Reset inteligente al subir al inicio
    window.addEventListener("scroll", () => {
        if (window.scrollY <= 10) { // Margen de 10px
            targets.forEach(target => {
                // EXCEPCIÓN: Si es la sección de presentación, NO le quites la clase
                // Suponiendo que tu sección tiene la clase 'presentacion'
                if (!target.closest('.presentacion')) {
                    target.classList.remove("active");
                }
            });
        }
    }, { passive: true });
});