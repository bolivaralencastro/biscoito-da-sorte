# src/css — guia rápido de estilos

## Tokens (base.css)
- Cores: `--text #1a1a1a`, `--muted #7a7a7a`, `--paper #fff`, `--paper-shadow rgba(0,0,0,0.07)`, `--outline #e5e5e5`, `--accent #f0a95a`, `--numbers #d26464`.
- Fonte: "Helvetica Neue", Arial, sans-serif; fundo branco; grid centralizado.

## Componentes
- `components/layout.css`: header/footer fixos, aviso diário (`.daily-notice`), palco `.stage` (grid full viewport, perspective), sombra procedural `.cookie-shadow`, vinheta `.vignette-overlay`.
- `components/cookie.css`: dimensões do biscoito, estados (`.broken`, `.cleaned`), responsivo em 520px.
- `components/fortune-strip.css`: tirinha (tilt/skew, flip 3D, sombras), texto `#fortuneText`, números `#luckyNumbers` (cor `--numbers`), arraste (cursor grab), break em 520px.
- `components/animations.css`: migalhas `.crumb` + `@keyframes crumb-fall`.

## Responsivo e estados
- Breakpoint único em 520px para reduzir largura do biscoito e tirinha.
- Tirinha: classes `revealed`, `flipped`; usa CSS 3D e variáveis `--tilt`, `--skew`, `--flip-shade`.
- Sombra: `.cookie-shadow.broken` contrai ao quebrar.

Use as variáveis de `base.css` como fonte da paleta; mantenha novas cores/espaços como tokens para evitar espalhar literals.***
