import { getTopStories } from "./util.js";

export async function main(event) {
  // Only allow "GET" requests
  const { method } = event?.http;
  if (method !== "GET") {
    return {
      headers: {
        Allow: "GET",
      },
      statusCode: 405,
      body: {
        message: "Method Not Allowed",
      },
    };
  }

  try {
    const stories = await getTopStories();
    return {
      body: stories,
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: {
        message: "An error occurred!",
      },
    };
  }
}

global.main = main;
