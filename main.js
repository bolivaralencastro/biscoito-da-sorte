const baseFortunes = [
  "Hoje você encontra respostas no silêncio.",
  "A sorte favorece quem se movimenta agora.",
  "Seu próximo passo é o mais importante.",
  "Olhe com gentileza para si mesmo hoje.",
  "Algo pequeno vai abrir uma porta enorme.",
  "Você já tem o que precisa para começar.",
  "Respire fundo: clareza vem com calma.",
  "Compartilhe uma boa ideia ainda hoje.",
  "Seu plano ficará mais simples que o esperado.",
  "A pausa é tão valiosa quanto a ação.",
  "A amizade duplica as alegrias e divide as tristezas.",
  "A amizade é como um tesouro, difícil de encontrar e difícil de perder.",
  "A amizade é um amor que nunca morre.",
  "A bondade é a linguagem que os surdos podem ouvir e os cegos podem ver.",
  "A coragem não é a ausência de medo, mas o triunfo sobre ele.",
  "A criatividade é a inteligência se divertindo.",
  "A educação é a arma mais poderosa que você pode usar para mudar o mundo.",
  "A esperança é a coisa com penas que pousa na alma.",
  "A esperança é a última que morre.",
  "A esperança é um sonho acordado.",
  "A felicidade não é algo pronto. Ela vem de suas próprias ações.",
  "A felicidade não é ter o que você quer, mas querer o que você tem.",
  "A felicidade é a única coisa que se multiplica quando é dividida.",
  "A felicidade é uma borboleta que, quando perseguida, está sempre além do seu alcance.",
  "A felicidade é uma escolha, não um resultado.",
  "A gratidão é a memória do coração.",
  "A humildade é a base de todas as virtudes.",
  "A imaginação é a prévia das atrações vindouras da vida.",
  "A imaginação é mais importante que o conhecimento.",
  "A liberdade é a capacidade de escolher a própria vida.",
  "A maior glória não é nunca cair, mas levantar-se sempre depois de uma queda.",
  "A paciência é amarga, mas seu fruto é doce.",
  "A paz começa com um sorriso.",
  "A persistência realiza o impossível.",
  "A simplicidade é o último grau de sofisticação.",
  "A sorte favorece a mente preparada.",
  "A verdadeira amizade resiste ao tempo, à distância e ao silêncio.",
  "A verdadeira riqueza é a saúde, não peças de ouro e prata.",
  "A verdadeira sabedoria está em reconhecer a própria ignorância.",
  "A vida é 10% o que acontece com você e 90% como você reage a isso.",
  "A vida é feita de escolhas. Escolha ser feliz.",
  "A vida é o que acontece enquanto você está ocupado fazendo outros planos.",
  "A vida é uma aventura ousada ou não é nada.",
  "A vida é uma escola, e a experiência é a melhor professora.",
  "A vida é uma jornada, não um destino.",
  "A vida é uma oportunidade, aproveite-a.",
  "A vida é uma peça de teatro que não permite ensaios.",
  "A vida é uma viagem, não um destino.",
  "Acredite em si mesmo e tudo será possível.",
  "Acredite que você pode e você já está no meio do caminho.",
  "No meio da dificuldade encontra-se a oportunidade.",
  "Não espere por oportunidades, crie você mesmo.",
  "O conhecimento é poder.",
  "O fracasso é simplesmente a oportunidade de começar de novo, desta vez de forma mais inteligente.",
  "O otimista vê a rosa e não os espinhos; o pessimista fixa nos espinhos, esquecendo a rosa.",
  "O sucesso é a soma de pequenos esforços repetidos dia após dia.",
  "O sucesso é ir de fracasso em fracasso sem perder o entusiasmo.",
  "O único modo de fazer um excelente trabalho é amar o que você faz."
];

let fortunes = [...baseFortunes];

