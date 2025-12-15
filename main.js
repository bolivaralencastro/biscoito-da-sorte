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

const STATE_MESSAGES = {
  intact: {
    initial: [
      "Hoje tem mistério embrulhado em massa doce.",
      "O silêncio do biscoito parece saber mais que eu.",
      "Ele posa quieto, mas olha como se piscasse.",
      "A casca está rindo por dentro.",
      "Tem cheiro de segredo fresco.",
      "Parece parado, mas já faz planos.",
      "O croc está só esperando um pretexto.",
      "Ele finge ser só um biscoito. Tá bom.",
      "Olhos imaginários brilham nessa casquinha.",
      "Um sorriso mora entre essas dobras.",
      "A curiosidade cabe na palma da mão.",
      "Essa tranquilidade está armando algo.",
      "A surpresa cochila aqui dentro.",
      "O biscoito respira fundo, sem pressa.",
      "Parece uma lua de açúcar escondendo marés.",
      "O ar está meio elétrico perto dele.",
      "Ele é pequeno, mas anda cheio de assunto.",
      "Um enigma crocante repousa aqui.",
      "O acaso se encostou na mesa.",
      "Tem sorte perfumada dentro desse silêncio.",
      "O biscoito tá posando para a foto que ninguém tirou.",
      "A calma dele é convite disfarçado.",
      "Parece que a casca sabe meu nome.",
      "O clima está com gosto de estrear alguma coisa."
    ],
    refresh: [
      "Ele continua ali, tranquilo, como quem sabe esperar.",
      "Nada mudou: o biscoito segue fazendo charme.",
      "A casca ainda guarda o mesmo riso contido.",
      "O mistério descansou, mas não esqueceu de você.",
      "O silêncio voltou a se ajeitar na mesa.",
      "O biscoito permanece em pose de estátua engraçada.",
      "Seguimos na mesma página crocante.",
      "O segredo ainda está morando na casquinha.",
      "A calma permanece perfumada de curiosidade.",
      "O enigma só esticou as pernas.",
      "O biscoito ainda acha graça sem dizer nada.",
      "De novo ele, paciente, segurando o clima.",
      "O ar segue elétrico ao redor dele.",
      "O acaso continua encostado, bocejando.",
      "A pequena lua açucarada não saiu de órbita.",
      "O riso interno ficou de prontidão.",
      "A casca ainda cochicha sem som.",
      "O convite silencioso segue na mesa.",
      "A mesma calma, com gosto de espera boa.",
      "O segredo não se mudou; só reorganizou as gavetas.",
      "O biscoito ainda posa como obra em progresso.",
      "A curiosidade repousa, mas não dorme.",
      "O mesmo clima de estreia ficou de guarda.",
      "O biscoito permanece de olhos fechados, sonhando com você."
    ]
  },
  broken: {
    initial: [
      "O croc abriu passagem para a sorte.",
      "A casca riu alto: olha quem apareceu.",
      "Metade biscoito, metade revelação.",
      "A rachadura virou clarabóia.",
      "O papelzinho tomou ar e se esticou.",
      "Estilhaços de boa notícia voaram.",
      "A surpresa pulou da casca como quem chega atrasada.",
      "O barulho ainda ecoa na mesa.",
      "O biscoito agora usa cicatriz como medalha.",
      "Quebrar rendeu aroma e frase.",
      "A sorte se espreguiçou na luz.",
      "A tirinha piscou de volta para você.",
      "O crack veio com risada embutida.",
      "A brecha abriu um teatrinho de papel.",
      "O ritual rendeu croc e confidência.",
      "A mesa ganhou confete de casquinha.",
      "O biscoito suspirou aliviado: missão dada, missão cumprida.",
      "O segredo agora está com os cotovelos na janela.",
      "O universo distribuiu glitter de massa doce.",
      "A cicatriz brilhou mais que previsto.",
      "A sorte saiu com cheiro de forno.",
      "Essa rachadura parece sorriso largo.",
      "A mensagem se alongou igual gato ao sol.",
      "O crocante virou anúncio particular."
    ],
    refresh: [
      "A cicatriz continua elegante na mesa.",
      "O crack já passou, mas o clima ficou.",
      "A frase segue deitada no papel, em pose de diva.",
      "O biscoito quebrado permanece em silêncio confiante.",
      "O aroma de revelação ainda paira.",
      "Nada se recompôs, só se acomodou.",
      "A sorte continua esticando as pernas por aqui.",
      "O confete de casquinha permanece decorando a cena.",
      "A brecha mantém a janela aberta.",
      "A tirinha segue olhando para você com canto de olho.",
      "O barulho virou memória fresquinha.",
      "A cicatriz agora é assinatura do dia.",
      "O teatro de papel ficou em cartaz.",
      "A mensagem repousa, mas não perde a pose.",
      "O ritual deixou a mesa com ar de after.",
      "O sorriso rachado ainda brilha de leve.",
      "O universo deixou o glitter e foi tomar café.",
      "O crocante ecoa como música distante.",
      "O biscoito quebrado segue orgulhoso da façanha.",
      "A luz ainda atravessa a fresta.",
      "O segredo está sentado na beirada, apreciando a vista.",
      "A cena parou no tempo, feliz da vida.",
      "A revelação segue de braços cruzados, satisfeita.",
      "O crack virou trilha sonora imaginária."
    ]
  },
  crumbs: {
    initial: [
      "Restaram apenas fragmentos felizes.",
      "A festa terminou em poeira doce.",
      "O biscoito virou constelação na mesa.",
      "Farelo é confete que se recusou a ir embora.",
      "A sorte já foi saboreada; sobrou o pós-crédito.",
      "Migalhas contando piadas internas.",
      "O croc se dissolveu em risadas pequenas.",
      "Pequenos pedaços posando de lembrança.",
      "O chão da mesa parece céu estrelado.",
      "Os farelos cochicham “foi divertido”.",
      "A vitória deixou migalhas como pista.",
      "É o biscoito em modo epílogo.",
      "A crocância virou memória granulada.",
      "Farelo é a risada que ficou.",
      "Um tapete de migalhas com cheiro de piada pronta.",
      "A sorte já contou sua história e saiu de cena.",
      "O biscoito agora é suspiro em formato de pó.",
      "Pedaços pequenos fazendo pose de troféu.",
      "O palco ficou coberto de glitter crocante.",
      "Cada farelo parece dizer “valeu”.",
      "Migalhas são aplausos que não fizeram barulho.",
      "O enredo terminou e sobraram doces créditos finais.",
      "A mesa ganhou sardas douradas.",
      "O biscoito virou geografia em escala mini."
    ],
    refresh: [
      "Os farelos ainda riem baixo, espalhados.",
      "A poeira doce permanece no palco.",
      "A constelação crocante continua brilhando no tampo.",
      "O confete segue teimoso, decorando a mesa.",
      "O pós-crédito está em reprise silenciosa.",
      "As piadas internas ecoam só para quem sabe.",
      "A memória granulada ficou de vigia.",
      "Os troféus minúsculos seguem exibidos.",
      "O glitter crocante não desmontou o acampamento.",
      "O suspiro em pó continua suspenso no ar.",
      "As sardas douradas seguem charmosas.",
      "O epílogo permanece deitado, satisfeito.",
      "O chão da mesa ainda parece céu claro.",
      "Os aplausos mudos continuam presentes.",
      "A geografia mini mantém seus relevos.",
      "A crocância virou quadro na parede do tempo.",
      "Os créditos finais estão passando em loop gentil.",
      "Farelos seguem cochichando “foi bom mesmo”.",
      "O pós-festa ficou, sem pressa de sair.",
      "O glitter doce ainda brilha onde caiu.",
      "O cheiro de piada pronta não foi embora.",
      "A mesa guarda o rastro como recordação.",
      "As migalhas mantêm o humor em modo soneca.",
      "O croc virou poeira com personalidade."
    ]
  },
  clean: {
    initial: [
      "A mesa respira leve, como depois de um banho.",
      "Tudo ficou branco e sossegado.",
      "Silêncio bom, com cheirinho de missão cumprida.",
      "A paz chegou, tirou os sapatos e se sentou.",
      "A cena virou haicai em branco.",
      "Nenhum farelo, só ar de domingo.",
      "O dia ganhou espaço para caber outro sorriso.",
      "Mesa limpa é tipo suspiro que deu certo.",
      "A superfície parece nuvem comportada.",
      "Ficou apenas o eco crocante, bem baixinho.",
      "A história do biscoito virou memória fresca.",
      "O vazio está macio hoje.",
      "A tranquilidade se espreguiça no tampo liso.",
      "O descanso tem gosto de chá morno.",
      "A mesa está de linho invisível.",
      "O ciclo fechou e deixou perfume de nada bom.",
      "Ar organizado, humor em ordem.",
      "A serenidade estacionou por aqui.",
      "A luz bate e dança sem obstáculos.",
      "Parece que alguém passou um pano de poesia.",
      "A calma sorri sem dentes.",
      "A tela branca está pronta para o próximo rabisco.",
      "Esse silêncio tem textura de abraço.",
      "O cenário tirou férias de migalhas."
    ],
    refresh: [
      "Continua tudo claro, sem vestígios.",
      "A paz ficou morando na superfície lisa.",
      "O haicai branco segue escrito no ar.",
      "O ar de domingo não arredou pé.",
      "A nuvem comportada permanece estacionada.",
      "O eco crocante virou lembrança distante.",
      "A memória do biscoito segue suave, sem farelos.",
      "O vazio macio continua confortável.",
      "A tranquilidade permanece deitada no tampo.",
      "O chá morno ainda perfuma o ambiente.",
      "O linho invisível não amarrotou.",
      "O perfume de nada bom ficou por perto.",
      "O humor segue em ordem, sem migalhas.",
      "A serenidade renovou o aluguel.",
      "A luz continua dançando livre.",
      "O pano de poesia ainda brilha.",
      "O silêncio abraça de novo, sem pressa.",
      "A tela branca segue pronta para outra história.",
      "O cenário mantém férias prolongadas.",
      "O ciclo fechado virou moldura discreta.",
      "A calma permanece, rindo baixinho.",
      "O espaço livre ainda cabe mais um sorriso.",
      "A superfície lisa continua leve como um suspiro.",
      "O descanso ficou de guarda, satisfeito."
    ]
  }
};

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
let cleaned = false;
let audioCtx = null;
let dragging = false;
let dragOffset = { x: 0, y: 0 };
let moved = false;
let startPos = { x: 0, y: 0 };
const STORAGE_KEYS = {
  dayData: 'fortune:dayData'
};
const IMAGE_BASES = {
  intact: 'biscoito-inteiro',
  broken: 'biscoito-quebrado',
  crumbs: 'biscoito-farelo'
};
const EMPTY_DATA_URI = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

