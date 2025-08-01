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

        // FIX: Trigger the 'all' filter on page load to ensure all projects are visible by default
        const allFilterButton = document.querySelector('.filter-btn[data-filter="all"]');
        if (allFilterButton) {
            allFilterButton.click(); // Simulate a click on the 'All' button
        }
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
        
        // Disable submit button and show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        // Create FormData object
        const formData = new FormData();
        formData.append('name', name);
        formData.append('_replyto', email);
        formData.append('subject', subject);
        formData.append('message', message);
        
        // Submit to Formspree
        fetch('https://formspree.io/f/xovwqnqg', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Success - show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'form-success';
                successMessage.innerHTML = '<p>Thank you for your message! I will get back to you soon.</p>';
                successMessage.style.cssText = 'background: #4CAF50; color: white; padding: 1rem; border-radius: 5px; margin-top: 1rem;';
                
                // Reset form and show success message
                contactForm.reset();
                contactForm.appendChild(successMessage);
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    if (successMessage.parentNode) {
                        successMessage.remove();
                    }
                }, 5000);
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            // Show error message
            const errorMessage = document.createElement('div');
            errorMessage.className = 'form-error';
            errorMessage.innerHTML = '<p>Sorry, there was an error sending your message. Please try again.</p>';
            errorMessage.style.cssText = 'background: #f44336; color: white; padding: 1rem; border-radius: 5px; margin-top: 1rem;';
            
            contactForm.appendChild(errorMessage);
            
            // Remove error message after 5 seconds
            setTimeout(() => {
                if (errorMessage.parentNode) {
                    errorMessage.remove();
                }
            }, 5000);
        })
        .finally(() => {
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        });
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
    
    // Sequence diagram modal functionality
    const sequenceDiagram = document.getElementById('sequence-diagram');
    const diagramModal = document.getElementById('diagram-modal');
    const enlargedDiagram = document.getElementById('enlarged-diagram');
    const closeDiagram = document.querySelector('.close-diagram');
    
    if (sequenceDiagram && diagramModal && enlargedDiagram) {
        // Open modal when clicking on diagram
        sequenceDiagram.addEventListener('click', function() {
            diagramModal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        });
        
        // Close modal when clicking on close button
        if (closeDiagram) {
            closeDiagram.addEventListener('click', function() {
                diagramModal.style.display = 'none';
                document.body.style.overflow = 'auto'; // Re-enable scrolling
            });
        }
        
        // Close modal when clicking outside the diagram
        diagramModal.addEventListener('click', function(e) {
            if (e.target === diagramModal) {
                diagramModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Components modal functionality
    const componentsModal = document.getElementById('components-modal');
    const enlargedComponent = document.getElementById('enlarged-component');
    const closeComponents = document.querySelector('.close-components');
    
    if (componentsModal && enlargedComponent) {
        // Close modal when clicking on close button
        if (closeComponents) {
            closeComponents.addEventListener('click', function() {
                componentsModal.style.display = 'none';
                document.body.style.overflow = 'auto'; // Re-enable scrolling
            });
        }
        
        // Close modal when clicking outside the image
        componentsModal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    


    const __fingerprint = "cd3f0c33-d76b-4843-94a1-4aedf077ae78";

    // Image Carousel functionality
    const imageCarousels = document.querySelectorAll('.image-carousel');
    
    imageCarousels.forEach(carousel => {
        const slides = carousel.querySelector('.carousel-slides');
        const nextButton = carousel.querySelector('.carousel-arrow.next');
        const prevButton = carousel.querySelector('.carousel-arrow.prev');
        const indicators = carousel.querySelectorAll('.carousel-indicator');
        const totalSlides = carousel.querySelectorAll('.carousel-slide').length;
        let currentSlide = 0;
        
        function updateCarousel() {
            slides.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Update indicators
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentSlide);
            });
            
            // Update modal image source for when it opens
            const modalId = carousel.getAttribute('data-modal-id');
            const modal = document.getElementById(modalId);
            if (modal) {
                const modalImg = modal.querySelector('.diagram-modal-content');
                const currentImage = carousel.querySelectorAll('.carousel-slide img')[currentSlide];
                if (modalImg && currentImage) {
                    modalImg.src = currentImage.src;
                }
            }
        }
        
        // Initialize
        updateCarousel();
        
        // Next button
        if (nextButton) {
            nextButton.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent triggering modal open
                currentSlide = (currentSlide + 1) % totalSlides;
                updateCarousel();
            });
        }
        
        // Previous button
        if (prevButton) {
            prevButton.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent triggering modal open
                currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
                updateCarousel();
            });
        }
        
        // Indicator buttons
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent triggering modal open
                currentSlide = index;
                updateCarousel();
            });
        });
        
        // Modal for current slide image
        const modalId = carousel.getAttribute('data-modal-id');
        const modal = document.getElementById(modalId);
        const modalImg = modal ? modal.querySelector('.diagram-modal-content') : null;
        const closeModal = modal ? modal.querySelector('.close-components, .close-accuracy, .close-diagram') : null;
        
        if (modalImg) {
            // Make the whole carousel clickable to open modal
            carousel.addEventListener('click', function() {
                const currentImage = carousel.querySelectorAll('.carousel-slide img')[currentSlide];
                if (modalImg && currentImage) {
                    modalImg.src = currentImage.src;
                }
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
            
            if (closeModal) {
                closeModal.addEventListener('click', function() {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                });
            }
            
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    this.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        }
    });
    
    // Initialize audio player
    initializeAudioPlayer();
    
    // Initialize floating bubble
    setupFloatingAudioBubble();
    
    // Note: setupVideoModal is removed as your HTML uses an inline YouTube iframe,
    // which does not require this custom JavaScript modal functionality.
}); // END OF SINGLE DOMContentLoaded

