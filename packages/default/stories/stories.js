import { getTopStories } from "./util.js";

export async function main() {
  const stories = await getTopStories();
  return { body: stories };
}
