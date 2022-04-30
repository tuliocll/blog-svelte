# Blog em Svelte

Frontend do blog https://tuliocalil.com.br desenvolvido em Svelte.  
Template HTML usado do site: https://themes.3rdwavemedia.com/.  


### Features

- Listagem de postagens com paginação (isso é uma feature ?)
- Layout responsivo (isso é uma feature ?)
- Botão de clap(like)
- Comentarios e contador de comentarios nas postagens.


### Como rodar

Clone o projeto:
```bash
git clone
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

### Deploy
```bash
yarn build
```


<div align="center">

### Made with 💙 in Bahia, Brasil.

</div>