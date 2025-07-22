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
      body: {
        error: "Method Not Allowed",
      },
    };
  }

  try {
    const stories = await getTopStories();
    return {
      headers: {
        "Cache-Control": "public, max-age=3600",
      },
      body: stories,
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: {
        error: "Failure fetching stories!",
      },
    };
  }
}
