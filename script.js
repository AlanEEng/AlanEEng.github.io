// JavaScript for the enhanced portfolio website with optimizations

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add CSS variable for primary color RGB value for use in opacity adjustments
    const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();
    if (primaryColor.startsWith('#')) {
        const r = parseInt(primaryColor.slice(1, 3), 16);
        const g = parseInt(primaryColor.slice(3, 5), 16);
        const b = parseInt(primaryColor.slice(5, 7), 16);
        document.documentElement.style.setProperty('--primary-color-rgb', `${r}, ${g}, ${b}`);
    }

    // Performance optimization: Use requestAnimationFrame for animation
    // This ensures smoother animations and better performance
    let scrollAnimationFrame;
    let resizeAnimationFrame;

    // Debounced function for scroll events
    function debouncedScrollHandler(callback) {
        return function() {
            if (scrollAnimationFrame) {
                cancelAnimationFrame(scrollAnimationFrame);
            }
            scrollAnimationFrame = requestAnimationFrame(callback);
        };
    }

    // Debounced function for resize events
    function debouncedResizeHandler(callback) {
        return function() {
            if (resizeAnimationFrame) {
                cancelAnimationFrame(resizeAnimationFrame);
            }
            resizeAnimationFrame = requestAnimationFrame(callback);
        };
    }

    // Intersection Observer for lazy loading images
    function setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const lazyImages = document.querySelectorAll('img[loading="lazy"]');
            
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        const src = img.getAttribute('data-src');
                        
                        if (src) {
                            img.src = src;
                            img.removeAttribute('data-src');
                        }
                        
                        imageObserver.unobserve(img);
                    }
                });
            }, {
                rootMargin: '200px 0px', // Start loading images when they're 200px from viewport
                threshold: 0.01
            });
            
            lazyImages.forEach(img => {
                // Store original src in data-src if not already set
                if (!img.dataset.src && img.src) {
                    img.dataset.src = img.src;
                    // Use a tiny placeholder SVG instead of loading the full image initially
                    img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
                    imageObserver.observe(img);
                }
            });
        }
    }
    
    // Setup lazy loading on page load
    setupLazyLoading();

    // Enhanced Mobile Menu Toggle with accessibility and animations
    const mobileMenu = document.getElementById('mobile-menu');
    const navbar = document.getElementById('navbar');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            this.classList.toggle('active');
            
            // Animate the hamburger to an X with smoother animation
            const bars = this.querySelectorAll('.bar');
            if (!isExpanded) {
                bars[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
            } else {
                bars[0].style.transform = 'rotate(0) translate(0, 0)';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'rotate(0) translate(0, 0)';
            }
            
            navbar.querySelector('ul').classList.toggle('show');
        });
        
        // Keyboard accessibility for menu toggle
        mobileMenu.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }
    
    // Close mobile menu when a link is clicked with improved animation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                const navbarMenu = navbar.querySelector('ul');
                navbarMenu.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
                navbarMenu.style.opacity = '0';
                navbarMenu.style.transform = 'translateY(-10px)';
                
                mobileMenu.classList.remove('active');
                mobileMenu.setAttribute('aria-expanded', 'false');
                
                // Reset hamburger animation with smoother transition
                const bars = mobileMenu.querySelectorAll('.bar');
                bars.forEach(bar => {
                    bar.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
                });
                bars[0].style.transform = 'rotate(0) translate(0, 0)';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'rotate(0) translate(0, 0)';
                
                // Wait for animation to complete before hiding menu
                setTimeout(() => {
                    navbarMenu.classList.remove('show');
                    // Reset transition for next opening
                    setTimeout(() => {
                        navbarMenu.style.transition = '';
                    }, 300);
                }, 300);
            }
        });
    });
    
    // Enhanced Scroll to top button with optimized animation
    const scrollToTopButton = document.getElementById('scroll-to-top');
    
    if (scrollToTopButton) {
        // Show/hide scroll to top button based on scroll position with optimized event handler
        window.addEventListener('scroll', debouncedScrollHandler(function() {
            const scrollY = window.scrollY || window.pageYOffset;
            
            if (scrollY > 300) {
                scrollToTopButton.style.opacity = '1';
                scrollToTopButton.style.visibility = 'visible';
                scrollToTopButton.style.transform = 'translateY(0)';
            } else {
                scrollToTopButton.style.opacity = '0';
                scrollToTopButton.style.visibility = 'hidden';
                scrollToTopButton.style.transform = 'translateY(20px)';
            }
        }));
        
        // Smooth scroll to top with optimized easing function
        scrollToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get current scroll position
            const startPosition = window.scrollY || window.pageYOffset;
            const duration = 600; // ms
            const startTime = performance.now();
            
            // Optimized easing function: easeOutCubic
            function easeOutCubic(t) {
                return 1 - Math.pow(1 - t, 3);
            }
            
            // Animation function using requestAnimationFrame for smoother animation
            function scrollToTop(timestamp) {
                const elapsed = timestamp - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = easeOutCubic(progress);
                
                window.scrollTo(0, startPosition * (1 - eased));
                
                if (elapsed < duration) {
                    requestAnimationFrame(scrollToTop);
                }
            }
            
            requestAnimationFrame(scrollToTop);
        });
        
        // Keyboard accessibility for scroll to top button
        scrollToTopButton.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }
    
    // Enhanced Project filtering with optimized animations and ARIA support
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length && projectCards.length) {
        // Set initial index for staggered animation
        projectCards.forEach((card, index) => {
            card.style.setProperty('--index', index);
        });
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Update ARIA attributes for accessibility
                filterButtons.forEach(btn => {
                    btn.setAttribute('aria-selected', 'false');
                    btn.classList.remove('active');
                });
                
                this.setAttribute('aria-selected', 'true');
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                const projectsGrid = document.getElementById('projects-grid');
                
                // Announce filter change to screen readers
                const liveRegion = document.createElement('div');
                liveRegion.setAttribute('aria-live', 'polite');
                liveRegion.setAttribute('class', 'sr-only');
                liveRegion.textContent = `Filtered by ${this.textContent}`;
                document.body.appendChild(liveRegion);
                
                // Set a timeout to remove the live region after announcement
                setTimeout(() => {
                    document.body.removeChild(liveRegion);
                }, 1000);
                
                let visibleCount = 0;
                
                // Use a single batch DOM update for better performance
                // First, prepare all cards for animation
                projectCards.forEach(card => {
                    // Reset animation properties
                    card.style.animation = 'none';
                    card.offsetHeight; // Trigger reflow
                    
                    const shouldShow = filterValue === 'all' || card.getAttribute('data-category').includes(filterValue);
                    
                    if (shouldShow) {
                        // Make visible with delay based on index for staggered effect
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(50px)';
                        card.style.display = 'block';
                        
                        // Add appropriate ARIA attributes
                        card.setAttribute('aria-hidden', 'false');
                        visibleCount++;
                    } else {
                        // Fade out smoothly then hide
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        
                        // Update ARIA attributes
                        card.setAttribute('aria-hidden', 'true');
                    }
                });
                
                // Then, trigger the animations in a separate batch
                setTimeout(() => {
                    projectCards.forEach((card, index) => {
                        const shouldShow = filterValue === 'all' || card.getAttribute('data-category').includes(filterValue);
                        
                        if (shouldShow) {
                            const delay = Math.min(index * 50, 300); // Cap the maximum delay
                            card.style.transition = `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`;
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        } else {
                            setTimeout(() => {
                                card.style.display = 'none';
                            }, 300);
                        }
                    });
                    
                    // Update project grid for better responsive layout
                    projectsGrid.style.minHeight = `${Math.ceil(visibleCount / 3) * 450}px`;
                }, 50);
            });
            
            // Keyboard accessibility for filter buttons
            button.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
    }
    
    // Enhanced Project Details Modal with optimized animations and keyboard handling
    const detailsLinks = document.querySelectorAll('.details-link');
    
    if (detailsLinks.length) {
        // Track currently open modal for keyboard navigation
        let currentOpenModal = null;
        
        detailsLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetModal = document.querySelector(targetId);
                
                if (targetModal) {
                    // Show modal with fade-in animation
                    targetModal.style.display = 'block';
                    
                    // Set focus trap
                    currentOpenModal = targetModal;
                    
                    // Find the close button and set focus to it
                    const closeButton = targetModal.querySelector('.close-details');
                    if (closeButton) {
                        setTimeout(() => closeButton.focus(), 100);
                    }
                    
                    // Add visible class for animation after a slight delay
                    setTimeout(() => {
                        targetModal.classList.add('visible');
                    }, 10);
                    
                    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
                    
                    // Announce modal to screen readers
                    const modalTitle = targetModal.querySelector('h3').textContent;
                    const liveRegion = document.createElement('div');
                    liveRegion.setAttribute('aria-live', 'assertive');
                    liveRegion.setAttribute('class', 'sr-only');
                    liveRegion.textContent = `${modalTitle} details opened`;
                    document.body.appendChild(liveRegion);
                    
                    // Remove announcement after it's read
                    setTimeout(() => {
                        document.body.removeChild(liveRegion);
                    }, 1000);
                }
            });
        });
        
        // Close details modal with animation and keyboard support
        const closeButtons = document.querySelectorAll('.close-details');
        closeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const modal = this.closest('.project-details');
                closeModal(modal);
            });
            
            // Keyboard accessibility
            button.addEventListener('keydown', function(e) {
                const modal = this.closest('.project-details');
                
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    closeModal(modal);
                } else if (e.key === 'Escape') {
                    closeModal(modal);
                }
            });
        });
        
        // Close modal when clicking outside of the content
        const modals = document.querySelectorAll('.project-details');
        modals.forEach(modal => {
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    closeModal(this);
                }
            });
        });
        
        // Add keyboard support for modal navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && currentOpenModal) {
                closeModal(currentOpenModal);
            }
        });
        
        // Function to close modal with consistent behavior
        function closeModal(modal) {
            modal.classList.remove('visible');
            
            // Announce modal close to screen readers
            const modalTitle = modal.querySelector('h3').textContent;
            const liveRegion = document.createElement('div');
            liveRegion.setAttribute('aria-live', 'assertive');
            liveRegion.setAttribute('class', 'sr-only');
            liveRegion.textContent = `${modalTitle} details closed`;
            document.body.appendChild(liveRegion);
            
            // Wait for animation to complete before hiding
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto'; // Re-enable scrolling
                
                // Return focus to the element that opened the modal
                const modalId = modal.getAttribute('id');
                const opener = document.querySelector(`a[href="#${modalId}"]`);
                if (opener) {
                    opener.focus();
                }
                
                currentOpenModal = null;
                
                // Remove announcement after it's read
                document.body.removeChild(liveRegion);
            }, 300);
        }
    }
    
    // Enhanced Testimonials Carousel with optimized animations and ARIA support
    const testimonials = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    const prevButton = document.getElementById('prev-testimonial');
    const nextButton = document.getElementById('next-testimonial');
    
    if (testimonials.length && dots.length) {
        let currentIndex = 0;
        let isAnimating = false;
        let carouselInterval;
        
        function showTestimonial(index, direction = 'next') {
            if (isAnimating) return;
            isAnimating = true;
            
            // Get current and next testimonial
            const currentTestimonial = testimonials[currentIndex];
            const nextTestimonial = testimonials[index];
            
            // Update ARIA attributes for accessibility
            currentTestimonial.setAttribute('aria-hidden', 'true');
            nextTestimonial.setAttribute('aria-hidden', 'false');
            
            // Set initial state for animation with GPU acceleration
            if (direction === 'next') {
                nextTestimonial.style.transform = 'translate3d(100%, 0, 0)';
            } else {
                nextTestimonial.style.transform = 'translate3d(-100%, 0, 0)';
            }
            nextTestimonial.style.opacity = '0';
            nextTestimonial.style.display = 'block';
            
            // Trigger reflow
            nextTestimonial.offsetHeight;
            
            // Animate current testimonial out
            currentTestimonial.style.transition = 'transform 0.6s ease, opacity 0.6s ease';
            if (direction === 'next') {
                currentTestimonial.style.transform = 'translate3d(-100%, 0, 0)';
            } else {
                currentTestimonial.style.transform = 'translate3d(100%, 0, 0)';
            }
            currentTestimonial.style.opacity = '0';
            
            // Animate next testimonial in
            nextTestimonial.style.transition = 'transform 0.6s ease, opacity 0.6s ease';
            nextTestimonial.style.transform = 'translate3d(0, 0, 0)';
            nextTestimonial.style.opacity = '1';
            
            // Update dots
            dots.forEach(dot => {
                dot.classList.remove('active');
                dot.setAttribute('aria-selected', 'false');
            });
            dots[index].classList.add('active');
            dots[index].setAttribute('aria-selected', 'true');
            
            // Announce carousel update to screen readers
            const testimonialText = nextTestimonial.querySelector('.testimonial-content p').textContent;
            const authorName = nextTestimonial.querySelector('.author-info h4').textContent;
            const liveRegion = document.createElement('div');
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.setAttribute('class', 'sr-only');
            liveRegion.textContent = `Testimonial from ${authorName} is now showing.`;
            document.body.appendChild(liveRegion);
            
            // After animation completes
            setTimeout(() => {
                // Hide all except active
                testimonials.forEach(item => {
                    if (item !== nextTestimonial) {
                        item.style.display = 'none';
                    }
                    item.style.transition = '';
                });
                
                // Update current index
                currentIndex = index;
                isAnimating = false;
                
                // Remove announcement after it's read
                document.body.removeChild(liveRegion);
            }, 600);
        }
        
        // Initialize first testimonial with ARIA attributes
        testimonials.forEach((item, i) => {
            if (i !== 0) {
                item.style.display = 'none';
                item.setAttribute('aria-hidden', 'true');
            } else {
                item.setAttribute('aria-hidden', 'false');
            }
        });
        dots[0].classList.add('active');
        dots[0].setAttribute('aria-selected', 'true');
        
        // Next testimonial with direction and keyboard support
        if (nextButton) {
            nextButton.addEventListener('click', function() {
                resetCarouselTimer();
                const nextIndex = (currentIndex + 1) % testimonials.length;
                showTestimonial(nextIndex, 'next');
            });
            
            nextButton.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        }
        
        // Previous testimonial with direction and keyboard support
        if (prevButton) {
            prevButton.addEventListener('click', function() {
                resetCarouselTimer();
                const prevIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
                showTestimonial(prevIndex, 'prev');
            });
            
            prevButton.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        }
        
        // Dot navigation with keyboard support
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                resetCarouselTimer();
                if (index > currentIndex) {
                    showTestimonial(index, 'next');
                } else if (index < currentIndex) {
                    showTestimonial(index, 'prev');
                }
            });
            
            dot.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    const nextDot = dots[(index + 1) % dots.length];
                    nextDot.focus();
                } else if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    const prevDot = dots[(index - 1 + dots.length) % dots.length];
                    prevDot.focus();
                }
            });
        });
        
        // Function to reset and start auto-rotation timer
        function resetCarouselTimer() {
            clearInterval(carouselInterval);
            carouselInterval = setInterval(function() {
                if (!document.hidden) { // Only rotate when page is visible
                    const nextIndex = (currentIndex + 1) % testimonials.length;
                    showTestimonial(nextIndex, 'next');
                }
            }, 8000);
        }
        
        // Start auto-rotation
        resetCarouselTimer();
        
        // Pause auto-rotation on hover and focus with better event handling
        const testimonialsSection = document.getElementById('testimonials');
        if (testimonialsSection) {
            testimonialsSection.addEventListener('mouseenter', function() {
                clearInterval(carouselInterval);
            });
            
            testimonialsSection.addEventListener('mouseleave', function() {
                resetCarouselTimer();
            });
            
            // Pause on focus within the section for accessibility
            testimonialsSection.addEventListener('focusin', function() {
                clearInterval(carouselInterval);
            });
            
            testimonialsSection.addEventListener('focusout', function(e) {
                // Only restart if focus is moving outside the section
                if (!testimonialsSection.contains(e.relatedTarget)) {
                    resetCarouselTimer();
                }
            });
        }
        
        // Pause auto-rotation when page is not visible
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                clearInterval(carouselInterval);
            } else {
                resetCarouselTimer();
            }
        });
    }
    
    // Dark/Light Theme Toggle with enhanced animation and accessibility
    const themeToggle = document.getElementById('checkbox');
    
    if (themeToggle) {
        // Check for saved theme preference or respect OS preference
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        const currentTheme = localStorage.getItem('theme');
        
        // Function to apply theme with transition and ARIA updates
        function applyTheme(isDark) {
            // Update ARIA attribute
            themeToggle.setAttribute('aria-checked', isDark.toString());
            
            // First add a class for transition
            document.body.classList.add('theme-transition');
            
            // Apply the theme after a tiny delay to ensure the transition class is applied
            setTimeout(() => {
                if (isDark) {
                    document.body.classList.add('dark-theme');
                    themeToggle.checked = true;
                    document.querySelector('meta[name="theme-color"]').setAttribute('content', '#1e293b');
                } else {
                    document.body.classList.remove('dark-theme');
                    themeToggle.checked = false;
                    document.querySelector('meta[name="theme-color"]').setAttribute('content', '#2563eb');
                }
                
                // Announce theme change to screen readers
                const liveRegion = document.createElement('div');
                liveRegion.setAttribute('aria-live', 'polite');
                liveRegion.setAttribute('class', 'sr-only');
                liveRegion.textContent = isDark ? 'Dark theme applied' : 'Light theme applied';
                document.body.appendChild(liveRegion);
                
                // Remove the transition class after animations complete
                setTimeout(() => {
                    document.body.classList.remove('theme-transition');
                    document.body.removeChild(liveRegion);
                }, 800);
            }, 10);
        }
        
        // If a theme preference is set, apply it
        if (currentTheme === 'dark') {
            applyTheme(true);
        } else if (currentTheme === 'light') {
            applyTheme(false);
        } else if (prefersDarkScheme.matches) {
            // If no preference is set but OS prefers dark mode
            applyTheme(true);
        }
        
        // Listen for theme toggle changes with smooth transition
        themeToggle.addEventListener('change', function() {
            applyTheme(this.checked);
            localStorage.setItem('theme', this.checked ? 'dark' : 'light');
        });
        
        // Keyboard accessibility for theme toggle
        themeToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.checked = !this.checked;
                this.dispatchEvent(new Event('change'));
            }
        });
        
        // Listen for OS theme preference changes
        prefersDarkScheme.addEventListener('change', function(e) {
            // Only apply OS preference if no user preference is stored
            if (!localStorage.getItem('theme')) {
                applyTheme(e.matches);
            }
        });
    }
    
    // Enhanced Contact Form Validation and Submission with improved feedback
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        const formInputs = contactForm.querySelectorAll('input, textarea');
        let formSubmitted = false;
        
        // Real-time validation feedback with improved accessibility
        formInputs.forEach(input => {
            // Create validation message element if it doesn't exist
            let validationMessage = input.parentNode.querySelector('.validation-message');
            if (!validationMessage) {
                validationMessage = document.createElement('div');
                validationMessage.className = 'validation-message';
                input.parentNode.appendChild(validationMessage);
            }
            
            // Validate on blur (when user leaves the field)
            input.addEventListener('blur', function() {
                validateInput(this);
            });
            
            // Clear error styles when typing
            input.addEventListener('input', function() {
                this.classList.remove('input-error');
                validationMessage.textContent = '';
                validationMessage.style.opacity = '0';
                
                // If form was previously submitted, validate on each input change
                if (formSubmitted) {
                    validateInput(this);
                }
            });
        });
        
        // Improved validation function with accessibility announcements
        function validateInput(input) {
            const validationMessage = input.parentNode.querySelector('.validation-message');
            
            // Reset validation state
            input.classList.remove('input-error');
            validationMessage.textContent = '';
            validationMessage.style.opacity = '0';
            
            // Check if empty
            if (!input.value.trim()) {
                input.classList.add('input-error');
                validationMessage.textContent = `${input.labels[0].textContent} is required`;
                validationMessage.style.opacity = '1';
                return false;
            }
            
            // Email validation
            if (input.type === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value)) {
                    input.classList.add('input-error');
                    validationMessage.textContent = 'Please enter a valid email address';
                    validationMessage.style.opacity = '1';
                    return false;
                }
            }
            
            return true;
        }
        
        // Enhanced form submission with better feedback and accessibility
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            formSubmitted = true;
            
            // Validate all inputs
            let isValid = true;
            let firstInvalid = null;
            
            formInputs.forEach(input => {
                if (!validateInput(input)) {
                    isValid = false;
                    if (!firstInvalid) {
                        firstInvalid = input;
                    }
                }
            });
            
            if (!isValid) {
                // Focus first invalid field
                if (firstInvalid) {
                    firstInvalid.focus();
                }
                
                // Shake the form to indicate error with ARIA announcement
                contactForm.classList.add('form-error-shake');
                
                // Create accessible error message
                const errorAnnouncement = document.createElement('div');
                errorAnnouncement.setAttribute('aria-live', 'assertive');
                errorAnnouncement.className = 'sr-only';
                errorAnnouncement.textContent = 'Form submission failed. Please check the highlighted fields.';
                document.body.appendChild(errorAnnouncement);
                
                setTimeout(() => {
                    contactForm.classList.remove('form-error-shake');
                    document.body.removeChild(errorAnnouncement);
                }, 600);
                
                return;
            }
            
            // Show loading state with better feedback
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            
            // Create accessible status message
            const statusAnnouncement = document.createElement('div');
            statusAnnouncement.setAttribute('aria-live', 'assertive');
            statusAnnouncement.className = 'sr-only';
            statusAnnouncement.textContent = 'Sending message, please wait...';
            document.body.appendChild(statusAnnouncement);
            
            // Simulate sending (replace with actual form submission using fetch API)
            // In a real implementation, you would use the Fetch API to submit the form data
            setTimeout(() => {
                // Update screen reader status
                statusAnnouncement.textContent = 'Message sent successfully!';
                
                // Create success message with animation
                const formContent = contactForm.innerHTML;
                const successMessage = document.createElement('div');
                successMessage.className = 'form-success';
                
                const checkIcon = document.createElement('div');
                checkIcon.className = 'success-icon';
                checkIcon.innerHTML = '<i class="fas fa-check-circle"></i>';
                
                const messageText = document.createElement('h4');
                messageText.textContent = 'Message Sent Successfully!';
                
                const messageDesc = document.createElement('p');
                messageDesc.textContent = 'Thank you for your message. I will get back to you soon.';
                
                successMessage.appendChild(checkIcon);
                successMessage.appendChild(messageText);
                successMessage.appendChild(messageDesc);
                
                // Replace form with success message
                contactForm.innerHTML = '';
                contactForm.appendChild(successMessage);
                
                // Animate success message
                setTimeout(() => {
                    successMessage.classList.add('show');
                }, 10);
                
                // Option to send another message
                setTimeout(() => {
                    const sendAnother = document.createElement('button');
                    sendAnother.className = 'btn btn-secondary send-another';
                    sendAnother.textContent = 'Send Another Message';
                    successMessage.appendChild(sendAnother);
                    
                    // Remove announcement after it's been read
                    document.body.removeChild(statusAnnouncement);
                    
                    // Focus the button for accessibility
                    sendAnother.focus();
                    
                    sendAnother.addEventListener('click', function() {
                        // Restore the original form
                        contactForm.innerHTML = formContent;
                        formSubmitted = false;
                        
                        // Focus first field
                        const firstInput = contactForm.querySelector('input, textarea');
                        if (firstInput) {
                            firstInput.focus();
                        }
                        
                        // Reattach event listeners by triggering custom event
                        document.dispatchEvent(new CustomEvent('formReset'));
                    });
                }, 2000);
            }, 1500);
        });
        
        // Reset form handler for when "Send Another" is clicked
        document.addEventListener('formReset', function() {
            const contactForm = document.getElementById('contactForm');
            if (contactForm) {
                // Reattach event listeners to the new form elements
                const formInputs = contactForm.querySelectorAll('input, textarea');
                formInputs.forEach(input => {
                    // Create validation message element if needed
                    let validationMessage = input.parentNode.querySelector('.validation-message');
                    if (!validationMessage) {
                        validationMessage = document.createElement('div');
                        validationMessage.className = 'validation-message';
                        input.parentNode.appendChild(validationMessage);
                    }
                    
                    input.addEventListener('blur', function() {
                        validateInput(this);
                    });
                    
                    input.addEventListener('input', function() {
                        this.classList.remove('input-error');
                        validationMessage.textContent = '';
                        validationMessage.style.opacity = '0';
                    });
                });
                
                // Reattach form submission handler
                contactForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    // Full submission logic would be reattached here
                });
            }
        });
    }
    
    // Enhanced Smooth scrolling for anchor links with optimized performance
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Get current scroll position
                    const startPosition = window.scrollY || window.pageYOffset;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 80;
                    const distance = targetPosition - startPosition;
                    const duration = 800; // ms
                    const startTime = performance.now();
                    
                    // Optimized easing function: easeInOutCubic
                    function easeInOutCubic(t) {
                        return t < 0.5
                            ? 4 * t * t * t
                            : 1 - Math.pow(-2 * t + 2, 3) / 2;
                    }
                    
                    // Animation function with requestAnimationFrame
                    function scroll(timestamp) {
                        const elapsed = timestamp - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const eased = easeInOutCubic(progress);
                        
                        window.scrollTo(0, startPosition + distance * eased);
                        
                        if (elapsed < duration) {
                            requestAnimationFrame(scroll);
                        } else {
                            // Set focus to the target element for accessibility
                            targetElement.setAttribute('tabindex', '-1');
                            targetElement.focus({ preventScroll: true });
                            
                            // Announce navigation to screen readers
                            const sectionTitle = targetElement.querySelector('h2')?.textContent || targetId.substring(1);
                            const liveRegion = document.createElement('div');
                            liveRegion.setAttribute('aria-live', 'polite');
                            liveRegion.setAttribute('class', 'sr-only');
                            liveRegion.textContent = `Navigated to ${sectionTitle} section`;
                            document.body.appendChild(liveRegion);
                            
                            // Remove announcement after it's been read
                            setTimeout(() => {
                                document.body.removeChild(liveRegion);
                                targetElement.removeAttribute('tabindex');
                            }, 1000);
                        }
                    }
                    
                    requestAnimationFrame(scroll);
                }
            }
        });
    });
    
    // Enhanced Navigation Highlighting with optimized performance
    function highlightNavigation() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 120; // Offset for better detection
        
        // Find the current section with enhanced detection
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = sectionId;
            }
        });
        
        // Highlight the corresponding nav link with smoother transition
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href').substring(1); // Remove #
            
            if (linkHref === currentSectionId) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'true');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }
    
    // Run on scroll with debounced handler for better performance
    window.addEventListener('scroll', debouncedScrollHandler(highlightNavigation));
    
    // Run on page load and resize
    highlightNavigation();
    window.addEventListener('resize', debouncedResizeHandler(highlightNavigation));
    
    // Enhanced Skills category expansion toggle with improved animations
    const skillHeaders = document.querySelectorAll('.skill-header');
    
    if (skillHeaders.length) {
        skillHeaders.forEach((header, index) => {
            header.addEventListener('click', function() {
                const category = this.closest('.skill-category');
                const content = category.querySelector('.skill-content');
                const expandBtn = this.querySelector('.skill-expand-btn i');
                
                // Get all other open categories to close them
                const openCategories = document.querySelectorAll('.skill-category.expanded');
                
                // Toggle expanded class
                const wasExpanded = category.classList.contains('expanded');
                
                // Close all other categories first
                openCategories.forEach(openCat => {
                    if (openCat !== category) {
                        const openContent = openCat.querySelector('.skill-content');
                        const openBtn = openCat.querySelector('.skill-expand-btn i');
                        
                        openCat.classList.remove('expanded');
                        openContent.style.maxHeight = '0';
                        openBtn.style.transform = 'rotate(0deg)';
                        
                        // Update ARIA attributes
                        openCat.querySelector('.skill-header').setAttribute('aria-expanded', 'false');
                    }
                });
                
                // Toggle current category
                category.classList.toggle('expanded');
                
                // Update ARIA attributes
                this.setAttribute('aria-expanded', !wasExpanded);
                
                // Animate icon rotation with improved transition
                expandBtn.style.transition = 'transform 0.3s ease';
                if (!wasExpanded) {
                    expandBtn.style.transform = 'rotate(180deg)';
                } else {
                    expandBtn.style.transform = 'rotate(0deg)';
                }
                
                // Set max-height based on content with smooth transition
                content.style.transition = 'max-height 0.5s ease';
                if (!wasExpanded) {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    
                    // Start progress bar animations
                    startProgressBarAnimations(category);
                    
                    // Announce to screen readers
                    const sectionTitle = category.querySelector('h3').textContent;
                    const liveRegion = document.createElement('div');
                    liveRegion.setAttribute('aria-live', 'polite');
                    liveRegion.setAttribute('class', 'sr-only');
                    liveRegion.textContent = `${sectionTitle} section expanded`;
                    document.body.appendChild(liveRegion);
                    
                    // Remove announcement after it's been read
                    setTimeout(() => {
                        document.body.removeChild(liveRegion);
                    }, 1000);
                } else {
                    content.style.maxHeight = '0';
                }
            });
            
            // Add keyboard support for skill headers
            header.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
            
            // Set initial ARIA attributes
            header.setAttribute('role', 'button');
            header.setAttribute('tabindex', '0');
            header.setAttribute('aria-expanded', index === 0 ? 'true' : 'false');
            
            // Keep first one open by default and close others
            const category = header.closest('.skill-category');
            const content = category.querySelector('.skill-content');
            const expandBtn = header.querySelector('.skill-expand-btn i');
            
            if (index === 0) {
                category.classList.add('expanded');
                expandBtn.style.transform = 'rotate(180deg)';
                content.style.maxHeight = content.scrollHeight + 'px';
                
                // Start progress bar animations for the first category
                startProgressBarAnimations(category);
            } else {
                content.style.maxHeight = '0';
            }
        });
        
        // Function to start progress bar animations for a category
        function startProgressBarAnimations(category) {
            const progressBars = category.querySelectorAll('.skill-progress-fill');
            
            progressBars.forEach(bar => {
                const percentEl = bar.closest('.skill-bar').querySelector('.percent');
                const percent = percentEl.textContent;
                
                // Reset animation
                bar.style.animation = 'none';
                bar.offsetHeight; // Trigger reflow
                
                // Set custom property and start animation
                bar.style.setProperty('--width', percent);
                bar.style.animation = 'fillProgress 1.5s ease forwards';
            });
        }
    }
    
    // Skills Chart using Chart.js with optimized rendering
    const skillsChart = document.getElementById('skillsChart');
    
    if (skillsChart && typeof Chart !== 'undefined') {
        // Wait for chart to be visible before initializing for better performance
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    initializeChart();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(skillsChart);
        
        function initializeChart() {
            // Create radar chart for skills overview
            const ctx = skillsChart.getContext('2d');
            
            // Get theme colors from CSS variables for consistency
            const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();
            const textDarkColor = getComputedStyle(document.documentElement).getPropertyValue('--text-dark').trim();
            const textGrayColor = getComputedStyle(document.documentElement).getPropertyValue('--text-gray').trim();
            
            // Create chart with optimized configuration
            const chart = new Chart(ctx, {
                type: 'radar',
                data: {
                    labels: [
                        'Hardware Design',
                        'Firmware Development',
                        'IoT & Communication',
                        'PCB Design',
                        'System Integration',
                        'Software Development'
                    ],
                    datasets: [{
                        label: 'Skill Level',
                        data: [90, 85, 88, 92, 86, 80],
                        backgroundColor: `${primaryColor}33`, // Using hex with alpha
                        borderColor: primaryColor,
                        pointBackgroundColor: primaryColor,
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: primaryColor
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        r: {
                            angleLines: {
                                color: 'rgba(100, 116, 139, 0.2)'
                            },
                            grid: {
                                color: 'rgba(100, 116, 139, 0.2)'
                            },
                            pointLabels: {
                                font: {
                                    family: "'Montserrat', sans-serif",
                                    size: 12
                                },
                                color: textDarkColor
                            },
                            ticks: {
                                backdropColor: 'transparent',
                                color: textGrayColor
                            },
                            min: 0,
                            max: 100,
                            beginAtZero: true
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return context.parsed.r + '%';
                                }
                            }
                        }
                    },
                    animation: {
                        duration: 1500, // Slow initial animation for better effect
                        easing: 'easeOutQuart'
                    }
                }
            });
            
            // Update chart on theme change
            if (themeToggle) {
                themeToggle.addEventListener('change', function() {
                    setTimeout(() => {
                        // Get updated theme colors
                        const updatedTextDark = getComputedStyle(document.documentElement).getPropertyValue('--text-dark').trim();
                        const updatedTextGray = getComputedStyle(document.documentElement).getPropertyValue('--text-gray').trim();
                        
                        // Update chart colors
                        chart.options.scales.r.pointLabels.color = updatedTextDark;
                        chart.options.scales.r.ticks.color = updatedTextGray;
                        chart.update();
                    }, 800);
                });
            }
        }
    }
    
    // Enhanced Intersection Observer for element animations with better performance
    const animateOnScroll = () => {
        const elements = document.querySelectorAll(
            '.skill-category, .project-card, .timeline-item, .about-image, .about-text, .skills-summary'
        );
        
        // Check if Intersection Observer is supported
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Add animate class with staggered delay based on position
                        const index = Array.from(elements).indexOf(entry.target);
                        entry.target.style.transitionDelay = `${Math.min(index * 0.1, 0.5)}s`;
                        entry.target.classList.add('animate');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.15,
                rootMargin: '0px 0px -100px 0px'
            });
            
            elements.forEach(element => {
                observer.observe(element);
            });
        } else {
            // Fallback for browsers that don't support Intersection Observer
            elements.forEach(element => {
                element.classList.add('animate');
            });
        }
    };
    
    // Initialize scroll animations
    animateOnScroll();
    
    // Enhanced accessibility focus styles
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .skill-header');
    
    interactiveElements.forEach(element => {
        // Add tabindex to elements that need it
        if (element.classList.contains('skill-header') && !element.hasAttribute('tabindex')) {
            element.setAttribute('tabindex', '0');
        }
        
        // Keyboard focus handling
        element.addEventListener('focus', function(e) {
            // Only add keyboard focus if it wasn't triggered by mouse
            if (window.mouseDown !== true) {
                this.classList.add('keyboard-focus');
            }
        });
        
        element.addEventListener('blur', function() {
            this.classList.remove('keyboard-focus');
        });
    });
    
    // Track if mouse is being used
    document.addEventListener('mousedown', function() {
        window.mouseDown = true;
    });
    
    document.addEventListener('keydown', function() {
        window.mouseDown = false;
    });
    
    document.addEventListener('mouseup', function() {
        window.mouseDown = false;
    });
    
    // Screen reader only elements for better accessibility
    const srOnly = document.createElement('style');
    srOnly.textContent = `
        .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border-width: 0;
        }
    `;
    document.head.appendChild(srOnly);
});



    // Mobile Menu Toggle with animation
    const mobileMenu = document.getElementById('mobile-menu');
    const navbar = document.getElementById('navbar');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            this.classList.toggle('active');
            
            // Animate the hamburger to an X
            const bars = this.querySelectorAll('.bar');
            if (this.classList.contains('active')) {
                bars[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
            } else {
                bars[0].style.transform = 'rotate(0) translate(0, 0)';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'rotate(0) translate(0, 0)';
            }
            
            navbar.querySelector('ul').classList.toggle('show');
        });
    }
    
    // Close mobile menu when a link is clicked with smooth animation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                navbar.querySelector('ul').classList.remove('show');
                mobileMenu.classList.remove('active');
                
                // Reset hamburger animation
                const bars = mobileMenu.querySelectorAll('.bar');
                bars[0].style.transform = 'rotate(0) translate(0, 0)';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'rotate(0) translate(0, 0)';
            }
        });
    });
    
    // Enhanced Scroll to top button with smooth reveal
    const scrollToTopButton = document.getElementById('scroll-to-top');
    
    if (scrollToTopButton) {
        // Show/hide scroll to top button based on scroll position with smooth transition
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopButton.style.opacity = '1';
                scrollToTopButton.style.visibility = 'visible';
                scrollToTopButton.style.transform = 'translateY(0)';
            } else {
                scrollToTopButton.style.opacity = '0';
                scrollToTopButton.style.visibility = 'hidden';
                scrollToTopButton.style.transform = 'translateY(20px)';
            }
        });
        
        // Smooth scroll to top with easing
        scrollToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get current scroll position
            const startPosition = window.pageYOffset;
            const duration = 600; // ms
            const startTime = performance.now();
            
            // Easing function: easeOutCubic
            function easeOutCubic(t) {
                return 1 - Math.pow(1 - t, 3);
            }
            
            // Animation function
            function scrollToTop(timestamp) {
                const elapsed = timestamp - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = easeOutCubic(progress);
                
                window.scrollTo(0, startPosition * (1 - eased));
                
                if (elapsed < duration) {
                    requestAnimationFrame(scrollToTop);
                }
            }
            
            requestAnimationFrame(scrollToTop);
        });
    }
    
    // Enhanced Project filtering with smooth transitions
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length && projectCards.length) {
        // Set initial index for staggered animation
        projectCards.forEach((card, index) => {
            card.style.setProperty('--index', index);
        });
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                let visibleCount = 0;
                
                // First, handle visibility and opacity transitions
                projectCards.forEach(card => {
                    // Reset animation properties
                    card.style.animation = 'none';
                    card.offsetHeight; // Trigger reflow
                    
                    if (filterValue === 'all' || card.getAttribute('data-category').includes(filterValue)) {
                        // Make visible with delay based on index
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(50px)';
                        card.style.display = 'block';
                        
                        // Set staggered animation delay
                        setTimeout(() => {
                            card.style.animation = `fadeInUp 0.6s ease forwards`;
                            card.style.animationDelay = `${visibleCount * 0.1}s`;
                            visibleCount++;
                        }, 50);
                    } else {
                        // Fade out smoothly then hide
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // Enhanced Project Details Modal with animations
    const detailsLinks = document.querySelectorAll('.details-link');
    
    if (detailsLinks.length) {
        detailsLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetModal = document.querySelector(targetId);
                
                if (targetModal) {
                    // Show modal with fade-in
                    targetModal.style.display = 'block';
                    setTimeout(() => {
                        targetModal.classList.add('visible');
                    }, 10);
                    
                    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
                }
            });
        });
        
        // Close details modal with animation
        const closeButtons = document.querySelectorAll('.close-details');
        closeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const modal = this.closest('.project-details');
                modal.classList.remove('visible');
                
                // Wait for animation to complete before hiding
                setTimeout(() => {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto'; // Re-enable scrolling
                }, 300);
            });
        });
        
        // Close modal when clicking outside of the content with animation
        const modals = document.querySelectorAll('.project-details');
        modals.forEach(modal => {
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    this.classList.remove('visible');
                    
                    // Wait for animation to complete before hiding
                    setTimeout(() => {
                        this.style.display = 'none';
                        document.body.style.overflow = 'auto';
                    }, 300);
                }
            });
        });
    }
    
    // Enhanced Testimonials Carousel with smoother transitions
    const testimonials = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    const prevButton = document.getElementById('prev-testimonial');
    const nextButton = document.getElementById('next-testimonial');
    
    if (testimonials.length && dots.length) {
        let currentIndex = 0;
        let isAnimating = false;
        
        function showTestimonial(index, direction = 'next') {
            if (isAnimating) return;
            isAnimating = true;
            
            // Get current and next testimonial
            const currentTestimonial = testimonials[currentIndex];
            const nextTestimonial = testimonials[index];
            
            // Set initial state for animation
            if (direction === 'next') {
                nextTestimonial.style.transform = 'translateX(100%)';
            } else {
                nextTestimonial.style.transform = 'translateX(-100%)';
            }
            nextTestimonial.style.opacity = '0';
            nextTestimonial.style.display = 'block';
            
            // Remove active class from all dots
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Trigger reflow
            nextTestimonial.offsetHeight;
            
            // Animate current testimonial out
            currentTestimonial.style.transition = 'transform 0.6s ease, opacity 0.6s ease';
            if (direction === 'next') {
                currentTestimonial.style.transform = 'translateX(-100%)';
            } else {
                currentTestimonial.style.transform = 'translateX(100%)';
            }
            currentTestimonial.style.opacity = '0';
            
            // Animate next testimonial in
            nextTestimonial.style.transition = 'transform 0.6s ease, opacity 0.6s ease';
            nextTestimonial.style.transform = 'translateX(0)';
            nextTestimonial.style.opacity = '1';
            
            // After animation completes
            setTimeout(() => {
                // Hide all except active
                testimonials.forEach(item => {
                    if (item !== nextTestimonial) {
                        item.style.display = 'none';
                    }
                    item.style.transition = '';
                });
                
                // Update current index and dot
                currentIndex = index;
                dots[currentIndex].classList.add('active');
                isAnimating = false;
            }, 600);
        }
        
        // Initialize first testimonial
        testimonials.forEach((item, i) => {
            if (i !== 0) {
                item.style.display = 'none';
            }
        });
        dots[0].classList.add('active');
        
        // Next testimonial with direction
        if (nextButton) {
            nextButton.addEventListener('click', function() {
                const nextIndex = (currentIndex + 1) % testimonials.length;
                showTestimonial(nextIndex, 'next');
            });
        }
        
        // Previous testimonial with direction
        if (prevButton) {
            prevButton.addEventListener('click', function() {
                const prevIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
                showTestimonial(prevIndex, 'prev');
            });
        }
        
        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                if (index > currentIndex) {
                    showTestimonial(index, 'next');
                } else if (index < currentIndex) {
                    showTestimonial(index, 'prev');
                }
            });
        });
        
        // Auto rotate testimonials with pause on hover
        let carouselInterval = setInterval(function() {
            const nextIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(nextIndex, 'next');
        }, 8000);
        
        // Pause auto-rotation on hover
        const testimonialsSection = document.getElementById('testimonials');
        if (testimonialsSection) {
            testimonialsSection.addEventListener('mouseenter', function() {
                clearInterval(carouselInterval);
            });
            
            testimonialsSection.addEventListener('mouseleave', function() {
                carouselInterval = setInterval(function() {
                    const nextIndex = (currentIndex + 1) % testimonials.length;
                    showTestimonial(nextIndex, 'next');
                }, 8000);
            });
        }
    }
    
    // Dark/Light Theme Toggle with enhanced animation
    const themeToggle = document.getElementById('checkbox');
    
    if (themeToggle) {
        // Check for saved theme preference or respect OS preference
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        const currentTheme = localStorage.getItem('theme');
        
        // Function to apply theme with transition
        function applyTheme(isDark) {
            // First add a class for transition
            document.body.classList.add('theme-transition');
            
            // Apply the theme after a tiny delay to ensure the transition class is applied
            setTimeout(() => {
                if (isDark) {
                    document.body.classList.add('dark-theme');
                    themeToggle.checked = true;
                } else {
                    document.body.classList.remove('dark-theme');
                    themeToggle.checked = false;
                }
                
                // Remove the transition class after animations complete
                setTimeout(() => {
                    document.body.classList.remove('theme-transition');
                }, 800);
            }, 10);
        }
        
        // If a theme preference is set, apply it
        if (currentTheme === 'dark') {
            applyTheme(true);
        } else if (currentTheme === 'light') {
            applyTheme(false);
        } else if (prefersDarkScheme.matches) {
            // If no preference is set but OS prefers dark mode
            applyTheme(true);
        }
        
        // Listen for theme toggle changes with smooth transition
        themeToggle.addEventListener('change', function() {
            if (this.checked) {
                applyTheme(true);
                localStorage.setItem('theme', 'dark');
            } else {
                applyTheme(false);
                localStorage.setItem('theme', 'light');
            }
        });
    }
    
    // Enhanced Contact Form Validation and Submission with feedback
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        const formInputs = contactForm.querySelectorAll('input, textarea');
        
        // Real-time validation feedback
        formInputs.forEach(input => {
            // Create validation message element
            const validationMessage = document.createElement('div');
            validationMessage.className = 'validation-message';
            input.parentNode.appendChild(validationMessage);
            
            input.addEventListener('blur', function() {
                validateInput(this);
            });
            
            input.addEventListener('input', function() {
                // Remove error styles when typing
                this.classList.remove('input-error');
                validationMessage.textContent = '';
                validationMessage.style.opacity = '0';
            });
        });
        
        function validateInput(input) {
            const validationMessage = input.parentNode.querySelector('.validation-message');
            
            // Reset validation state
            input.classList.remove('input-error');
            validationMessage.textContent = '';
            validationMessage.style.opacity = '0';
            
            // Check if empty
            if (!input.value.trim()) {
                input.classList.add('input-error');
                validationMessage.textContent = 'This field is required';
                validationMessage.style.opacity = '1';
                return false;
            }
            
            // Email validation
            if (input.type === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value)) {
                    input.classList.add('input-error');
                    validationMessage.textContent = 'Please enter a valid email address';
                    validationMessage.style.opacity = '1';
                    return false;
                }
            }
            
            return true;
        }
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate all inputs
            let isValid = true;
            formInputs.forEach(input => {
                if (!validateInput(input)) {
                    isValid = false;
                }
            });
            
            if (!isValid) {
                // Shake the form to indicate error
                contactForm.classList.add('form-error-shake');
                setTimeout(() => {
                    contactForm.classList.remove('form-error-shake');
                }, 600);
                return;
            }
            
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            
            // Simulate sending (replace with actual form submission)
            setTimeout(() => {
                // Create success message with animation
                const formContent = contactForm.innerHTML;
                const successMessage = document.createElement('div');
                successMessage.className = 'form-success';
                
                const checkIcon = document.createElement('div');
                checkIcon.className = 'success-icon';
                checkIcon.innerHTML = '<i class="fas fa-check-circle"></i>';
                
                const messageText = document.createElement('h4');
                messageText.textContent = 'Message Sent Successfully!';
                
                const messageDesc = document.createElement('p');
                messageDesc.textContent = 'Thank you for your message. I will get back to you soon.';
                
                successMessage.appendChild(checkIcon);
                successMessage.appendChild(messageText);
                successMessage.appendChild(messageDesc);
                
                // Replace form with success message
                contactForm.innerHTML = '';
                contactForm.appendChild(successMessage);
                
                // Animate success message
                setTimeout(() => {
                    successMessage.classList.add('show');
                }, 10);
                
                // Option to send another message
                setTimeout(() => {
                    const sendAnother = document.createElement('button');
                    sendAnother.className = 'btn btn-secondary send-another';
                    sendAnother.textContent = 'Send Another Message';
                    successMessage.appendChild(sendAnother);
                    
                    sendAnother.addEventListener('click', function() {
                        contactForm.innerHTML = formContent;
                        // Reattach event listeners
                        document.dispatchEvent(new CustomEvent('formReset'));
                    });
                }, 2000);
            }, 1500);
        });
        
        // Reset form handler
        document.addEventListener('formReset', function() {
            const contactForm = document.getElementById('contactForm');
            if (contactForm) {
                // Reattach event listeners to the new form elements
                const formInputs = contactForm.querySelectorAll('input, textarea');
                formInputs.forEach(input => {
                    const validationMessage = document.createElement('div');
                    validationMessage.className = 'validation-message';
                    input.parentNode.appendChild(validationMessage);
                    
                    input.addEventListener('blur', function() {
                        validateInput(this);
                    });
                    
                    input.addEventListener('input', function() {
                        this.classList.remove('input-error');
                        validationMessage.textContent = '';
                        validationMessage.style.opacity = '0';
                    });
                });
                
                contactForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    // Validation logic here
                });
            }
        });
    }
    
    // Smooth scrolling for anchor links with enhanced easing
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Get current scroll position
                    const startPosition = window.pageYOffset;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 80;
                    const distance = targetPosition - startPosition;
                    const duration = 800; // ms
                    const startTime = performance.now();
                    
                    // Easing function: easeInOutCubic
                    function easeInOutCubic(t) {
                        return t < 0.5
                            ? 4 * t * t * t
                            : 1 - Math.pow(-2 * t + 2, 3) / 2;
                    }
                    
                    // Animation function
                    function scroll(timestamp) {
                        const elapsed = timestamp - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const eased = easeInOutCubic(progress);
                        
                        window.scrollTo(0, startPosition + distance * eased);
                        
                        if (elapsed < duration) {
                            requestAnimationFrame(scroll);
                        }
                    }
                    
                    requestAnimationFrame(scroll);
                }
            }
        });
    });
    
    // Enhanced Navigation Highlighting with smoother transitions
    function highlightNavigation() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 100; // Offset for better detection
        
        // Find the current section with enhanced detection
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = sectionId;
            }
        });
        
        // Highlight the corresponding nav link with smooth transition
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href').substring(1); // Remove #
            
            if (linkHref === currentSectionId) {
                link.classList.add('active');
            }
        });
    }
    
    // Run on scroll and on page load
    window.addEventListener('scroll', highlightNavigation);
    highlightNavigation();
    
    // Skills category expansion toggle
    const skillHeaders = document.querySelectorAll('.skill-header');
    
    if (skillHeaders.length) {
        skillHeaders.forEach((header, index) => {
            header.addEventListener('click', function() {
                const category = this.closest('.skill-category');
                const content = category.querySelector('.skill-content');
                const expandBtn = this.querySelector('.skill-expand-btn i');
                
                // Toggle expanded class
                category.classList.toggle('expanded');
                
                // Animate icon rotation
                if (category.classList.contains('expanded')) {
                    expandBtn.style.transform = 'rotate(180deg)';
                } else {
                    expandBtn.style.transform = 'rotate(0deg)';
                }
                
                // Set max-height based on content
                if (category.classList.contains('expanded')) {
                    content.style.maxHeight = content.scrollHeight + 'px';
                } else {
                    content.style.maxHeight = '0';
                }
            });
            
            // Keep first one open by default and close others
            if (index === 0) {
                const category = header.closest('.skill-category');
                const content = category.querySelector('.skill-content');
                const expandBtn = header.querySelector('.skill-expand-btn i');
                
                category.classList.add('expanded');
                expandBtn.style.transform = 'rotate(180deg)';
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    }
    
    // Animate skill progress bars when visible
    const skillCategories = document.querySelectorAll('.skill-category');
    
    if (skillCategories.length) {
        const animateSkills = () => {
            skillCategories.forEach(category => {
                const rect = category.getBoundingClientRect();
                const isVisible = (
                    rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
                    rect.bottom >= 0
                );
                
                if (isVisible) {
                    category.classList.add('animate');
                    
                    // Set width custom property for each progress bar
                    const progressBars = category.querySelectorAll('.skill-progress-fill');
                    progressBars.forEach(bar => {
                        const percent = bar.closest('.skill-bar').querySelector('.percent').textContent;
                        bar.style.setProperty('--width', percent);
                    });
                }
            });
        };
        
        // Run on scroll and on initial load
        window.addEventListener('scroll', animateSkills);
        animateSkills();
    }
    
    // Skills Chart using Chart.js
    const skillsChart = document.getElementById('skillsChart');
    
    if (skillsChart) {
        // Create radar chart for skills overview
        const ctx = skillsChart.getContext('2d');
        
        const chart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: [
                    'Hardware Design',
                    'Firmware Development',
                    'IoT & Communication',
                    'PCB Design',
                    'System Integration',
                    'Software Development'
                ],
                datasets: [{
                    label: 'Skill Level',
                    data: [90, 85, 88, 92, 86, 80],
                    backgroundColor: 'rgba(38, 99, 235, 0.2)',
                    borderColor: 'rgba(38, 99, 235, 1)',
                    pointBackgroundColor: 'rgba(38, 99, 235, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(38, 99, 235, 1)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: {
                            color: 'rgba(100, 116, 139, 0.2)'
                        },
                        grid: {
                            color: 'rgba(100, 116, 139, 0.2)'
                        },
                        pointLabels: {
                            font: {
                                family: "'Montserrat', sans-serif",
                                size: 12
                            },
                            color: getComputedStyle(document.documentElement).getPropertyValue('--text-dark')
                        },
                        ticks: {
                            backdropColor: 'transparent',
                            color: getComputedStyle(document.documentElement).getPropertyValue('--text-gray')
                        },
                        min: 0,
                        max: 100,
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.parsed.r + '%';
                            }
                        }
                    }
                }
            }
        });
        
        // Update chart on theme change
        if (themeToggle) {
            themeToggle.addEventListener('change', function() {
                setTimeout(() => {
                    chart.options.scales.r.pointLabels.color = getComputedStyle(document.documentElement).getPropertyValue('--text-dark');
                    chart.options.scales.r.ticks.color = getComputedStyle(document.documentElement).getPropertyValue('--text-gray');
                    chart.update();
                }, 800);
            });
        }
    }
    
    // Intersection Observer for element animations
    const animateOnScroll = () => {
        const elements = document.querySelectorAll(
            '.skill-category, .project-card, .timeline-item, .about-image, .about-text, .skills-summary'
        );
        
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -100px 0px'
        });
        
        elements.forEach(element => {
            observer.observe(element);
        });
    };
    
    // Initialize scroll animations
    animateOnScroll();
    
    // Add accessibility focus styles
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .skill-header');
    
    interactiveElements.forEach(element => {
        element.addEventListener('focus', () => {
            element.classList.add('keyboard-focus');
        });
        
        element.addEventListener('blur', () => {
            element.classList.remove('keyboard-focus');
        });
        
        element.addEventListener('mousedown', () => {
            element.classList.remove('keyboard-focus');
        });
    });