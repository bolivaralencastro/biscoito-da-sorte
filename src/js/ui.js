// UI module for handling user interface interactions

import { playCrack, playChew } from './audio.js';
import { createCrumbsAnimation, animateReveal, positionStripAboveCookie, randomizeTilt } from './animation.js';
import { getRandomFortune, generateLuckyNumbers } from './fortunes.js';
import { getRandomMessageForState, getMessagesForState } from './messages.js';
import { loadDayData, persistDayData, createDefaultDayData } from './storage.js';
import { getCookieVariantById, getRandomCookieVariant } from './cookies.js';
import { IMAGE_BASES, EMPTY_DATA_URI, DEFAULT_COOKIE_STATE } from './config.js';

// === Globals & DOM refs ======================================================

// Global variables that were in the original main.js
let dayData = null;
let imageFormat = 'png';
let cookieState = 'intact';
let webpSupported = false;
let cookieVariant = null;
let broken = false;
let crunched = false;
let cleaned = false;
let dragging = false;
let dragOffset = { x: 0, y: 0 };
let moved = false;
let startPos = { x: 0, y: 0 };

// DOM elements
let cookieImage = null;
let fortuneStrip = null;
let fortuneText = null;
let luckyNumbers = null;
let stage = null;
let cookieZone = null;
let fortuneInner = null;
let dailyNotice = null;
let cookieSource = null;

// === Init & setup ============================================================
export async function initUI() {
  cookieImage = document.getElementById('cookieImage');
  cookieSource = document.querySelector('picture source');
  fortuneStrip = document.getElementById('fortuneStrip');
  fortuneText = document.getElementById('fortuneText');
  luckyNumbers = document.getElementById('luckyNumbers');
  stage = document.querySelector('.stage');
  cookieZone = document.querySelector('.cookie-zone');
  fortuneInner = document.querySelector('.fortune-inner');
  dailyNotice = document.getElementById('dailyNotice');

  // Tirinha focável/ARIA para teclado (evita remoções acidentais em rewrites)
  if (fortuneStrip) {
    fortuneStrip.setAttribute('tabindex', '0');
    fortuneStrip.setAttribute('role', 'button');
    fortuneStrip.setAttribute('aria-pressed', 'false');
  }

  // Load day data
  dayData = await loadDayData();

  // Choose and persist today's cookie variant
  cookieVariant = ensureCookieVariant();

  // Detect WebP support
  detectWebpSupport().then(supported => {
    webpSupported = supported;
    imageFormat = selectBestImageFormat();
    updateCookieImage();
  });

  // Apply initial state visuals
  applyStateVisuals(dayData.state);

  // Sync fortune strip from data
  syncFortuneStripFromData();

  // Show current message
  await showCurrentMessage();

  // Set up event listeners
  setupEventListeners();

  // Remove loading class
  document.body.classList.remove('app-loading');
}

// Set up event listeners
function setupEventListeners() {
  if (cookieImage) {
    cookieImage.addEventListener('click', handleCookieClick);
  }
  
  if (fortuneStrip) {
    fortuneStrip.addEventListener('click', handleFortuneStripClick);
    fortuneStrip.addEventListener('keydown', handleFortuneStripKeydown);
    setupFortuneStripDrag();
  }

  window.addEventListener('resize', handleViewportChange);
  window.addEventListener('orientationchange', handleViewportChange);
}

