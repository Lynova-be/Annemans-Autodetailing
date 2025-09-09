document.addEventListener('DOMContentLoaded', function() {
    const desktopVideo = document.querySelector('.desktop-video');
    const mobileVideo = document.querySelector('.mobile-video');
    let isMobile = window.innerWidth <= 768;

    function switchVideo() {
        const isNowMobile = window.innerWidth <= 768;
        if (isMobile !== isNowMobile) {
            isMobile = isNowMobile;
            
            if (isMobile) {
                if (desktopVideo) {
                    desktopVideo.pause();
                    desktopVideo.style.display = 'none';
                }
                if (mobileVideo) {
                    mobileVideo.style.display = 'block';
                    mobileVideo.load();
                    mobileVideo.play().catch(e => console.log('Autoplay prevented:', e));
                }
            } else {
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

    // FIX: video mag gewoon volledig afspelen
    function handleVideoEnd(video) {
        console.log('Video fully ended:', video.className);
        // Wil je loop? Dan uncomment hieronder:
        // video.currentTime = 0;
        // video.play();
    }

    if (desktopVideo) {
        desktopVideo.addEventListener('ended', () => handleVideoEnd(desktopVideo));
    }
    if (mobileVideo) {
        mobileVideo.addEventListener('ended', () => handleVideoEnd(mobileVideo));
    }

    if (isMobile && mobileVideo) {
        mobileVideo.style.display = 'block';
        desktopVideo.style.display = 'none';
    } else if (desktopVideo) {
        desktopVideo.style.display = 'block';
        mobileVideo.style.display = 'none';
    }

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(switchVideo, 250);
    });

    function attemptPlay() {
        const video = isMobile ? mobileVideo : desktopVideo;
        if (video && video.paused) {
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    console.log('Autoplay prevented, user interaction required');
                });
            }
        }
    }

    setTimeout(attemptPlay, 1000);
});
