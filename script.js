// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.textContent = '☰';
        });
    });
}

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

// Web3Forms AJAX Form Submission
document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector(".web3-form");
    if (!form) return;

    // Create a result div dynamically
    const result = document.createElement("div");
    result.style.display = "none";
    result.style.textAlign = "center";
    result.style.marginTop = "1.5rem";
    result.style.fontWeight = "600";
    result.style.padding = "1rem";
    result.style.borderRadius = "8px";
    form.appendChild(result);

    form.addEventListener("submit", function(e) {
        e.preventDefault();
        const formData = new FormData(form);
        const object = {};
        formData.forEach((value, key) => { 
            if (object[key]) {
                object[key] = object[key] + ", " + value; // Commas for multiple checkbox picks
            } else {
                object[key] = value;
            }
        });
        const json = JSON.stringify(object);

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = "Sending...";
        submitBtn.style.opacity = "0.7";
        submitBtn.style.pointerEvents = "none";

        fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: json
        })
        .then(async (response) => {
            let resJson = await response.json();
            if (response.status == 200) {
                result.style.display = "block";
                result.style.color = "#4CAF50";
                result.style.background = "rgba(76, 175, 80, 0.1)";
                result.style.border = "1px solid rgba(76, 175, 80, 0.3)";
                result.innerHTML = "✅ Message Sent Successfully!";
                form.reset();
            } else {
                console.log(response);
                result.style.display = "block";
                result.style.color = "#ff6b6b";
                result.style.background = "rgba(255, 107, 107, 0.1)";
                result.style.border = "1px solid rgba(255, 107, 107, 0.3)";
                result.innerHTML = "❌ Something went wrong. Please try again.";
            }
        })
        .catch((error) => {
            console.log(error);
            result.style.display = "block";
            result.style.color = "#ff6b6b";
            result.style.background = "rgba(255, 107, 107, 0.1)";
            result.style.border = "1px solid rgba(255, 107, 107, 0.3)";
            result.innerHTML = "❌ Error submitting form. Check internet connection.";
        })
        .then(function() {
            submitBtn.textContent = originalText;
            submitBtn.style.opacity = "1";
            submitBtn.style.pointerEvents = "auto";
            
            // Hide the message after 6 seconds
            setTimeout(() => {
                result.style.display = "none";
            }, 6000);
        });
    });
});
