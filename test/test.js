jta_test = function(options)
{
	var savedOptions = jQuery.extend(true, {}, options);

	/*************************************************************************/
	/* Utilities tests                                                       */
	/*************************************************************************/
	module("Utilities");

	test("isAnywherePresent()", function()
	{
		strictEqual(isAnywherePresent(), false, "Twitter's @anywhere shouldn't be present");
	});

	test("isLoading()", function()
	{
		strictEqual(isLoading({ _loadingIndicatorElement: null }), false, "isLoading should return false");
		strictEqual(isLoading({ _loadingIndicatorElement: {} }), true, "isLoading should return true");
	});

	test("isTweetInCache()", function()
	{
		var testOptions = $.extend(true, {}, savedOptions, {});
		testOptions._tweetsCache.push({ id: 1 });
		testOptions._tweetsCache.push({ id: 2 });
		testOptions._tweetsCache.push({ id: 3 });
		testOptions._tweetsCache.push({ id: 4 });
		testOptions._tweetsCache.push({ id: 5 });

		strictEqual(isTweetInCache({ id: 123 }, testOptions), false, "tweet shouldn't be in cache");
		strictEqual(isTweetInCache({ id: 1 }, testOptions), true, "tweet should be in cache");
		strictEqual(isTweetInCache({ id: 3 }, testOptions), true, "tweet should be in cache");
		strictEqual(isTweetInCache({ id: 5 }, testOptions), true, "tweet should be in cache");
	});

	test("validateRange()", function()
	{
		strictEqual(validateRange(0, 0, 5), 0, "validate range");
		strictEqual(validateRange(0, 1, 5), 1, "validate range");
		strictEqual(validateRange(6, 0, 5), 5, "validate range");
		strictEqual(validateRange(-1, 0, 5), 0, "validate range");
		strictEqual(validateRange(0, -5, 0), 0, "validate range");
		strictEqual(validateRange(-3, -5, 0), -3, "validate range");
		strictEqual(validateRange(-100, -5, 0), -5, "validate range");
		strictEqual(validateRange(9, -5, 0), 0, "validate range");
		strictEqual(validateRange(5, 0, 0), 0, "validate range");
		strictEqual(validateRange(-3, 0, 0), 0, "validate range");
	});

	test("getScreenName()", function()
	{
		strictEqual(getScreenName({}), undefined, 'getScreenName() - undefined');
		strictEqual(getScreenName({ user: {}}), undefined, 'getScreenName() - undefined');

		strictEqual(getScreenName({ from_user: 'john'}), 'john', 'getScreenName() - from_user');
		strictEqual(getScreenName({ user: { screen_name: 'joe' }}), 'joe', 'getScreenName() - user.screen_name');

		strictEqual(getScreenName({ retweeted_status: { from_user: 'john_rt' }}), 'john_rt', 'getScreenName() - RT from_user');
		strictEqual(getScreenName({ retweeted_status: { user: { screen_name: 'joe_rt' }}}), 'joe_rt', 'getScreenName() - RT user.screen_name');
	});

	test("getFullName()", function()
	{
		strictEqual(getFullName({}), undefined, 'getFullName() - undefined');
		strictEqual(getFullName({ user: {}}), undefined, 'getFullName() - undefined');

		strictEqual(getFullName({ user: { name: 'joe black' }}), 'joe black', 'getFullName() - user.name');

		strictEqual(getFullName({ retweeted_status: { user: { name: 'joe_rt black' }}}), 'joe_rt black', 'getFullName() - RT user.name');
	});

	test("getFeedUrl()", function()
	{
		strictEqual(
			getFeedUrl(
			{
				username: 'testuser',
				_tweetFeedConfig: { includeRetweets: false }
			}, false),
			'http://api.twitter.com/1/statuses/user_timeline.json?screen_name=testuser&count=20&callback=?',
			'user tweets, no retweets');

		strictEqual(
			getFeedUrl(
			{
				username: 'testuser',
				_tweetFeedConfig: { includeRetweets: true }
			}, false),
			'http://api.twitter.com/1/statuses/user_timeline.json?screen_name=testuser&count=20&include_rts=true&callback=?',
			'user tweets, incl retweets');

		strictEqual(
			getFeedUrl(
			{
				username: 'testuser',
				_tweetFeedConfig:
				{
					includeRetweets: false,
					_pageParam: 2
				}
			}, true),
			'http://api.twitter.com/1/statuses/user_timeline.json?screen_name=testuser&count=20&page=2&callback=?',
			'user tweets, paging, no retweets');

		strictEqual(
			getFeedUrl(
			{
				username: 'testuser',
				_tweetFeedConfig:
				{
					includeRetweets: false,
					_maxId: 1234,
					_pageParam: 2
				}
			}, true),
			'http://api.twitter.com/1/statuses/user_timeline.json?screen_name=testuser&count=20&max_id=1234&page=2&callback=?',
			'user tweets, paging, max_id, no retweets');

		strictEqual(
			getFeedUrl(
			{
				username: 'testuser',
				list: 'favorites'
			}, false),
			'http://api.twitter.com/1/favorites/testuser.json?count=20&callback=?',
			'user favorites');

		strictEqual(
			getFeedUrl(
			{
				username: 'testuser',
				list: 'html5'
			}, false),
			'http://api.twitter.com/1/testuser/lists/html5/statuses.json?per_page=20&callback=?',
			'user list');

		strictEqual(
			getFeedUrl(
			{
				username: 'testuser',
				searchParams: 'q=html5'
			}, false),
			'http://search.twitter.com/search.json?q=html5&rpp=100&callback=?',
			'single search param');

		strictEqual(
			getFeedUrl(
			{
				username: 'testuser',
				searchParams: ['q=html5', 'geo=1,2', 'foo=bar']
			}, false),
			'http://search.twitter.com/search.json?q=html5&geo=1,2&foo=bar&rpp=100&callback=?',
			'multiple search params');
	});

	/*************************************************************************/
	/* Setup / Options tests                                                 */
	/*************************************************************************/
	module("Setup / Options");

	test("basics", function()
	{
		var testOptions = $.extend(true, {}, savedOptions,
		{
			searchParams: ['q=html5'],
			count: 2,
			tweetDataProvider: mockedTweetDataProvider,
			rateLimitDataProvider: mockedRateLimitDataProvider
		});

		setupOptions(testOptions);

		strictEqual(testOptions._baseSelector, '#jta_testfeed', 'base selector test');
	});

	test("simple username / count", function()
	{
		var testOptions = $.extend(true, {}, savedOptions,
		{
			username: 'test',
			count: 5
		});

		setupOptions(testOptions);

		strictEqual(testOptions.username, 'test', 'username hasn`t changed');
		strictEqual(testOptions.count, 5, 'count hasn`t changed');
	});

	/*************************************************************************/
	/* Formatter tests                                                       */
	/*************************************************************************/
	module("Formatter");

	test("defaultTweetTimestampFormatter()", function()
	{
		var testOptions = $.extend(true, {}, savedOptions, {});
		setupOptions(testOptions);

		var now = new Date();
		//$('#console').html(now.toUTCString());

		var result = defaultTweetTimestampFormatter(now.toUTCString(), testOptions);
		strictEqual(result, '0 seconds ago', '0 seconds ago');

		now = new Date();
		now.setTime(now.getTime() - 1000);
		result = defaultTweetTimestampFormatter(now.toUTCString(), testOptions);
		strictEqual(result, '1 second ago', '1 seconds ago');

		now = new Date();
		now.setTime(now.getTime() - 10*1000);
		result = defaultTweetTimestampFormatter(now.toUTCString(), testOptions);
		strictEqual(result, '10 seconds ago', '10 seconds ago');

		now = new Date();
		now.setTime(now.getTime() - 60*1000);
		result = defaultTweetTimestampFormatter(now.toUTCString(), testOptions);
		strictEqual(result, '1 minute ago', '1 minute ago');

		now = new Date();
		now.setTime(now.getTime() - 10*60*1000);
		result = defaultTweetTimestampFormatter(now.toUTCString(), testOptions);
		strictEqual(result, '10 minutes ago', '10 minutes ago');

		now = new Date();
		now.setTime(now.getTime() - 60*60*1000);
		result = defaultTweetTimestampFormatter(now.toUTCString(), testOptions);
		strictEqual(result, '1 hour ago', '1 hour ago');

		now = new Date();
		now.setTime(now.getTime() - 120*60*1000);
		result = defaultTweetTimestampFormatter(now.toUTCString(), testOptions);
		strictEqual(result, '2 hours ago', '2 hours ago');

		now = new Date();
		now.setTime(now.getTime() - (24*60*60*1000 - 1000));
		result = defaultTweetTimestampFormatter(now.toUTCString(), testOptions);
		strictEqual(result, '24 hours ago', '24 hours ago');

	});

	/*************************************************************************/
	/* Decorator tests                                                       */
	/*************************************************************************/
	module("Decorators");

	test("defaultNoDataDecorator()", function()
	{
		var testOptions = $.extend(true, {}, savedOptions, {});
		setupOptions(testOptions);

		strictEqual(defaultNoDataDecorator(testOptions), '<li class="jta-nodata">No more data</li>', 'locale en');

		testOptions = $.extend(true, {}, savedOptions, { locale: 'de'});
		setupOptions(testOptions);

		//TODO locale: de!
		strictEqual(defaultNoDataDecorator(testOptions), '<li class="jta-nodata">No more data</li>', 'locale de');
	});

	test("defaultErrorDecorator()", function()
	{
		var testOptions = $.extend(true, {}, savedOptions, {});
		setupOptions(testOptions);

		strictEqual(defaultErrorDecorator('an error occurred', testOptions), '<li class="jta-error">ERROR: an error occurred</li>', 'locale en');

		testOptions = $.extend(true, {}, savedOptions, { locale: 'de'});
		setupOptions(testOptions);

		//TODO locale: de!
		strictEqual(defaultErrorDecorator('an error occurred', testOptions), '<li class="jta-error">ERROR: an error occurred</li>', 'locale de');
	});

	test("defaultLoadingDecorator()", function()
	{
		var testOptions = $.extend(true, {}, savedOptions, {});
		setupOptions(testOptions);

		strictEqual(defaultLoadingDecorator(testOptions), '<li class="jta-loading">loading ...</li>', 'locale en');

		testOptions = $.extend(true, {}, savedOptions, { locale: 'de'});
		setupOptions(testOptions);

		//TODO locale: de!
		strictEqual(defaultLoadingDecorator(testOptions), '<li class="jta-loading">loading ...</li>', 'locale de');
	});

	test("defaultTweetBoxDecorator()", function()
	{
		var testOptions = $.extend(true, {}, savedOptions, {});
		setupOptions(testOptions);

		strictEqual(defaultTweetBoxDecorator(testOptions), '<div class="jta-tweet-box"></div>', 'locale en');
	});

	test("defaultFollowButtonDecorator()", function()
	{
		var testOptions = $.extend(true, {}, savedOptions, {});
		setupOptions(testOptions);

		strictEqual(defaultFollowButtonDecorator(testOptions), '<div class="jta-follow-button"></div>', 'locale en');
	});

	test("defaultLoginInfoDecorator()", function()
	{
		var testOptions = $.extend(true, {}, savedOptions, {});
		setupOptions(testOptions);

		strictEqual(defaultLoginInfoDecorator(testOptions), '<div class="jta-login-info"></div>', 'locale en');
	});

	test("defaultConnectButtonDecorator()", function()
	{
		var testOptions = $.extend(true, {}, savedOptions, {});
		setupOptions(testOptions);

		strictEqual(defaultConnectButtonDecorator(testOptions), '<div class="jta-connect-button"></div>', 'locale en');
	});

	test("defaultTweetActionFavoriteDecorator()", function()
	{
		var testOptions = $.extend(true, {}, savedOptions, {});
		setupOptions(testOptions);

		var tweet = { id: 12345 };

		strictEqual(defaultTweetActionFavoriteDecorator(tweet, testOptions), '<span class="jta-tweet-action-favorite"><a href="https://twitter.com/intent/favorite?tweet_id=12345">Favorite</a></span>', 'locale en');

		testOptions = $.extend(true, {}, savedOptions, { locale: 'de'});
		setupOptions(testOptions);

		//TODO locale: de!
		strictEqual(defaultTweetActionFavoriteDecorator(tweet, testOptions), '<span class="jta-tweet-action-favorite"><a href="https://twitter.com/intent/favorite?tweet_id=12345">Favorite</a></span>', 'locale de');
	});

	test("defaultTweetActionRetweetDecorator()", function()
	{
		var testOptions = $.extend(true, {}, savedOptions, {});
		setupOptions(testOptions);

		var tweet = { id: 12345 };

		strictEqual(defaultTweetActionRetweetDecorator(tweet, testOptions), '<span class="jta-tweet-action-retweet"><a href="https://twitter.com/intent/retweet?tweet_id=12345">Retweet</a></span>', 'locale en');

		testOptions = $.extend(true, {}, savedOptions, { locale: 'de'});
		setupOptions(testOptions);

		//TODO locale: de!
		strictEqual(defaultTweetActionRetweetDecorator(tweet, testOptions), '<span class="jta-tweet-action-retweet"><a href="https://twitter.com/intent/retweet?tweet_id=12345">Retweet</a></span>', 'locale de');
	});

	test("defaultTweetActionReplyDecorator()", function()
	{
		var testOptions = $.extend(true, {}, savedOptions, {});
		setupOptions(testOptions);

		var tweet = { id: 12345 };

		strictEqual(defaultTweetActionReplyDecorator(tweet, testOptions), '<span class="jta-tweet-action-reply"><a href="https://twitter.com/intent/tweet?in_reply_to=12345">Reply</a></span>', 'locale en');

		testOptions = $.extend(true, {}, savedOptions, { locale: 'de'});
		setupOptions(testOptions);

		//TODO locale: de!
		strictEqual(defaultTweetActionReplyDecorator(tweet, testOptions), '<span class="jta-tweet-action-reply"><a href="https://twitter.com/intent/tweet?in_reply_to=12345">Reply</a></span>', 'locale de');
	});

	test("defaultTweetActionsDecorator()", function()
	{
		var testOptions = $.extend(true, {}, savedOptions, { showTweetFeed: { showActionReply: true, showActionRetweet: true, showActionFavorite: true }});
		setupOptions(testOptions);

		var tweet = { id: 12345 };

		strictEqual(
			defaultTweetActionsDecorator(tweet, testOptions),
			'<span class="jta-tweet-actions"><span class="jta-tweet-action-reply"><a href="https://twitter.com/intent/tweet?in_reply_to=12345">Reply</a></span><span class="jta-tweet-action-retweet"><a href="https://twitter.com/intent/retweet?tweet_id=12345">Retweet</a></span><span class="jta-tweet-action-favorite"><a href="https://twitter.com/intent/favorite?tweet_id=12345">Favorite</a></span></span>',
			'locale en');

		testOptions.tweetActionReplyDecorator = null;

		strictEqual(
			defaultTweetActionsDecorator(tweet, testOptions),
			'<span class="jta-tweet-actions"><span class="jta-tweet-action-retweet"><a href="https://twitter.com/intent/retweet?tweet_id=12345">Retweet</a></span><span class="jta-tweet-action-favorite"><a href="https://twitter.com/intent/favorite?tweet_id=12345">Favorite</a></span></span>',
			'locale en');

		testOptions.tweetActionRetweetDecorator = null;

		strictEqual(
			defaultTweetActionsDecorator(tweet, testOptions),
			'<span class="jta-tweet-actions"><span class="jta-tweet-action-favorite"><a href="https://twitter.com/intent/favorite?tweet_id=12345">Favorite</a></span></span>',
			'locale en');

		testOptions.tweetActionFavoriteDecorator = null;

		strictEqual(defaultTweetActionsDecorator(tweet, testOptions), '', 'locale en');
	});

	test("defaultTweetRetweeterDecorator()", function()
	{
		var testOptions = $.extend(true, {}, savedOptions, {});
		setupOptions(testOptions);

		var tweet =
		{
			user:
			{
				screen_name: 'jack'
			},
			retweeted_status:
			{
				user: { screen_name: 'joe_rt' },
				retweet_count: 1
			}
		};

		strictEqual(
			defaultTweetRetweeterDecorator(tweet, testOptions),
			'<br/><span class="jta-tweet-retweeter">Retweeted by <a class="jta-tweet-retweeter-link" href="http://twitter.com/jack" target="_blank">jack</a></span>',
			'locale en');

		testOptions = $.extend(true, {}, savedOptions, { locale: 'de'});
		setupOptions(testOptions);

		//TODO locale: de!
		strictEqual(
			defaultTweetRetweeterDecorator(tweet, testOptions),
			'<br/><span class="jta-tweet-retweeter">Retweeted by <a class="jta-tweet-retweeter-link" href="http://twitter.com/jack" target="_blank">jack</a></span>',
			'locale de');


		tweet.retweeted_status.retweet_count = 4;

		strictEqual(
			defaultTweetRetweeterDecorator(tweet, testOptions),
			'<br/><span class="jta-tweet-retweeter">Retweeted by <a class="jta-tweet-retweeter-link" href="http://twitter.com/jack" target="_blank">jack</a> and 3 others</span>',
			'locale en');

		testOptions = $.extend(true, {}, savedOptions, { locale: 'de'});
		setupOptions(testOptions);

		//TODO locale: de!
		strictEqual(
			defaultTweetRetweeterDecorator(tweet, testOptions),
			'<br/><span class="jta-tweet-retweeter">Retweeted by <a class="jta-tweet-retweeter-link" href="http://twitter.com/jack" target="_blank">jack</a> and 3 others</span>',
			'locale de');


		tweet.retweeted_status.retweet_count = 2;

		strictEqual(
			defaultTweetRetweeterDecorator(tweet, testOptions),
			'<br/><span class="jta-tweet-retweeter">Retweeted by <a class="jta-tweet-retweeter-link" href="http://twitter.com/jack" target="_blank">jack</a> and 1 other</span>',
			'locale en');

		testOptions = $.extend(true, {}, savedOptions, { locale: 'de'});
		setupOptions(testOptions);

		//TODO locale: de!
		strictEqual(
			defaultTweetRetweeterDecorator(tweet, testOptions),
			'<br/><span class="jta-tweet-retweeter">Retweeted by <a class="jta-tweet-retweeter-link" href="http://twitter.com/jack" target="_blank">jack</a> and 1 other</span>',
			'locale de');
	});

	test("defaultTweetInReplyToDecorator()", function()
	{
		var testOptions = $.extend(true, {}, savedOptions, {});
		setupOptions(testOptions);

		var tweet = { };

		strictEqual(
			defaultTweetInReplyToDecorator(tweet, testOptions),
			'',
			'locale en');

		testOptions = $.extend(true, {}, savedOptions, { locale: 'de'});
		setupOptions(testOptions);

		//TODO locale: de!
		strictEqual(
			defaultTweetInReplyToDecorator(tweet, testOptions),
			'',
			'locale de');


		tweet = { retweeted_status: {}};

		strictEqual(
			defaultTweetInReplyToDecorator(tweet, testOptions),
			'',
			'locale en');

		testOptions = $.extend(true, {}, savedOptions, { locale: 'de'});
		setupOptions(testOptions);

		//TODO locale: de!
		strictEqual(
			defaultTweetInReplyToDecorator(tweet, testOptions),
			'',
			'locale de');


		tweet = { retweeted_status: { in_reply_to_status_id: 12345, in_reply_to_screen_name: 'rep_to_scr_name'}};

		strictEqual(
			defaultTweetInReplyToDecorator(tweet, testOptions),
			'<span class="jta-tweet-inreplyto"> <a class="jta-tweet-inreplyto-link" href="http://twitter.com/rep_to_scr_name/status/12345" target="_blank">in reply to rep_to_scr_name</a></span>',
			'locale en');

		testOptions = $.extend(true, {}, savedOptions, { locale: 'de'});
		setupOptions(testOptions);

		//TODO locale: de!
		strictEqual(
			defaultTweetInReplyToDecorator(tweet, testOptions),
			'<span class="jta-tweet-inreplyto"> <a class="jta-tweet-inreplyto-link" href="http://twitter.com/rep_to_scr_name/status/12345" target="_blank">in reply to rep_to_scr_name</a></span>',
			'locale de');
	});

	test("defaultTweetFeedDecorator()", function()
	{
		var testOptions = $.extend(true, {}, savedOptions, {});
		setupOptions(testOptions);

		strictEqual(defaultTweetFeedDecorator(testOptions), '<ul class="jta-tweet-list"></ul>', 'tweet feed list');
	});

	test("defaultTweetDecorator()", function()
	{
		var testOptions = $.extend(true, {}, savedOptions, {});
		testOptions._tweetFeedConfig.showProfileImages = false;
		testOptions.tweetBodyDecorator = null;

		strictEqual(
			defaultTweetDecorator({}, testOptions),
			'<li class="jta-tweet-list-item"><div class="jta-clear">&nbsp;</div></li>',
			'no profile image, no body');
	});

	test("defaultTweetFeedControlsMoreBtnDecorator()", function()
	{
		var testOptions = $.extend(true, {}, savedOptions, {});
		setupOptions(testOptions);

		strictEqual(
			defaultTweetFeedControlsMoreBtnDecorator(testOptions),
			'<span class="jta-tweet-list-controls-button jta-tweet-list-controls-button-more">More</span>',
			'locale en');

		testOptions = $.extend(true, {}, savedOptions, { locale: 'de'});
		setupOptions(testOptions);

		//TODO locale: de!
		strictEqual(
			defaultTweetFeedControlsMoreBtnDecorator(testOptions),
			'<span class="jta-tweet-list-controls-button jta-tweet-list-controls-button-more">More</span>',
			'locale de');
	});

	test("defaultTweetFeedControlsPrevBtnDecorator()", function()
	{
		var testOptions = $.extend(true, {}, savedOptions, {});
		setupOptions(testOptions);

		strictEqual(
			defaultTweetFeedControlsPrevBtnDecorator(testOptions),
			'<span class="jta-tweet-list-controls-button jta-tweet-list-controls-button-prev">Prev</span>',
			'locale en');

		testOptions = $.extend(true, {}, savedOptions, { locale: 'de'});
		setupOptions(testOptions);

		//TODO locale: de!
		strictEqual(
			defaultTweetFeedControlsPrevBtnDecorator(testOptions),
			'<span class="jta-tweet-list-controls-button jta-tweet-list-controls-button-prev">Prev</span>',
			'locale de');
	});

	test("defaultTweetFeedControlsNextBtnDecorator()", function()
	{
		var testOptions = $.extend(true, {}, savedOptions, {});
		setupOptions(testOptions);

		strictEqual(
			defaultTweetFeedControlsNextBtnDecorator(testOptions),
			'<span class="jta-tweet-list-controls-button jta-tweet-list-controls-button-next">Next</span>',
			'locale en');

		testOptions = $.extend(true, {}, savedOptions, { locale: 'de'});
		setupOptions(testOptions);

		//TODO locale: de!
		strictEqual(
			defaultTweetFeedControlsNextBtnDecorator(testOptions),
			'<span class="jta-tweet-list-controls-button jta-tweet-list-controls-button-next">Next</span>',
			'locale de');
	});

	test("defaultTweetFeedControlsDecorator()", function()
	{
		var testOptions = $.extend(true, {}, savedOptions, {});
		setupOptions(testOptions);

		strictEqual(
			defaultTweetFeedControlsDecorator(testOptions),
			'<div class="jta-tweet-list-controls"><span class="jta-tweet-list-controls-button jta-tweet-list-controls-button-more">More</span></div>',
			'more button');

		var testOptions = $.extend(true, {}, savedOptions, { showTweetFeed: { paging: { mode: "prev-next" }}});
		setupOptions(testOptions);

		strictEqual(
			defaultTweetFeedControlsDecorator(testOptions),
			'<div class="jta-tweet-list-controls"><span class="jta-tweet-list-controls-button jta-tweet-list-controls-button-prev">Prev</span><span class="jta-tweet-list-controls-button jta-tweet-list-controls-button-next">Next</span></div>',
			'prev/next buttons');


		var testOptions = $.extend(true, {}, savedOptions, { showTweetFeed: { paging: { mode: "endless-scroll" }}});
		setupOptions(testOptions);

		strictEqual(
			defaultTweetFeedControlsDecorator(testOptions),
			'<div class="jta-tweet-list-controls"></div>',
			'prev/next buttons');
	});

	test("defaultTweetFeedAutorefreshTriggerContentDecorator()", function()
	{
		var testOptions = $.extend(true, {}, savedOptions, {});
		setupOptions(testOptions);

		strictEqual(
			defaultTweetFeedAutorefreshTriggerContentDecorator(1, testOptions),
			'<span class="jta-tweet-list-autorefresh-trigger-content">1 new tweet</span>',
			'locale en');

		strictEqual(
			defaultTweetFeedAutorefreshTriggerContentDecorator(5, testOptions),
			'<span class="jta-tweet-list-autorefresh-trigger-content">5 new tweets</span>',
			'locale en');

		testOptions = $.extend(true, {}, savedOptions, { locale: 'de'});
		setupOptions(testOptions);

		//TODO locale: de!
		strictEqual(
			defaultTweetFeedAutorefreshTriggerContentDecorator(1, testOptions),
			'<span class="jta-tweet-list-autorefresh-trigger-content">1 new tweet</span>',
			'locale de');

		strictEqual(
			defaultTweetFeedAutorefreshTriggerContentDecorator(5, testOptions),
			'<span class="jta-tweet-list-autorefresh-trigger-content">5 new tweets</span>',
			'locale de');
	});

	test("defaultTweetFeedAutorefreshTriggerDecorator()", function()
	{
		var testOptions = $.extend(true, {}, savedOptions, {});
		setupOptions(testOptions);

		strictEqual(
			defaultTweetFeedAutorefreshTriggerDecorator(1, testOptions),
			'<li class="jta-tweet-list-autorefresh-trigger"><span class="jta-tweet-list-autorefresh-trigger-content">1 new tweet</span></li>',
			'locale en');

		strictEqual(
			defaultTweetFeedAutorefreshTriggerDecorator(5, testOptions),
			'<li class="jta-tweet-list-autorefresh-trigger"><span class="jta-tweet-list-autorefresh-trigger-content">5 new tweets</span></li>',
			'locale en');

		testOptions = $.extend(true, {}, savedOptions, { locale: 'de'});
		setupOptions(testOptions);

		//TODO locale: de!
		strictEqual(
			defaultTweetFeedAutorefreshTriggerDecorator(1, testOptions),
			'<li class="jta-tweet-list-autorefresh-trigger"><span class="jta-tweet-list-autorefresh-trigger-content">1 new tweet</span></li>',
			'locale de');

		strictEqual(
			defaultTweetFeedAutorefreshTriggerDecorator(5, testOptions),
			'<li class="jta-tweet-list-autorefresh-trigger"><span class="jta-tweet-list-autorefresh-trigger-content">5 new tweets</span></li>',
			'locale de');
	});

	test("defaultTweetGeoLocationDecorator()", function()
	{
		var testOptions = $.extend(true, {}, savedOptions, {});
		setupOptions(testOptions);

		strictEqual(
			defaultTweetGeoLocationDecorator({}, testOptions),
			'',
			'locale en');

		strictEqual(
			defaultTweetGeoLocationDecorator({ place: { full_name: 'the place'}}, testOptions),
			'<span class="jta-tweet-location"> from <a class="jta-tweet-location-link" href="http://maps.google.com/maps?q=the place" target="_blank">the place</a></span>',
			'locale en');

		testOptions = $.extend(true, {}, savedOptions, { locale: 'de'});
		setupOptions(testOptions);

		//TODO locale: de!
		strictEqual(
			defaultTweetGeoLocationDecorator({}, testOptions),
			'',
			'locale de');

		strictEqual(
			defaultTweetGeoLocationDecorator({ place: { full_name: 'the place'}}, testOptions),
			'<span class="jta-tweet-location"> from <a class="jta-tweet-location-link" href="http://maps.google.com/maps?q=the place" target="_blank">the place</a></span>',
			'locale de');
	});

	test("defaultLoginInfoContentDecorator()", function()
	{
		var testOptions = $.extend(true, {}, savedOptions, {});
		setupOptions(testOptions);

		var mock_T_false = function() { return { isConnected: function() { return false; } }; }();
		var mock_T_true = function()
		{
			return {
				isConnected: function() { return true; },
				currentUser:
				{
					data: function(p)
					{
						if (p == 'screen_name')
						{
							return 'The_screen_name';
						}
						else if (p == 'profile_image_url')
						{
							return 'http://foo.bar/imf.jpg';
						}

						return '';
					}
				}
			};
		}();

		strictEqual(
			defaultLoginInfoContentDecorator(testOptions, mock_T_false),
			'',
			'locale en');

		strictEqual(
			defaultLoginInfoContentDecorator(testOptions, mock_T_true),
			'<div class="jta-login-info-profile-image"><a href="http://twitter.com/The_screen_name" target="_blank"><img src="http://foo.bar/imf.jpg" alt="The_screen_name" title="The_screen_name"/></a></div><div class="jta-login-info-block"><div class="jta-login-info-screen-name"><a href="http://twitter.com/The_screen_name" target="_blank">The_screen_name</a></div><div class="jta-login-info-sign-out">Sign out</div></div><div class="jta-clear">&nbsp;</div>',
			'locale en');

		testOptions = $.extend(true, {}, savedOptions, { locale: 'de'});
		setupOptions(testOptions);

		//TODO locale: de!
		strictEqual(
			defaultLoginInfoContentDecorator(testOptions, mock_T_false),
			'',
			'locale de');

		strictEqual(
			defaultLoginInfoContentDecorator(testOptions, mock_T_true),
			'<div class="jta-login-info-profile-image"><a href="http://twitter.com/The_screen_name" target="_blank"><img src="http://foo.bar/imf.jpg" alt="The_screen_name" title="The_screen_name"/></a></div><div class="jta-login-info-block"><div class="jta-login-info-screen-name"><a href="http://twitter.com/The_screen_name" target="_blank">The_screen_name</a></div><div class="jta-login-info-sign-out">Sign out</div></div><div class="jta-clear">&nbsp;</div>',
			'locale de');
	});

	test("defaultUsernameDecorator()", function()
	{
		var testOptions = $.extend(true, {}, savedOptions, {});
		setupOptions(testOptions);

		strictEqual(
			defaultUsernameDecorator('blah', testOptions),
			'blah',
			'no replacement');

		strictEqual(
			defaultUsernameDecorator('blah @tbillenstein blah', testOptions),
			'blah @<a href="http://twitter.com/tbillenstein" class="jta-tweet-a twitter-anywhere-user" target="_blank" rel="nofollow">tbillenstein<\/a> blah',
			'default replacement');

		strictEqual(
			defaultUsernameDecorator('blah tb@thomasbillenstein.com blah', testOptions),
			'blah tb@thomasbillenstein.com blah',
			'handling email addresses');

		strictEqual(
			defaultUsernameDecorator('@tbillenstein blah tb@thomasbillenstein.com blah @xyz blah @abc', testOptions),
			'@<a href="http://twitter.com/tbillenstein" class="jta-tweet-a twitter-anywhere-user" target="_blank" rel="nofollow">tbillenstein<\/a> blah tb@thomasbillenstein.com blah @<a href="http://twitter.com/xyz" class="jta-tweet-a twitter-anywhere-user" target="_blank" rel="nofollow">xyz<\/a> blah @<a href="http://twitter.com/abc" class="jta-tweet-a twitter-anywhere-user" target="_blank" rel="nofollow">abc<\/a>',
			'mixed');
	});

	/*************************************************************************/
	/* force the plugin to exit                                              */
	/*************************************************************************/
	options.mainDecorator = null;
};
