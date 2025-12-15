# 🚀 Guia Completo para GitHub Pages

Este guia explica como hospedar o projeto "Biscoito da Sorte" no GitHub Pages.

## 🌐 Endereço Final

Após a configuração, seu projeto estará disponível em:

```
https://SEU_USUARIO.github.io/biscoito-da-sorte/
```

**Exemplo com seu usuário:**
```
https://bolivaralencastro.github.io/biscoito-da-sorte/
```

## 🛠️ Passo a Passo para Configuração

### 1. Crie um repositório no GitHub

1. Acesse [https://github.com/new](https://github.com/new)
2. Nome do repositório: `biscoito-da-sorte`
3. Visibilidade: Pública (recomendado para GitHub Pages gratuito)
4. Adicione um README (opcional)
5. Clique em "Create repository"

### 2. Faça upload dos arquivos

**Opção A: GitHub Desktop (recomendado para iniciantes)**
1. Clone o repositório para seu computador
2. Copie todos os arquivos do projeto para a pasta clonada
3. Faça commit e push

**Opção B: Command Line (para desenvolvedores)**
```bash
# Navegue até a pasta do projeto
cd /caminho/para/biscoito-da-sorte

# Inicialize o git (se ainda não estiver inicializado)
git init

# Adicione os arquivos
git add .

# Faça o primeiro commit
git commit -m "Projeto Biscoito da Sorte - Versão inicial"

# Adicione o repositório remoto (substitua SEU_USUARIO)
git remote add origin https://github.com/SEU_USUARIO/biscoito-da-sorte.git

# Envie para o GitHub
git push -u origin main
```

**Opção C: Upload direto pelo navegador**
1. No GitHub, clique em "Upload files"
2. Arraste e solte todos os arquivos do projeto
3. Clique em "Commit changes"

### 3. Ative o GitHub Pages

1. No seu repositório no GitHub, vá em **Settings** > **Pages**
2. Em "Source", selecione:
   - Branch: `main` (ou `master`)
   - Folder: `/ (root)`
3. Clique em **Save**

### 4. Aguarde a publicação

- O GitHub Pages leva de 1 a 5 minutos para publicar
- Você verá uma mensagem: "Your site is published at https://SEU_USUARIO.github.io/biscoito-da-sorte/"
- O status aparece em **Settings** > **Pages**

## 🔧 Configurações Importantes

### Caminhos de Arquivos

O projeto já está configurado com caminhos relativos, o que é perfeito para GitHub Pages:

```javascript
// Isso funciona corretamente
fetch('sortes_do_dia.json')
```

```html
<!-- Isso também funciona
<img src="assets/images/biscoito-inteiro/biscoito-inteiro.png">
```

### Meta Tags Atualizadas

As URLs do OpenGraph já estão configuradas para GitHub Pages:

```html
<meta property="og:url" content="https://bolivaralencastro.github.io/biscoito-da-sorte/">
<meta property="og:image" content="https://bolivaralencastro.github.io/biscoito-da-sorte/assets/images/biscoito-inteiro/biscoito-inteiro.png">
```

## 📱 Testando o Projeto

### Localmente (antes de publicar)
1. Abra o arquivo `index.html` diretamente no navegador
2. Ou use um servidor local:
```bash
# Usando Python 3
python3 -m http.server 8000
# Acesse: http://localhost:8000
```

### Após publicação
1. Acesse: `https://SEU_USUARIO.github.io/biscoito-da-sorte/`
2. Teste todas as funcionalidades:
   - Quebrar o biscoito
   - Virar a tirinha
   - Arraste para mover
   - Verifique o som

## 🔄 Atualizando o Projeto

Para fazer atualizações:

```bash
# Faça suas alterações nos arquivos
git add .
git commit -m "Descrição das alterações"
git push origin main
```

As alterações serão refletidas no GitHub Pages em até 1 minuto.

## ⚠️ Solução de Problemas

### Problema: Página não carrega
- **Solução**: Verifique se o nome do repositório está correto
- **Solução**: Confira se os arquivos foram enviados para o branch `main`
- **Solução**: Aguarde 5 minutos para a publicação

### Problema: Imagens não aparecem
- **Solução**: Verifique se os nomes dos arquivos estão exatos (case-sensitive)
- **Solução**: Confira os caminhos no código HTML/JS

### Problema: 404 Not Found
- **Solução**: Verifique a URL: deve ser `https://USUARIO.github.io/REPOSITORIO/`
- **Solução**: Confira se o GitHub Pages está ativado nas configurações

## 🎨 Personalização para GitHub Pages

### Domínio Customizado (opcional)
1. Compre um domínio (ex: sorte-do-dia.com)
2. Em **Settings** > **Pages**, adicione o domínio
3. Siga as instruções para configurar o DNS

### HTTPS
- O GitHub Pages já fornece HTTPS automaticamente
- Não é necessário configurar nada

## 📊 Analytics com GitHub Pages

O Microsoft Clarity já está configurado e funcionará normalmente no GitHub Pages:

```javascript
// O script do Clarity será carregado automaticamente
(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "SEU_ID_DO_PROJETO");
```

Lembre-se de:
1. Cadastre-se no [Microsoft Clarity](https://clarity.microsoft.com/)
2. Obtenha seu ID de projeto
3. Substitua `SEU_ID_DO_PROJETO` no código

## 🌟 Dicas Finais

1. **Use branches**: Crie um branch `dev` para testes antes de publicar
2. **GitHub Actions**: Configure CI/CD para validação automática
3. **Issues**: Use o sistema de issues do GitHub para acompanhar melhorias
4. **Pull Requests**: Aceite contribuições da comunidade

Parabéns! Seu projeto "Sorte do Dia" está pronto para ser compartilhado com o mundo! 🎉

Quando publicar, não se esqueça de:
- Compartilhar nas redes sociais
- Testar o OpenGraph com o [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- Verificar os dados no Microsoft Clarity
- Acompanhar o engajamento dos usuários

Divirta-se com seu biscoito da sorte interativo online! 🥠✨
