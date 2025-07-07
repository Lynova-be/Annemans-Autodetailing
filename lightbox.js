document.addEventListener('DOMContentLoaded', function() {
    // Create lightbox elements
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.className = 'lightbox';
    
    const lightboxImg = document.createElement('img');
    lightboxImg.className = 'lightbox-img';
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'lightbox-close';
    closeBtn.innerHTML = '×';
    
    lightbox.appendChild(lightboxImg);
    lightbox.appendChild(closeBtn);
    document.body.appendChild(lightbox);
    
    // Add click handlers to portfolio items and gallery items
    document.querySelectorAll('.portfolio-item, .gallery-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const imgElement = this.querySelector('.car-image, .gallery-image');
            const imgUrl = imgElement.style.backgroundImage.slice(4, -1).replace(/"/g, "");
            lightboxImg.src = imgUrl;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close lightbox on button click or outside image click
    lightbox.addEventListener('click', function(e) {
        if (e.target !== lightboxImg) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});
