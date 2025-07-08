import { getTopStories } from "./util.js";

export async function main(event) {
  // We only want to allow "GET" requests
  const { method } = event?.http;
  if (method !== "GET") {
    return {
      headers: {
        Allow: "GET",
      },
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  // Fetch the stories, and send them with the response body
  const stories = await getTopStories();
  return {
    headers: {
      "Cache-Control": "public, max-age=3600",
    },
    body: stories,
  };
}
