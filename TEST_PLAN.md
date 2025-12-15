# Roteiro de Testes – Biscoito da Sorte (lançamento)

## Objetivo
Validar UX básica, assets, mensagens e persistência diária antes de divulgação pública.

## Contextos
- Testar em desktop e mobile (ou modo responsivo) no ambiente publicado (GH Pages em subpath `/biscoito-da-sorte/`).
- Navegador com console/network aberto para capturar erros/404.

## Checklist funcional
1) **Carregamento inicial**
   - Página abre sem erros no console.
   - Sem 404 para `data/fortunes.json`, `data/messages/*.json`, `assets/images/*`, favicons.
   - Mensagem inicial do estado intacto aparece.

2) **Quebrar o biscoito (estado -> broken)**
   - Ao clicar, som de crack toca (não estoura volume).
   - Tirinha aparece com sorte e números.
   - Mensagem inicial do estado quebrado é exibida.
   - Imagem muda para biscoito quebrado + sombra ajustada.

3) **Virar tirinha**
   - Clique/tap na tirinha alterna frente/verso sem glitch.
   - Drag funciona em touch/mouse sem perder o centro da tela.

4) **Mastigar (broken -> crumbs)**
   - Segundo clique no biscoito toca som de mastigar.
   - Imagem vira farelos; sombra some/fica suave.
   - Mensagem inicial do estado farelos aparece.

5) **Limpar (crumbs -> clean)**
   - Terceiro clique limpa a mesa (imagem some sem flash do biscoito inteiro).
   - Mensagem inicial do estado limpo aparece; sombra some.

6) **Refresh em cada estado**
   - Dar refresh nos estados broken, crumbs e clean e confirmar que o mesmo estado volta e mostra mensagem de refresh correspondente (não volta a uma fase anterior, não muda sorte/números).

7) **Lock diário**
   - Após revelar a sorte, novo refresh não gera outra sorte (mesma frase/números mantidos no dia).

8) **Responsividade**
   - Tirinha não sai da viewport em mobile; texto quebra naturalmente.
   - Botões/áreas clicáveis acessíveis (cursor/touch ok).

9) **Metadados/Assets**
   - Favicons carregam (inspecionar network ou barra do navegador).
   - OG image acessível via URL direta (`assets/images/og-image.png`/`.webp`).

10) **Performance/estabilidade**
   - Sem travamentos; animações fluem.
   - Nenhum erro recorrente no console após todas as interações.

## Observações a capturar
- Textos quebrando errado ou linhas cortadas em mobile.
- Áudio muito alto/baixo ou travando interação.
- Drag da tirinha saindo do palco ou perdendo o translate de centragem.
- Qualquer 404 ou erro de CORS (subpath GH Pages).

## Se algo falhar
- Anotar estado em que estava, ação realizada, mensagem/erro no console e print se possível.
- Verificar se o path carregado tem barra inicial (`/data/...`); paths devem ser relativos.