// === Event handlers: cookie & fortune strip =================================
// Handle cookie click
async function handleCookieClick() {
  const previousState = dayData.state;

  // Add an additional check to prevent reverting to intact state during the same day
  // if the user has already progressed beyond the intact state
  if (dayData.crunched && previousState === 'intact') {
    // The user has already crunched the cookie today - show a message
    showDailyLockNotice("Você já consumiu seu biscoito da sorte de hoje!");
    return;
  }

  if (previousState === 'intact') {
    // Break the cookie
    playCrack();
    createCrumbsAnimation(cookieImage);

    // Update state to broken
    updateDayData({ state: DEFAULT_COOKIE_STATE.broken });
    applyStateVisuals(DEFAULT_COOKIE_STATE.broken);

    // Reveal fortune and numbers
    const { text, numbers, tone, theme } = revealFortune() || {};
    if (text || numbers) {
      updateDayData({
        text: text || dayData.text,
        numbers: numbers || dayData.numbers,
        fortuneTone: tone || dayData.fortuneTone,
        fortuneTheme: theme || dayData.fortuneTheme
      });
    }

    // Show a message for broken state
    await ensureMessagesForState(DEFAULT_COOKIE_STATE.broken, true);
    await showCurrentMessage();
  } else if (previousState === DEFAULT_COOKIE_STATE.broken) {
    // Crunch the cookie to crumbs
    playChew();

    // Update state to crumbs
    updateDayData({
      state: DEFAULT_COOKIE_STATE.crumbs,
      crunched: true
    });
    applyStateVisuals(DEFAULT_COOKIE_STATE.crumbs);

    // Show a message for crumbs state
    await ensureMessagesForState(DEFAULT_COOKIE_STATE.crumbs, true);
    await showCurrentMessage();
  } else if (previousState === DEFAULT_COOKIE_STATE.crumbs) {
    // Clean the crumbs
    updateDayData({
      state: DEFAULT_COOKIE_STATE.clean,
      cleaned: true
    });
    applyStateVisuals(DEFAULT_COOKIE_STATE.clean);

    // Show a message for clean state
    await ensureMessagesForState(DEFAULT_COOKIE_STATE.clean, true);
    await showCurrentMessage();
  }
}

// Handle fortune strip click
function handleFortuneStripClick() {
  if (!fortuneStrip || dayData.state === 'intact' || !fortuneStrip.classList.contains('revealed')) return;
  const isFlipped = !fortuneStrip.classList.contains('flipped');
  setFortuneStripFlipped(isFlipped);
}

function handleFortuneStripKeydown(event) {
  if (event.key !== 'Enter' && event.key !== ' ') return;
  event.preventDefault();
  handleFortuneStripClick();
}

function setFortuneStripFlipped(isFlipped) {
  if (!fortuneStrip) return;
  fortuneStrip.classList.toggle('flipped', isFlipped);
  fortuneStrip.setAttribute('aria-pressed', isFlipped ? 'true' : 'false');
  if (fortuneInner) {
    fortuneInner.style.removeProperty('transform');
  }
}

// === Drag handling ===========================================================
// Set up fortune strip drag
function setupFortuneStripDrag() {
  if (!fortuneStrip) return;
  let dragging = false;
  let moved = false;
  let dragOffset = { x: 0, y: 0 };
  let startPos = { x: 0, y: 0 };
  let skipClick = false;

  const onPointerDown = (event) => {
    if (!fortuneStrip.classList.contains('revealed')) return;
    dragging = true;
    moved = false;
    fortuneStrip.setPointerCapture(event.pointerId);

    const rect = fortuneStrip.getBoundingClientRect();
    dragOffset.x = event.clientX - rect.left;
    dragOffset.y = event.clientY - rect.top;
    startPos.x = event.clientX;
    startPos.y = event.clientY;
  };

  const onPointerMove = (event) => {
    if (!dragging) return;
    event.preventDefault();
    const deltaX = Math.abs(event.clientX - startPos.x);
    const deltaY = Math.abs(event.clientY - startPos.y);
    if (deltaX > 2 || deltaY > 2) {
      moved = true;
    }
    const stageRect = stage.getBoundingClientRect();
    const stripRect = fortuneStrip.getBoundingClientRect();
    const margin = 12; // evita colar nas bordas ao salvar posição

    const desiredLeft = event.clientX - stageRect.left - dragOffset.x;
    const desiredTop = event.clientY - stageRect.top - dragOffset.y;

    const minX = margin;
    const maxX = stageRect.width - stripRect.width - margin;
    const minY = margin;
    const maxY = stageRect.height - stripRect.height - margin;

    const clampedLeft = Math.min(Math.max(desiredLeft, minX), maxX);
    const clampedTop = Math.min(Math.max(desiredTop, minY), maxY);

    const centeredLeft = clampedLeft + stripRect.width / 2;
    const centeredTop = clampedTop + stripRect.height / 2;

    fortuneStrip.style.left = `${centeredLeft}px`;
    fortuneStrip.style.top = `${centeredTop}px`;
  };

  const onPointerUp = (event) => {
    if (!dragging) return;
    dragging = false;
    fortuneStrip.releasePointerCapture(event.pointerId);

    // Se não moveu, deixa o click original acontecer (flip); se moveu, previne o clique final
    if (moved) {
      event.preventDefault();
      event.stopPropagation();
      skipClick = true;
      setTimeout(() => { skipClick = false; }, 0);
    }

    saveFortunePosition();
  };

  fortuneStrip.addEventListener('pointerdown', onPointerDown);
  fortuneStrip.addEventListener('pointermove', onPointerMove);
  fortuneStrip.addEventListener('pointerup', onPointerUp);
  fortuneStrip.addEventListener('pointercancel', onPointerUp);

  fortuneStrip.addEventListener('click', (event) => {
    if (skipClick) {
      event.preventDefault();
      event.stopPropagation();
      skipClick = false;
    }
  }, true);
}

