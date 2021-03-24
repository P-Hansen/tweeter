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
        let slicedFormData = formData.slice(5);
        if (slicedFormData.length > 0 && slicedFormData.length <= 140) {
            console.log("submitted:",slicedFormData,"length:",slicedFormData.length);
            $.ajax({
                url: "/tweets/",
                type: "POST",
                data: formData,
                datatype: "json"
            }).then(()=>{
                console.log("I did the thing");
                $('#tweet-container').empty();
                getTweetsFromServer();
            });
        } else {
            alert("Bad tweet");
        }
    });

    //create nicly formatted HTML of my tweet
    const createTweetElement = function(tweetData) {
        const $tweet = $(`<br><article class="tweet"><label id="tweet-header">
        <div class="left-header">
          <img src="${tweetData.user.avatars}">
          <p>${tweetData.user.name}</p>
        </div>
          <p id="handle">${tweetData.user.handle}</p>
      </label>
      <q>${tweetData.content.text}</q>
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