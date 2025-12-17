# Estrutura de Projeto - Biscoito da Sorte

## Visão Geral
Este documento descreve a estrutura completa do projeto "Biscoito da Sorte", um aplicativo web interativo que simula a experiência de quebrar um biscoito da sorte e receber uma frase e números da sorte.

## Estrutura de Pastas

```
biscoito-da-sorte/
├── .gitignore                 # Arquivos e diretórios ignorados pelo Git
├── index.html                 # Ponto de entrada principal da aplicação
├── README.md                  # Documentação principal do projeto
├── TESTING.md                 # Diretrizes de teste
├── PROJECT_STRUCTURE.md       # Este arquivo
├── CHANGELOG.md               # Histórico de modificações
├── .gemini/                   # Configurações do ambiente
│   └── settings.json          # Configurações específicas
├── assets/                    # Recursos estáticos
│   ├── icons/                 # Ícones e favicon
│   └── images/                # Imagens usadas na aplicação
├── data/                      # Dados do projeto
│   ├── cookies.json           # Dados das variantes de biscoito (se existir)
│   ├── fortunes.json          # Frases do biscoito da sorte
│   └── messages/              # Mensagens específicas (se existir)
├── docs/                      # Documentação adicional
│   ├── ADR.md                 # Decisões de Arquitetura
│   └── DEP_GRAPH.md           # Gráfico de Dependências
├── src/                       # Código-fonte principal
│   ├── css/                   # Estilos CSS
│   │   ├── base.css           # Estilos base
│   │   └── components/        # Estilos por componente
│   │       ├── layout.css     # Layout principal
│   │       ├── cookie.css     # Estilos do biscoito
│   │       ├── fortune-strip.css # Estilos da tira de sorte
│   │       └── animations.css # Animações
│   └── js/                    # Código JavaScript
│       ├── main.js            # Ponto de entrada do JavaScript
│       ├── ui.js              # Interface do usuário
│       ├── config.js          # Configurações e constantes
│       ├── fortunes.js        # Lógica das frases
│       ├── cookies.js         # Lógica das variantes de biscoito
│       ├── storage.js         # Persistência de dados
│       ├── animation.js       # Animações
│       ├── audio.js           # Áudio
│       └── messages.js        # Mensagens
├── ast_analyzer.py            # Analisador estático do projeto (gerado)
├── ast_output.json            # Saída do analisador estático (gerado)
└── PROJECT_STRUCTURE.md       # Este arquivo
```

> Nota: o modo lite foi removido desta base (veja `docs/LITE_MODE.md` para mais contexto).

## Componentes Principais

### Frontend
- **HTML**: `index.html` com estrutura semântica
- **CSS**: Arquitetura modular com componentes separados
- **JavaScript**: Módulos ES6 para funcionalidades específicas

### Backend de Dados
- **JSON**: Arquivos de dados para frases e configurações
- **Storage**: Persistência no lado do cliente (localStorage, cookies)

### Funcionalidades
- Geração de frases aleatórias de biscoito da sorte
- Animações interativas de quebra de biscoito
- Persistência de dados diários
- Suporte a múltiplas variantes de biscoito
- Sistema de áudio para efeitos sonoros
- Interface responsiva

## Tecnologias Utilizadas
- JavaScript ES6+ (módulos)
- CSS3 (componentes modulares com keyframes para animações)
- HTML5
- Web Audio API (para efeitos sonoros)
- API de Armazenamento Web (localStorage, cookies)

## Padrões de Código
- Código modular com módulos ES6
- Nomenclatura semântica para funções e variáveis
- Comentários em português para explicar lógica complexa
- Separação clara de preocupações (UI, dados, persistência, animações)

## Diretrizes de Manutenção
- Manter consistência nos nomes de variáveis e funções
- Documentar mudanças significativas no CHANGELOG.md
- Manter os testes atualizados (se existirem)
- Atualizar a documentação quando necessário
