# Teste manual rápido

Fluxos principais:
- Quebrar biscoito: clicar no biscoito intacto → toca som, gera migalhas, mostra tirinha (texto/números).
- Avançar estados: novo clique → `crumbs` (som de mastigar); terceiro clique → `clean` (cookie some, tirinha fica).
- Tirinha: clique para flip (frente/verso); arraste sem sair da área do palco, posição persiste ao recarregar.
- Mensagens: aviso diário aparece; após a primeira exibição, muda para refresh.
- Persistência diária: recarregar a página mantém estado, fortuna, números e posição; não volta para intacto.

Acessibilidade mínima:
- Tirinha focável (Tab) e flip com Enter/Espaço; `aria-pressed` reflete estado flipado.

Checklist visual:
- Sombra ajusta quando o biscoito está quebrado.
- Vinheta visível, cookie centralizado; tirinha com tilt/skew aleatório.

Compatibilidade:
- Mobile <520px: cookie e tirinha reduzem de tamanho; arraste continua funcional.***

## Inspeção com DevTools (2025-12-16)

- Contexto: Chrome DevTools com cache desativado (reload `ignoreCache=true`), servido via `http://localhost:8080` (python http.server).
- Desktop: percorri intact → broken → crumbs → clean; em cada estágio dei refresh ignorando cache e o estado (imagem, tirinha, números) persistiu. Flip da tirinha mostrou números; mensagens de estado alternaram conforme esperado.
- Console: primeiro load trouxe erro de importação por versão antiga em cache (`animateReveal`), resolvido com hard reload sem cache. Depois apenas avisos únicos ao recarregar sem storage (`Invalid data in sessionStorage`, fallback criou novo dia); sem impacto funcional.
- Mobile (390x844): layout ok com tirinha e mensagem de refresh visíveis (estado diário mantido). Arrastei a tirinha para o rodapé; posição persistiu após reload sem cache. Flip respondeu ao toque, números renderizados.
- Resultado: fluxo completo e persistência funcionam em desktop e responsivo; nenhum erro bloqueante observado.

### Correção troca de imagens (2025-12-16, tarde)
- Bug: picture mantinha o `srcset` inicial (cookie intacto) e ignorava o `img.src` atualizado, causando troca de estado sem trocar sprite e piscada do intacto no refresh.
- Fix: `updateCookieImage` agora sincroniza `<img src/srcset>` e `<source srcset/type>` com o estado atual; estado `clean` aplica data URI em ambos para evitar flash.
- Testes desktop: clique 1→4 alternou intact/broken/crumbs/clean com as imagens corretas; refresh `ignoreCache=true` manteve estado clean sem piscar o intacto.
- Testes mobile (390x844): refresh em estado clean mostrou tela limpa sem flash; tirinha e mensagem OK.
