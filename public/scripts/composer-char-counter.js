$(document).ready(function() {
    console.log("ready to count chars!");
    $("#tweet-text").on("input", function(){
        const charMax = 140;
        const input = $(this).val();
        const charCount = charMax - input.length;
        //console.log(charCount);
        let counterText = $(this).parent().children(".foot").children(".counter");
        counterText.text(charCount);
        if (charCount < 0) {
            counterText.addClass("newColour");
        } else {
            counterText.removeClass("newColour");
        }
    });
  });
