# Wisconsin News API #
## Note: This project is in no way affiliated with [Channel 3000 News](https://www.channel3000.com/). It was made purely for educational purposes! ##

This project contains code for a serverless function (FaaS) I made and host through [DigitalOcean](https://digitalocean.com/). It provides a way to fetch the top five stories of a given day from the website for [Channel 3000 News](https://www.channel3000.com/) based in Wisconsin where I reside. It responds with an array of them in JSON format, having parsed each story page's HTML for various attributes such as the headline, description, image, and more.

Demo: https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-b9c5bbcf-e873-4641-8598-b88f96d16c6b/default/stories

### Fetching Stories
#### GET /stories
Returns a list of the top five stories of the current day in JSON format.<br/>
A successful response (Status Code: ```**200 - OK**```) will look something like this:
```
[{
  "description": "COMSTOCK, Wis. -- A 69-year-old woman who was attacked by a bear in Barron County on Saturday is in stable condition.",
  "image": "https://bloximages.newyork1.vip.townnews.com/channel3000.com/content/tncms/assets/v3/editorial/7/f0/7f0cec5a-6461-52f6-937c-52702fa986cb/63be98680d4b1.image.jpg?resize=400%2C225",
  "storyId": 1,
  "title": "Victim of bear attack in stable condition, search for bear continues",
  "url": "https://www.channel3000.com/news/local-news/news/victim-of-bear-attack-in-stable-condition-search-for-bear-continues/article_adfa6a54-3051-47b5-8f73-3a7320650ccd.html"
}, {
  "storyId": 2,
  "title": "Teresa Marie “Teri” Pabst",
  "url": "https://www.channel3000.com/news/local-news/obituaries/teresa-marie-teri-pabst/article_60a6d77b-bbd4-432e-b0f2-7a7ae9ced7d4.html"
}, {
  "description": "MIDDLETON - David Scott Pabst, age 64, of Middleton, Wis., died on July 7, 2025. Dave was a dedicated family man, who lived his life with utmost integrity, courage and faith.",
  "image": "https://bloximages.newyork1.vip.townnews.com/channel3000.com/content/tncms/assets/v3/editorial/7/f4/7f4f7ef8-db3a-4974-adf5-64dcee8e94b8/6875acff7f989.image.png?resize=400%2C225",
  "storyId": 3,
  "title": "David Scott Pabst",
  "url": "https://www.channel3000.com/news/local-news/obituaries/david-scott-pabst/article_dde5934d-dd03-41cf-ba7b-636ad63b71d6.html"
}, {
  "description": "Gotham / Ridgeway – Donald W. “Donnie” Foster, age 47, of Gotham, formerly of Ridgeway, died unexpectedly on Friday, July 11, 2025 as a result of injuries sustained in an automobile accident in Richland County.",
  "image": "https://bloximages.newyork1.vip.townnews.com/channel3000.com/content/tncms/assets/v3/editorial/1/e7/1e70c715-a9e8-4e66-b413-fec8ca489da9/6875807e79c1d.image.png?resize=400%2C225",
  "storyId": 4,
  "title": "Donald W. “Donnie” Foster",
  "url": "https://www.channel3000.com/news/local-news/obituaries/donald-w-donnie-foster/article_a34f02ab-57d9-4ba5-b71c-c3ae90e2104f.html"
}, {
  "storyId": 5,
  "title": "Boys and Girls clubs impacted by Trump administration freezing after-school, summer program funding",
  "url": "https://www.channel3000.com/news/local-news/news/boys-and-girls-clubs-impacted-by-trump-administration-freezing-after-school-summer-program-funding/article_7f58f425-ee87-4301-9765-969210503e0b.html"
}]
```
Note: Some stories may or may not have additional fields such as for an ```image``` or ```description```. I am currently working on a solution to this. It is primarily due to the fact that scraping the data from each individual article sometimes results in a ```429 - Too Many Requests``` error, which only allows me to include basic information in a given story entry in the response data (such as the ```title``` and ```url``` fields).
