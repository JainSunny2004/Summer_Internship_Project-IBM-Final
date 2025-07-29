// Main JavaScript file for Movie Recommendation System

document.addEventListener('DOMContentLoaded', function() {
    console.log('Movie Recommendation System loaded');
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    setupThemeToggle();
    setupMobileMenu();
    setupNotifications();
}

function setupEventListeners() {
    // Setup rating buttons if they exist
    setupRatingButtons();
    
    // Setup search functionality
    setupSearchFunctionality();
    
    // Setup filter forms
    setupFilterForms();
    
    // Setup movie cards
    setupMovieCards();
}

function setupThemeToggle() {
    // Check for saved theme preference or default to 'light'
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Apply the saved theme on page load
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    
    // Find theme toggle button
    const themeToggle = document.querySelector('#theme-toggle');
    
    if (themeToggle) {
        // Remove any existing event listeners to prevent duplicates
        themeToggle.removeEventListener('click', handleThemeToggle);
        themeToggle.addEventListener('click', handleThemeToggle);
    } else {
        console.warn('Theme toggle button not found. Make sure your header.ejs includes the button with id="theme-toggle"');
    }
    
    // Update button state on page load
    updateThemeToggleButton(savedTheme === 'dark');
}

// Separate function for theme toggle handling to prevent memory leaks
function handleThemeToggle() {
    // Toggle dark class on html element
    document.documentElement.classList.toggle('dark');
    
    // Save preference to localStorage
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Update button text/icon
    updateThemeToggleButton(isDark);
    
    // Show notification
    showNotification(`Switched to ${isDark ? 'dark' : 'light'} mode`, 'success');
    
    console.log('Theme switched to:', isDark ? 'dark' : 'light');
}

function updateThemeToggleButton(isDark) {
    const themeToggle = document.querySelector('#theme-toggle');
    if (themeToggle) {
        // Sun icon for dark mode (to switch to light)
        const sunIcon = `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                 <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"/>
               </svg>`;
        
        // Moon icon for light mode (to switch to dark)
        const moonIcon = `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                 <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
               </svg>`;
        
        themeToggle.innerHTML = isDark ? sunIcon : moonIcon;
        themeToggle.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
        themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }
}

function setupRatingButtons() {
    const ratingContainers = document.querySelectorAll('.rating-stars');
    
    ratingContainers.forEach(container => {
        const stars = container.querySelectorAll('.rating-star');
        const movieId = container.getAttribute('data-movie-id');
        
        if (!stars.length || !movieId) return;
        
        stars.forEach((star, index) => {
            // Remove existing listeners to prevent duplicates
            star.removeEventListener('click', star._clickHandler);
            star.removeEventListener('mouseover', star._hoverHandler);
            
            // Create new handlers
            star._clickHandler = function() {
                const rating = index + 1;
                rateMovie(movieId, rating);
                updateStarDisplay(stars, rating);
                showNotification(`Rated ${rating}/10 stars!`, 'success');
            };
            
            star._hoverHandler = function() {
                updateStarDisplay(stars, index + 1);
            };
            
            // Add new listeners
            star.addEventListener('click', star._clickHandler);
            star.addEventListener('mouseover', star._hoverHandler);
        });
        
        container.addEventListener('mouseleave', function() {
            const currentRating = container.getAttribute('data-current-rating') || 0;
            updateStarDisplay(stars, currentRating);
        });
    });
}

function updateStarDisplay(stars, rating) {
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.remove('text-gray-300', 'dark:text-gray-600');
            star.classList.add('text-yellow-400');
        } else {
            star.classList.remove('text-yellow-400');
            star.classList.add('text-gray-300', 'dark:text-gray-600');
        }
    });
}

async function rateMovie(movieId, rating) {
    if (!movieId || !rating) {
        showNotification('Invalid movie ID or rating', 'error');
        return;
    }
    
    try {
        const response = await fetch('/movies/rate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                movieId: movieId,
                rating: rating
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.success) {
            const ratingContainer = document.querySelector(`[data-movie-id="${movieId}"]`);
            if (ratingContainer) {
                ratingContainer.setAttribute('data-current-rating', rating);
            }
        } else {
            showNotification(result.error || 'Error saving rating', 'error');
        }
    } catch (error) {
        console.error('Rating error:', error);
        showNotification('Error saving rating. Please try again.', 'error');
    }
}

async function addToWatchList(movieId, movieTitle) {
    if (!movieId) {
        showNotification('Invalid movie ID', 'error');
        return;
    }
    
    try {
        const response = await fetch('/movies/watch', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                movieId: movieId,
                title: movieTitle || 'Unknown Title'
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.success) {
            showNotification('Added to watchlist!', 'success');
            
            // Update button state if it exists
            const watchButton = document.querySelector(`[data-movie-id="${movieId}"] .watch-button`);
            if (watchButton) {
                watchButton.textContent = 'In Watchlist';
                watchButton.disabled = true;
                watchButton.classList.add('opacity-50');
            }
        } else {
            showNotification(result.error || 'Error adding to watchlist', 'error');
        }
    } catch (error) {
        console.error('Watchlist error:', error);
        showNotification('Error adding to watchlist. Please try again.', 'error');
    }
}

