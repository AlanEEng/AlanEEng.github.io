// JavaScript for the enhanced portfolio website

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navbar = document.getElementById('navbar');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            this.classList.toggle('active');
            navbar.querySelector('ul').classList.toggle('show');
        });
    }
    
    // Close mobile menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navbar.querySelector('ul').classList.remove('show');
            mobileMenu.classList.remove('active');
        });
    });
    
    // Scroll to top button
    const scrollToTopButton = document.getElementById('scroll-to-top');
    
    if (scrollToTopButton) {
        // Show/hide scroll to top button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopButton.classList.add('visible');
            } else {
                scrollToTopButton.classList.remove('visible');
            }
        });
        
        // Scroll to top when button is clicked
        scrollToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length && projectCards.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                projectCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category').includes(filterValue)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Project Details Modal
    const detailsLinks = document.querySelectorAll('.details-link');
    
    if (detailsLinks.length) {
        detailsLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetModal = document.querySelector(targetId);
                
                if (targetModal) {
                    targetModal.style.display = 'block';
                    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
                }
            });
        });
        
        // Close details modal
        const closeButtons = document.querySelectorAll('.close-details');
        closeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const modal = this.closest('.project-details');
                modal.style.display = 'none';
                document.body.style.overflow = 'auto'; // Re-enable scrolling
            });
        });
        
        // Close modal when clicking outside of the content
        const modals = document.querySelectorAll('.project-details');
        modals.forEach(modal => {
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    this.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        });
    }
    
    // Testimonials Carousel
    const testimonials = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    const prevButton = document.getElementById('prev-testimonial');
    const nextButton = document.getElementById('next-testimonial');
    
    if (testimonials.length && dots.length) {
        let currentIndex = 0;
        
        function showTestimonial(index) {
            // Hide all testimonials
            testimonials.forEach(item => {
                item.classList.remove('active');
            });
            
            // Remove active class from all dots
            dots.forEach(dot => {
                dot.classList.remove('active');
            });
            
            // Show current testimonial and activate current dot
            testimonials[index].classList.add('active');
            dots[index].classList.add('active');
        }
        
        // Initialize
        showTestimonial(currentIndex);
        
        // Next testimonial
        if (nextButton) {
            nextButton.addEventListener('click', function() {
                currentIndex = (currentIndex + 1) % testimonials.length;
                showTestimonial(currentIndex);
            });
        }
        
        // Previous testimonial
        if (prevButton) {
            prevButton.addEventListener('click', function() {
                currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
                showTestimonial(currentIndex);
            });
        }
        
        // Dot navigation
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                currentIndex = index;
                showTestimonial(currentIndex);
            });
        });
        
        // Auto rotate testimonials
        setInterval(function() {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        }, 8000);
    }
    
    // Dark/Light Theme Toggle
    const themeToggle = document.getElementById('checkbox');
    
    if (themeToggle) {
        // Check for saved theme preference or respect OS preference
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        const currentTheme = localStorage.getItem('theme');
        
        // If a theme preference is set, apply it
        if (currentTheme === 'dark') {
            document.body.classList.add('dark-theme');
            themeToggle.checked = true;
        } else if (currentTheme === 'light') {
            document.body.classList.remove('dark-theme');
            themeToggle.checked = false;
        } else if (prefersDarkScheme.matches) {
            // If no preference is set but OS prefers dark mode
            document.body.classList.add('dark-theme');
            themeToggle.checked = true;
        }
        
        // Listen for theme toggle changes
        themeToggle.addEventListener('change', function() {
            if (this.checked) {
                document.body.classList.add('dark-theme');
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.classList.remove('dark-theme');
                localStorage.setItem('theme', 'light');
            }
        });
    }
    
    // Contact Form Validation and Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !subject || !message) {
                alert('Please fill out all fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Here you would normally send the form data to a server
            // For now, we'll just show a success message
            
            // Create success message
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success';
            successMessage.textContent = 'Thank you for your message! I will get back to you soon.';
            
            // Replace form with success message
            contactForm.innerHTML = '';
            contactForm.appendChild(successMessage);
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Adjust for fixed header
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Highlight active section in navigation
    function highlightNavigation() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSectionId = '';
        const scrollPosition = window.scrollY;
        
        // Find the current section
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        // Highlight the corresponding nav link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Run on scroll and on page load
    window.addEventListener('scroll', highlightNavigation);
    highlightNavigation();
    
    // Animate on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.skill-category, .project-card, .timeline-item');
        const windowHeight = window.innerHeight;
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementPosition < windowHeight - elementVisible) {
                element.classList.add('animate');
            }
        });
    }
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
});