// Detect WebP support
function detectWebpSupport() {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve(img.width === 1);
    img.onerror = () => resolve(false);
    img.src = 'data:image/webp;base64,UklGRi4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
  });
}

// === Visuals & assets ========================================================
// Update cookie image based on state and format
function updateCookieImage() {
  if (!cookieImage) return;
  
  if (cookieState === 'clean') {
    cookieImage.src = EMPTY_DATA_URI;
    cookieImage.srcset = '';
    if (cookieSource) cookieSource.srcset = EMPTY_DATA_URI;
    return;
  }
  
  const base = (cookieVariant?.states && cookieVariant.states[cookieState]) || IMAGE_BASES[cookieState] || IMAGE_BASES.intact;
  const format = selectBestImageFormat();
  imageFormat = format;
  const resolvedSrc = `${base}.${format}`;

  // Atualiza <img> e <source> para evitar que o <picture> segure o asset antigo
  cookieImage.src = resolvedSrc;
  cookieImage.srcset = resolvedSrc;
  if (cookieSource) {
    cookieSource.srcset = format === 'webp' ? resolvedSrc : '';
    cookieSource.type = format === 'webp' ? 'image/webp' : '';
  }
}

function selectBestImageFormat() {
  const formats = cookieVariant?.formats || ['png'];
  if (webpSupported && formats.includes('webp')) return 'webp';
  if (formats.includes('png')) return 'png';
  return formats[0] || 'png';
}

// Get cookie center position
function getCookieCenter() {
  if (!stage || !cookieImage) return { x: 0, y: 0, stageRect: {} };
  
  const stageRect = stage.getBoundingClientRect();
  const cookieRect = cookieImage.getBoundingClientRect();

  return {
    x: cookieRect.left - stageRect.left + cookieRect.width / 2,
    y: cookieRect.top - stageRect.top + cookieRect.height / 2,
    stageRect
  };
}

