# Diretório CSS Components

Este diretório contém os estilos modulares para diferentes componentes da aplicação "Biscoito da Sorte".

## Estrutura

```
src/css/components/
├── layout.css         # Estilos para layout e estrutura
├── cookie.css         # Estilos para o biscoito
├── fortune-strip.css  # Estilos para a tira de sorte
└── animations.css     # Estilos para animações
```

## Descrição dos Componentes

### layout.css
- Estilos para a estrutura principal da página
- Posicionamento dos elementos
- Responsividade
- Grid e flexbox

### cookie.css
- Estilos para o elemento visual do biscoito
- Estados do biscoito (inteiro, quebrado)
- Sombras e efeitos visuais
- Interações com o biscoito

### fortune-strip.css
- Estilos para a tira que contém a frase da sorte
- Animações de revelação
- Estados (revelado, virado, arrastável)
- Efeitos 3D e transformações
- Estilo do conteúdo (frase e números da sorte)

### animations.css
- Classes auxiliares para animações
- Transições
- Efeitos especiais
- Estados animados

## Padrões de CSS

### Metodologia
- Utiliza variações da metodologia BEM (Block Element Modifier)
- Estrutura semântica e descritiva
- Componentes independentes e reutilizáveis

### Variáveis CSS
- Usa variáveis CSS para cores e dimensões consistentes
- Centraliza valores reutilizáveis
- Facilita manutenção e temas

### Responsividade
- Design responsivo integrado
- Media queries quando necessário
- Unidades relativas (rem, em, %, vw, vh)

## Diretrizes de Desenvolvimento

### Adicionando Novos Estilos
1. Siga a estrutura modular existente
2. Use classes semânticas
3. Mantenha a consistência com estilos existentes
4. Teste em diferentes tamanhos de tela

### Manutenção
- Sempre que adicionar ou modificar estilos:
  - Verifique compatibilidade em diferentes navegadores
  - Teste em dispositivos móveis e desktop
  - Atualize esta documentação se necessário
  - Minimize impacto colateral em outros componentes

### Convenções
- **Nomenclatura**: kebab-case para classes CSS
- **Organização**: agrupe estilos relacionados
- **Comentários**: documente regras complexas
- **Aninhamento**: evite aninhamento profundo

## Notas Importantes
- Arquivos CSS são importados em `index.html` na ordem correta
- Estilos são otimizados para desempenho
- Aproveita recursos modernos de CSS quando apropriado

## Instruções de Manutenção
- Siga as convenções de nomenclatura
- Teste mudanças em diferentes navegadores
- Documente estilos complexos
- Minimize o uso de `!important`
- Atualize o CHANGELOG.md se as mudanças afetarem visualmente a aplicação