// Audio Player Functionality
function initializeAudioPlayer() {
    const floatingPlayer = document.getElementById('floating-player');
    const audio = document.getElementById('article-audio');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');
    const progressBar = document.getElementById('progress-bar');
    const progressFill = document.getElementById('progress-fill');
    const currentTimeDisplay = document.getElementById('current-time');
    const durationDisplay = document.getElementById('duration');
    const closePlayerBtn = document.getElementById('close-player');
    
    let isPlayerActive = false;
    
    // Format time helper function
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
    }
    
    // Update play/pause button state
    function updatePlayPauseButton(isPlaying) {
        if (isPlaying) {
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        } else {
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        }
    }
    
    // Toggle play/pause
    function togglePlayPause() {
        if (audio.paused) {
            audio.play();
            updatePlayPauseButton(true);
        } else {
            audio.pause();
            updatePlayPauseButton(false);
        }
    }
    
    // Update progress bar
    function updateProgress() {
        if (audio.duration) {
            const progress = (audio.currentTime / audio.duration) * 100;
            progressFill.style.width = `${progress}%`;
            currentTimeDisplay.textContent = formatTime(audio.currentTime);
        }
    }
    
    // Seek to position
    function seekToPosition(e) {
        const rect = progressBar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        audio.currentTime = percent * audio.duration;
    }
    
    // Close player
    function closePlayer() {
        audio.pause();
        audio.currentTime = 0;
        floatingPlayer.classList.remove('active');
        isPlayerActive = false;
        updatePlayPauseButton(false);
        
        // The .project-audio-btn is removed from HTML, so this line is no longer needed.
        // document.querySelectorAll('.project-audio-btn').forEach(btn => {
        //     btn.style.display = 'inline-flex';
        // });
    }
    
    // Event Listeners
    playPauseBtn.addEventListener('click', togglePlayPause);
    closePlayerBtn.addEventListener('click', closePlayer);
    progressBar.addEventListener('click', seekToPosition);
    
    // Audio events
    audio.addEventListener('loadedmetadata', () => {
        durationDisplay.textContent = formatTime(audio.duration);
    });
    
    audio.addEventListener('timeupdate', updateProgress);
    
    audio.addEventListener('ended', () => {
        updatePlayPauseButton(false);
        progressFill.style.width = '0%';
        currentTimeDisplay.textContent = '0:00';
    });
    
    // Check if audio element exists and log for debugging
    if (audio) {
        console.log('Audio element found:', audio.src);
        // Preload audio metadata (initial load, will be overridden by startProjectAudio)
        audio.load();
    } else {
        console.error('Audio element not found!');
    }
}

