import axios from "axios";
import * as cheerio from "cheerio";

// URL for retrieving the top news stories
const NEWS_URL = "https://www.channel3000.com/news/local-news";

// Create an instance to use for Axios
// We do this to add a "User-Agent" header to circumvent the "429 - Too Many Requests" response
const instance = axios.create({
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0",
  },
});

/**
 * Fetches the HTML of a given web-page and returns a CheerioAPI object representing it.
 *
 * @param url     URL to fetch HTML of.
 * @returns       CheerioAPI object for parsing the HTML.
 */
export async function getHTMLFromUrl(url) {
  const response = await instance.get(url);
  return cheerio.load(response.data);
}

/**
 * Fetches an array of the top story URLs.
 *
 * @returns Promise containing an array of story URLs.
 */
export async function getTopStoryUrls() {
  const $ = await getHTMLFromUrl(NEWS_URL);
  return $(".list-popular .tnt-asset-link")
    .map(function () {
      return `${NEWS_URL}${$(this).attr("href")}`;
    })
    .toArray();
}

/**
 * Fetches an array of the top stories.
 *
 * @returns Promise containing an array of story objects.
 */
export async function getTopStories() {
  // we want to process the HTML of each top story link, building an array of story objects in the process
  const urls = await getTopStoryUrls();
  const stories = await Promise.all(
    urls.map(async (url) => {
      // fetch HTML for this url
      const $ = await getHTMLFromUrl(url);

      // fetch various properties of the article
      const title = $(".headline").text().trim();
      const description =
        $(".subhead").text().trim() ||
        $("#article-body > p").first().text().trim();
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

  // add a "storyId" field to each item in the array
  return stories.map((story, index) => {
    return {
      storyId: index + 1,
      ...story,
    };
  });
}

export default {
  getHTMLFromUrl,
  getTopStoryUrls,
  getTopStories,
};
