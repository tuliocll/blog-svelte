import App from "./App.svelte";

const app = new App({
  target: document.getElementById("app"),
  props: {
    blogName: "Tulio DEV",
    blogSubtitle: "Um blog feito por DEV para DEVs de verdade.",
    bio: "Postagens sobre Javascript, react, mobile, svelte, arquitetura, backend, bicicleta e jogos.",
    profilePicture:
      "https://media-exp1.licdn.com/dms/image/D4E03AQGj_X7NRslE-g/profile-displayphoto-shrink_800_800/0/1647522768046?e=1656547200&v=beta&t=SKUwMfcXrhoCwao1PoEUTRSMqhAUy3GVGHyj63fr4Gc",
    aboutMeText: "Veja mais sobre mim",
    socialNetworks: [
      {
        icon: "fa-twitter",
        name: "twitter",
        link: "https://twitter.com",
      },
      {
        icon: "fa-linkedin-in",
        name: "",
        link: "",
      },
      {
        icon: "fa-github-alt",
        name: "",
        link: "",
      },
      {
        icon: "fa-stack-overflow",
        name: "",
        link: "",
      },
    ],
    pages: [
      {
        icon: "fa-home",
        name: "Home",
        link: "/",
      },
      {
        icon: "fa-user",
        name: "Sobre mim",
        link: "/about",
      },
    ],
    newsletterText: "Inscreva-se e receba atualizaçãoes direto no seu e-mail!",
    posts: [
      {
        slug: "Why Every Developer Should Have A Blog",
        title: "Why Every Developer Should Have A Blog",
        date: "05-04-1995 12:37:00",
        readTime: "4",
        comments: "2",
        preview:
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies...",
        thumb: "assets/images/blog/blog-post-thumb-1.jpg",
      },
      {
        slug: "",
        title: "A Guide to Becoming a Full-Stack Developer",
        date: "02-01-2022 12:37:00",
        readTime: "11",
        comments: "3",
        preview:
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies...",
        thumb: "assets/images/blog/blog-post-thumb-2.jpg",
      },
      {
        slug: "High Performance JavaScript",
        title: "High Performance JavaScript",
        date: "05-03-2022 12:37:00",
        readTime: "2",
        comments: "4",
        preview:
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies...",
        thumb: "assets/images/blog/blog-post-thumb-3.jpg",
      },
      {
        slug: "Top 5 JavaScript Frameworks",
        title: "Top 5 JavaScript Frameworks",
        date: "01-04-2022 12:37:00",
        readTime: "5",
        comments: "0",
        preview:
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies...",
        thumb: "assets/images/blog/blog-post-thumb-4.jpg",
      },
    ],
  },
});

export default app;
