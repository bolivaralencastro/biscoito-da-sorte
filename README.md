# Biscoito da Sorte

Um biscoito da sorte interativo: toque para quebrar, leia a tirinha, vire para ver números da sorte e arraste para reposicionar. Todo o conteúdo roda no navegador, sem build ou servidor.

## Como usar
- Baixe/clonar e abra `index.html` no navegador.
- Clique no biscoito para quebrar; um som curto toca e migalhas caem.
- Clique na tirinha para virar entre frase e números; arraste para mover.

## O que há aqui
- HTML/CSS/JS vanilla com módulos ES6, sem dependências.
- Frases locais em `src/js/config.js` e `data/fortunes.json`; novas mensagens são mescladas automaticamente.
- Mensagens de estado organizadas em `data/messages/` por estado (intact, broken, crumbs, clean).
- Números da sorte gerados aleatoriamente de 01 a 60.
- Assets: imagens em `assets/images/` (ex.: `assets/images/biscoito-inteiro/biscoito-inteiro.png` e `assets/images/biscoito-quebrado/biscoito-quebrado.png`) e estilos em `src/css/`.
- **Vinheta suave**: Efeito de foco sutil com gradiente radial quase branco.
- **OpenGraph**: Meta tags para compartilhamento rico em redes sociais.
- **Favicon**: Ícone de biscoito da sorte em SVG.

## Personalização rápida
- Acrescente frases em `data/fortunes.json` (campo `text`) ou no array `BASE_FORTUNES` em `src/js/config.js`.
- Adicione mensagens específicas por estado em `data/messages/{estado}.json`.
- Ajuste cores e sombras em `src/css/base.css` (variáveis `:root`).
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
├── index.html                    # Página principal com OpenGraph e Clarity
├── .gitignore                    # Arquivos e pastas a serem ignorados pelo Git
├── README.md                     # Documentação principal do projeto
├── TESTING.md                    # Diretrizes de teste
├── PROJECT_STRUCTURE.md          # Documentação da estrutura do projeto
├── CHANGELOG.md                  # Histórico de modificações
├── ast_analyzer.py               # Analisador estático do projeto
├── ast_output.json               # Saída do analisador estático
├── .gemini/                      # Configurações do ambiente
│   └── settings.json             # Configurações específicas
├── assets/                       # Recursos estáticos
│   ├── icons/                    # Ícones e favicon
│   │   ├── favicon.ico           # Favicon tradicional
│   │   ├── apple-touch-icon.png  # Ícone para iOS
│   │   ├── favicon-16x16.png     # Favicon 16x16
│   │   ├── favicon-32x32.png     # Favicon 32x32
│   │   └── site.webmanifest      # Manifesto do PWA
│   └── images/                   # Imagens do biscoito, og-image, etc.
│       ├── biscoito-inteiro/     # Imagens do biscoito intacto
│       │   └── biscoito-inteiro.png
│       ├── biscoito-quebrado/    # Imagens do biscoito quebrado
│       │   └── biscoito-quebrado.png
│       └── og-image.*            # Imagens para OpenGraph
├── data/                         # Dados do projeto
│   ├── fortunes.json             # Frases de sorte (padronizado, sem duplicatas)
│   ├── cookies.json              # Variantes de biscoito (se existir)
│   └── messages/                 # Mensagens por estado do biscoito
│       ├── intact.json           # Mensagens para estado intacto
│       ├── broken.json           # Mensagens para estado quebrado
│       ├── crumbs.json           # Mensagens para estado em farelo
│       └── clean.json            # Mensagens para estado limpo
├── docs/                         # Documentação adicional
│   ├── ADR.md                    # Decisões de Arquitetura
│   ├── DEP_GRAPH.md              # Gráfico de Dependências
│   ├── DESIGN_TOKENS.md          # Tokens de Design
│   ├── LITE_MODE.md              # Documentação do modo leve
│   ├── MODULE_CATALOG.md         # Catálogo de módulos
│   ├── PROJECT_MAP.md            # Mapa do projeto
│   ├── TAGGING_GUIDE.md          # Guia de etiquetas
│   ├── UI_STATES.md              # Estados da interface
│   ├── ui.proxy.md               # Proxy para interface
│   └── README.md                 # Documentação da pasta docs
└── src/                          # Código-fonte principal
    ├── js/                       # Código JavaScript
    │   ├── main.js               # Ponto de entrada principal
    │   ├── config.js             # Configurações e constantes
    │   ├── ui.js                 # Lógica de interface do usuário
    │   ├── fortunes.js           # Lógica das frases
    │   ├── cookies.js            # Lógica das variantes de biscoito
    │   ├── storage.js            # Persistência de dados
    │   ├── animation.js          # Animações
    │   ├── audio.js              # Áudio
    │   ├── messages.js           # Mensagens
    │   └── README.md             # Documentação da pasta JS
    └── css/                      # Estilos CSS
        ├── base.css              # Variáveis CSS e estilos base
        └── components/           # Estilos por componente
            ├── layout.css        # Layout geral (header, footer, stage)
            ├── cookie.css        # Estilos do biscoito
            ├── fortune-strip.css # Estilos da tirinha de sorte
            ├── animations.css    # Animações (migalhas, etc.)
            └── README.md         # Documentação da pasta CSS components
