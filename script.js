// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        // Close other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
                otherItem.querySelector('.toggle-icon').textContent = '+';
            }
        });

        // Toggle current item
        item.classList.toggle('active');
        const icon = item.querySelector('.toggle-icon');
        icon.textContent = item.classList.contains('active') ? '×' : '+';
    });
});

// Navbar shadow on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 20) {
        nav.style.boxShadow = '0 4px 15px rgba(0,0,0,0.08)';
    } else {
        nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
    }
});
