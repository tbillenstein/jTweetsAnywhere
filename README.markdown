[jTweetsAnywhere](http://thomasbillenstein.com/jTweetsAnywhere/)
================================================================
jQuery Twitter Widget with @Anywhere support
--------------------------------------------

jTweetsAnywhere is a jQuery Twitter Widget that simplifies the integration of Twitter services into your site.
With just a few lines of Javascript you can

* Display tweets from users' feeds, lists and favorites
* Show results from a Twitter search
* Present auto-refreshing realtime/live tickers
* Build pageable tweet feeds
* Give your visitors the opportunity to Reply to, Retweet and Favorite your tweets
* Integrate a customizable TweetBox into your site
* Let your visitors follow you directly from your site
* Handle secure authentication with Twitter

Sample
------
    $('#tweets').jTweetsAnywhere({
        username: 'tbillenstein',
        count: 5
    });

    $('#ticker').jTweetsAnywhere({
        searchParams: 'q=nfl',
        count: 10,
        showTweetFeed: {
            autorefresh: {
                mode: 'trigger-insert',
                interval: 60
            },
            paging: {
                mode: 'more'
            },
       	    showTimestamp: {
                refreshInterval: 15
            }
        }
    });

Features
--------
* Displays tweets from one or more users' feeds
* Displays tweets from a user's list
* Displays a user's favorite tweets
* Displays the results of a Twitter search
* Supports all Twitter search params
* Supports Twitter's @Anywhere features
* Has paging support in several variants - including endless-scroll - to display earlier tweets
* Has auto-refresh support to build realtime/live tickers with no effort

&nbsp;

* Can supply Reply, Retweets and Favorite Actions for each tweet by the use of Twitter's Web Intents which makes it possible for users to interact with Twitter content in the context of your site, without leaving the page
* Can integrate a customizable TweetBox into your site, so your visitors can update their status on the fly
* Can add a Twitter "Follow Button" to your site
* Can add a "Connect with Twitter" button to your site
* Provides secure user authentication
* Handles low level user login and signup procedures

&nbsp;

* Supports native retweets
* Can display extended tweet attributes, like timestamp, source, geolocation and in-reply-to info
* Can display profile images and usernames in tweet feeds
* Automatically detects and marks up links in tweets
* Automatically links #hashtags to Twitter search requests
* Automatically links @username to Twitter profiles
* Automatically shows Hovercards when hovering @username or profile images

&nbsp;

* Customize the style and layout of the widget with your own stylesheets
* Overwrite the generated HTML markup by providing your own decorators
* Supply your own visualizers to add UI effects
* Write your own tweet filter to customize the tweet feed
* Add your own listeners to get notfied on interesting events
* Takes care of Twitter's rate limits, mainly in conjunction with the auto-refresh and paging features to avoid getting black-listed and therefor keep your visitors happy
* Small code size for fast download
* Does not interrupt the loading of your page

&nbsp;

* I18N: Currently supports english, german, dutch and spanish languages

Support
-------

In case of questions, suggestions or problems you may have using jTweetsAnywhere, you can [contact me](http://thomasbillenstein.com/contact/).
