# Wisconsin News API #
## Note: This project is in no way affiliated with [Channel 3000 News](https://www.channel3000.com/). It was made purely for educational purposes! ##

This project contains code for a serverless function (FaaS) I made and host through [DigitalOcean](https://digitalocean.com/). It provides a way to fetch the top five stories of a given day from the website for [Channel 3000 News](https://www.channel3000.com/) based in Wisconsin where I reside. It responds with an array of them in JSON format, having parsed each story page's HTML for various attributes such as the headline, description, image, and more.

Demo: https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-b9c5bbcf-e873-4641-8598-b88f96d16c6b/default/stories
