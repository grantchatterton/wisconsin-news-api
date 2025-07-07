import axios from "axios";
import * as cheerio from "cheerio";

// URL for retrieving the top news stories
const NEWS_URL = "https://www.channel3000.com/news/local-news";

/**
 * Fetches an array of the top story URLs.
 * @returns Promise containing an array of story URLs.
 */
export async function getTopStoryUrls() {
  const response = await axios.get(NEWS_URL);
  const $ = cheerio.load(response.data); // using cheerio.fromURL causes a redirect
  return $(".list-popular .tnt-asset-link")
    .map(function () {
      return `${NEWS_URL}${$(this).attr("href")}`;
    })
    .toArray();
}

/**
 * Fetches an array of the top stories.
 * @returns Promise containing an array of story objects.
 */
export async function getTopStories() {
  // we want to process the HTML of each top story link, building an array of story objects in the process
  const urls = await getTopStoryUrls();
  return await Promise.all(
    urls.map(async (url) => {
      // fetch HTML for this url
      const $ = await cheerio.fromURL(url);

      // fetch various properties of the article
      const title = $(".headline").text();
      const description =
        $(".subhead").text() || $("#article-body > p").first().text();
      const image =
        $(".asset-photo img").attr("src") ||
        "https://m.media-amazon.com/images/I/91ziU2NUHzL.png";
      return {
        title,
        description,
        url,
        image,
      };
    })
  );
}

export default {
  getTopStoryUrls,
  getTopStories,
};
