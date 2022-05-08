import qs from "qs";

export default async function getAllPosts(page = 1) {
  const api_url = API_URL;

  const query = qs.stringify({
    pagination: {
      page,
      pageSize: 6,
    },
    sort: ["publishedAt:desc"],
  });

  const response = await fetch(`${api_url}/api/posts?populate=*&${query}`);

  const data = await response.json();

  return data;
}
