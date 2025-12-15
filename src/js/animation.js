// Animation module for UI animations

// Create crumbs animation
export function createCrumbsAnimation(cookieImage, count = 25) {
  const stage = document.querySelector('.stage');
  const cookieRect = cookieImage.getBoundingClientRect();
  const stageRect = stage.getBoundingClientRect();
  
  // Calculate cookie center relative to stage
  const cookieCenterX = cookieRect.left - stageRect.left + cookieRect.width / 2;
  const cookieCenterY = cookieRect.top - stageRect.top + cookieRect.height / 2;

  const crumbs = [];
  for (let i = 0; i < count; i++) {
    const crumb = document.createElement('div');
    crumb.classList.add('crumb');
    
    // Position at cookie center initially
    crumb.style.left = `${cookieCenterX}px`;
    crumb.style.top = `${cookieCenterY}px`;
    
    // Random size variation
    const size = 4 + Math.random() * 4;
    crumb.style.width = `${size}px`;
    crumb.style.height = `${size}px`;
    
    // Random color variation
    const colors = ['#d6a15e', '#c89353', '#b88548'];
    crumb.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    
    // Random movement
    const angle = Math.random() * Math.PI * 2;
    const distance = 40 + Math.random() * 60;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance + 20; // Add downward bias
    
    crumb.style.setProperty('--tx', `${tx}px`);
    crumb.style.setProperty('--ty', `${ty}px`);
    
    stage.appendChild(crumb);
    crumbs.push(crumb);
    
    // Remove crumb after animation completes
    setTimeout(() => {
      crumb.remove();
    }, 1000);
  }
  
  return crumbs;
}

// Animate reveal with GSAP if available
export function animateRevealWithGsap(fortuneStrip) {
  if (window.gsap) {
    gsap.fromTo(fortuneStrip, 
      { 
        scale: 0.8, 
        opacity: 0,
        rotationY: -90
      },
      { 
        scale: 1, 
        opacity: 1,
        rotationY: 0,
        duration: 0.4,
        ease: "back.out(1.7)"
      }
    );
  }
}

// Position strip above cookie
export function positionStripAboveCookie(fortuneStrip, cookieImage) {
  const cookieRect = cookieImage.getBoundingClientRect();
  const stage = document.querySelector('.stage');
  const stageRect = stage.getBoundingClientRect();

  const cookieCenterX = cookieRect.left - stageRect.left + cookieRect.width / 2;
  const cookieTop = cookieRect.top - stageRect.top - 40; // Position above cookie with offset

  fortuneStrip.style.left = `${cookieCenterX}px`;
  fortuneStrip.style.top = `${cookieTop}px`;
}

// Randomize tilt for fortune strip
export function randomizeTilt() {
  const fortuneStrip = document.querySelector('.fortune-strip');
  if (!fortuneStrip) return;
  
  const tilt = -3 + Math.random() * 6; // Random tilt between -3 and 3 degrees
  const skew = -1 + Math.random() * 2; // Random skew between -1 and 1 degrees
  fortuneStrip.style.setProperty('--tilt', `${tilt}deg`);
  fortuneStrip.style.setProperty('--skew', `${skew}deg`);
}