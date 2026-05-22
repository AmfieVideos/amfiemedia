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