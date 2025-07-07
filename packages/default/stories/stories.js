import { getTopStories } from "./util.js";

export async function main() {
  const stories = await getTopStories();
  return {
    headers: {
      "Cache-Control": "public, max-age=3600",
    },
    body: stories,
  };
}
