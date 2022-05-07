export default async function getAllPosts() {
  const api_url = API_URL;

  const response = await fetch(`${api_url}/api/posts?populate=*`);

  const data = await response.json();

  console.log(data, "saida");
  return data;
}
