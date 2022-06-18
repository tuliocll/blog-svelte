import * as api from "$lib/api";
import { page_size } from "$lib/constants";

export async function get({ url: { searchParams }, locals }) {
  const tab = searchParams.get("tab") || "all";
  const tag = searchParams.get("tag");
  const page = +searchParams.get("page") || 1;

  const endpoint = tab === "feed" ? "articles/feed" : "articles";

  const q = new URLSearchParams();

  q.set("limit", 10);
  q.set("offset", (page - 1) * 10);

  if (tag) {
    q.set("tag", tag);
  }

  const data = await api.get(
    `${endpoint}?${q}`,
    locals.user && locals.user.token
  );

  console.log(data);

  return {
    body: {
      articles: true,
    },
  };
}
