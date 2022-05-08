import qs from "qs";

export default async function getOnePost(slug = "") {
  if (slug === "" || !slug) {
    return;
  }

  const api_url = API_URL;

  const query = qs.stringify({
    filters: {
      slug: {
        $eq: slug,
      },
    },
  });

  const response = await fetch(`${api_url}/api/posts?populate=*&${query}`);

  const data = await response.json();

  return data.data[0];
}