let imageFormat = 'png';
let cookieState = 'intact';
let dayData = null;
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
  if (cookieState === 'clean') {
    cookieImage.src = EMPTY_DATA_URI;
    return;
  }
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

function createDefaultDayData() {
  const today = getTodayKey();
  const { initial, refresh } = pickMessagesForState('intact');
  return {
    date: today,
    state: 'intact',
    text: '',
    numbers: '',
    crunched: false,
    cleaned: false,
    messageInitial: initial,
    messageRefresh: refresh,
    messageStage: 'initial'
  };
}

function loadDayData() {
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

  if (!data || data.date !== today) {
    data = createDefaultDayData();
    persistDayData(data);
  } else {
    const defaults = createDefaultDayData();
    data = { ...defaults, ...data, date: today };
  }

  return data;
}

function persistDayData(data = dayData) {
  try {
    localStorage.setItem(STORAGE_KEYS.dayData, JSON.stringify(data));
  } catch (error) {
    console.warn('Não foi possível salvar o estado diário no localStorage:', error);
  }

  try {
    writeCookie(STORAGE_KEYS.dayData, JSON.stringify(data));
  } catch (error) {
    console.warn('Não foi possível salvar o estado diário no cookie:', error);
  }
}

function pickMessagesForState(state) {
  const pool = STATE_MESSAGES[state] || STATE_MESSAGES.intact;
  const randomFrom = (list) => list[Math.floor(Math.random() * list.length)] || '';
  return {
    initial: randomFrom(pool.initial),
    refresh: randomFrom(pool.refresh)
  };
}

