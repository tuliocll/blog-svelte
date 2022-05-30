# Blog em Svelte

Frontend do blog https://tuliocalil.com.br desenvolvido em Svelte.
Veja o [post do blog](https://www.tuliocalil.com.br/post/fiz-meu-blog-com-svelte) com a explicação completa do projeto.  
Template HTML usado do site: https://themes.3rdwavemedia.com/.

### Features

- Listagem de postagens com paginação (isso é uma feature ?).
- Layout responsivo (isso é uma feature ?).
- Botão de clap(like).
- Comentarios e contador de comentarios nas postagens.
- Tempo de leitura do post.
- Google Analytics.
- Image Lazy load e placeholder.
- Svelte Query para fetch e cache das request.

### Roadmap

- [ ] Implementar tags nos posts.
- [ ] Listar tags na sidebar.
- [ ] Adicionar shimmer na sidebar.
- [ ] Configurar newsletter.
- [ ] Adicionar botão de compartilhar.
- [x] Implementar minutos de leitura nas postagens.
- [x] Usar/refatorar writable stores para infos basicas do blog (nome, descricao, etc).
- [ ] Refatorar para typescript
- [ ] Melhorar acessibilidade
- [ ] Melhorar SEO
- [ ] Criar feature toggle

### Como rodar

Clone o projeto:

```bash
git clone git@github.com:tuliocll/blog-svelte.git
```

Instale as dependencias:

```bash
yarn install
```

Configure o .env.

```bash
cp .env.example .env
```

Crie uma conta no [Cusdis](https://cusdis.com/) e no [Lyket](https://app.lyket.dev/login) para usar as chaves de API.

Mude a chave de api do Lyket nesse [arquivo](https://github.com/tuliocll/blog-svelte/blob/main/public/index.html#L38) para que os claps(likes) funcionem.

Crie uma conta no Google Analytics e [pegue o codigo do GA para usar.](https://developers.google.com/analytics/devguides/reporting/core/v4?hl=pt_br)

### Deploy

```bash
yarn build
```

<div align="center">

### Made with 💙 in Bahia, Brasil.

</div>
