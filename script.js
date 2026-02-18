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

// ====== Helper Functions ======
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

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

function clearErrors() {
    const errorElements = document.querySelectorAll('.error');
    errorElements.forEach(el => {
        el.classList.remove('show');
        el.textContent = '';
    });
}

function showSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    if (successMessage) {
        successMessage.innerHTML = '✓ Message sent successfully! I\'ll get back to you soon.';
        successMessage.classList.add('show');

        // Hide success message after 5 seconds
        setTimeout(function () {
            successMessage.classList.remove('show');
        }, 5000);
    }
}

// ====== Main Initialization ======
document.addEventListener('DOMContentLoaded', function () {

    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', function () {
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when link is clicked
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function () {
            navLinks.classList.remove('active');
        });
    });

    // --- Animation Observation ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

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

    // --- Form Handling with EmailJS ---

    // Initialize EmailJS
    try {
        emailjs.init("GETkapgDAHmfcRxDL");
    } catch (e) {
        console.error("EmailJS Init Failed:", e);
    }

    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Clear previous error messages
            clearErrors();

            // Get form values
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const message = messageInput.value.trim();

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
                // Form is valid - send email
                const templateParams = {
                    from_name: name,
                    from_email: email,
                    email: email,    // Adding 'email' just in case the template uses "email" for recipient
                    message: message,
                    to_name: "Raj Suryawanshi",
                    reply_to: email,
                    to_email: "rajsuryawanshi897@gmail.com"
                };

                console.log("Sending EmailJS params:", templateParams);

                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalBtnText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;

                emailjs.send(
                    "service_xgne04r",
                    "template_wfh89s4",
                    templateParams
                )
                    .then(function () {
                        showSuccessMessage();
                        contactForm.reset();
                    })
                    .catch(function (error) {
                        console.error("EmailJS Error:", error);
                        // Show the specific error text to help debugging
                        let errorMsg = "Failed to send message.";
                        if (error && error.text) {
                            errorMsg += " Error: " + error.text;
                        } else if (typeof error === 'string') {
                            errorMsg += " " + error;
                        }
                        alert(errorMsg);
                    })
                    .finally(function () {
                        submitBtn.textContent = originalBtnText;
                        submitBtn.disabled = false;
                    });
            }
        });
    }
});

// ====== Active Navigation Link ======
window.addEventListener('scroll', function () {
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
