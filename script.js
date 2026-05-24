// Wait for the website to fully load before running the script
document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================
    // 1. MODAL (LIGHTBOX) CODE
    // =========================================
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("modal-img");
    const closeBtn = document.querySelector(".close-modal");

    const images = document.querySelectorAll(".image-block img, .gallery-photo img, .masonry-item img");

    images.forEach(img => {
        img.addEventListener("click", () => {
            modal.classList.add("active"); 
            modalImg.src = img.src;        
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            modal.classList.remove("active");
        });
    }

    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.classList.remove("active");
            }
        });
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape" && modal && modal.classList.contains("active")) {
            modal.classList.remove("active");
        }
    });

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