// Apply state visuals to UI
function applyStateVisuals(state) {
  if (!cookieImage) return;
  
  cookieImage.classList.remove('broken', 'crumbled', 'cleaned');
  switch (state) {
    case DEFAULT_COOKIE_STATE.broken:
      broken = true;
      crunched = false;
      cleaned = false;
      cookieState = DEFAULT_COOKIE_STATE.broken;
      cookieImage.classList.add('broken');
      cookieImage.alt = 'Biscoito da sorte quebrado';
      break;
    case DEFAULT_COOKIE_STATE.crumbs:
      broken = true;
      crunched = true;
      cleaned = false;
      cookieState = DEFAULT_COOKIE_STATE.crumbs;
      cookieImage.classList.add('broken', 'crumbled');
      cookieImage.alt = 'Biscoito da sorte em farelos';
      break;
    case DEFAULT_COOKIE_STATE.clean:
      broken = true;
      crunched = true;
      cleaned = true;
      cookieState = DEFAULT_COOKIE_STATE.clean;
      cookieImage.classList.add('cleaned');
      cookieImage.alt = 'Ambiente limpo, sem biscoito';
      break;
    case DEFAULT_COOKIE_STATE.intact:
    default:
      broken = false;
      crunched = false;
      cleaned = false;
      cookieState = DEFAULT_COOKIE_STATE.intact;
      cookieImage.alt = 'Biscoito da sorte fechado';
      break;
  }
  updateCookieImage();
  updateShadow();
}

// Update shadow based on cookie state
function updateShadow() {
  const shadow = document.querySelector('.cookie-shadow');
  if (!shadow) return;

  // Remove broken class by default
  shadow.classList.remove('broken');

  if (cookieState === DEFAULT_COOKIE_STATE.intact) {
    // Show shadow for intact state
    shadow.style.display = 'block';
  } else if (cookieState === DEFAULT_COOKIE_STATE.broken || cookieState === DEFAULT_COOKIE_STATE.crumbs) {
    // Add broken class for broken/crumbs states
    shadow.classList.add('broken');
    shadow.style.display = 'block';
  } else if (cookieState === DEFAULT_COOKIE_STATE.clean) {
    // Hide shadow for clean state
    shadow.style.display = 'none';
  }
}

// Sync fortune strip from data
function syncFortuneStripFromData() {
  if (!dayData || !fortuneStrip || !fortuneText || !luckyNumbers) return;
  
  if (dayData.state === 'intact') {
    fortuneStrip.classList.remove('revealed');
    return;
  }

  const storedFortune = dayData.text || 'Sua sorte do dia já foi revelada.';
  const storedNumbers = dayData.numbers || '';
  revealFortune({
    fortuneTextOverride: storedFortune,
    numbersOverride: storedNumbers,
    skipAnimation: true
  });
  applyStoredFortunePosition();
}

// === Fortune reveal & tilt ===================================================
// Reveal fortune with optional overrides
function revealFortune(options = {}) {
  const {
    fortuneTextOverride,
    numbersOverride,
    skipAnimation = false
  } = options;

  if (!fortuneStrip || !fortuneInner || !fortuneText || !luckyNumbers) return;
  
  fortuneStrip.classList.remove('revealed');
  fortuneStrip.classList.remove('flipped');
  const fortuneSource = fortuneTextOverride ? { text: fortuneTextOverride } : getRandomFortune();
  const chosenFortune = typeof fortuneSource === 'string' ? fortuneSource : (fortuneSource?.text || '');
  const chosenTone = Array.isArray(fortuneSource?.tone) ? fortuneSource.tone : [];
  const chosenTheme = Array.isArray(fortuneSource?.theme) ? fortuneSource.theme : [];
  const chosenNumbers = numbersOverride || generateLuckyNumbers();

  fortuneText.textContent = chosenFortune;
  luckyNumbers.textContent = chosenNumbers;
  positionStripAboveCookie(fortuneStrip, cookieImage);
  randomizeTilt();

  // Força reflow para reiniciar a animação da tirinha
  void fortuneStrip.offsetWidth;
  // Apenas reseta a orientação visual; não seleciona nova fortuna nem altera o conteúdo já persistido
  setFortuneStripFlipped(false);
  fortuneStrip.classList.add('revealed');
  if (!skipAnimation) {
    animateReveal(fortuneStrip);
  }
  applyStoredFortunePosition();
  
  // Update day data if not already set
  if (!dayData.text && !dayData.numbers) {
    updateDayData({
      text: chosenFortune,
      numbers: chosenNumbers,
      fortuneTone: chosenTone,
      fortuneTheme: chosenTheme
    });
  }
  
  return { text: chosenFortune, numbers: chosenNumbers, tone: chosenTone, theme: chosenTheme };
}

