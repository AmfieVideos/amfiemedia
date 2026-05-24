// Wait for the website to fully load before running the script
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Grab the modal elements from the HTML
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("modal-img");
    const closeBtn = document.querySelector(".close-modal");

    // 2. Find ALL images that should be clickable 
    // (This grabs the story images AND the 12 grid images)
    const images = document.querySelectorAll(".image-block img, .gallery-photo img");

    // 3. Loop through every image and attach a click listener
    images.forEach(img => {
        img.addEventListener("click", () => {
            modal.classList.add("active"); // Show the black overlay
            modalImg.src = img.src;        // Copy the clicked image source into the overlay
        });
    });

    // 4. Close the modal if the user clicks the 'X'
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            modal.classList.remove("active");
        });
    }

    // 5. Close the modal if the user clicks anywhere in the black background
    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.classList.remove("active");
            }
        });
    }
    
    // 6. Bonus: Allow the user to press the 'Escape' key on their keyboard to close it
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape" && modal && modal.classList.contains("active")) {
            modal.classList.remove("active");
        }
    });
});

// =========================================
    // SCROLL REVEAL ANIMATION
    // =========================================
    const revealOptions = {
        threshold: 0.15, // Triggers when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Triggers slightly before it hits the bottom of the screen
    };

    const revealObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // Stops animating once it has appeared
            }
        });
    }, revealOptions);

    const revealElements = document.querySelectorAll(".reveal-item");
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

   // =========================================
    // MAGNETIC BUTTONS (FIXED)
    // =========================================
    const magneticBtns = document.querySelectorAll('.cta-btn');

    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const position = btn.getBoundingClientRect();
            
            // Fixed: Using clientX and clientY to match getBoundingClientRect
            const x = e.clientX - position.left - position.width / 2;
            const y = e.clientY - position.top - position.height / 2;
            
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        btn.addEventListener('mouseout', function() {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });

    // =========================================
    // SMOOTH PAGE TRANSITIONS
    // =========================================
    const internalLinks = document.querySelectorAll('a[href^="([^"]+)html"], a.logo-link, nav a');

    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Ignore links that open in a new tab (like your footer social icons)
            if (this.target === '_blank') return;
            
            e.preventDefault(); // Stop the instant jump
            const destination = this.href;

            document.body.classList.add('fade-out');

            // Wait for the CSS fade-out to finish (400ms) before jumping
            setTimeout(() => {
                window.location.href = destination;
            }, 400);
        });
    });

    