function setupSearchFunctionality() {
    const searchForm = document.querySelector('form[action="/movies"]');
    const searchInput = document.querySelector('input[name="search"]');
    
    if (searchInput) {
        let searchTimeout;
        
        // Debounced search input
        searchInput.addEventListener('input', debounce(function() {
            const query = this.value.trim();
            if (query.length >= 2) {
                console.log('Search query:', query);
                // Could implement live search suggestions here
            }
        }, 300));
        
        // Clear search button
        const clearButton = document.createElement('button');
        clearButton.type = 'button';
        clearButton.className = 'absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600';
        clearButton.innerHTML = '×';
        clearButton.style.display = 'none';
        
        searchInput.parentNode.style.position = 'relative';
        searchInput.parentNode.appendChild(clearButton);
        
        searchInput.addEventListener('input', function() {
            clearButton.style.display = this.value ? 'block' : 'none';
        });
        
        clearButton.addEventListener('click', function() {
            searchInput.value = '';
            searchInput.focus();
            this.style.display = 'none';
        });
    }
}

function setupFilterForms() {
    const filterForms = document.querySelectorAll('form');
    
    filterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const submitButton = form.querySelector('button[type="submit"]');
            if (submitButton && !submitButton.disabled) {
                const originalText = submitButton.textContent;
                const originalHTML = submitButton.innerHTML;
                
                // Add loading state
                submitButton.innerHTML = `
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>Loading...
                `;
                submitButton.disabled = true;
                
                // Re-enable after timeout (fallback)
                setTimeout(() => {
                    if (submitButton.disabled) {
                        submitButton.innerHTML = originalHTML;
                        submitButton.disabled = false;
                    }
                }, 5000);
            }
        });
    });
}

function setupMovieCards() {
    const movieCards = document.querySelectorAll('.movie-card');
    
    if (movieCards.length === 0) return;
    
    // Add intersection observer for lazy loading
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });
        
        movieCards.forEach(card => {
            observer.observe(card);
        });
    } else {
        // Fallback for older browsers
        movieCards.forEach(card => {
            card.classList.add('animate-fade-in');
        });
    }
}

function setupMobileMenu() {
    const mobileMenuButton = document.querySelector('[data-collapse-toggle]');
    const mobileMenu = document.querySelector('#navbar-default');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function(e) {
            e.preventDefault();
            mobileMenu.classList.toggle('hidden');
            
            // Update aria-expanded attribute
            const isExpanded = !mobileMenu.classList.contains('hidden');
            mobileMenuButton.setAttribute('aria-expanded', isExpanded);
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    mobileMenuButton.setAttribute('aria-expanded', 'false');
                }
            }
        });
    }
}

function setupNotifications() {
    // Remove existing notifications after their timeout
    const notifications = document.querySelectorAll('.notification');
    notifications.forEach(notification => {
        if (!notification.dataset.timeout) {
            notification.dataset.timeout = 'true';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.classList.add('translate-x-full', 'opacity-0');
                    setTimeout(() => {
                        if (notification.parentNode) {
                            notification.remove();
                        }
                    }, 300);
                }
            }, 5000);
        }
    });
}

function showNotification(message, type = 'info') {
    // Remove existing notifications of the same type to prevent spam
    const existingNotifications = document.querySelectorAll(`.notification.${type}`);
    existingNotifications.forEach(notification => {
        if (notification.parentNode) {
            notification.remove();
        }
    });
    
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform transition-all duration-300 notification ${type} ${
        type === 'success' 
            ? 'bg-green-500 text-white' 
            : type === 'error'
            ? 'bg-red-500 text-white'
            : 'bg-blue-500 text-white'
    }`;
    
    // Add icon based on type
    const icon = type === 'success' 
        ? '<svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>'
        : type === 'error'
        ? '<svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>'
        : '<svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/></svg>';
    
    notification.innerHTML = `
        <div class="flex items-center">
            ${icon}
            <span class="flex-1">${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-white hover:text-gray-200 focus:outline-none">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    requestAnimationFrame(() => {
        notification.classList.add('translate-x-0');
    });
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.add('translate-x-full', 'opacity-0');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }
    }, 4000);
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Performance monitoring
function logPerformance() {
    if (window.performance && window.performance.timing) {
        const timing = window.performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        console.log(`Page load time: ${loadTime}ms`);
    }
}

// Log performance after page load
window.addEventListener('load', logPerformance);

// Global functions for inline onclick handlers
window.addToWatchList = addToWatchList;
window.rateMovie = rateMovie;
window.showNotification = showNotification;
window.handleThemeToggle = handleThemeToggle;

// Debug function for theme toggle (can be called from browser console)
window.debugTheme = function() {
    console.log('Current theme:', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    console.log('Saved theme:', localStorage.getItem('theme'));
    console.log('Theme toggle button:', document.querySelector('#theme-toggle'));
};
