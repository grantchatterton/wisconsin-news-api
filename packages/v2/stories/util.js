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
 * Fetches an array of the top stories.
 *
 * @param {boolean} [basic=false] If true, only includes basic story details (title and URL).
 * @returns Promise containing an array of story objects.
 */
export async function getTopStories(basic = false) {
  // we want to process the HTML of each top story link, building an array of story objects in the process
  const $ = await getHTMLFromUrl(NEWS_URL);
  return $(".list-popular .tnt-asset-link")
    .map(async function () {
      const data = {
        url: `${NEWS_URL}${$(this).attr("href")}`,
        title: $(this).text().trim(),
      };

      if (basic) {
        return data;
      }

      try {
        const $story = await getHTMLFromUrl(data.url);

        // return a more extensive object containing various properties of the article
        return {
          url: data.url,
          title: $story(".headline").text().trim(),
          description:
            $story(".subhead").text().trim() ||
            $story("#article-body > p").first().text().trim(),
          image: $story(".asset-photo img").attr("src"),
        };
      } catch (error) {
        console.error(error);

        // fall back to just using the data object we created earlier
        return data;
      }
    })
    .toArray();
}

export default {
  getHTMLFromUrl,
  getTopStories,
};
