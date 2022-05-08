export default async function getAllAbout() {
  const api_url = API_URL;

  const response = await fetch(`${api_url}/api/about?populate=*`);

  const data = await response.json();

  return data.data;
}
