document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. CAROUSEL HERO (BANNER SLIDER)
    // ==========================================
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.carousel-indicator');
    const btnPrev = document.getElementById('hero-prev');
    const btnNext = document.getElementById('hero-next');
    let currentSlide = 0;
    let autoSlideInterval;

    function showSlide(index) {
        // Remover active de slides e indicadores
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(ind => ind.classList.remove('active'));

        // Normalizar index
        currentSlide = (index + slides.length) % slides.length;

        // Añadir active
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // Event listeners
    if (btnPrev && btnNext) {
        btnPrev.addEventListener('click', () => {
            prevSlide();
            resetAutoSlide();
        });
        btnNext.addEventListener('click', () => {
            nextSlide();
            resetAutoSlide();
        });
    }

    indicators.forEach((indicator, idx) => {
        indicator.addEventListener('click', () => {
            showSlide(idx);
            resetAutoSlide();
        });
    });

    // Auto-slide setup
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 6000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    startAutoSlide();


    // ==========================================
    // 2. PRODUCT TABS FILTERING & SLIDER
    // ==========================================
    const tabButtons = document.querySelectorAll('.tab-btn');
    const productSlides = document.querySelectorAll('.product-card-slide');
    const sliderContainer = document.querySelector('.products-slider-container');
    const sliderPrevBtn = document.getElementById('prod-slider-prev');
    const sliderNextBtn = document.getElementById('prod-slider-next');

    // Filtrado de pestañas
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Activar botón pestaña
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const selectedTab = btn.getAttribute('data-tab');

            // Filtrar productos
            if (window.applyAllFilters) {
                window.applyAllFilters();
            } else {
                productSlides.forEach(slide => {
                    const categories = (slide.getAttribute('data-category') || '').split(' ');
                    if (categories.includes(selectedTab)) {
                        slide.classList.remove('hidden');
                    } else {
                        slide.classList.add('hidden');
                    }
                });
            }

            // Hacer scroll al inicio del slider
            if (sliderContainer) {
                sliderContainer.scrollLeft = 0;
            }
        });
    });

    // Lanzar el filtro de la pestaña inicial ("novedades")
    const initialActiveTab = document.querySelector('.tab-btn.active');
    if (initialActiveTab) {
        initialActiveTab.click();
    }

    // Funcionalidad de desplazamiento del slider de productos
    if (sliderContainer && sliderPrevBtn && sliderNextBtn) {
        const getCardWidth = () => {
            const firstVisibleCard = document.querySelector('.product-card-slide:not(.hidden)');
            if (firstVisibleCard) {
                return firstVisibleCard.offsetWidth + 30; // Card width + gap
            }
            return 280;
        };

        sliderPrevBtn.addEventListener('click', () => {
            sliderContainer.scrollBy({
                left: -getCardWidth(),
                behavior: 'smooth'
            });
        });

        sliderNextBtn.addEventListener('click', () => {
            sliderContainer.scrollBy({
                left: getCardWidth(),
                behavior: 'smooth'
            });
        });
    }

    // ==========================================
    // 3. EVENTOS COMPRA / VER MÁS
    // ==========================================
    const ctaButtons = document.querySelectorAll('.slide-btn');
    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const href = button.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
