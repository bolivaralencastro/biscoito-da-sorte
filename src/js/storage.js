// Storage module for managing data persistence

import { STORAGE_KEYS } from './config.js';

export function readCookie(name) {
  const match = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : null;
}

export function writeCookie(name, value, maxAgeSeconds = 172800) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeSeconds}; samesite=lax`;
}

export async function loadDayData() {
  const today = getTodayKey();
  let data = null;

  try {
    const raw = localStorage.getItem(STORAGE_KEYS.dayData);
    if (raw) data = JSON.parse(raw);
  } catch (error) {
    console.warn('Não foi possível ler o estado diário no localStorage:', error);
  }

  if (!data) {
    const cookieData = readCookie(STORAGE_KEYS.dayData);
    if (cookieData) {
      try {
        data = JSON.parse(cookieData);
      } catch (error) {
        console.warn('Não foi possível ler o estado diário no cookie:', error);
      }
    }
  }

  if (!data) {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEYS.dayData);
      if (raw) data = JSON.parse(raw);
    } catch (error) {
      console.warn('Não foi possível ler o estado diário no sessionStorage:', error);
    }
  }

  if (!data || data.date !== today) {
    data = await createDefaultDayData();
    persistDayData(data);
  } else {
    const defaults = await createDefaultDayData();
    data = { ...defaults, ...data, date: today };
    // Normalize storages in case algum meio falhou
    persistDayData(data);
  }

  return data;
}

export function persistDayData(data) {
  try {
    localStorage.setItem(STORAGE_KEYS.dayData, JSON.stringify(data));
  } catch (error) {
    console.warn('Não foi possível salvar o estado diário no localStorage:', error);
  }

  try {
    sessionStorage.setItem(STORAGE_KEYS.dayData, JSON.stringify(data));
  } catch (error) {
    console.warn('Não foi possível salvar o estado diário no sessionStorage:', error);
  }

  try {
    writeCookie(STORAGE_KEYS.dayData, JSON.stringify(data));
  } catch (error) {
    console.warn('Não foi possível salvar o estado diário no cookie:', error);
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