function loadFortunesFromJson() {
  fetch('sortes_do_dia.json')
    .then(response => {
      if (!response.ok) throw new Error('HTTP ' + response.status);
      return response.json();
    })
    .then(data => {
      const jsonTexts = data.map(item => item.text).filter(Boolean);
      const unique = Array.from(new Set([...fortunes, ...jsonTexts]));
      fortunes = unique;
    })
    .catch(error => {
      console.error('Erro ao carregar frases externas, usando base local:', error);
    });
}

loadFortunesFromJson();
document.body.classList.add('app-loading');

const cookieImage = document.getElementById('cookieImage');
const fortuneStrip = document.getElementById('fortuneStrip');
const fortuneText = document.getElementById('fortuneText');
const luckyNumbers = document.getElementById('luckyNumbers');
const stage = document.querySelector('.stage');
const cookieZone = document.querySelector('.cookie-zone');
const fortuneInner = document.querySelector('.fortune-inner');
const dailyNotice = document.getElementById('dailyNotice');

let broken = false;
let crunched = false;
let audioCtx = null;
let dragging = false;
let dragOffset = { x: 0, y: 0 };
let moved = false;
let startPos = { x: 0, y: 0 };
const STORAGE_KEYS = {
  date: 'fortune:lastBreakDate',
  text: 'fortune:lastText',
  numbers: 'fortune:lastNumbers',
  crunched: 'fortune:lastCrunched'
};
const IMAGE_BASES = {
  intact: 'biscoito-inteiro',
  broken: 'biscoito-quebrado',
  crumbs: 'biscoito-farelo'
};

let imageFormat = 'png';
let cookieState = 'intact';
detectWebpSupport().then(supported => {
  if (supported) {
    imageFormat = 'webp';
    updateCookieImage();
  }
});

function getCookieCenter() {
  const stageRect = stage.getBoundingClientRect();
  const cookieRect = cookieImage.getBoundingClientRect();

  return {
    x: cookieRect.left - stageRect.left + cookieRect.width / 2,
    y: cookieRect.top - stageRect.top + cookieRect.height / 2,
    stageRect
  };
}

function detectWebpSupport() {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve(img.width === 1);
    img.onerror = () => resolve(false);
    img.src = 'data:image/webp;base64,UklGRiIAAABXRUJQVlA4ICwAAAAvAAAAAAMQAAAAAAAAAAAAAAAAAAAAAAAAAAAAQUxQSAwAAAA0AIAnQEQAA';
  });
}

function updateCookieImage() {
  const base = IMAGE_BASES[cookieState] || IMAGE_BASES.intact;
  cookieImage.src = `${base}.${imageFormat}`;
}

function getTodayKey() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
}

function readCookie(name) {
  const match = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : null;
}

