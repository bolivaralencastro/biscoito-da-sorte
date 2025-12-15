# Biscoito da Sorte

Um biscoito da sorte interativo: toque para quebrar, leia a tirinha, vire para ver números da sorte e arraste para reposicionar. Todo o conteúdo roda no navegador, sem build ou servidor.

## Como usar
- Baixe/clonar e abra `index.html` no navegador.
- Clique no biscoito para quebrar; um som curto toca e migalhas caem.
- Clique na tirinha para virar entre frase e números; arraste para mover.

## O que há aqui
- HTML/CSS/JS vanilla, sem dependências.
- Frases locais em `main.js` e `sortes_do_dia.json`; novas mensagens são mescladas automaticamente.
- Números da sorte gerados aleatoriamente de 01 a 60.
- Assets: `biscoito-inteiro.png`, `biscoito-quebrado.png` e estilos em `style.css`.
- **Vinheta suave**: Efeito de foco sutil com gradiente radial quase branco.
- **OpenGraph**: Meta tags para compartilhamento rico em redes sociais.
- **Favicon**: Ícone de biscoito da sorte em SVG.

## Personalização rápida
- Acrescente frases em `sortes_do_dia.json` (campo `text`) ou no array `baseFortunes` em `main.js`.
- Ajuste cores e sombras em `style.css` (variáveis `:root`).
- Troque as imagens do biscoito mantendo o mesmo nome de arquivo para reaproveitar o código.
- Personalize as meta tags OpenGraph em `index.html` para SEO e compartilhamento social.

## OpenGraph e SEO
O projeto inclui meta tags completas para compartilhamento em redes sociais:
- **Facebook/LinkedIn**: Tags OpenGraph (`og:title`, `og:description`, `og:image`)
- **Twitter/X**: Twitter Cards com imagem grande
- **SEO**: Descrição, palavras-chave e autor
- **Favicon**: Ícone SVG embutido

Para testar o compartilhamento:
1. Hospede o projeto em um servidor
2. Use o [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) ou [Twitter Card Validator](https://cards-dev.twitter.com/validator)
3. Compartilhe o link em redes sociais para ver a pré-visualização rica

## Analytics com Microsoft Clarity
O projeto está configurado para usar o [Microsoft Clarity](https://clarity.microsoft.com/), uma ferramenta gratuita de analytics que fornece:
- **Gravações de sessões**: Veja como os usuários interagem com seu site
- **Mapas de calor**: Identifique áreas de maior engajamento
- **Métricas de desempenho**: Tempo de carregamento, taxas de rejeição, etc.
- **Insights de usabilidade**: Problemas de UX e oportunidades de melhoria

### Como configurar o Clarity:
1. **Cadastre-se**: Acesse [https://clarity.microsoft.com/](https://clarity.microsoft.com/) e crie uma conta gratuita
2. **Crie um projeto**: Clique em "Add Project" e siga as instruções
3. **Obtenha seu ID**: Após criar o projeto, você receberá um ID único (ex: `abc123xyz`)
4. **Atualize o código**: No arquivo `index.html`, substitua `SEU_ID_DO_PROJETO` pelo ID real:
   ```html
   <script type="text/javascript">
     (function(c,l,a,r,i,t,y){
         c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
         t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
         y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
     })(window, document, "clarity", "script", "SEU_ID_DO_PROJETO");
   </script>
   ```
5. **Hospede seu projeto**: Faça o deploy do site para começar a coletar dados

### Privacidade e conformidade:
- O Clarity é compatível com GDPR e outras regulamentações de privacidade
- Dados são anonimizados por padrão
- Você pode configurar exclusões de páginas sensíveis
- Consulte a [documentação oficial](https://docs.microsoft.com/en-us/clarity/) para mais detalhes

### Alternativas:
Se preferir outras ferramentas de analytics, você pode substituir o Clarity por:
- Google Analytics: `gtag.js`
- Plausible: Leve e focado em privacidade
- Umami: Auto-hospedado e open-source

## Estrutura de arquivos
```
biscoito-da-sorte/
├── index.html          # Página principal com OpenGraph e Clarity
├── main.js             # Lógica interativa (317 linhas)
├── style.css           # Estilos com vinheta suave (196 linhas)
├── biscoito-inteiro.png # Imagem do biscoito intacto (260x260px)
├── biscoito-quebrado.png # Imagem do biscoito quebrado (260x260px)
├── sortes_do_dia.json  # Frases adicionais (100+ entradas)
└── README.md           # Documentação completa
```

## Tecnologias utilizadas
- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Analytics**: Microsoft Clarity (opcional)
- **Design**: Vinheta com gradiente radial, animações CSS
- **Áudio**: Web Audio API para efeitos sonoros
- **SEO**: OpenGraph, Twitter Cards, meta tags
- **Hospedagem**: GitHub Pages (configurado e pronto)

## Recursos avançados
- **Interatividade**: Pointer Events para arrastar e soltar
- **Animações**: CSS Keyframes para migalhas caindo
- **Responsivo**: Design adaptável para mobile e desktop
- **Acessibilidade**: Atributos ARIA e semântica HTML
- **Performance**: Carregamento assíncrono de scripts
- **Hospedagem gratuita**: Configurado para GitHub Pages

## 🚀 Hospedagem com GitHub Pages

O projeto está completamente configurado para ser hospedado no GitHub Pages:

### Endereço padrão:
```
https://SEU_USUARIO.github.io/biscoito-da-sorte/
```

### Como publicar:
1. Crie um repositório chamado `biscoito-da-sorte` no GitHub
2. Faça upload de todos os arquivos
3. Ative o GitHub Pages nas configurações do repositório
4. Em 1-5 minutos, seu site estará online!

### Configurações já feitas:
- ✅ Caminhos relativos para todos os assets
- ✅ Meta tags OpenGraph atualizadas para GitHub Pages
- ✅ Favicon embutido
- ✅ Analytics configurado (Microsoft Clarity)

**Guia completo**: Consulte o arquivo `GITHUB_PAGES_GUIDE.md` para instruções detalhadas passo a passo.

**Script automatizado**: Use `./setup-github.sh` para configurar tudo automaticamente!
