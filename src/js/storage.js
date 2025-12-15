// Storage module for managing data persistence

import { STORAGE_KEYS } from './config.js';

export function readCookie(name) {
  const match = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : null;
}

export function writeCookie(name, value, maxAgeSeconds = 172800) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeSeconds}; samesite=lax`;
}

// Function to validate stored data
function isValidDayData(data) {
  return data &&
         typeof data === 'object' &&
         data.date &&
         typeof data.state === 'string' &&
         ['intact', 'broken', 'crumbs', 'clean'].includes(data.state);
}

export async function loadDayData() {
  const today = getTodayKey();
  let data = null;
  let fallbackUsed = false;

  // Try localStorage first
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.dayData);
    if (raw) {
      data = JSON.parse(raw);
      if (data && isValidDayData(data)) {
        console.log('Loaded data from localStorage');
      } else {
        console.warn('Invalid data in localStorage, will try other sources');
        data = null;
      }
    }
  } catch (error) {
    console.warn('Error reading from localStorage:', error);
  }

  // If no valid data from localStorage, try cookies
  if (!data) {
    try {
      const cookieData = readCookie(STORAGE_KEYS.dayData);
      if (cookieData) {
        data = JSON.parse(cookieData);
        if (data && isValidDayData(data)) {
          console.log('Loaded data from cookies');
        } else {
          console.warn('Invalid data in cookies, will try sessionStorage');
          data = null;
        }
      }
    } catch (error) {
      console.warn('Error reading from cookies:', error);
    }
  }

  // If no valid data from localStorage or cookies, try sessionStorage
  if (!data) {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEYS.dayData);
      if (raw) data = JSON.parse(raw);
      if (data && isValidDayData(data)) {
        console.log('Loaded data from sessionStorage');
      } else {
        console.warn('Invalid data in sessionStorage');
        data = null;
      }
    } catch (error) {
      console.warn('Error reading from sessionStorage:', error);
    }
    fallbackUsed = true;
  }

  // Check if we have valid data from today
  const hasValidTodayData = data && data.date === today && isValidDayData(data);

  if (!hasValidTodayData) {
    console.log(`Creating new day data for ${today}. Previous data was from date: ${data?.date || 'none'}`);

    // Create fresh data for today
    data = await createDefaultDayData();

    // Only warn if we had valid data from the same day that got lost
    if (data.date === today && fallbackUsed) {
      console.warn('WARNING: Had to create new data for today after failing to load existing data');
    }

    persistDayData(data);
  } else {
    // Same day, preserve the existing state but ensure it's updated properly
    console.log(`Preserving state from today (${today}):`, data.state);

    // Get fresh defaults but preserve the current state
    const defaults = await createDefaultDayData();
    data = {
      ...defaults,
      ...data,  // This will override defaults with actual stored values
      date: today  // Ensure today's date is set
    };

    // Ensure data integrity by persisting it again
    persistDayData(data);
  }

  return data;
}

export function persistDayData(data) {
  // Validate data before storing
  if (!isValidDayData(data)) {
    console.error('Attempting to save invalid day data:', data);
    return;
  }

  let storageSuccessCount = 0;

  try {
    localStorage.setItem(STORAGE_KEYS.dayData, JSON.stringify(data));
    storageSuccessCount++;
  } catch (error) {
    console.warn('Não foi possível salvar o estado diário no localStorage:', error);
  }

  try {
    sessionStorage.setItem(STORAGE_KEYS.dayData, JSON.stringify(data));
    storageSuccessCount++;
  } catch (error) {
    console.warn('Não foi possível salvar o estado diário no sessionStorage:', error);
  }

  try {
    writeCookie(STORAGE_KEYS.dayData, JSON.stringify(data));
    storageSuccessCount++;
  } catch (error) {
    console.warn('Não foi possível salvar o estado diário no cookie:', error);
  }

  // Alert if all storage methods failed
  if (storageSuccessCount === 0) {
    console.error('CRITICAL: All storage methods failed! User will lose progress.');
  } else if (storageSuccessCount < 2) {
    // At least 2 out of 3 should work for reliability
    console.warn(`WARNING: Only ${storageSuccessCount}/3 storage methods succeeded. Data may be at risk.`);
  }
}

export async function createDefaultDayData() {
  const today = getTodayKey();
  const { initial, refresh } = await getMessagesForState('intact');
  return {
    date: today,
    state: 'intact',
    text: '',
    numbers: '',
    fortuneTone: [],
    fortuneTheme: [],
    crunched: false,
    cleaned: false,
    fortunePosition: null,
    cookieVariantId: null,
    messageInitial: initial,
    messageRefresh: refresh,
    messageStage: 'initial'
  };
}

export function getTodayKey() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
}

// Import necessary functions for internal use
import { getMessagesForState } from './messages.js';
