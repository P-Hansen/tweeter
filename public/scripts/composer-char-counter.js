$(document).ready(function() {
    console.log("ready to count chars!");
    $("#tweet-text").on("input", function() {
        const charMax = 140;
        const input = $(this).val();
        const charCount = charMax - input.length;
        let counterText = $(this).parent().children(".foot").children(".counter");
        counterText.text(charCount);
        if (charCount < 0) {
            counterText.addClass("newColour");
            counterText.removeClass("rainbow");
            counterText.removeClass("blinking");
        } else if (charCount <= 5 && charCount > 0) {
            counterText.addClass("blinking");
            counterText.removeClass("rainbow");
            counterText.removeClass("newColour");
        } else if (charCount === 0) {
            counterText.addClass("rainbow");
            counterText.removeClass("blinking");
            counterText.removeClass("newColour");
        } else {
            counterText.removeClass("newColour");
            counterText.removeClass("rainbow");
            counterText.removeClass("blinking");
        }
    });
  });
