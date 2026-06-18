document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. FAQ ACCORDION
    // ==========================================
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.closest('.faq-item');
            const answerWrapper = item.querySelector('.faq-answer-wrapper');
            
            // Close other items if open
            const activeItem = document.querySelector('.faq-item.active');
            if (activeItem && activeItem !== item) {
                activeItem.classList.remove('active');
                activeItem.querySelector('.faq-answer-wrapper').style.maxHeight = '0';
            }

            // Toggle current item
            item.classList.toggle('active');

            if (item.classList.contains('active')) {
                // Set max-height to scrollHeight to animate expansion
                answerWrapper.style.maxHeight = `${answerWrapper.scrollHeight + 100}px`;
            } else {
                answerWrapper.style.maxHeight = '0';
            }
        });
    });

    // ==========================================
    // 2. CONTACT FORM
    // ==========================================
    const contactForm = document.getElementById('contact-form-el');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.contact-submit-btn');
            const originalText = submitBtn.innerText;
            
            // Premium sending micro-animation
            submitBtn.disabled = true;
            submitBtn.innerText = 'ENVIANDO...';
            
            setTimeout(() => {
                submitBtn.style.backgroundColor = '#C5A059';
                submitBtn.innerText = '¡MENSAJE ENVIADO CON ÉXITO!';
                
                // Reset form fields
                contactForm.reset();
                
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.innerText = originalText;
                }, 3000);
            }, 1500);
        });
    }
});