```

> Nota: o modo lite foi descontinuado nesta base (veja `docs/LITE_MODE.md` para contexto).

## Tecnologias utilizadas
- **Frontend**: HTML5, CSS3, JavaScript ES6+ (módulos)
- **Analytics**: Microsoft Clarity (preconnect pronto; adicione o snippet com seu ID se quiser coletar dados)
- **Design**: Vinheta com gradiente radial, animações CSS
- **Áudio**: Web Audio API para efeitos sonoros
- **SEO**: OpenGraph, Twitter Cards, meta tags
- **Hospedagem**: GitHub Pages (pronto para deploy estático)

- **Interatividade**: Pointer Events para arrastar e soltar
- **Animações**: CSS Keyframes e classes (`.animate-pop`) para revelar a tirinha e migalhas
- **Responsivo**: Design adaptável para mobile e desktop
- **Acessibilidade**: Atributos ARIA e semântica HTML
- **Performance**: Carregamento assíncrono de scripts e modularização
- **Hospedagem gratuita**: Configurado para GitHub Pages
- **Segurança**: Validação de dados, proteção contra CSRF, fallbacks seguros

## Segurança
O projeto implementa práticas de segurança para proteger os dados do usuário:

- **Validação de dados**: Todos os dados armazenados localmente são validados
- **Proteção CSRF**: Cookies configurados com `samesite=lax`
- **Tratamento seguro de exceções**: Operações de armazenamento tem fallbacks seguros
- **Nenhuma coleta de dados pessoais**: O projeto não coleta dados sensíveis
- **Arquitetura client-side segura**: Sem backend, apenas frontend

Para mais detalhes sobre as práticas de segurança, consulte [SECURITY.md](SECURITY.md).

## Documentação Completa
- `PROJECT_STRUCTURE.md`: Estrutura completa do projeto
- `CHANGELOG.md`: Histórico de modificações
- `assets/README.md`: Recursos estáticos
- `data/README.md`: Dados do projeto
- `docs/README.md`: Documentação adicional
- `src/README.md`: Código-fonte
- `src/css/components/README.md`: Componentes CSS
- `src/js/README.md`: Módulos JavaScript
- `docs/WORK_LOG.md`: Log de inspeções e próximos passos de QA

### Organização por Diretórios
Cada diretório principal contém seu próprio README com instruções detalhadas:
- [assets/README.md](assets/README.md) - Documentação dos recursos estáticos
- [data/README.md](data/README.md) - Documentação dos dados da aplicação
- [docs/README.md](docs/README.md) - Documentação adicional
- [src/README.md](src/README.md) - Documentação do código-fonte
- [src/css/components/README.md](src/css/components/README.md) - Documentação dos estilos
- [src/js/README.md](src/js/README.md) - Documentação dos módulos JavaScript

## Navegação rápida para IA/humano
- `docs/PROJECT_MAP.md`: mapa do projeto (módulos, CSS, dados) para evitar abrir tudo.
- `docs/ui.proxy.md`: resumo de `src/js/ui.js` para prompts curtos.
- `docs/MODULE_CATALOG.md`: tabela arquivo/responsabilidade/dependências.
- `docs/UI_STATES.md`: "storybook textual" dos componentes/estados.
- `docs/DESIGN_TOKENS.md`: cores/tokens/layout.
- `docs/TAGGING_GUIDE.md`: convenções de nomes/busca.
- `docs/ADR.md`: decisão sobre uso de proxies/mapas.
- `docs/WORK_LOG.md`: registro das inspeções e próximos passos.
- `TESTING.md`: checklist de teste manual rápido.

### Guardrails para IA/humano
- Prefira diffs/trechos pequenos; não reescreva arquivos inteiros.
- Cite caminho+linha ao pedir detalhes (ex.: `src/js/ui.js:120`).
- Use proxies/mapas acima antes de colar código bruto em prompts.
- Tokens/design: derive cores/spacing de `src/css/base.css` (ou `docs/DESIGN_TOKENS.md`).

## Instruções de Manutenção

### Documentação e Mudanças
- Sempre que modificar significativamente o projeto, atualize o [CHANGELOG.md](CHANGELOG.md)
- Atualize a documentação relevante ao adicionar novas funcionalidades
- Siga os padrões de código estabelecidos no [CODE_STYLE_GUIDE.md](CODE_STYLE_GUIDE.md)

### Melhores Práticas
- Siga os padrões de código especificados no [CODE_STYLE_GUIDE.md](CODE_STYLE_GUIDE.md)
- Use nomes descritivos para funções e variáveis
- Comente código complexo em português
- Mantenha separação clara de responsabilidades
- Valide dados de entrada e saída
- Teste fallbacks e caminhos de erro

### Conformidade e Qualidade
- O projeto segue práticas de desenvolvimento seguro (ver [SECURITY.md](SECURITY.md))
- Código segue padrões de estilo consistentes (ver [CODE_STYLE_GUIDE.md](CODE_STYLE_GUIDE.md))
- Arquitetura modular facilita manutenção e testes
- Persistência de dados tem múltiplas camadas de segurança

### Recomendações para Desenvolvedores
1. Leia os READMEs de cada diretório antes de fazer modificações
2. Siga as convenções de código estabelecidas
3. Teste completamente após qualquer mudança significativa
4. Atualize esta documentação se necessário
5. Registre mudanças no CHANGELOG.md
6. Verifique a compatibilidade com os padrões de qualidade
7. Atualize os testes (se existirem) quando modificar funcionalidades

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
- Preconnect para Microsoft Clarity está presente no `index.html`; insira seu snippet se quiser coletar os dados.

Para um guia completo de publicação, siga a documentação oficial do [GitHub Pages](https://docs.github.com/pages/getting-started-with-github-pages).
