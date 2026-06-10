document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menu-btn');
    const navOverlay = document.getElementById('nav-overlay');
    const navLinks = document.querySelectorAll('.nav-link');
    const columns = document.querySelectorAll('.collection-column');

    // Toggle del menú hamburguesa
    if (menuBtn && navOverlay) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            navOverlay.classList.toggle('active');
            
            // Prevenir scroll en el fondo cuando el menú está abierto
            if (navOverlay.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }

    // Cerrar menú al hacer click en los enlaces
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (menuBtn && navOverlay) {
                menuBtn.classList.remove('active');
                navOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Agregar un efecto sutil al hacer click en las columnas
    columns.forEach(column => {
        column.addEventListener('click', (e) => {
            // Evitar redirigir si se hace click directamente en el botón CTA
            if (e.target.closest('.cta-button')) return;

            const ctaBtn = column.querySelector('.cta-button');
            if (ctaBtn) {
                // Simula un click en el botón CTA de la columna correspondiente
                ctaBtn.click();
            }
        });
    });
});