function ensureMessagesForState(state) {
  if (dayData.state !== state || !dayData.messageInitial || !dayData.messageRefresh) {
    const { initial, refresh } = pickMessagesForState(state);
    dayData.messageInitial = initial;
    dayData.messageRefresh = refresh;
    dayData.messageStage = 'initial';
  }
}

function updateDayData(partial) {
  dayData = { ...dayData, ...partial };
  persistDayData();
}

function showDailyLockNotice(message) {
  if (!dailyNotice) return;
  dailyNotice.textContent = message;
  dailyNotice.classList.add('visible');
}

function showCurrentMessage() {
  if (!dayData) return;
  const message = dayData.messageStage === 'initial' ? dayData.messageInitial : dayData.messageRefresh;
  if (message) {
    showDailyLockNotice(message);
    if (dayData.messageStage === 'initial') {
      dayData.messageStage = 'refresh';
      persistDayData();
    }
  }
}

function applyStateVisuals(state) {
  cookieImage.classList.remove('broken', 'crumbled', 'cleaned');
  switch (state) {
    case 'broken':
      broken = true;
      crunched = false;
      cleaned = false;
      cookieState = 'broken';
      cookieImage.classList.add('broken');
      cookieImage.alt = 'Biscoito da sorte quebrado';
      break;
    case 'crumbs':
      broken = true;
      crunched = true;
      cleaned = false;
      cookieState = 'crumbs';
      cookieImage.classList.add('broken', 'crumbled');
      cookieImage.alt = 'Biscoito da sorte em farelos';
      break;
    case 'clean':
      broken = true;
      crunched = true;
      cleaned = true;
      cookieState = 'clean';
      cookieImage.classList.add('cleaned');
      cookieImage.alt = 'Ambiente limpo, sem biscoito';
      break;
    case 'intact':
    default:
      broken = false;
      crunched = false;
      cleaned = false;
      cookieState = 'intact';
      cookieImage.alt = 'Biscoito da sorte fechado';
      break;
  }
  updateCookieImage();
  updateShadow();
}

