# Diretório Assets

Este diretório contém todos os recursos estáticos utilizados na aplicação "Biscoito da Sorte".

## Estrutura

```
assets/
├── icons/        # Ícones e arquivos de favicon
└── images/       # Imagens utilizadas na interface
```

## Tipos de Recursos

### Icons
- Ícones para favicon em diferentes tamanhos
- Ícones para dispositivos mobile (192x192, 512x512)
- Manifesto do aplicativo web (site.webmanifest)
- Ícones SVG para favicon vetorial

### Images
- Imagens do biscoito em diferentes estados (inteiro, quebrado)
- Imagens de fundo e decoração
- Imagens para SEO e compartilhamento social (og:image)

## Diretrizes de Uso

### Adicionando Novos Recursos
1. Coloque ícones e favicons na pasta `icons/`
2. Coloque imagens de interface na pasta `images/`
3. Mantenha formatos otimizados (WEBP com fallback PNG quando apropriado)
4. Utilize nomes de arquivo descritivos e consistentes

### Manutenção
- Sempre que adicionar ou modificar imagens:
  - Atualize esta documentação se necessário
  - Verifique compatibilidade com diferentes dispositivos
  - Otimize arquivos para web (tamanho e qualidade)
  - Teste fallbacks quando necessário

### Formatos Recomendados
- **WEBP**: Para imagens principais com suporte a fallback
- **PNG**: Para imagens com transparência ou fallback
- **JPG**: Para fotografias
- **SVG**: Para ícones vetoriais
- **ICO**: Para favicon tradicional

## Convenções de Nomenclatura
- Use nomes descritivos e em inglês
- Separe palavras com hífen (`my-image-name.png`)
- Inclua variações de estado no nome (`biscoito-inteiro.png`, `biscoito-quebrado.png`)

## Notas Importantes
- Esta pasta é referenciada em `index.html` e nos módulos JavaScript
- Qualquer alteração nos nomes de arquivos deve ser refletida no código
- Manter otimização de tamanho é crucial para performance