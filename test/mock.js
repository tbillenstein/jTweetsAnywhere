	var rateLimit = 150;
	mockedRateLimitDataProvider = function(callback)
	{
		var getRateLimit = function(fct)
		{
			var data =
			{
				"hourly_limit": 150,
				"reset_time": "Wed Sep 22 22:06:41 +0000 2010",
				"reset_time_in_seconds": 1285193201,
				"remaining_hits": Math.max(0, rateLimit--)
			};

			window.setTimeout(function() { fct(data); }, 100);
		};

		getRateLimit(callback);
	};

	var tweetCounter = 0;
	var autorefreshCounter = 0;
	mockedTweetDataProvider = function(url, callback)
	{
		var getData = function(url, fct)
		{
			var d = url.search(/page\=/) < 0 ? getAutorefreshData() : getStdData();

			window.setTimeout(function() { fct({ "results" : (tweetCounter > 2400 ? []  : d) }); }, 1000);
		};

		var getStdData = function()
		{
			return [
			{
				"retweeted":false,
				"created_at":"Sat Oct 02 01:21:46 +0000 2010",
				"contributors":null,
				"retweet_count":null,
				"source":"<a href=\"http://twitter.com/\" rel=\"nofollow\">Twitter for iPhone</a>",
				"favorited":false,
				"place":
				{
					"place_type":"neighborhood",
					"country":"The United States of America",
					"attributes":{},
					"full_name":"Tenderloin, San Francisco",
					"name":"Tenderloin",
					"country_code":"US",
					"bounding_box":
					{
						"type":"Polygon",
						"coordinates":
						[
							[
								[-122.41823688,37.78151103],
								[-122.40751392,37.78151103],
								[-122.40751392,37.78832898],
								[-122.41823688,37.78832898]
							]
						]
					},
					"id":"7ab4041072a386f6",
					"url":"http://api.twitter.com/1/geo/id/7ab4041072a386f6.json"
				},
				"coordinates":
				{
					"type":"Point",
					"coordinates":[-122.40770974,37.78445692]
				},
				"in_reply_to_user_id":null,
				"geo":
				{
					"type":"Point",
					"coordinates":[37.78445692,-122.40770974]
				},
				"user":
				{
					"contributors_enabled":false,
					"profile_link_color":"0084B4",
					"description":"Developer Advocate at Twitter. Also a hacker and British expat who is married to @cindyli and lives in San Francisco.",
					"lang":"en",
					"geo_enabled":true,
					"created_at":"Sat Feb 17 20:49:54 +0000 2007",
					"location":"San Francisco",
					"screen_name":"themattharris",
					"profile_sidebar_fill_color":"DDEEF6",
					"verified":false,
					"time_zone":"Tijuana",
					"follow_request_sent":false,
					"following":true,
					"profile_sidebar_border_color":"C0DEED",
					"profile_use_background_image":true,
					"followers_count":2003,
					"listed_count":196,
					"profile_background_color":"C0DEED",
					"protected":false,
					"show_all_inline_media":false,
					"profile_background_image_url":"http://s.twimg.com/a/1285805719/images/themes/theme1/bg.png",
					"friends_count":338,
					"name":"Matt Harris",
					"statuses_count":3119,
					"notifications":false,
					"profile_text_color":"333333",
					"id":777925,
					"profile_background_tile":false,
					"utc_offset":-28800,
					"favourites_count":89,
					"url":"http://themattharris.com",
					"profile_image_url":"http://a2.twimg.com/profile_images/554181350/matt_normal.jpg"
				},
				"in_reply_to_status_id":null,
				"truncated":false,
				"id":26132943033,
				"in_reply_to_screen_name":null,
				"text":"Outbound muni service just resumed from embarcadero as single track slow service. Outbound buses overloaded. Expect delays."
			},
			{
				"retweeted":false,
				"created_at":"Tue Sep 28 19:28:58 +0000 2010",
				"contributors":null,
				"retweet_count":null,
				"source":"web",
				"favorited":false,
				"place":
				{
					"place_type":"poi",
					"country":"The United States of America",
					"attributes":
					{
						"street_address":"795 Folsom St"
					},
					"full_name":"Twitter HQ, San Francisco",
					"name":"Twitter HQ",
					"country_code":"US",
					"bounding_box":
					{
						"type":"Polygon",
						"coordinates":
						[
							[
								[-122.400612831116,37.7821120598956],
								[-122.400612831116,37.7821120598956],
								[-122.400612831116,37.7821120598956],
								[-122.400612831116,37.7821120598956]
							]
						]
					},
					"id":"247f43d441defc03",
					"url":"http://api.twitter.com/1/geo/id/247f43d441defc03.json"
				},
				"coordinates":null,
				"in_reply_to_user_id":null,
				"geo":null,
				"user":
				{
					"profile_link_color":"0084B4","followers_count":2007,"description":"Developer Advocate at Twitter. Also a hacker and British expat who is married to @cindyli and lives in San Francisco.","lang":"en","created_at":"Sat Feb 17 20:49:54 +0000 2007","location":"San Francisco","screen_name":"themattharris","show_all_inline_media":false,"friends_count":338,"profile_sidebar_fill_color":"DDEEF6","statuses_count":3119,"time_zone":"Tijuana","following":false,"favourites_count":89,"profile_sidebar_border_color":"C0DEED","contributors_enabled":false,"geo_enabled":true,"profile_use_background_image":true,"listed_count":197,"profile_background_color":"C0DEED","protected":false,"verified":false,"profile_background_image_url":"http://s.twimg.com/a/1285805719/images/themes/theme1/bg.png","name":"Matt Harris","follow_request_sent":false,"notifications":false,"profile_text_color":"333333","id":777925,"profile_background_tile":false,"utc_offset":-28800,"url":"http://themattharris.com","profile_image_url":"http://a2.twimg.com/profile_images/554181350/matt_normal.jpg"
				},
				"in_reply_to_status_id":null,
				"truncated":false,
				"id":25813137187,
				"in_reply_to_screen_name":null,
				"text":"Neat! User Streams went from beta to production today! http://t.co/HOrg5vV"
			},


			{"retweeted":false,"created_at":"Tue Sep 28 01:40:38 +0000 2010","contributors":null,"retweet_count":null,"source":"<a href=\"http://twitter.com/\" rel=\"nofollow\">Twitter for iPhone</a>","favorited":false,"place":{"place_type":"neighborhood","country":"The United States of America","attributes":{},"full_name":"SoMa, San Francisco","name":"SoMa","country_code":"US","bounding_box":{"type":"Polygon","coordinates":[[[-122.42284884,37.76893497],[-122.3964,37.76893497],[-122.3964,37.78752897],[-122.42284884,37.78752897]]]},"id":"2b6ff8c22edd9576","url":"http://api.twitter.com/1/geo/id/2b6ff8c22edd9576.json"},"coordinates":{"type":"Point","coordinates":[-122.40111783,37.78227388]},"in_reply_to_user_id":null,"geo":{"type":"Point","coordinates":[37.78227388,-122.40111783]},"user":{"profile_link_color":"0084B4","followers_count":2007,"description":"Developer Advocate at Twitter. Also a hacker and British expat who is married to @cindyli and lives in San Francisco.","lang":"en","created_at":"Sat Feb 17 20:49:54 +0000 2007","location":"San Francisco","screen_name":"themattharris","show_all_inline_media":false,"friends_count":338,"profile_sidebar_fill_color":"DDEEF6","statuses_count":3119,"time_zone":"Tijuana","following":false,"favourites_count":89,"profile_sidebar_border_color":"C0DEED","contributors_enabled":false,"geo_enabled":true,"profile_use_background_image":true,"listed_count":197,"profile_background_color":"C0DEED","protected":false,"verified":false,"profile_background_image_url":"http://s.twimg.com/a/1285805719/images/themes/theme1/bg.png","name":"Matt Harris","follow_request_sent":false,"notifications":false,"profile_text_color":"333333","id":777925,"profile_background_tile":false,"utc_offset":-28800,"url":"http://themattharris.com","profile_image_url":"http://a2.twimg.com/profile_images/554181350/matt_normal.jpg"},"in_reply_to_status_id":null,"truncated":false,"id":25743274851,"in_reply_to_screen_name":null,"text":"Wondering what exercises @ultrailer has planned for me this evening."},
			{"retweeted":false,"created_at":"Mon Sep 27 03:08:10 +0000 2010","contributors":null,"retweeted_status":{"retweeted":false,"created_at":"Mon Sep 27 03:01:03 +0000 2010","contributors":null,"retweet_count":null,"source":"<a href=\"http://www.tweetdeck.com\" rel=\"nofollow\">TweetDeck</a>","favorited":false,"place":null,"coordinates":null,"in_reply_to_user_id":null,"geo":null,"user":{"profile_link_color":"0000ff","followers_count":7839,"description":"Follow some of the larger emergencies in San Francisco as they happen!","lang":"en","created_at":"Fri Jun 20 21:54:57 +0000 2008","location":"iPhone: 37.780018,-122.394058","screen_name":"Emergency_In_SF","show_all_inline_media":false,"friends_count":65,"profile_sidebar_fill_color":"817e7f","statuses_count":647,"time_zone":"Pacific Time (US & Canada)","following":false,"favourites_count":1,"profile_sidebar_border_color":"be090b","contributors_enabled":false,"geo_enabled":true,"profile_use_background_image":true,"listed_count":599,"profile_background_color":"FFFFFF","protected":false,"verified":false,"profile_background_image_url":"http://a1.twimg.com/profile_background_images/3698628/twitterbackv6.jpg","name":"Emergency_In_SF","follow_request_sent":false,"notifications":false,"profile_text_color":"000000","id":15184804,"profile_background_tile":false,"utc_offset":-28800,"url":null,"profile_image_url":"http://a3.twimg.com/profile_images/64679935/Picture_20_normal.png"},"in_reply_to_status_id":null,"truncated":false,"id":25650679631,"in_reply_to_screen_name":null,"text":"HOSTAGE STAND-OFF:  tear gas deployed  & 11 hour hostage stand off at Sutter & Franklin has been resolved.  50+ residents hopeful to return."},"retweet_count":null,"source":"<a href=\"http://twitter.com/\" rel=\"nofollow\">Twitter for iPhone</a>","favorited":false,"place":null,"coordinates":null,"in_reply_to_user_id":null,"geo":null,"user":{"profile_link_color":"0084B4","followers_count":2007,"description":"Developer Advocate at Twitter. Also a hacker and British expat who is married to @cindyli and lives in San Francisco.","lang":"en","created_at":"Sat Feb 17 20:49:54 +0000 2007","location":"San Francisco","screen_name":"themattharris","show_all_inline_media":false,"friends_count":338,"profile_sidebar_fill_color":"DDEEF6","statuses_count":3119,"time_zone":"Tijuana","following":false,"favourites_count":89,"profile_sidebar_border_color":"C0DEED","contributors_enabled":false,"geo_enabled":true,"profile_use_background_image":true,"listed_count":197,"profile_background_color":"C0DEED","protected":false,"verified":false,"profile_background_image_url":"http://s.twimg.com/a/1285805719/images/themes/theme1/bg.png","name":"Matt Harris","follow_request_sent":false,"notifications":false,"profile_text_color":"333333","id":777925,"profile_background_tile":false,"utc_offset":-28800,"url":"http://themattharris.com","profile_image_url":"http://a2.twimg.com/profile_images/554181350/matt_normal.jpg"},"in_reply_to_status_id":null,"truncated":true,"id":25651230929,"in_reply_to_screen_name":null,"text":"RT @Emergency_In_SF: HOSTAGE STAND-OFF:  tear gas deployed  & 11 hour hostage stand off at Sutter & Franklin has been resolved.  50+ res ..."},
			{"retweeted":false,"created_at":"Mon Sep 27 02:52:55 +0000 2010","contributors":null,"retweet_count":null,"source":"<a href=\"http://twitter.com/\" rel=\"nofollow\">Twitter for iPhone</a>","favorited":false,"place":{"place_type":"neighborhood","country":"The United States of America","attributes":{},"full_name":"Civic Center, San Francisco","name":"Civic Center","country_code":"US","bounding_box":{"type":"Polygon","coordinates":[[[-122.42548188,37.77322896],[-122.40997884,37.77322896],[-122.40997884,37.79084502],[-122.42548188,37.79084502]]]},"id":"9fff4bb5d61a7564","url":"http://api.twitter.com/1/geo/id/9fff4bb5d61a7564.json"},"coordinates":{"type":"Point","coordinates":[-122.42192041,37.78797021]},"in_reply_to_user_id":null,"geo":{"type":"Point","coordinates":[37.78797021,-122.42192041]},"user":{"profile_link_color":"0084B4","followers_count":2007,"description":"Developer Advocate at Twitter. Also a hacker and British expat who is married to @cindyli and lives in San Francisco.","lang":"en","created_at":"Sat Feb 17 20:49:54 +0000 2007","location":"San Francisco","screen_name":"themattharris","show_all_inline_media":false,"friends_count":338,"profile_sidebar_fill_color":"DDEEF6","statuses_count":3119,"time_zone":"Tijuana","following":false,"favourites_count":89,"profile_sidebar_border_color":"C0DEED","contributors_enabled":false,"geo_enabled":true,"profile_use_background_image":true,"listed_count":197,"profile_background_color":"C0DEED","protected":false,"verified":false,"profile_background_image_url":"http://s.twimg.com/a/1285805719/images/themes/theme1/bg.png","name":"Matt Harris","follow_request_sent":false,"notifications":false,"profile_text_color":"333333","id":777925,"profile_background_tile":false,"utc_offset":-28800,"url":"http://themattharris.com","profile_image_url":"http://a2.twimg.com/profile_images/554181350/matt_normal.jpg"},"in_reply_to_status_id":null,"truncated":false,"id":25650064875,"in_reply_to_screen_name":null,"text":"Wow lots of police activity around Franklin and Bush. Roads closed off and I just saw the bomb squad truck."},
			{"retweeted":false,"created_at":"Sun Sep 26 21:44:43 +0000 2010","contributors":null,"retweet_count":null,"source":"<a href=\"http://twitter.com/\" rel=\"nofollow\">Twitter for iPhone</a>","favorited":false,"place":{"place_type":"neighborhood","country":"The United States of America","attributes":{},"full_name":"Chinatown, San Francisco","name":"Chinatown","country_code":"US","bounding_box":{"type":"Polygon","coordinates":[[[-122.41018188,37.79022798],[-122.40392688,37.79022798],[-122.40392688,37.79798004],[-122.41018188,37.79798004]]]},"id":"e181b00c2f52bb2d","url":"http://api.twitter.com/1/geo/id/e181b00c2f52bb2d.json"},"coordinates":{"type":"Point","coordinates":[-122.40533251,37.79104228]},"in_reply_to_user_id":null,"geo":{"type":"Point","coordinates":[37.79104228,-122.40533251]},"user":{"profile_link_color":"0084B4","followers_count":2007,"description":"Developer Advocate at Twitter. Also a hacker and British expat who is married to @cindyli and lives in San Francisco.","lang":"en","created_at":"Sat Feb 17 20:49:54 +0000 2007","location":"San Francisco","screen_name":"themattharris","show_all_inline_media":false,"friends_count":338,"profile_sidebar_fill_color":"DDEEF6","statuses_count":3119,"time_zone":"Tijuana","following":false,"favourites_count":89,"profile_sidebar_border_color":"C0DEED","contributors_enabled":false,"geo_enabled":true,"profile_use_background_image":true,"listed_count":197,"profile_background_color":"C0DEED","protected":false,"verified":false,"profile_background_image_url":"http://s.twimg.com/a/1285805719/images/themes/theme1/bg.png","name":"Matt Harris","follow_request_sent":false,"notifications":false,"profile_text_color":"333333","id":777925,"profile_background_tile":false,"utc_offset":-28800,"url":"http://themattharris.com","profile_image_url":"http://a2.twimg.com/profile_images/554181350/matt_normal.jpg"},"in_reply_to_status_id":null,"truncated":false,"id":25626444239,"in_reply_to_screen_name":null,"text":"Out with @cindyli, showing @nikf and @stephalicious around San Francisco"},
			{"retweeted":false,"created_at":"Sat Sep 25 23:59:26 +0000 2010","contributors":null,"retweet_count":null,"source":"<a href=\"http://twitter.com/\" rel=\"nofollow\">Twitter for iPhone</a>","favorited":false,"place":{"place_type":"neighborhood","country":"The United States of America","attributes":{},"full_name":"Mission Bay, San Francisco","name":"Mission Bay","country_code":"US","bounding_box":{"type":"Polygon","coordinates":[[[-122.40618084,37.76405301],[-122.38151184,37.76405301],[-122.38151184,37.78199199],[-122.40618084,37.78199199]]]},"id":"41bcb736f84a799e","url":"http://api.twitter.com/1/geo/id/41bcb736f84a799e.json"},"coordinates":{"type":"Point","coordinates":[-122.40418857,37.77001971]},"in_reply_to_user_id":null,"geo":{"type":"Point","coordinates":[37.77001971,-122.40418857]},"user":{"profile_link_color":"0084B4","followers_count":2007,"description":"Developer Advocate at Twitter. Also a hacker and British expat who is married to @cindyli and lives in San Francisco.","lang":"en","created_at":"Sat Feb 17 20:49:54 +0000 2007","location":"San Francisco","screen_name":"themattharris","show_all_inline_media":false,"friends_count":338,"profile_sidebar_fill_color":"DDEEF6","statuses_count":3119,"time_zone":"Tijuana","following":false,"favourites_count":89,"profile_sidebar_border_color":"C0DEED","contributors_enabled":false,"geo_enabled":true,"profile_use_background_image":true,"listed_count":197,"profile_background_color":"C0DEED","protected":false,"verified":false,"profile_background_image_url":"http://s.twimg.com/a/1285805719/images/themes/theme1/bg.png","name":"Matt Harris","follow_request_sent":false,"notifications":false,"profile_text_color":"333333","id":777925,"profile_background_tile":false,"utc_offset":-28800,"url":"http://themattharris.com","profile_image_url":"http://a2.twimg.com/profile_images/554181350/matt_normal.jpg"},"in_reply_to_status_id":null,"truncated":false,"id":25541870653,"in_reply_to_screen_name":null,"text":"Getting ready to present the Twitter API workshop for #tchack"},
			{"retweeted":false,"created_at":"Sat Sep 25 21:17:21 +0000 2010","contributors":null,"retweet_count":null,"source":"<a href=\"http://twitter.com/\" rel=\"nofollow\">Twitter for iPhone</a>","favorited":false,"place":{"place_type":"neighborhood","country":"The United States of America","attributes":{},"full_name":"Central Richmond, San Francisco","name":"Central Richmond","country_code":"US","bounding_box":{"type":"Polygon","coordinates":[[[-122.49240012,37.77212997],[-122.47178184,37.77212997],[-122.47178184,37.78442901],[-122.49240012,37.78442901]]]},"id":"64be9bb264eb76c1","url":"http://api.twitter.com/1/geo/id/64be9bb264eb76c1.json"},"coordinates":{"type":"Point","coordinates":[-122.48425662,37.77263325]},"in_reply_to_user_id":18481766,"geo":{"type":"Point","coordinates":[37.77263325,-122.48425662]},"user":{"profile_link_color":"0084B4","followers_count":2007,"description":"Developer Advocate at Twitter. Also a hacker and British expat who is married to @cindyli and lives in San Francisco.","lang":"en","created_at":"Sat Feb 17 20:49:54 +0000 2007","location":"San Francisco","screen_name":"themattharris","show_all_inline_media":false,"friends_count":338,"profile_sidebar_fill_color":"DDEEF6","statuses_count":3119,"time_zone":"Tijuana","following":false,"favourites_count":89,"profile_sidebar_border_color":"C0DEED","contributors_enabled":false,"geo_enabled":true,"profile_use_background_image":true,"listed_count":197,"profile_background_color":"C0DEED","protected":false,"verified":false,"profile_background_image_url":"http://s.twimg.com/a/1285805719/images/themes/theme1/bg.png","name":"Matt Harris","follow_request_sent":false,"notifications":false,"profile_text_color":"333333","id":777925,"profile_background_tile":false,"utc_offset":-28800,"url":"http://themattharris.com","profile_image_url":"http://a2.twimg.com/profile_images/554181350/matt_normal.jpg"},"in_reply_to_status_id":25522060217,"truncated":false,"id":25531689347,"in_reply_to_screen_name":"claylo","text":"@claylo I'll be at the disrupt hackevent for a couple of hours tonight. Scheduled to present at 5.30  /cc @episod"},
			{"retweeted":false,"created_at":"Sat Sep 25 17:48:59 +0000 2010","contributors":null,"retweet_count":null,"source":"web","favorited":false,"place":{"place_type":"poi","country":"The United States of America","attributes":{"street_address":"795 Folsom St"},"full_name":"Twitter HQ, San Francisco","name":"Twitter HQ","country_code":"US","bounding_box":{"type":"Polygon","coordinates":[[[-122.400612831116,37.7821120598956],[-122.400612831116,37.7821120598956],[-122.400612831116,37.7821120598956],[-122.400612831116,37.7821120598956]]]},"id":"247f43d441defc03","url":"http://api.twitter.com/1/geo/id/247f43d441defc03.json"},"coordinates":null,"in_reply_to_user_id":null,"geo":null,"user":{"profile_link_color":"0084B4","followers_count":2007,"description":"Developer Advocate at Twitter. Also a hacker and British expat who is married to @cindyli and lives in San Francisco.","lang":"en","created_at":"Sat Feb 17 20:49:54 +0000 2007","location":"San Francisco","screen_name":"themattharris","show_all_inline_media":false,"friends_count":338,"profile_sidebar_fill_color":"DDEEF6","statuses_count":3119,"time_zone":"Tijuana","following":false,"favourites_count":89,"profile_sidebar_border_color":"C0DEED","contributors_enabled":false,"geo_enabled":true,"profile_use_background_image":true,"listed_count":197,"profile_background_color":"C0DEED","protected":false,"verified":false,"profile_background_image_url":"http://s.twimg.com/a/1285805719/images/themes/theme1/bg.png","name":"Matt Harris","follow_request_sent":false,"notifications":false,"profile_text_color":"333333","id":777925,"profile_background_tile":false,"utc_offset":-28800,"url":"http://themattharris.com","profile_image_url":"http://a2.twimg.com/profile_images/554181350/matt_normal.jpg"},"in_reply_to_status_id":null,"truncated":false,"id":25518647313,"in_reply_to_screen_name":null,"text":"Tidying up some @twitterapi slides for @TCDisrupt Hackathon tonight. More info: http://t.co/MJmUPYV"},
			{"retweeted":false,"created_at":"Fri Sep 24 21:31:48 +0000 2010","contributors":null,"retweet_count":null,"source":"web","favorited":false,"place":{"place_type":"poi","country":"The United States of America","attributes":{"street_address":"795 Folsom St"},"full_name":"Twitter HQ, San Francisco","name":"Twitter HQ","country_code":"US","bounding_box":{"type":"Polygon","coordinates":[[[-122.400612831116,37.7821120598956],[-122.400612831116,37.7821120598956],[-122.400612831116,37.7821120598956],[-122.400612831116,37.7821120598956]]]},"id":"247f43d441defc03","url":"http://api.twitter.com/1/geo/id/247f43d441defc03.json"},"coordinates":null,"in_reply_to_user_id":null,"geo":null,"user":{"profile_link_color":"0084B4","followers_count":2007,"description":"Developer Advocate at Twitter. Also a hacker and British expat who is married to @cindyli and lives in San Francisco.","lang":"en","created_at":"Sat Feb 17 20:49:54 +0000 2007","location":"San Francisco","screen_name":"themattharris","show_all_inline_media":false,"friends_count":338,"profile_sidebar_fill_color":"DDEEF6","statuses_count":3119,"time_zone":"Tijuana","following":false,"favourites_count":89,"profile_sidebar_border_color":"C0DEED","contributors_enabled":false,"geo_enabled":true,"profile_use_background_image":true,"listed_count":197,"profile_background_color":"C0DEED","protected":false,"verified":false,"profile_background_image_url":"http://s.twimg.com/a/1285805719/images/themes/theme1/bg.png","name":"Matt Harris","follow_request_sent":false,"notifications":false,"profile_text_color":"333333","id":777925,"profile_background_tile":false,"utc_offset":-28800,"url":"http://themattharris.com","profile_image_url":"http://a2.twimg.com/profile_images/554181350/matt_normal.jpg"},"in_reply_to_status_id":null,"truncated":false,"id":25440426146,"in_reply_to_screen_name":null,"text":"Fixing code using copy and paste feels .. wrong"},
			{"retweeted":false,"created_at":"Fri Sep 24 20:46:42 +0000 2010","contributors":null,"retweet_count":null,"source":"web","favorited":false,"place":{"place_type":"poi","country":"The United States of America","attributes":{"street_address":"795 Folsom St"},"full_name":"Twitter HQ, San Francisco","name":"Twitter HQ","country_code":"US","bounding_box":{"type":"Polygon","coordinates":[[[-122.400612831116,37.7821120598956],[-122.400612831116,37.7821120598956],[-122.400612831116,37.7821120598956],[-122.400612831116,37.7821120598956]]]},"id":"247f43d441defc03","url":"http://api.twitter.com/1/geo/id/247f43d441defc03.json"},"coordinates":null,"in_reply_to_user_id":19293525,"geo":null,"user":{"profile_link_color":"0084B4","followers_count":2007,"description":"Developer Advocate at Twitter. Also a hacker and British expat who is married to @cindyli and lives in San Francisco.","lang":"en","created_at":"Sat Feb 17 20:49:54 +0000 2007","location":"San Francisco","screen_name":"themattharris","show_all_inline_media":false,"friends_count":338,"profile_sidebar_fill_color":"DDEEF6","statuses_count":3119,"time_zone":"Tijuana","following":false,"favourites_count":89,"profile_sidebar_border_color":"C0DEED","contributors_enabled":false,"geo_enabled":true,"profile_use_background_image":true,"listed_count":197,"profile_background_color":"C0DEED","protected":false,"verified":false,"profile_background_image_url":"http://s.twimg.com/a/1285805719/images/themes/theme1/bg.png","name":"Matt Harris","follow_request_sent":false,"notifications":false,"profile_text_color":"333333","id":777925,"profile_background_tile":false,"utc_offset":-28800,"url":"http://themattharris.com","profile_image_url":"http://a2.twimg.com/profile_images/554181350/matt_normal.jpg"},"in_reply_to_status_id":25392415800,"truncated":false,"id":25437431006,"in_reply_to_screen_name":"squidgemonster","text":"@squidgemonster you can do this by passing the parameter exclude_replies=1 to a timeline request."},
			{"retweeted":false,"created_at":"Fri Sep 24 06:20:36 +0000 2010","contributors":null,"retweet_count":null,"source":"<a href=\"http://twitter.com/\" rel=\"nofollow\">Twitter for iPhone</a>","favorited":false,"place":null,"coordinates":null,"in_reply_to_user_id":null,"geo":null,"user":{"profile_link_color":"0084B4","followers_count":2007,"description":"Developer Advocate at Twitter. Also a hacker and British expat who is married to @cindyli and lives in San Francisco.","lang":"en","created_at":"Sat Feb 17 20:49:54 +0000 2007","location":"San Francisco","screen_name":"themattharris","show_all_inline_media":false,"friends_count":338,"profile_sidebar_fill_color":"DDEEF6","statuses_count":3119,"time_zone":"Tijuana","following":false,"favourites_count":89,"profile_sidebar_border_color":"C0DEED","contributors_enabled":false,"geo_enabled":true,"profile_use_background_image":true,"listed_count":197,"profile_background_color":"C0DEED","protected":false,"verified":false,"profile_background_image_url":"http://s.twimg.com/a/1285805719/images/themes/theme1/bg.png","name":"Matt Harris","follow_request_sent":false,"notifications":false,"profile_text_color":"333333","id":777925,"profile_background_tile":false,"utc_offset":-28800,"url":"http://themattharris.com","profile_image_url":"http://a2.twimg.com/profile_images/554181350/matt_normal.jpg"},"in_reply_to_status_id":null,"truncated":false,"id":25380903280,"in_reply_to_screen_name":null,"text":"Had a great time tonight with @nuge and @cindyli catching up over sushi. Good times."},
			{"retweeted":false,"created_at":"Thu Sep 23 22:10:24 +0000 2010","contributors":null,"retweet_count":null,"source":"web","favorited":false,"place":{"place_type":"poi","country":"The United States of America","attributes":{"street_address":"795 Folsom St"},"full_name":"Twitter HQ, San Francisco","name":"Twitter HQ","country_code":"US","bounding_box":{"type":"Polygon","coordinates":[[[-122.400612831116,37.7821120598956],[-122.400612831116,37.7821120598956],[-122.400612831116,37.7821120598956],[-122.400612831116,37.7821120598956]]]},"id":"247f43d441defc03","url":"http://api.twitter.com/1/geo/id/247f43d441defc03.json"},"coordinates":null,"in_reply_to_user_id":52758395,"geo":null,"user":{"profile_link_color":"0084B4","followers_count":2007,"description":"Developer Advocate at Twitter. Also a hacker and British expat who is married to @cindyli and lives in San Francisco.","lang":"en","created_at":"Sat Feb 17 20:49:54 +0000 2007","location":"San Francisco","screen_name":"themattharris","show_all_inline_media":false,"friends_count":338,"profile_sidebar_fill_color":"DDEEF6","statuses_count":3119,"time_zone":"Tijuana","following":false,"favourites_count":89,"profile_sidebar_border_color":"C0DEED","contributors_enabled":false,"geo_enabled":true,"profile_use_background_image":true,"listed_count":197,"profile_background_color":"C0DEED","protected":false,"verified":false,"profile_background_image_url":"http://s.twimg.com/a/1285805719/images/themes/theme1/bg.png","name":"Matt Harris","follow_request_sent":false,"notifications":false,"profile_text_color":"333333","id":777925,"profile_background_tile":false,"utc_offset":-28800,"url":"http://themattharris.com","profile_image_url":"http://a2.twimg.com/profile_images/554181350/matt_normal.jpg"},"in_reply_to_status_id":null,"truncated":false,"id":25346702176,"in_reply_to_screen_name":"NASATweetup","text":"@nasatweetup: @twitterapi Developer Advocate and a space nut! Originally from UK, super excited about the launch and meeting everyone."},
			{"retweeted":false,"created_at":"Thu Sep 23 21:04:26 +0000 2010","contributors":null,"retweet_count":null,"source":"web","favorited":false,"place":{"place_type":"poi","country":"The United States of America","attributes":{"street_address":"795 Folsom St"},"full_name":"Twitter HQ, San Francisco","name":"Twitter HQ","country_code":"US","bounding_box":{"type":"Polygon","coordinates":[[[-122.400612831116,37.7821120598956],[-122.400612831116,37.7821120598956],[-122.400612831116,37.7821120598956],[-122.400612831116,37.7821120598956]]]},"id":"247f43d441defc03","url":"http://api.twitter.com/1/geo/id/247f43d441defc03.json"},"coordinates":null,"in_reply_to_user_id":18911703,"geo":null,"user":{"profile_link_color":"0084B4","followers_count":2007,"description":"Developer Advocate at Twitter. Also a hacker and British expat who is married to @cindyli and lives in San Francisco.","lang":"en","created_at":"Sat Feb 17 20:49:54 +0000 2007","location":"San Francisco","screen_name":"themattharris","show_all_inline_media":false,"friends_count":338,"profile_sidebar_fill_color":"DDEEF6","statuses_count":3119,"time_zone":"Tijuana","following":false,"favourites_count":89,"profile_sidebar_border_color":"C0DEED","contributors_enabled":false,"geo_enabled":true,"profile_use_background_image":true,"listed_count":197,"profile_background_color":"C0DEED","protected":false,"verified":false,"profile_background_image_url":"http://s.twimg.com/a/1285805719/images/themes/theme1/bg.png","name":"Matt Harris","follow_request_sent":false,"notifications":false,"profile_text_color":"333333","id":777925,"profile_background_tile":false,"utc_offset":-28800,"url":"http://themattharris.com","profile_image_url":"http://a2.twimg.com/profile_images/554181350/matt_normal.jpg"},"in_reply_to_status_id":25339882682,"truncated":false,"id":25342049811,"in_reply_to_screen_name":"TvdW","text":"@TvdW not at all. You're drawing a conclusion about a disambiguation unrelated to our implementation"},
			{"retweeted":false,"created_at":"Thu Sep 23 20:36:39 +0000 2010","contributors":null,"retweet_count":null,"source":"web","favorited":false,"place":{"place_type":"poi","country":"The United States of America","attributes":{"street_address":"795 Folsom St"},"full_name":"Twitter HQ, San Francisco","name":"Twitter HQ","country_code":"US","bounding_box":{"type":"Polygon","coordinates":[[[-122.400612831116,37.7821120598956],[-122.400612831116,37.7821120598956],[-122.400612831116,37.7821120598956],[-122.400612831116,37.7821120598956]]]},"id":"247f43d441defc03","url":"http://api.twitter.com/1/geo/id/247f43d441defc03.json"},"coordinates":null,"in_reply_to_user_id":18911703,"geo":null,"user":{"profile_link_color":"0084B4","followers_count":2007,"description":"Developer Advocate at Twitter. Also a hacker and British expat who is married to @cindyli and lives in San Francisco.","lang":"en","created_at":"Sat Feb 17 20:49:54 +0000 2007","location":"San Francisco","screen_name":"themattharris","show_all_inline_media":false,"friends_count":338,"profile_sidebar_fill_color":"DDEEF6","statuses_count":3119,"time_zone":"Tijuana","following":false,"favourites_count":89,"profile_sidebar_border_color":"C0DEED","contributors_enabled":false,"geo_enabled":true,"profile_use_background_image":true,"listed_count":197,"profile_background_color":"C0DEED","protected":false,"verified":false,"profile_background_image_url":"http://s.twimg.com/a/1285805719/images/themes/theme1/bg.png","name":"Matt Harris","follow_request_sent":false,"notifications":false,"profile_text_color":"333333","id":777925,"profile_background_tile":false,"utc_offset":-28800,"url":"http://themattharris.com","profile_image_url":"http://a2.twimg.com/profile_images/554181350/matt_normal.jpg"},"in_reply_to_status_id":25330676593,"truncated":false,"id":25339841563,"in_reply_to_screen_name":"TvdW","text":"@TvdW intentional to avoid confusion. OAuth 2 tokens are short lived so saying OAuth tokens don't expire would be wrong"},
			{"retweeted":false,"created_at":"Thu Sep 23 17:41:09 +0000 2010","contributors":null,"retweet_count":null,"source":"web","favorited":false,"place":{"place_type":"poi","country":"The United States of America","attributes":{"street_address":"795 Folsom St"},"full_name":"Twitter HQ, San Francisco","name":"Twitter HQ","country_code":"US","bounding_box":{"type":"Polygon","coordinates":[[[-122.400612831116,37.7821120598956],[-122.400612831116,37.7821120598956],[-122.400612831116,37.7821120598956],[-122.400612831116,37.7821120598956]]]},"id":"247f43d441defc03","url":"http://api.twitter.com/1/geo/id/247f43d441defc03.json"},"coordinates":null,"in_reply_to_user_id":null,"geo":null,"user":{"profile_link_color":"0084B4","followers_count":2007,"description":"Developer Advocate at Twitter. Also a hacker and British expat who is married to @cindyli and lives in San Francisco.","lang":"en","created_at":"Sat Feb 17 20:49:54 +0000 2007","location":"San Francisco","screen_name":"themattharris","show_all_inline_media":false,"friends_count":338,"profile_sidebar_fill_color":"DDEEF6","statuses_count":3119,"time_zone":"Tijuana","following":false,"favourites_count":89,"profile_sidebar_border_color":"C0DEED","contributors_enabled":false,"geo_enabled":true,"profile_use_background_image":true,"listed_count":197,"profile_background_color":"C0DEED","protected":false,"verified":false,"profile_background_image_url":"http://s.twimg.com/a/1285805719/images/themes/theme1/bg.png","name":"Matt Harris","follow_request_sent":false,"notifications":false,"profile_text_color":"333333","id":777925,"profile_background_tile":false,"utc_offset":-28800,"url":"http://themattharris.com","profile_image_url":"http://a2.twimg.com/profile_images/554181350/matt_normal.jpg"},"in_reply_to_status_id":null,"truncated":false,"id":25327617172,"in_reply_to_screen_name":null,"text":"Yay! The office has provided some blueberries for breakfast."},
			{"retweeted":false,"created_at":"Wed Sep 22 21:28:39 +0000 2010","contributors":null,"retweet_count":null,"source":"web","favorited":false,"place":{"place_type":"poi","country":"The United States of America","attributes":{"street_address":"795 Folsom St"},"full_name":"Twitter HQ, San Francisco","name":"Twitter HQ","country_code":"US","bounding_box":{"type":"Polygon","coordinates":[[[-122.400612831116,37.7821120598956],[-122.400612831116,37.7821120598956],[-122.400612831116,37.7821120598956],[-122.400612831116,37.7821120598956]]]},"id":"247f43d441defc03","url":"http://api.twitter.com/1/geo/id/247f43d441defc03.json"},"coordinates":null,"in_reply_to_user_id":12504,"geo":null,"user":{"profile_link_color":"0084B4","followers_count":2007,"description":"Developer Advocate at Twitter. Also a hacker and British expat who is married to @cindyli and lives in San Francisco.","lang":"en","created_at":"Sat Feb 17 20:49:54 +0000 2007","location":"San Francisco","screen_name":"themattharris","show_all_inline_media":false,"friends_count":338,"profile_sidebar_fill_color":"DDEEF6","statuses_count":3119,"time_zone":"Tijuana","following":false,"favourites_count":89,"profile_sidebar_border_color":"C0DEED","contributors_enabled":false,"geo_enabled":true,"profile_use_background_image":true,"listed_count":197,"profile_background_color":"C0DEED","protected":false,"verified":false,"profile_background_image_url":"http://s.twimg.com/a/1285805719/images/themes/theme1/bg.png","name":"Matt Harris","follow_request_sent":false,"notifications":false,"profile_text_color":"333333","id":777925,"profile_background_tile":false,"utc_offset":-28800,"url":"http://themattharris.com","profile_image_url":"http://a2.twimg.com/profile_images/554181350/matt_normal.jpg"},"in_reply_to_status_id":25246231793,"truncated":false,"id":25246759582,"in_reply_to_screen_name":"SteveMarshall","text":"@SteveMarshall @dracos if you have a blog post/example of this i'd be interested in learning more."},
			{"retweeted":false,"created_at":"Wed Sep 22 21:17:05 +0000 2010","contributors":null,"retweet_count":null,"source":"web","favorited":false,"place":{"place_type":"poi","country":"The United States of America","attributes":{"street_address":"795 Folsom St"},"full_name":"Twitter HQ, San Francisco","name":"Twitter HQ","country_code":"US","bounding_box":{"type":"Polygon","coordinates":[[[-122.400612831116,37.7821120598956],[-122.400612831116,37.7821120598956],[-122.400612831116,37.7821120598956],[-122.400612831116,37.7821120598956]]]},"id":"247f43d441defc03","url":"http://api.twitter.com/1/geo/id/247f43d441defc03.json"},"coordinates":null,"in_reply_to_user_id":3447171,"geo":null,"user":{"profile_link_color":"0084B4","followers_count":2007,"description":"Developer Advocate at Twitter. Also a hacker and British expat who is married to @cindyli and lives in San Francisco.","lang":"en","created_at":"Sat Feb 17 20:49:54 +0000 2007","location":"San Francisco","screen_name":"themattharris","show_all_inline_media":false,"friends_count":338,"profile_sidebar_fill_color":"DDEEF6","statuses_count":3119,"time_zone":"Tijuana","following":false,"favourites_count":89,"profile_sidebar_border_color":"C0DEED","contributors_enabled":false,"geo_enabled":true,"profile_use_background_image":true,"listed_count":197,"profile_background_color":"C0DEED","protected":false,"verified":false,"profile_background_image_url":"http://s.twimg.com/a/1285805719/images/themes/theme1/bg.png","name":"Matt Harris","follow_request_sent":false,"notifications":false,"profile_text_color":"333333","id":777925,"profile_background_tile":false,"utc_offset":-28800,"url":"http://themattharris.com","profile_image_url":"http://a2.twimg.com/profile_images/554181350/matt_normal.jpg"},"in_reply_to_status_id":25245728939,"truncated":false,"id":25245999803,"in_reply_to_screen_name":"dracos","text":"@dracos users may copy the URL from #newtwitter, which include the #! - Apps should know those URLs exist but don't require special handling"},
			{"retweeted":false,"created_at":"Wed Sep 22 21:04:09 +0000 2010","contributors":null,"retweet_count":null,"source":"web","favorited":false,"place":{"place_type":"poi","country":"The United States of America","attributes":{"street_address":"795 Folsom St"},"full_name":"Twitter HQ, San Francisco","name":"Twitter HQ","country_code":"US","bounding_box":{"type":"Polygon","coordinates":[[[-122.400612831116,37.7821120598956],[-122.400612831116,37.7821120598956],[-122.400612831116,37.7821120598956],[-122.400612831116,37.7821120598956]]]},"id":"247f43d441defc03","url":"http://api.twitter.com/1/geo/id/247f43d441defc03.json"},"coordinates":null,"in_reply_to_user_id":3447171,"geo":null,"user":{"profile_link_color":"0084B4","followers_count":2007,"description":"Developer Advocate at Twitter. Also a hacker and British expat who is married to @cindyli and lives in San Francisco.","lang":"en","created_at":"Sat Feb 17 20:49:54 +0000 2007","location":"San Francisco","screen_name":"themattharris","show_all_inline_media":false,"friends_count":338,"profile_sidebar_fill_color":"DDEEF6","statuses_count":3119,"time_zone":"Tijuana","following":false,"favourites_count":89,"profile_sidebar_border_color":"C0DEED","contributors_enabled":false,"geo_enabled":true,"profile_use_background_image":true,"listed_count":197,"profile_background_color":"C0DEED","protected":false,"verified":false,"profile_background_image_url":"http://s.twimg.com/a/1285805719/images/themes/theme1/bg.png","name":"Matt Harris","follow_request_sent":false,"notifications":false,"profile_text_color":"333333","id":777925,"profile_background_tile":false,"utc_offset":-28800,"url":"http://themattharris.com","profile_image_url":"http://a2.twimg.com/profile_images/554181350/matt_normal.jpg"},"in_reply_to_status_id":25244453461,"truncated":false,"id":25245158457,"in_reply_to_screen_name":"dracos","text":"@dracos no, just that if you use those URLs in your application, or people share them with you, they will work."},
			{"retweeted":false,"created_at":"Wed Sep 22 20:11:48 +0000 2010","contributors":null,"retweeted_status":{"retweeted":false,"created_at":"Wed Sep 22 20:10:43 +0000 2010","contributors":[777925],"retweet_count":63,"source":"web","favorited":false,"place":{"place_type":"poi","country":"The United States of America","attributes":{"street_address":"795 Folsom St"},"full_name":"Twitter HQ, San Francisco","name":"Twitter HQ","country_code":"US","bounding_box":{"type":"Polygon","coordinates":[[[-122.400612831116,37.7821120598956],[-122.400612831116,37.7821120598956],[-122.400612831116,37.7821120598956],[-122.400612831116,37.7821120598956]]]},"id":"247f43d441defc03","url":"http://api.twitter.com/1/geo/id/247f43d441defc03.json"},"coordinates":null,"in_reply_to_user_id":null,"geo":null,"user":{"statuses_count":2213,"profile_link_color":"0000ff","description":"The Real Twitter API. I tweet about API changes, service issues and happily answer questions about Twitter and our API. Don't get an answer? It's on my website.","lang":"en","created_at":"Wed May 23 06:01:13 +0000 2007","friends_count":20,"location":"San Francisco, CA","screen_name":"twitterapi","contributors_enabled":true,"profile_sidebar_fill_color":"e0ff92","time_zone":"Pacific Time (US & Canada)","favourites_count":13,"following":false,"profile_sidebar_border_color":"87bc44","geo_enabled":true,"follow_request_sent":false,"profile_use_background_image":true,"listed_count":5892,"verified":true,"profile_background_color":"c1dfee","protected":false,"profile_background_image_url":"http://a3.twimg.com/profile_background_images/59931895/twitterapi-background-new.png","name":"Twitter API","notifications":false,"profile_text_color":"000000","id":6253282,"show_all_inline_media":false,"profile_background_tile":false,"utc_offset":-28800,"followers_count":261798,"url":"http://dev.twitter.com","profile_image_url":"http://a1.twimg.com/profile_images/689684365/api_normal.png"},"in_reply_to_status_id":null,"truncated":false,"id":25241698545,"in_reply_to_screen_name":null,"text":"Information about #newtwitter and the API: http://t.co/IDwUvq6"},"retweet_count":0,"source":"web","favorited":false,"place":null,"coordinates":null,"in_reply_to_user_id":null,"geo":null,"user":{"statuses_count":3119,"profile_link_color":"0084B4","description":"Developer Advocate at Twitter. Also a hacker and British expat who is married to @cindyli and lives in San Francisco.","lang":"en","created_at":"Sat Feb 17 20:49:54 +0000 2007","friends_count":338,"location":"San Francisco","screen_name":"themattharris","contributors_enabled":false,"profile_sidebar_fill_color":"DDEEF6","time_zone":"Tijuana","favourites_count":89,"following":false,"profile_sidebar_border_color":"C0DEED","geo_enabled":true,"follow_request_sent":false,"profile_use_background_image":true,"listed_count":197,"verified":false,"profile_background_color":"C0DEED","protected":false,"profile_background_image_url":"http://s.twimg.com/a/1285805719/images/themes/theme1/bg.png","name":"Matt Harris","notifications":false,"profile_text_color":"333333","id":777925,"show_all_inline_media":false,"profile_background_tile":false,"utc_offset":-28800,"followers_count":2011,"url":"http://themattharris.com","profile_image_url":"http://a2.twimg.com/profile_images/554181350/matt_normal.jpg"},"in_reply_to_status_id":null,"truncated":false,"id":25241768488,"in_reply_to_screen_name":null,"text":"RT @twitterapi: Information about #newtwitter and the API: http://t.co/IDwUvq6"},

			{
				"geo":null,
				"in_reply_to_user_id":null,
				"contributors":null,
				"retweet_count":null,
				"place":null,
				"favorited":false,
				"source":"web",
				"retweeted_status":
				{
					"geo":null,
					"in_reply_to_user_id":null,
					"contributors":null,
					"retweet_count":5,
					"place":null,
					"favorited":false,
					"source":"<a href=\"http://www.socialoomph.com\" rel=\"nofollow\">SocialOomph</a>",
					"user":
					{
						"show_all_inline_media":false,
						"profile_background_image_url":"http://a1.twimg.com/profile_background_images/21995930/Books.jpg",
						"friends_count":362,
						"description":"Follow Manning Publications on Twitter and get exclusive discounts, product announcements, author news, and, if you're lucky, occasional swag.",
						"statuses_count":3294,
						"notifications":false,
						"profile_link_color":"088253",
						"following":false,
						"profile_background_tile":false,
						"favourites_count":3,
						"profile_image_url":"http://a1.twimg.com/profile_images/386363365/uglyguy_normal.jpg",
						"contributors_enabled":false,
						"profile_sidebar_fill_color":"E3E2DE",
						"geo_enabled":false,
						"screen_name":"ManningBooks",
						"profile_sidebar_border_color":"D3D2CF",
						"verified":false,
						"time_zone":"Eastern Time (US & Canada)",
						"follow_request_sent":false,
						"protected":false,
						"listed_count":397,
						"profile_background_color":"EDECE9",
						"url":"http://www.manning.com",
						"name":"Manning Publications",
						"profile_use_background_image":false,
						"followers_count":4487,
						"id":24914741,
						"lang":"en",
						"utc_offset":-18000,
						"created_at":"Tue Mar 17 17:13:25 +0000 2009",
						"profile_text_color":"634047",
						"location":"Connecticut, United States"
					},
					"coordinates":null,
					"in_reply_to_screen_name":"FelixTreguer",
					"in_reply_to_status_id":24461117630,
					"id":24554142308,
					"retweeted":false,
					"truncated":false,
					"text":"DotD! Get the Secrets of the JavaScript Ninja ebook (http://bit.ly/bF8MRA) for $15! Use code dotd0915tw at checkout.",
					"created_at":"Wed Sep 15 09:01:58 +0000 2010"
				},
				"user":
				{
					"show_all_inline_media":false,
					"profile_background_image_url":"http://a1.twimg.com/profile_background_images/57396444/x7511eb8ec62bb8da1b0c61888eb01d0.png",
					"friends_count":702,
					"description":"Creator of jQuery, JavaScript programmer, blogger, author, work for Mozilla.",
					"statuses_count":2492,
					"notifications":false,
					"profile_link_color":"F13D38",
					"following":false,
					"profile_background_tile":true,
					"favourites_count":1,
					"profile_image_url":"http://a2.twimg.com/profile_images/150604006/3450728563_69b0bd0743_normal.jpg",
					"contributors_enabled":false,
					"profile_sidebar_fill_color":"F2EEBB",
					"geo_enabled":true,
					"screen_name":"jeresig",
					"profile_sidebar_border_color":"F2EEBB",
					"verified":false,
					"time_zone":"Eastern Time (US & Canada)",
					"follow_request_sent":false,
					"protected":false,
					"listed_count":3399,
					"profile_background_color":"F2EEBB",
					"url":"http://ejohn.org/",
					"name":"John Resig",
					"profile_use_background_image":true,
					"followers_count":34663,
					"id":752673,
					"lang":"en",
					"utc_offset":-18000,
					"created_at":"Sat Feb 03 20:17:32 +0000 2007",
					"profile_text_color":"272727",
					"location":"Somerville, MA"
				},
				"coordinates":null,
				"in_reply_to_screen_name":null,
				"in_reply_to_status_id":null,
				"id":24566058656,
				"retweeted":false,
				"truncated":false,
				"text":"RT @ManningBooks: DotD! Get the Secrets of the JavaScript Ninja ebook (http://bit.ly/bF8MRA) for $15! Use code dotd0915tw at checkout.",
				"created_at":"Wed Sep 15 12:41:37 +0000 2010"
			},

			{
				"location" : "Paris, France",
				"profile_image_url" : "http://thomasbillenstein-local.com/jTweetsAnywhere/tweet.jpg",
				"created_at" : "Tue, 14 Sep 2010 09:18:28 +0000",
				"from_user" : "FelixTreguer",
				"metadata" :
				{
					"result_type" : "recent"
				},
				"to_user_id" : null,
				"text" : (++tweetCounter) + ' ' + "RT @PaoloBrini: #Microsoft reaction against anti #piracy enforcement used to silence and intimidate NGOs in Russia. http://bit.ly/9xQ3Gp",
				"id" : 24461117630,
				"from_user_id" : 569078,
				"geo" : null,
				"iso_language_code" : "en",
				"source" : "&lt;a href=&quot;http://www.tweetdeck.com&quot; rel=&quot;nofollow&quot;&gt;TweetDeck&lt;/a&gt;"
			}
			,{
				"location" : "paris;)",
				"profile_image_url" : "http://thomasbillenstein-local.com/jTweetsAnywhere/tweet.jpg",
				"created_at" : "Tue, 14 Sep 2010 09:18:28 +0000",
				"from_user" : "muthia_assegaf",
				"metadata" :
				{
					"result_type" : "recent"
				},
				"to_user_id" : null,
				"text" : (++tweetCounter) + ' ' + "Ehehehehe (: RT @HartikaLp: enak aja gue dikatain pembantu T.T @muthia_assegaf",
				"id" : 24461117628,
				"from_user_id" : 108342274,
				"geo" : null,
				"iso_language_code" : "id",
				"source" : "&lt;a href=&quot;http://blackberry.com/twitter&quot; rel=&quot;nofollow&quot;&gt;Twitter for BlackBerry\u00ae&lt;/a&gt;"
			}
			,{
				"location" : "Paris",
				"profile_image_url" : "http://thomasbillenstein-local.com/jTweetsAnywhere/tweet.jpg",
				"created_at" : "Tue, 14 Sep 2010 09:18:28 +0000",
				"from_user" : "sofiayya",
				"metadata" :
				{
					"result_type" : "recent"
				},
				"to_user_id" : null,
				"text" : (++tweetCounter) + ' ' + "baik kl ada maunya aja",
				"id" : 24461117575,
				"from_user_id" : 105551751,
				"geo" : null,
				"iso_language_code" : "id",
				"source" : "&lt;a href=&quot;http://m.dabr.co.uk&quot; rel=&quot;nofollow&quot;&gt;Dabr&lt;/a&gt;"
			},
			{
				"location" : "Paris",
				"profile_image_url" : "http://thomasbillenstein-local.com/jTweetsAnywhere/tweet.jpg",
				"created_at" : "Tue, 14 Sep 2010 09:18:27 +0000",
				"from_user" : "paris_artisans",
				"metadata" :
				{
					"result_type" : "recent"
				},
				"to_user_id" : null,
				"text" : (++tweetCounter) + ' ' + "RT @SOS_Plomberie: http://paris-7eme.intervention-plomberie.com/ 0805889285 Ballon vertical Fleck 75 L fournit pos\u00e9 \u00e0 partir de 699 euros ttc",
				"id" : 24461116667,
				"from_user_id" : 117411940,
				"geo" : null,
				"iso_language_code" : "fr",
				"source" : "&lt;a href=&quot;http://twitter.com/&quot;&gt;web&lt;/a&gt;"
			},
			{
				"location" : "\u30d5\u30e9\u30f3\u30b9\u3000\u30d1\u30ea",
				"profile_image_url" : "http://thomasbillenstein-local.com/jTweetsAnywhere/tweet.jpg",
				"created_at" : "Tue, 14 Sep 2010 09:18:26 +0000",
				"from_user" : "ryo39658ma",
				"metadata" :
				{
					"result_type" : "recent"
				},
				"to_user_id" : null,
				"text" : (++tweetCounter) + ' ' + "\u4e45\u3057\u3076\u308a\u306e\u30e1\u30c8\u30ed4\u53f7\u7dda\u3002\u6709\u8272\u4eba\u7a2e\u5144\u3061\u3083\u3093\u306e\u3001\u30af\u30df\u30f3\u98a8\u5473\u306e\u814b\u81ed\u306b\u9f3b\u3092\u6253\u305f\u308c\u305f\u3002",
				"id" : 24461116359,
				"from_user_id" : 102766073,
				"geo" : null,
				"iso_language_code" : "ja",
				"source" : "&lt;a href=&quot;http://twitter.com/&quot;&gt;web&lt;/a&gt;"
			},
			{
				"location" : "Paris",
				"profile_image_url" : "http://thomasbillenstein-local.com/jTweetsAnywhere/tweet.jpg",
				"created_at" : "Tue, 14 Sep 2010 09:18:26 +0000",
				"from_user" : "CandiceAusten",
				"metadata" :
				{
					"result_type" : "recent"
				},
				"to_user_id" : 3861869,
				"text" : (++tweetCounter) + ' ' + "@bulleblue ARF. NICE. -__-",
				"id" : 24461115993,
				"from_user_id" : 1496019,
				"to_user" : "bulleblue",
				"geo" : null,
				"iso_language_code" : "fr",
				"source" : "&lt;a href=&quot;http://www.echofon.com/&quot; rel=&quot;nofollow&quot;&gt;Echofon&lt;/a&gt;"
			},
			{
				"location" : "Paris",
				"profile_image_url" : "http://thomasbillenstein-local.com/jTweetsAnywhere/tweet.jpg",
				"created_at" : "Tue, 14 Sep 2010 09:18:25 +0000",
				"from_user" : "ELETLELET",
				"metadata" :
				{
					"result_type" : "recent"
				},
				"to_user_id" : 141512183,
				"text" : (++tweetCounter) + ' ' + "@feli_goldfish W fotocopi dr yg les sayang. Hoho",
				"id" : 24461115466,
				"from_user_id" : 144055550,
				"to_user" : "feli_goldfish",
				"geo" : null,
				"iso_language_code" : "en",
				"source" : "&lt;a href=&quot;http://www.snaptu.com&quot; rel=&quot;nofollow&quot;&gt;Snaptu.com&lt;/a&gt;"
			},
			{
				"location" : "Paris",
				"profile_image_url" : "http://thomasbillenstein-local.com/jTweetsAnywhere/tweet.jpg",
				"created_at" : "Tue, 14 Sep 2010 09:18:25 +0000",
				"from_user" : "_Peka",
				"metadata" :
				{
					"result_type" : "recent"
				},
				"to_user_id" : null,
				"text" : (++tweetCounter) + ' ' + "RT: @Arkh3: Have A Look At Dissidia 012 [duodecim] Final Fantasy http://t.co/LFbNhJ9 via @kotaku // \\o/, 300H de ma vie qui vont sauter?",
				"id" : 24461115179,
				"from_user_id" : 48975009,
				"geo" : null,
				"iso_language_code" : "pt",
				"source" : "&lt;a href=&quot;http://www.echofon.com/&quot; rel=&quot;nofollow&quot;&gt;Echofon&lt;/a&gt;"
			}
			];
		};

		var getAutorefreshData = function()
		{
			return [
			{
				"location" : "\u30d5\u30e9\u30f3\u30b9\u3000\u30d1\u30ea",
				"profile_image_url" : "http://thomasbillenstein-local.com/jTweetsAnywhere/tweet.jpg",
				"created_at" : "Tue, 14 Sep 2010 09:18:26 +0000",
				"from_user" : "ryo39658ma",
				"metadata" :
				{
					"result_type" : "recent"
				},
				"to_user_id" : null,
				"text" : "TICKER TICKER TICKER \u4e45\u3057\u3076\u308a\u306e\u30e1\u30c8\u30ed4\u53f7\u7dda\u3002\u6709\u8272\u4eba\u7a2e\u5144\u3061\u3083\u3093\u306e\u3001\u30af\u30df\u30f3\u98a8\u5473\u306e\u814b\u81ed\u306b\u9f3b\u3092\u6253\u305f\u308c\u305f\u3002",
				"id" : autorefreshCounter++,
				"from_user_id" : 102766073,
				"geo" : null,
				"iso_language_code" : "ja",
				"source" : "&lt;a href=&quot;http://twitter.com/&quot;&gt;web&lt;/a&gt;"
			},
			{
				"location" : "Paris",
				"profile_image_url" : "http://thomasbillenstein-local.com/jTweetsAnywhere/tweet.jpg",
				"created_at" : "Tue, 14 Sep 2010 09:18:26 +0000",
				"from_user" : "CandiceAusten",
				"metadata" :
				{
					"result_type" : "recent"
				},
				"to_user_id" : 3861869,
				"text" : "TICKER TICKER TICKER @bulleblue ARF. NICE. -__-",
				"id" : autorefreshCounter++,
				"from_user_id" : 1496019,
				"to_user" : "bulleblue",
				"geo" : null,
				"iso_language_code" : "fr",
				"source" : "&lt;a href=&quot;http://www.echofon.com/&quot; rel=&quot;nofollow&quot;&gt;Echofon&lt;/a&gt;"
			},
			{
				"location" : "Paris, France",
				"profile_image_url" : "http://thomasbillenstein-local.com/jTweetsAnywhere/tweet.jpg",
				"created_at" : "Tue, 14 Sep 2010 09:18:28 +0000",
				"from_user" : "FelixTreguer",
				"metadata" :
				{
					"result_type" : "recent"
				},
				"to_user_id" : null,
				"text" : "RT @PaoloBrini: #Microsoft reaction against anti #piracy enforcement used to silence and intimidate NGOs in Russia. http://bit.ly/9xQ3Gp",
				"id" : 24461117630,
				"from_user_id" : 569078,
				"geo" : null,
				"iso_language_code" : "en",
				"source" : "&lt;a href=&quot;http://www.tweetdeck.com&quot; rel=&quot;nofollow&quot;&gt;TweetDeck&lt;/a&gt;"
			}];
		};

		getData(url, callback);
	};
