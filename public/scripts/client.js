/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

    //get me that array of tweets from the server
    const getTweetsFromServer = function() {
        $.ajax({
            url: "/tweets/",
            method: "GET",
        }).then(function (newShit) {
            renderTweets(newShit);
        });
    }
    getTweetsFromServer();

    //on form submit shove that tweet into the server
    $("form").on("submit", function(event) {
        event.preventDefault();
        let formData = $(this).serialize();
        if ($("#tweet-text").length > 140) {
            $('#error-box').text("Error too mant characters!").slideDown().delay(2000).slideUp();
        } else if ($("#tweet-text").length <= 0) {
            $('#error-box').text("Error empty tweet!").slideDown().delay(2000).slideUp();
        } else {
            console.log("submitted:",$("#tweet-text"),"length:",$("#tweet-text").length);
            $.ajax({
                url: "/tweets/",
                type: "POST",
                data: formData,
                datatype: "json"
            }).then(()=>{
                console.log("I did the thing");
                $('#tweet-container').empty();
                getTweetsFromServer();
            }).then(()=>{
                this.reset();
            });
            $('#error-box').slideUp();
        }
    });

    //wraps text in divs to escape melicious text
    const escape = (text) => {
        const escapedText = $("<div>").text(text);
        return escapedText[0];
    };

    //create nicely formatted HTML of my tweet
    const createTweetElement = function(tweetData) {
        const $tweet = $(`<br><article class="tweet"><label id="tweet-header">
        <div class="left-header">
          <img src="${$(escape(tweetData.user.avatars)).html()}">
          <p>${$(escape(tweetData.user.name)).html()}</p>
        </div>
          <p id="handle">${$(escape(tweetData.user.handle)).html()}</p>
      </label>
      <q>${$(escape(tweetData.content.text)).html()}</q>
      <br>
      <footer>
        <time>${tweetData.created_at}</time>
        <aside>
          <a>🏴</a>
          <a>♻️</a>
          <a>❤️</a>
        </aside>
      </footer></article>`);
        return $tweet
    };

    //take an array of tweets and put them into the DOM
    const renderTweets = function(tweets) {
      for (const chunks in tweets) {
        $('#tweet-container').append(createTweetElement(tweets[chunks]));
      };
    };
      
});