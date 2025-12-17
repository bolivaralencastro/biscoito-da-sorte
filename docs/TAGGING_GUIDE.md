# Convenções de nomes e busca

- Prefira prefixos claros por domínio: `cookie*` (imagens/estado), `fortune*` (tirinha), `message*` (mensagens), `storage*` (persistência).
- IDs/Classes no DOM seguem os componentes principais: `#cookieImage`, `#fortuneStrip`, `.fortune-strip`, `.cookie-shadow`, `.daily-notice`.
- Estados: use os nomes do `DEFAULT_COOKIE_STATE` (`intact`, `broken`, `crumbs`, `clean`) em classes/variáveis para fácil grep.
- Variáveis CSS: adicione novos tokens em `base.css` (cores, espaçamentos) em vez de valores soltos.
- Funções de som/animação: mantenha nomes verbais (`playCrack`, `createCrumbsAnimation`, `randomizeTilt`).
- Ao adicionar módulos, descreva em `src/js/README.md` e referencie dependências em `docs/MODULE_CATALOG.md`.***
