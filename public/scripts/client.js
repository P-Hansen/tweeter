/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

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

    // Test / driver code (temporary). Eventually will get this from the server.
    const data = [
        {
          "user": {
            "name": "Newton",
            "avatars": "https://i.imgur.com/73hZDYK.png"
            ,
            "handle": "@SirIsaac"
          },
          "content": {
            "text": "If I have seen further it is by standing on the shoulders of giants"
          },
          "created_at": 1461116232227
        },
        {
          "user": {
            "name": "Descartes",
            "avatars": "https://i.imgur.com/nlhLi3I.png",
            "handle": "@rd" },
          "content": {
            "text": "Je pense , donc je suis"
          },
          "created_at": 1461113959088
        }
      ]
      
      const renderTweets = function(tweets) {
        for (const chunks in tweets) {
          $('#tweet-container').append(createTweetElement(tweets[chunks]));
        }
      }
      
      renderTweets(data);
});