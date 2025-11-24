/* This file contains the interactive logic for the website.
  It runs after the HTML document is loaded because of the 'defer' attribute in the script tag.
*/

// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {

    // --- Set Current Year ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Dark Mode Logic ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

    if (themeToggleBtn && themeToggleDarkIcon && themeToggleLightIcon) {
        // Function to set the theme state
        const setTheme = (isDark) => {
            if (isDark) {
                document.documentElement.classList.add('dark');
                themeToggleLightIcon.classList.remove('hidden');
                themeToggleDarkIcon.classList.add('hidden');
                localStorage.setItem('color-theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                themeToggleLightIcon.classList.add('hidden');
                themeToggleDarkIcon.classList.remove('hidden');
                localStorage.setItem('color-theme', 'light');
            }
        };

        // Check for saved theme in localStorage or system preference
        const prefersDark = localStorage.getItem('color-theme') === 'dark' ||
            (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
        
        setTheme(prefersDark);

        // Add click listener to the toggle button
        themeToggleBtn.addEventListener('click', () => {
            const isCurrentlyDark = document.documentElement.classList.contains('dark');
            setTheme(!isCurrentlyDark);
        });
    }

    // --- Language Toggle Logic ---
    const langToggleBtn = document.getElementById('lang-toggle');

    if (langToggleBtn) {
        // Function to set the language state
        const setLanguage = (lang) => {
            if (lang === 'sw') {
                document.documentElement.classList.add('show-sw');
                document.documentElement.lang = 'sw';
                localStorage.setItem('language', 'sw');
            } else {
                document.documentElement.classList.remove('show-sw');
                document.documentElement.lang = 'en';
                localStorage.setItem('language', 'en');
            }
        };

        // Check for saved language in localStorage
        const savedLang = localStorage.getItem('language');
        if (savedLang === 'sw') {
            setLanguage('sw');
        } else {
            setLanguage('en'); // Default to English
        }

        // Add click listener to the language toggle button
        langToggleBtn.addEventListener('click', () => {
            const isSwahili = document.documentElement.classList.contains('show-sw');
            if (isSwahili) {
                setLanguage('en');
            } else {
                setLanguage('sw');
            }
        });
    }

});
/* =====================================================
  NEW SLIDER LOGIC
  This runs only if the slider exists on the page
  =====================================================
*/
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('banner-slider');
    // Only run this code if we are on a page that has the slider
    if (slider) {
        const slides = slider.querySelectorAll('.slider-item');
        const dotsContainer = document.getElementById('slider-dots-container');
        let currentSlide = 0;
        let slideInterval;

        // Exit if no slides
        if (slides.length === 0) return;

        // 1. Create Dots
        slides.forEach((slide, index) => {
            const dot = document.createElement('button');
            dot.classList.add('slider-dot');
            dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
            if (index === 0) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => {
                showSlide(index);
                resetInterval(); // Reset timer when dot is clicked
            });
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll('.slider-dot');

        // 2. Show Slide Function
        function showSlide(index) {
            // Hide all slides
            slides.forEach((slide) => {
                slide.classList.remove('active');
            });
            // Deactivate all dots
            dots.forEach((dot) => {
                dot.classList.remove('active');
            });

            // Show the new slide and dot
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            currentSlide = index;
        }

        // 3. Next Slide Function
        function nextSlide() {
            let next = currentSlide + 1;
            if (next >= slides.length) {
                next = 0; // Loop back to the first slide
            }
            showSlide(next);
        }

        // 4. Start Interval
        function startInterval() {
            // Change slide every 4 seconds (4000 milliseconds)
            slideInterval = setInterval(nextSlide, 4000);
        }

        // 5. Reset Interval
        function resetInterval() {
            clearInterval(slideInterval);
            startInterval();
        }

        // Initial setup
        showSlide(0); // Show the first slide
        startInterval(); // Start the automatic sliding
    }
});
