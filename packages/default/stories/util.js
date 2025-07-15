import axios from "axios";
import * as cheerio from "cheerio";
import UserAgent from "user-agents";

// URL for retrieving the top news stories
const NEWS_URL = "https://www.channel3000.com/news/local-news";

/**
 * Fetches the HTML of a given web-page and returns a CheerioAPI object representing it.
 *
 * @param url     URL to fetch HTML of.
 * @returns       CheerioAPI object for parsing the HTML.
 */
export async function getHTMLFromUrl(url) {
  const userAgent = new UserAgent();
  const response = await axios.get(url, {
    headers: {
      "User-Agent": userAgent.toString(),
    },
  });

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
      return {
        url: `${NEWS_URL}${$(this).attr("href")}`,
        title: $(this).text().trim(),
      };
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
    urls.map(async (data) => {
      // try to fetch HTML for this url
      try {
        const $ = await getHTMLFromUrl(data.url);
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
          url: data.url,
          image,
        };
      } catch (error) {
        console.error(error);

        // fall back to just using the data object (containing just the url and title)
        return {
          ...data,
        };
      }
    })
  );

  // add a "storyId" field to each item in the array
  return stories.map((story, index) => {
    return {
      ...story,
      storyId: index + 1,
    };
  });
}

export default {
  getHTMLFromUrl,
  getTopStoryUrls,
  getTopStories,
};
