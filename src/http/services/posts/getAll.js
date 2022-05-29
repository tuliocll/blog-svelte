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

  return fetch(`${api_url}/api/posts?populate=*&${query}`).then((res) =>
    res.json()
  );
}