// Update day data
function updateDayData(partial) {
  dayData = { ...dayData, ...partial };
  persistDayData(dayData);
}

// === Persistence helpers =====================================================
// Ensure a cookie variant is selected for the day
function ensureCookieVariant() {
  const selected = dayData?.cookieVariantId ? getCookieVariantById(dayData.cookieVariantId) : null;
  const chosen = selected || getRandomCookieVariant();
  if (!dayData || dayData.cookieVariantId !== chosen.id) {
    updateDayData({ cookieVariantId: chosen.id });
  }
  cookieVariant = chosen;
  imageFormat = selectBestImageFormat();
  return chosen;
}

// Persist current fortune strip position in day data
function saveFortunePosition() {
  if (!stage || !fortuneStrip || !dayData) return;
  const stageRect = stage.getBoundingClientRect();
  if (!stageRect.width || !stageRect.height) return;
  const left = parseFloat(fortuneStrip.style.left || '0');
  const top = parseFloat(fortuneStrip.style.top || '0');
  const xRatio = Math.min(Math.max(left / stageRect.width, 0), 1);
  const yRatio = Math.min(Math.max(top / stageRect.height, 0), 1);
  updateDayData({ fortunePosition: { xRatio, yRatio } });
}

// Apply saved position if available
function applyStoredFortunePosition() {
  if (!dayData?.fortunePosition || !stage || !fortuneStrip) return;
  const stageRect = stage.getBoundingClientRect();
  const stripRect = fortuneStrip.getBoundingClientRect();
  if (!stageRect.width || !stageRect.height || !stripRect.width || !stripRect.height) return;

  const margin = 12;
  const desiredCenterLeft = dayData.fortunePosition.xRatio * stageRect.width;
  const desiredCenterTop = dayData.fortunePosition.yRatio * stageRect.height;

  const desiredTopLeftX = desiredCenterLeft - stripRect.width / 2;
  const desiredTopLeftY = desiredCenterTop - stripRect.height / 2;

  const minX = margin;
  const maxX = stageRect.width - stripRect.width - margin;
  const minY = margin;
  const maxY = stageRect.height - stripRect.height - margin;

  const clampedLeft = Math.min(Math.max(desiredTopLeftX, minX), maxX);
  const clampedTop = Math.min(Math.max(desiredTopLeftY, minY), maxY);

  const centeredLeft = clampedLeft + stripRect.width / 2;
  const centeredTop = clampedTop + stripRect.height / 2;

  fortuneStrip.style.left = `${centeredLeft}px`;
  fortuneStrip.style.top = `${centeredTop}px`;
}

function handleViewportChange() {
  if (!dayData || !fortuneStrip) return;
  requestAnimationFrame(() => {
    applyStoredFortunePosition();
    saveFortunePosition();
  });
}

// Ensure messages exist for state
async function ensureMessagesForState(state, forceReset = false) {
  if (forceReset || dayData.state !== state || !dayData.messageInitial || !dayData.messageRefresh) {
    const { initial, refresh } = await getMessagesForState(state);
    dayData.messageInitial = initial;
    dayData.messageRefresh = refresh;
    dayData.messageStage = 'initial';
  }
}

// Show daily lock notice
function showDailyLockNotice(message) {
  if (!dailyNotice) return;
  dailyNotice.textContent = message;
  dailyNotice.classList.add('visible');
}

// === Messages / daily notice ================================================
// Show current message
async function showCurrentMessage() {
  if (!dayData) return;

  let message = dayData.messageStage === 'initial' ? dayData.messageInitial : dayData.messageRefresh;

  // If no message is available, get one for the current state
  if (!message) {
    message = await getRandomMessageForState(dayData.state, dayData.messageStage);
  }

  if (message) {
    showDailyLockNotice(message);
    if (dayData.messageStage === 'initial') {
      dayData.messageStage = 'refresh';
      persistDayData(dayData);
    }
  }
}
