// Before/After Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.comparison-slider');
    const handle = document.querySelector('.slider-handle');
    const afterContainer = document.querySelector('.after-container');
    let isDragging = false;

    function updateSliderPosition(x) {
        const sliderRect = slider.getBoundingClientRect();
        let position = (x - sliderRect.left) / sliderRect.width;
        position = Math.max(0, Math.min(1, position));
        
        const percentage = position * 100;
        handle.style.left = `${percentage}%`;
        afterContainer.style.width = `${percentage}%`;
    }

    handle.addEventListener('mousedown', () => {
        isDragging = true;
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        updateSliderPosition(e.clientX);
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    // Touch events for mobile
    handle.addEventListener('touchstart', (e) => {
        isDragging = true;
    });

    document.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        updateSliderPosition(e.touches[0].clientX);
    });

    document.addEventListener('touchend', () => {
        isDragging = false;
    });

    // Set initial position
    updateSliderPosition(slider.getBoundingClientRect().left + (slider.offsetWidth / 2));
});