function syncFortuneStripFromData() {
  if (!dayData) return;
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
  if (!dayData) return;
  const currentState = dayData.state;

  if (currentState === 'clean') {
    showCurrentMessage();
    return;
  }

  if (currentState === 'crumbs') {
    cleanAfterCrumbs();
    ensureMessagesForState('clean');
    updateDayData({
      state: 'clean',
      crunched: true,
      cleaned: true,
      messageStage: dayData.messageStage
    });
    showCurrentMessage();
    return;
  }

  if (currentState === 'broken') {
    playChew();
    ensureMessagesForState('crumbs');
    applyStateVisuals('crumbs');
    updateDayData({
      state: 'crumbs',
      crunched: true,
      cleaned: false,
      messageStage: dayData.messageStage
    });
    showCurrentMessage();
    return;
  }

  // intact -> quebrado
  ensureMessagesForState('broken');
  applyStateVisuals('broken');
  playCrack();
  spawnCrumbs();

  const { text, numbers } = revealFortune();
  updateDayData({
    state: 'broken',
    text,
    numbers,
    crunched: false,
    cleaned: false,
    messageStage: dayData.messageStage
  });
  showCurrentMessage();
}

function updateShadow() {
  const shadow = document.querySelector('.cookie-shadow');
  if (shadow) {
    if (cleaned) {
      shadow.style.opacity = '0';
      shadow.style.background = 'none';
      shadow.style.filter = 'blur(0px) contrast(1)';
    } else if (broken) {
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

dayData = loadDayData();
ensureMessagesForState(dayData.state);
applyStateVisuals(dayData.state);
syncFortuneStripFromData();

requestAnimationFrame(() => {
  document.body.classList.remove('app-loading');
  showCurrentMessage();
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

function clearLooseCrumbs() {
  document.querySelectorAll('.crumb').forEach(crumb => crumb.remove());
}

function cleanAfterCrumbs() {
  cleaned = true;
  broken = true;
  crunched = true;
  cookieState = 'clean';
  cookieImage.classList.remove('crumbled', 'broken');
  cookieImage.classList.add('cleaned');
  cookieImage.alt = 'Ambiente limpo, sem biscoito';
  updateCookieImage();
  clearLooseCrumbs();
  updateShadow();
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