function writeCookie(name, value, maxAgeSeconds = 172800) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeSeconds}; samesite=lax`;
}

function getStoredLock() {
  const today = getTodayKey();
  let date = null;
  let text = null;
  let numbers = null;
  let crunchedState = false;

  try {
    date = localStorage.getItem(STORAGE_KEYS.date);
    text = localStorage.getItem(STORAGE_KEYS.text);
    numbers = localStorage.getItem(STORAGE_KEYS.numbers);
    crunchedState = localStorage.getItem(STORAGE_KEYS.crunched) === 'true';
  } catch (error) {
    console.warn('LocalStorage indisponível, tentando cookie:', error);
  }

  if (!date) {
    const cookieData = readCookie('fortuneLock');
    if (cookieData) {
      try {
        const parsed = JSON.parse(cookieData);
        date = parsed.date;
        text = parsed.text;
        numbers = parsed.numbers;
        crunchedState = Boolean(parsed.crunched);
      } catch (error) {
        console.warn('Não foi possível ler o cookie de trava diária:', error);
      }
    }
  }

  return { date, text, numbers, crunched: crunchedState, todayMatch: date === today };
}

function isLockedToday() {
  const lock = getStoredLock();
  return lock.todayMatch;
}

function saveTodayFortune(text, numbers, crunchedState = false) {
  const today = getTodayKey();
  try {
    localStorage.setItem(STORAGE_KEYS.date, today);
    localStorage.setItem(STORAGE_KEYS.text, text);
    localStorage.setItem(STORAGE_KEYS.numbers, numbers);
    localStorage.setItem(STORAGE_KEYS.crunched, String(crunchedState));
  } catch (error) {
    console.warn('Não foi possível salvar a trava diária no localStorage:', error);
  }

  try {
    writeCookie('fortuneLock', JSON.stringify({ date: today, text, numbers, crunched: crunchedState }));
  } catch (error) {
    console.warn('Não foi possível salvar a trava diária no cookie:', error);
  }
}

function showDailyLockNotice(message) {
  if (!dailyNotice) return;
  dailyNotice.textContent = message;
  dailyNotice.classList.add('visible');
}

function restoreTodayFortune() {
  const lock = getStoredLock();
  if (!lock.todayMatch) return false;

  const storedFortune = lock.text || 'Sua sorte do dia já foi revelada.';
  const storedNumbers = lock.numbers || '';

  broken = true;
  cookieState = lock.crunched ? 'crumbs' : 'broken';
  updateCookieImage();
  cookieImage.alt = lock.crunched ? 'Biscoito da sorte em farelos' : 'Biscoito da sorte quebrado';
  cookieImage.classList.add('broken');
  if (lock.crunched) {
    crunched = true;
    cookieImage.classList.add('crumbled');
  }
  updateShadow();

  revealFortune({
    fortuneTextOverride: storedFortune,
    numbersOverride: storedNumbers,
    skipAnimation: true
  });

  const refreshMessage = lock.crunched
    ? 'Só farelo por aqui. Amanhã tem biscoito novo.'
    : 'A sorte já saiu! Aproveite a tirinha e agora é só comer o biscoito.';
  showDailyLockNotice(refreshMessage);
  return true;
}

function randomFortune() {
  const index = Math.floor(Math.random() * fortunes.length);
  return fortunes[index];
}

function generateNumbers() {
  const nums = new Set();
  while (nums.size < 6) {
    nums.add(Math.floor(Math.random() * 60) + 1);
  }
  return Array.from(nums)
    .sort((a, b) => a - b)
    .map(n => n.toString().padStart(2, '0'))
    .join("  -  ");
}

function revealFortune(options = {}) {
  const {
    fortuneTextOverride,
    numbersOverride,
    skipAnimation = false
  } = options;

  fortuneStrip.classList.remove('revealed');
  fortuneStrip.classList.remove('flipped');
  const chosenFortune = fortuneTextOverride || randomFortune();
  const chosenNumbers = numbersOverride || generateNumbers();

  fortuneText.textContent = chosenFortune;
  luckyNumbers.textContent = chosenNumbers;
  positionStripAboveCookie();
  randomizeTilt();

  // Força reflow para reiniciar a animação da tirinha
  void fortuneStrip.offsetWidth;
  fortuneInner.style.transform = 'rotateY(0deg)';
  if (window.gsap) {
    gsap.set(fortuneStrip, { rotationY: 0, rotationX: 0, transformPerspective: 1200, transformOrigin: '50% 50%' });
  }
  fortuneStrip.classList.add('revealed');
  if (!skipAnimation) {
    animateRevealWithGsap();
  }
  return { text: chosenFortune, numbers: chosenNumbers };
}

function playCrack() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }

  const now = audioCtx.currentTime;

  // Ruído principal (crunch)
  const duration = 0.14 + Math.random() * 0.04;
  const buffer = audioCtx.createBuffer(1, Math.floor(audioCtx.sampleRate * duration), audioCtx.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < data.length; i++) {
    const t = i / data.length;
    const envelope = Math.pow(1 - t, 2.8);
    const grain = Math.round((Math.random() * 2 - 1) * 8) / 8; // leve bit crush
    const wobble = Math.sin(t * 35) * 0.08;
    data[i] = (grain + wobble) * envelope * 0.9;
  }

  const crunch = audioCtx.createBufferSource();
  crunch.buffer = buffer;

  const band = audioCtx.createBiquadFilter();
  band.type = 'bandpass';
  band.frequency.value = 2400;
  band.Q.value = 0.9;

  const highPass = audioCtx.createBiquadFilter();
  highPass.type = 'highpass';
  highPass.frequency.value = 350;

  const crunchGain = audioCtx.createGain();
  crunchGain.gain.value = 0.45;

  crunch.connect(band).connect(highPass).connect(crunchGain).connect(audioCtx.destination);
  crunch.start(now);

  // Estalinhos aleatórios (craquelado)
  const crackles = 5 + Math.floor(Math.random() * 4); // 5-8
  for (let p = 0; p < crackles; p++) {
    const burst = audioCtx.createBuffer(1, audioCtx.sampleRate * (0.012 + Math.random() * 0.01), audioCtx.sampleRate);
    const d = burst.getChannelData(0);

    for (let i = 0; i < d.length; i++) {
      const t = i / d.length;
      const env = Math.pow(1 - t, 3.5);
      d[i] = (Math.random() * 2 - 1) * env;
    }

    const src = audioCtx.createBufferSource();
    const crackleHP = audioCtx.createBiquadFilter();
    crackleHP.type = 'highpass';
    crackleHP.frequency.value = 1800 + Math.random() * 600;

    const g = audioCtx.createGain();
    g.gain.value = 0.15 + Math.random() * 0.18;

    src.buffer = burst;
    src.connect(crackleHP).connect(g).connect(audioCtx.destination);

    const offset = now + 0.01 * p + Math.random() * 0.02;
    src.start(offset);
  }
}

function playChew() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }

  const now = audioCtx.currentTime + 0.05;

  const scheduleGrain = (durationMs, highPassFreq, gainValue, startTime) => {
    const length = Math.max(1, Math.floor(audioCtx.sampleRate * (durationMs / 1000)));
    const buffer = audioCtx.createBuffer(1, length, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < length; i++) {
      const t = i / length;
      const envelope = Math.exp(-t * 15); // decaimento rápido
      const noise = (Math.random() * 2 - 1) * envelope;
      data[i] = noise;
    }

    const src = audioCtx.createBufferSource();
    src.buffer = buffer;

    const highPass = audioCtx.createBiquadFilter();
    highPass.type = 'highpass';
    highPass.frequency.value = highPassFreq;
    highPass.Q.value = 0.9;

    const gain = audioCtx.createGain();
    gain.gain.value = gainValue;

    src.connect(highPass).connect(gain).connect(audioCtx.destination);
    src.start(startTime);
  };

  const addBite = (startOffsetSec, intensity = 1, grainCount = 50) => {
    const baseTime = now + startOffsetSec;
    // Estalo principal
    scheduleGrain(80, 1200, 0.8 * intensity, baseTime);
    // Farelos logo depois
    for (let g = 0; g < grainCount; g++) {
      const delayMs = Math.random() * 150;
      const durMs = 5 + Math.random() * 25;
      const freq = 2000 + Math.random() * 4000;
      const vol = (0.05 + Math.random() * 0.35) * intensity;
      scheduleGrain(durMs, freq, vol, baseTime + delayMs / 1000);
    }
  };

  addBite(0.2, 1.0, 80); // mordida grande
  addBite(0.6, 0.5, 30); // reajuste rápido
  addBite(1.0, 0.3, 20); // trituração final
}

function breakCookie() {
  if (broken && !crunched) {
    playChew();
    cookieState = 'crumbs';
    updateCookieImage();
    cookieImage.alt = 'Biscoito da sorte em farelos';
    cookieImage.classList.add('crumbled');
    crunched = true;
    saveTodayFortune(fortuneText.textContent || '', luckyNumbers.textContent || '', true);
    return;
  }

  if (broken && crunched) {
    showDailyLockNotice('Só farelo por aqui. Amanhã tem biscoito novo.');
    return;
  }

  if (isLockedToday()) {
    showDailyLockNotice('Esse biscoito já foi saboreado hoje.\nAmanhã tem outro, combinado?');
    return;
  }

  cookieState = 'broken';
  updateCookieImage();
  cookieImage.alt = 'Biscoito da sorte quebrado';
  broken = true;
  cookieImage.classList.add('broken');
  playCrack();
  spawnCrumbs();
  updateShadow();

  const { text, numbers } = revealFortune();
  saveTodayFortune(text, numbers, false);
  showDailyLockNotice('Biscoito servido! Amanhã tem outro esperando você.');
}

function updateShadow() {
  const shadow = document.querySelector('.cookie-shadow');
  if (shadow) {
    if (broken) {
      shadow.classList.add('broken');
      // Sombra mais suave para biscoito quebrado
      shadow.style.background = 'radial-gradient(ellipse at center, rgba(0, 0, 0, 0.08) 0%, rgba(0, 0, 0, 0.04) 50%, transparent 80%)';
      shadow.style.filter = 'blur(10px) contrast(1.1)';
      shadow.style.opacity = '0.28';
    } else {
      shadow.classList.remove('broken');
      // Sombra mais definida para biscoito intacto
      shadow.style.background = 'radial-gradient(ellipse at center, rgba(0, 0, 0, 0.12) 0%, rgba(0, 0, 0, 0.08) 40%, rgba(0, 0, 0, 0.02) 80%, transparent 100%)';
      shadow.style.filter = 'blur(12px) contrast(1.2)';
      shadow.style.opacity = '0.36';
    }
  }
}

cookieImage.addEventListener('click', breakCookie);

function positionStripAboveCookie() {
  const { x: centerX, y: centerY, stageRect } = getCookieCenter();
  const stripRect = fortuneStrip.getBoundingClientRect();
  const gap = 14;
  const stripHeight = stripRect.height || 70;

  const targetY = centerY - stripHeight - gap;
  const margin = 12;
  const clampedX = Math.min(Math.max(centerX, margin), stageRect.width - margin);
  const clampedY = Math.max(margin, targetY);

  if (window.gsap) {
    gsap.set(fortuneStrip, { left: clampedX, top: clampedY });
  } else {
    fortuneStrip.style.left = `${clampedX}px`;
    fortuneStrip.style.top = `${clampedY}px`;
  }
}

function onPointerDown(event) {
  if (!fortuneStrip.classList.contains('revealed')) return;
  dragging = true;

  const rect = fortuneStrip.getBoundingClientRect();
  dragOffset.x = event.clientX - rect.left;
  dragOffset.y = event.clientY - rect.top;
  moved = false;
  startPos.x = event.clientX;
  startPos.y = event.clientY;

  fortuneStrip.setPointerCapture(event.pointerId);
}

function onPointerMove(event) {
  if (!dragging) return;

  const deltaX = Math.abs(event.clientX - startPos.x);
  const deltaY = Math.abs(event.clientY - startPos.y);
  if (deltaX > 3 || deltaY > 3) {
    moved = true;
  }

  const stageRect = stage.getBoundingClientRect();
  const stripRect = fortuneStrip.getBoundingClientRect();
  const margin = 12;

  const desiredLeft = event.clientX - stageRect.left - dragOffset.x;
  const desiredTop = event.clientY - stageRect.top - dragOffset.y;

  const minVisualX = margin;
  const maxVisualX = stageRect.width - stripRect.width - margin;
  const minVisualY = margin;
  const maxVisualY = stageRect.height - stripRect.height - margin;

  const clampedX = Math.min(Math.max(desiredLeft, minVisualX), maxVisualX);
  const clampedY = Math.min(Math.max(desiredTop, minVisualY), maxVisualY);

  // Convert visual top/left back to centered coordinates (due ao translate -50%)
  const cssLeft = clampedX + stripRect.width / 2;
  const cssTop = clampedY + stripRect.height / 2;

  fortuneStrip.style.left = `${cssLeft}px`;
  fortuneStrip.style.top = `${cssTop}px`;
}

function onPointerUp(event) {
  if (!dragging) return;
  dragging = false;
  fortuneStrip.releasePointerCapture(event.pointerId);

  if (!moved && fortuneStrip.classList.contains('revealed')) {
    toggleFlip();
  }
}

fortuneStrip.addEventListener('pointerdown', onPointerDown);
fortuneStrip.addEventListener('pointermove', onPointerMove);
fortuneStrip.addEventListener('pointerup', onPointerUp);
fortuneStrip.addEventListener('pointercancel', onPointerUp);
window.addEventListener('resize', () => {
  if (fortuneStrip.classList.contains('revealed')) {
    positionStripAboveCookie();
  }
});
restoreTodayFortune();
updateShadow();
requestAnimationFrame(() => {
  document.body.classList.remove('app-loading');
});

function randomizeTilt() {
  const tiltMagnitude = 4 + Math.random() * 9; // mínimo 4deg para ser perceptível
  const tilt = (Math.random() < 0.5 ? -tiltMagnitude : tiltMagnitude).toFixed(2);
  const skew = (Math.random() * 2.8 - 1.4).toFixed(2); // -1.4deg a 1.4deg
  fortuneStrip.style.setProperty('--tilt', `${tilt}deg`);
  fortuneStrip.style.setProperty('--skew', `${skew}deg`);
}

function animateRevealWithGsap() {
  if (!window.gsap) return;
  gsap.fromTo(
    fortuneStrip,
    { autoAlpha: 0, y: '+=14' },
    { autoAlpha: 1, y: '-=14', duration: 0.28, ease: 'power2.out' }
  );
}

function toggleFlip() {
  fortuneStrip.classList.toggle('flipped');
  const flipped = fortuneStrip.classList.contains('flipped');

  if (window.gsap) {
    const tl = gsap.timeline();
    tl.to(fortuneStrip, {
      rotationY: flipped ? 180 : 0,
      rotationX: 0,
      duration: 0.5,
      ease: 'power2.inOut',
      transformPerspective: 1200,
      transformOrigin: '50% 50%'
    }, 0);

    tl.to(fortuneInner, {
      scaleX: flipped ? 0.94 : 1,
      skewY: flipped ? 2 : 0,
      duration: 0.22,
      ease: 'power2.inOut'
    }, 0).to(fortuneInner, {
      scaleX: 1,
      skewY: 0,
      duration: 0.24,
      ease: 'power2.out'
    }, 0.22);

    tl.to(fortuneStrip, {
      '--flip-shade': flipped ? 0.2 : 0,
      duration: 0.45,
      ease: 'power2.inOut'
    }, 0);
  } else {
    fortuneInner.style.transform = flipped ? 'rotateY(180deg)' : 'rotateY(0deg)';
  }
}

function spawnCrumbs() {
  const stageRect = stage.getBoundingClientRect();
  const cookieRect = cookieImage.getBoundingClientRect();

  const originX = cookieRect.left - stageRect.left + cookieRect.width / 2;
  const originY = cookieRect.top - stageRect.top + cookieRect.height * 0.45;

  const count = 12 + Math.floor(Math.random() * 6);

  for (let i = 0; i < count; i++) {
    const crumb = document.createElement('div');
    crumb.className = 'crumb';

    const size = 3 + Math.random() * 5;
    const tx = (Math.random() * 140 - 70);
    const ty = 40 + Math.random() * 110;

    crumb.style.width = `${size}px`;
    crumb.style.height = `${size}px`;
    crumb.style.left = `${originX}px`;
    crumb.style.top = `${originY}px`;
    crumb.style.setProperty('--tx', `${tx}px`);
    crumb.style.setProperty('--ty', `${ty}px`);

    stage.appendChild(crumb);

    setTimeout(() => {
      crumb.remove();
    }, 1100);
  }
}
