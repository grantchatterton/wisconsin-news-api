export async function main(event) {
  // Only allow "GET" requests
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

  
}
