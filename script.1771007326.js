/**
 * IN THE VERSE - COSMIC PRANK SITE
 * JavaScript for video embedding
 */

// ═══════════════════════════════════════════════════════════════
// VIDEO CONFIGURATION
// ═══════════════════════════════════════════════════════════════

// IMPORTANT: Replace 'dQw4w9WgXcQ' with your actual Dr. Cox video ID
// Example: If your video URL is https://www.youtube.com/watch?v=ABC123xyz
// Then use: 'ABC123xyz'
const YOUTUBE_VIDEO_ID = 'dQw4w9WgXcQ';

// Video settings
const VIDEO_SETTINGS = {
  autoplay: 1,        // Set to 1 for autoplay, 0 for manual play
  rel: 0,             // Don't show related videos at the end
  modestbranding: 1   // Use modest YouTube branding
};

// ═══════════════════════════════════════════════════════════════
// VIDEO INITIALIZATION
// ═══════════════════════════════════════════════════════════════

/**
 * Build the YouTube embed URL with parameters
 */
function buildYouTubeUrl(videoId, settings) {
  const params = new URLSearchParams();

  Object.keys(settings).forEach(key => {
    params.append(key, settings[key]);
  });

  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

/**
 * Initialize the video iframe when page loads
 */
function initializeVideo() {
  const iframe = document.getElementById('video-iframe');

  if (iframe) {
    const videoUrl = buildYouTubeUrl(YOUTUBE_VIDEO_ID, VIDEO_SETTINGS);
    iframe.src = videoUrl;
    console.log('🌌 Video initialized with URL:', videoUrl);
  } else {
    console.error('❌ Video iframe not found');
  }
}

// ═══════════════════════════════════════════════════════════════
// INITIALIZE ON PAGE LOAD
// ═══════════════════════════════════════════════════════════════

// Wait for DOM to be fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeVideo);
} else {
  // DOM is already loaded
  initializeVideo();
}

// ═══════════════════════════════════════════════════════════════
// OPTIONAL: CONSOLE EASTER EGG
// ═══════════════════════════════════════════════════════════════

console.log('%c🌌 IN THE VERSE 🌌', 'font-size: 24px; font-weight: bold; color: #35F2FF; text-shadow: 0 0 10px #35F2FF;');
console.log('%cSound in Space - CONFIRMED! 🚀', 'font-size: 16px; color: #1ED6E3;');
console.log('%cPowered by rigorous D.U.H. testing', 'font-size: 12px; color: #6FF7FF; font-style: italic;');
