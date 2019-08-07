# ping_bing
A node module to use the Bing Adaptive URL Submission API

This is an unofficial Node module to interface with the Bing Adaptive (Passive) URL Submission API.

There is a single method available and it will work for either a single URL submission or a batch of URLs.

** Bing Limits your daily URL submission to 10,000 URLs, which for most is more than adequate. I have some links below to help you get started with the API and registering your site with the Bing Webmaster Tools.

You will need an API key, again a link below, to use this API. You can only submit URLs for a site you have registered and verified in the Bing WebMaster tools. So no, you cannot submit URLs for sites you do not own.

You should only submit actual content URLs, not your sitemap, rss feed, robots.text or site dependency assets like CSS and JavaScript files.

URL must also comply with the Bing Content Guidelines, which are pretty simple. Make good content people like and don't use Flash and you should comply 😎

## Setup

OK, if you know anything about node just skip ahead to the actual code. If you are new to node and npm this will be a quick run through that every node module seems ablidged to include:

Installation
------------

    npm install --save ping_bing

Single URL Example
-------

This will submit a single URL.

```js

const pingBing = require( "ping_bing" ),
    apiKey = "[Your API Key Here]",
    siteUrl = "[Your Bing Verified Site URL (domain)]";


const singleURL = {
    apiKey: apiKey,
    siteUrl: siteUrl,
    url: "[url to submit]"
};

pingBing.pingBing( singleURL )
    .then( body => {
        console.log( "success: ", body );
    } )
    .catch( err => {
        console.log( "error: ", err );
    } );
```


This will submit a batch or array of URLs.

```js

const pingBing = require( "ping_bing" ),
    apiKey = "[Your API Key Here]",
    siteUrl = "[Your Bing Verified Site URL (domain)]";

const batchURLs = {
    apiKey: apiKey,
    siteUrl: siteUrl,
    urlList: [ "[url to submit]", "[url to submit]", "[url to submit]" ]
};

pingBing.pingBing( batchURLs )
    .then( body => {
        console.log( "success: ", body );
    } )
    .catch( err => {
        console.log( "error: ", err );
    } );
```
You can include this module in your AWS Lambdas, Azure & Google functions to create a nice serverless workflow.

For now the only response the API provides for a successful submission is a JSON object with a 'd' property set to null. If and when they update this I will probably add more response handling to the module.


## Bing URL Submission Resources

[The Bing Passive/Adaptive URL Submission API](https://love2dev.com/seo/bing-url-submission/)

[Bing Webmaster Blog Announcement](https://blogs.bing.com/webmaster/june-2019/bingbot-Series-Introducing-Batch-mode-for-Adaptive-URL-submission-API)

[How Batch Submission Works](https://blogs.bing.com/webmaster/june-2019/bingbot-Series-Introducing-Batch-mode-for-Adaptive-URL-submission-API)

[Get Bing Webmaster API Key](https://docs.microsoft.com/en-us/bingwebmaster/getting-access)
