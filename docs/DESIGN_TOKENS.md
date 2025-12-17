# Design tokens e guias rápidos

Fonte: `src/css/base.css` e componentes.

## Cores
- `--text` `#1a1a1a` (texto)
- `--muted` `#7a7a7a` (texto secundário)
- `--paper` `#ffffff` (fundo da tirinha)
- `--paper-shadow` `rgba(0,0,0,0.07)` (sombras suaves)
- `--outline` `#e5e5e5` (bordas claras)
- `--accent` `#f0a95a` (destaques/acentos)
- `--numbers` `#d26464` (números da sorte)

## Tipografia
- Primária: "Helvetica Neue", Arial, sans-serif.
- Tamanhos principais: tirinha ~0.9rem; avisos/rodapé ~0.7–0.8rem.

## Espaçamentos e dimensões
- Cookie: largura 260px (210px em <520px).
- Tirinha: largura `clamp(240px, 88vw, 340px)`; padding 10px 22px.
- Margens internas do aviso (`.daily-notice`): padding 6px 10px; max-width 440px.

## Efeitos e animações
- Sombra do cookie: radial + blur; variante `.broken` reduz escala.
- Tirinha: tilt/skew via variáveis `--tilt`, `--skew`; flip 3D com `rotateY`.
- Migalhas: `.crumb` + `@keyframes crumb-fall` (opacidade -> 0, translate, blur leve).

## Responsivo
- Breakpoint em 520px: reduz cookie e tirinha; demais elementos escalam pelo clamp/vw.

Como usar: ao adicionar novos estilos, derive cores de `:root` e mantenha dimensões escaláveis (clamp/vw). Use variáveis existentes para manter consistência visual.***
