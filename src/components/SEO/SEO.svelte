<script>
  import { MetaTags } from "svelte-meta-tags";

  export let teste = "testando SEO";
</script>

<MetaTags
  title="Using More of Config"
  titleTemplate="%s | Svelte Meta Tags"
  description="This example uses more of the available config options."
  canonical="https://www.canonical.ie/"
  openGraph={{
    url: "https://www.url.ie/a",
    title: "Open Graph Title",
    description: "Open Graph Description",
    images: [
      {
        url: "https://www.example.ie/og-image-01.jpg",
        width: 800,
        height: 600,
        alt: "Og Image Alt",
      },
      {
        url: "https://www.example.ie/og-image-02.jpg",
        width: 900,
        height: 800,
        alt: "Og Image Alt Second",
      },
      { url: "https://www.example.ie/og-image-03.jpg" },
      { url: "https://www.example.ie/og-image-04.jpg" },
    ],
    site_name: "SiteName",
  }}
  twitter={{
    handle: "@handle",
    site: "@site",
    cardType: "summary_large_image",
    title: "Using More of Config",
    description: teste,
    image: "https://www.example.ie/twitter-image.jpg",
    imageAlt: "Twitter image alt",
  }}
  facebook={{
    appId: "1234567890",
  }}
/>