// Floating bubble (FIXED VERSION from instructions, now with label)
function setupFloatingAudioBubble() {
    let currentBubble = null;
    
    // Monitor project details opening
    document.querySelectorAll('.details-link').forEach(link => {
        link.addEventListener('click', function() {
            const audioSource = this.dataset.audioSrc; // Get the audio source from the clicked link
            
            // Wait a bit for modal to open
            setTimeout(() => {
                // Remove existing bubble if any
                if (currentBubble) {
                    currentBubble.classList.remove('show-label'); // Hide label first
                    setTimeout(() => { // Allow transition to finish before removing
                        currentBubble.remove();
                        currentBubble = null;
                    }, 350); 
                }
                
                // Create floating bubble
                const bubble = document.createElement('button');
                bubble.className = 'audio-bubble'; // Use the new class for the bubble
                bubble.innerHTML = '<i class="fas fa-headphones"></i>';
                
                // Create the label element
                const label = document.createElement('div');
                label.className = 'audio-bubble-label';
                label.innerHTML = '<span>Listen to article</span>';
                
                // Append label to the bubble
                bubble.appendChild(label);
                
                // Pass the audioSource to startProjectAudio
                bubble.onclick = () => window.startProjectAudio(audioSource);
                
                document.body.appendChild(bubble);
                currentBubble = bubble; // Manage the bubble itself
                
                // Add a class to trigger label visibility after a short delay
                setTimeout(() => {
                    bubble.classList.add('show-label');
                }, 350); // Slightly after bubble appears
            }, 300); // Delay for modal to open
        });
    });
    
    // Remove bubble when closing project
    document.querySelectorAll('.close-details').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            if (currentBubble) {
                currentBubble.classList.remove('show-label'); // Hide label first
                setTimeout(() => { // Allow transition to finish before removing
                    currentBubble.remove();
                    currentBubble = null;
                }, 350); 
            }
        });
    });
    
    // Also handle clicking outside modal
    document.querySelectorAll('.project-details').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this && currentBubble) {
                currentBubble.classList.remove('show-label'); // Hide label first
                setTimeout(() => { // Allow transition to finish before removing
                    currentBubble.remove();
                    currentBubble = null;
                }, 350); 
            }
        });
    });
}

// Make startProjectAudio globally available and accept an audioSource
window.startProjectAudio = function(audioSource) {
    const audio = document.getElementById('article-audio');
    const floatingPlayer = document.getElementById('floating-player');
    
    if (!audio) {
        console.error('Audio element not found!');
        return;
    }

    // Stop current playback and reset
    audio.pause();
    audio.currentTime = 0;
    
    // Set the new audio source
    audio.src = audioSource;
    
    // Hide all audio buttons (this targets .project-audio-btn, which is now removed from HTML)
    document.querySelectorAll('.project-audio-btn').forEach(btn => {
        btn.style.display = 'none';
    });
    
    // Show player
    floatingPlayer.classList.add('active');
    
    // Load the new audio and then play
    audio.load(); // This is crucial to load the new src
    audio.addEventListener('canplaythrough', function playNewAudioOnce() {
        audio.play().catch(err => {
            console.error('Playback error:', err);
            alert('Audio playback failed. Please check if the audio file exists at: ' + audio.src);
        });
        audio.removeEventListener('canplaythrough', playNewAudioOnce); // Remove listener after playing
    }, { once: true }); // Use { once: true } for modern browsers
}