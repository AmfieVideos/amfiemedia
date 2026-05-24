// Wait for the website to fully load before running the script
document.addEventListener('DOMContentLoaded', () => {
    
// =========================================
    // 1. MODAL (LIGHTBOX) WITH NAVIGATION
    // =========================================
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("modal-img");
    const closeBtn = document.querySelector(".close-modal");
    const prevBtn = document.querySelector(".modal-prev");
    const nextBtn = document.querySelector(".modal-next");

    // Grab all images that should open in the lightbox
    const images = Array.from(document.querySelectorAll(".image-block img, .gallery-photo img, .masonry-item img"));
    let currentIndex = 0; // Tracks which image is currently open

// 1. OPEN MODAL & SET INDEX
    images.forEach((img, index) => {
        img.addEventListener("click", () => {
            modal.classList.add("active"); 
            modalImg.src = img.src;     
            currentIndex = index; 
            document.body.classList.add("modal-open"); // Locks the background scroll
        });
    });

    // 2. NAVIGATION FUNCTIONS
    function showNext() {
        // Adds 1, but loops back to 0 if at the end of the gallery
        currentIndex = (currentIndex + 1) % images.length;
        modalImg.src = images[currentIndex].src;
    }

    function showPrev() {
        // Subtracts 1, but loops to the end if at the beginning
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        modalImg.src = images[currentIndex].src;
    }

    // 3. ARROW CLICKS
    if (nextBtn) nextBtn.addEventListener("click", showNext);
    if (prevBtn) prevBtn.addEventListener("click", showPrev);

// 4. CLOSE MODAL LOGIC (Bundled into a clean function)
    function closeModal() {
        modal.classList.remove("active");
        document.body.classList.remove("modal-open"); // Unlocks the background scroll
    }

    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    if (modal) {
        modal.addEventListener("click", (e) => {
            // Close if clicking the dark background
            if (e.target === modal) closeModal();
        });
    }
    
    // 5. KEYBOARD CONTROLS (Desktop)
    document.addEventListener('keydown', (e) => {
        if (!modal || !modal.classList.contains("active")) return;
        if (e.key === "Escape") closeModal();
        if (e.key === "ArrowRight") showNext();
        if (e.key === "ArrowLeft") showPrev();
    });
    
    // 6. SWIPE GESTURE LOGIC (Mobile/Tablet)
    let touchStartX = 0;
    let touchEndX = 0;

    if (modal) {
        // Record where the finger starts touching
        modal.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        // Record where the finger lifts off
        modal.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }

    function handleSwipe() {
        const swipeThreshold = 50; // You must swipe at least 50px for it to trigger
        if (touchEndX < touchStartX - swipeThreshold) showNext(); // Swiped left
        if (touchEndX > touchStartX + swipeThreshold) showPrev(); // Swiped right
    }
    // =========================================
    // 2. SCROLL REVEAL ANIMATION (BULLETPROOF)
    // =========================================
    const revealElements = document.querySelectorAll(".reveal-item");

    if ('IntersectionObserver' in window) {
        const revealOptions = {
            threshold: 0.05, // Triggers when just 5% is visible
            rootMargin: "0px 0px 0px 0px" // Zeroed out so it triggers reliably
        };

        const revealObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target); 
                }
            });
        }, revealOptions);

        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    } else {
        // Fallback for older browsers
        revealElements.forEach(el => el.classList.add("visible"));
    }

    // =========================================
    // 3. MAGNETIC BUTTONS
    // =========================================
    const magneticBtns = document.querySelectorAll('.cta-btn');

    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const position = btn.getBoundingClientRect();
            
            const x = e.clientX - position.left - position.width / 2;
            const y = e.clientY - position.top - position.height / 2;
            
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        btn.addEventListener('mouseout', function() {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });

    // =========================================
    // 4. SMOOTH PAGE TRANSITIONS
    // =========================================
    const internalLinks = document.querySelectorAll('a[href$=".html"], a.logo-link, nav a');

    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.target === '_blank') return;
            
            e.preventDefault(); 
            const destination = this.href;

            document.body.classList.add('fade-out');

            setTimeout(() => {
                window.location.href = destination;
            }, 400);
        });
    });

}); // <--- THIS IS THE MASTER CLOSING BRACKET. IT MUST BE THE VERY LAST LINE.