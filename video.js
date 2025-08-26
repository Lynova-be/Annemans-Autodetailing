document.addEventListener('DOMContentLoaded', function() {
    const desktopVideo = document.querySelector('.desktop-video');
    const mobileVideo = document.querySelector('.mobile-video');
    let isMobile = window.innerWidth <= 768;

    // Function to handle video switching
    function switchVideo() {
        const isNowMobile = window.innerWidth <= 768;
        
        // Only switch if the device type has changed
        if (isMobile !== isNowMobile) {
            isMobile = isNowMobile;
            
            if (isMobile) {
                // Switch to mobile video
                if (desktopVideo) {
                    desktopVideo.pause();
                    desktopVideo.style.display = 'none';
                }
                if (mobileVideo) {
                    mobileVideo.style.display = 'block';
                    // Force reload the video to ensure it plays on mobile
                    mobileVideo.load();
                    mobileVideo.play().catch(e => console.log('Autoplay prevented:', e));
                }
            } else {
                // Switch to desktop video
                if (mobileVideo) {
                    mobileVideo.pause();
                    mobileVideo.style.display = 'none';
                }
                if (desktopVideo) {
                    desktopVideo.style.display = 'block';
                    desktopVideo.play().catch(e => console.log('Autoplay prevented:', e));
                }
            }
        }
    }

    // Handle video end for both videos
    function handleVideoEnd(video) {
        if (video === desktopVideo) {
            // For desktop video, set to the last frame and ensure it stays there
            video.removeAttribute('controls');
            video.currentTime = video.duration - 0.1;
            video.pause();
            
            // Add a small delay and set to the last frame again to ensure it sticks
            setTimeout(() => {
                video.currentTime = video.duration - 0.1;
                video.pause();
                
                // One more check after a short delay to be extra sure
                setTimeout(() => {
                    if (!video.paused) {
                        video.pause();
                    }
                    video.currentTime = video.duration - 0.1;
                }, 50);
            }, 100);
        } else {
            // For mobile video, keep the current behavior
            video.currentTime = Math.max(0, video.duration - 0.1);
            video.pause();
        }
    }

    // Set up event listeners for video end
    if (desktopVideo) {
        desktopVideo.addEventListener('ended', () => handleVideoEnd(desktopVideo));
    }

    if (mobileVideo) {
        mobileVideo.addEventListener('ended', () => handleVideoEnd(mobileVideo));
    }

    // Initial setup
    if (isMobile && mobileVideo) {
        mobileVideo.style.display = 'block';
        desktopVideo.style.display = 'none';
    } else if (desktopVideo) {
        desktopVideo.style.display = 'block';
        mobileVideo.style.display = 'none';
    }

    // Add event listener for window resize with debounce
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(switchVideo, 250);
    });

    // Attempt to play videos on page load (handles autoplay policies)
    function attemptPlay() {
        const video = isMobile ? mobileVideo : desktopVideo;
        if (video && video.paused) {
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    // Autoplay was prevented, show play button or handle as needed
                    console.log('Autoplay prevented, user interaction required');
                });
            }
        }
    }

    // Try to play after a short delay to allow page to load
    setTimeout(attemptPlay, 1000);
});
