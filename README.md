# Wisconsin News API #
## Note: This project is in no way affiliated with [Channel 3000 News](https://www.channel3000.com/). It was made purely for educational purposes! ##

This project contains code for a serverless function (FaaS) I made and host through [DigitalOcean](https://digitalocean.com/). It provides a way to fetch the current top five stories from the website for [Channel 3000 News](https://www.channel3000.com/). It responds with an array of them in JSON format, having parsed each story page's HTML for various attributes such as the headline, description, thumbnail, etc.

Demo: https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-b9c5bbcf-e873-4641-8598-b88f96d16c6b/public/stories

### Fetching Stories
#### GET /stories
Returns an array of the current top five stories in JSON format.
A successful response (Status Code: ```200 - OK```) will look something like this:
```
[
  {
    "description": "Story description.",
    "id": 1,
    "image": "Story #1 image URL",
    "title": "Story #1 Title",
    "url": "Story #1 URL"
  },
  {
    "id": 2,
    "title": "Story #2 Title",
    "url": "Story #2 URL"
  },
  ...3 more story objects
]
```
Note: Some stories may or may not have additional fields such as for an ```image``` or ```description```. I am currently working on a solution to this. It is primarily due to the fact that scraping the data from each individual article sometimes results in a ```429 - Too Many Requests``` error, which only allows me to include basic information in a given story entry in the response data (such as the ```id```, ```title``` and ```url``` fields).
