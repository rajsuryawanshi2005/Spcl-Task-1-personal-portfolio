// ====== Smooth Scrolling Function ======
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

function scrollToContact() {
    scrollToSection('contact');
}

// ====== Mobile Menu Toggle ======
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when link is clicked
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
    });
});

// ====== Form Validation and Submission ======
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Clear previous error messages
        clearErrors();

        // Validation variables
        let isValid = true;
        const errors = {
            nameError: '',
            emailError: '',
            messageError: ''
        };

        // Name validation
        if (name.length === 0) {
            errors.nameError = 'Name is required';
            isValid = false;
        } else if (name.length < 3) {
            errors.nameError = 'Name must be at least 3 characters long';
            isValid = false;
        } else if (!/^[a-zA-Z\s]+$/.test(name)) {
            errors.nameError = 'Name should only contain letters and spaces';
            isValid = false;
        }

        // Email validation
        if (email.length === 0) {
            errors.emailError = 'Email is required';
            isValid = false;
        } else if (!validateEmail(email)) {
            errors.emailError = 'Please enter a valid email address';
            isValid = false;
        }

        // Message validation
        if (message.length === 0) {
            errors.messageError = 'Message is required';
            isValid = false;
        } else if (message.length < 10) {
            errors.messageError = 'Message must be at least 10 characters long';
            isValid = false;
        }

        // Display errors or submit
        if (!isValid) {
            displayErrors(errors);
        } else {
            // Form is valid - show success message
            showSuccessMessage();
            contactForm.reset();
            clearErrors();
        }
    });
}

// ====== Email Validation Function ======
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ====== Display Error Messages ======
function displayErrors(errors) {
    if (errors.nameError) {
        const nameErrorEl = document.getElementById('nameError');
        if (nameErrorEl) {
            nameErrorEl.textContent = errors.nameError;
            nameErrorEl.classList.add('show');
        }
    }

    if (errors.emailError) {
        const emailErrorEl = document.getElementById('emailError');
        if (emailErrorEl) {
            emailErrorEl.textContent = errors.emailError;
            emailErrorEl.classList.add('show');
        }
    }

    if (errors.messageError) {
        const messageErrorEl = document.getElementById('messageError');
        if (messageErrorEl) {
            messageErrorEl.textContent = errors.messageError;
            messageErrorEl.classList.add('show');
        }
    }
}

// ====== Clear Error Messages ======
function clearErrors() {
    const errorElements = document.querySelectorAll('.error');
    errorElements.forEach(el => {
        el.classList.remove('show');
        el.textContent = '';
    });
}

// ====== Show Success Message ======
function showSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    if (successMessage) {
        successMessage.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
        successMessage.classList.add('show');

        // Hide success message after 5 seconds
        setTimeout(function() {
            successMessage.classList.remove('show');
        }, 5000);
    }
}

// ====== Scroll Animation for Elements ======
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe skill cards and project cards on page load
document.addEventListener('DOMContentLoaded', function() {
    const skillCards = document.querySelectorAll('.skill-card');
    const projectCards = document.querySelectorAll('.project-card');

    skillCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// ====== Active Navigation Link ======
window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ====== Real-time Form Validation ======
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

if (nameInput) {
    nameInput.addEventListener('blur', function() {
        validateField('name');
    });
}

if (emailInput) {
    emailInput.addEventListener('blur', function() {
        validateField('email');
    });
}

if (messageInput) {
    messageInput.addEventListener('blur', function() {
        validateField('message');
    });
}

// ====== Validate Single Field ======
function validateField(fieldName) {
    let isValid = true;
    const errorElement = document.getElementById(fieldName + 'Error');

    if (fieldName === 'name') {
        const name = nameInput.value.trim();
        if (name.length === 0) {
            errorElement.textContent = 'Name is required';
            isValid = false;
        } else if (name.length < 3) {
            errorElement.textContent = 'Name must be at least 3 characters';
            isValid = false;
        }
    } else if (fieldName === 'email') {
        const email = emailInput.value.trim();
        if (email.length === 0) {
            errorElement.textContent = 'Email is required';
            isValid = false;
        } else if (!validateEmail(email)) {
            errorElement.textContent = 'Invalid email address';
            isValid = false;
        }
    } else if (fieldName === 'message') {
        const message = messageInput.value.trim();
        if (message.length === 0) {
            errorElement.textContent = 'Message is required';
            isValid = false;
        } else if (message.length < 10) {
            errorElement.textContent = 'Message must be at least 10 characters';
            isValid = false;
        }
    }

    if (isValid) {
        errorElement.classList.remove('show');
        errorElement.textContent = '';
    } else {
        errorElement.classList.add('show');
    }
}

