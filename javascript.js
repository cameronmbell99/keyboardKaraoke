$(document).ready(function () {

  var settings = {
    async: true,
    crossDomain: true,
    url: "https://deezerdevs-deezer.p.rapidapi.com/track/518458092",
    method: "GET",
    headers: {
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
      "x-rapidapi-key": "86c58d10b1msh8d0d204efb10993p118dbfjsn1cf0dff99932"
    }
  };
  $.ajax(settings).done(function (response) {
    console.log(response);
    var player = 0;
    $("#playAgain").on("click", function () {
      if (player === 0) {
        $("#musicPlayer").append(
          `<video controls="" autoplay="" name="media"><source src="https://cdns-preview-3.dzcdn.net/stream/c-3e477a6671b162c3d05dac2cfffbe2e7-4.mp3" type="audio/mpeg"></video>`
        );
        // $("#musicPlayer").hide();
        $("#musicPlayer");
        player++;
      }
      console.log(response.preview);
    });
  });
  var text = $(".word")
    .text()
    .split(""),
    count = text.length,
    wrapped = "";
  $.each(text, function (i, el) {
    wrapped = wrapped.concat('<span class="letter">' + el + "</span>");
    if (!--count) paint(wrapped, ".word", ".letter", 200);
  });
  function paint(text, spn, el, vel) {
    $(spn).html(text);
    $(el).each(function (i) {
      var sp = $(this);
      setTimeout(function () {
        sp.css("color", "yellow");
      }, i * vel);
    });
  }

  var lyrics = [];
  // var Lyrics = "";
  // var allLyrics = "";

  function getLyrics() {

    var queryURL = "https://api.lyrics.ovh/v1/Coldplay/Adventure of a Lifetime";

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      var Lyrics = response.lyrics;

      $("#start").on("click", function () {
        startTimer();
        showLyrics(Lyrics);
      });
    });

  }

  getLyrics()
  var enter = [];
  var hiddenlyrics = [];
  var underline = [];



  function showLyrics(lyricsobj) {

    var replace = lyricsobj.replace(/\n/g, " ")
    enter = replace.split(" ");
    console.log(enter);

    for (var i = 0; i < enter.length; i++) {

      if (enter[i] === "") {
        enter.splice(i, 1);

      }

    }
    var startWord = Math.floor(Math.random() * enter.length);
    console.log(startWord);



    if (!startWord < enter.length - 20) {
      hiddenlyrics = enter.slice(startWord - 20, startWord);
    } else {
      hiddenlyrics = enter.slice(startWord, startWord + 20);
    }

    console.log("hidden Lyrics " + hiddenlyrics);


    var hidnwrd2 = "";
    for (var i = 0; i < hiddenlyrics.length; i++) {
      for (var x = 0; x < hiddenlyrics[i].length; x++) {
        hidnwrd2 += "_";
        console.log(hidnwrd2);
      }
      underline.push(hidnwrd2);
      hidnwrd2 = "";
    }
    console.log("underline: " + underline);


    $("#lyricalText").text(enter.join(" "));
    $("#hiddenLyricalText").text(underline.join("  "));

  }
  console.log("hidden " + hiddenlyrics);




  var incorrect = 0;
  var correct = 0;
  var total = hiddenlyrics.length;

  document.body.onkeyup = function (e) {
    if (e.keyCode == 32) {
      checkUSerGuess(hiddenlyrics, underline)
      $("#textBox").val("");

    }


    function checkUSerGuess(event, line) {
      userGuess = $("#textBox").val().trim();
      console.log(userGuess);
      if (!event.includes(userGuess)) {
        incorrect++;
        console.log("incorrect " + incorrect);
      } else {
        for (i = 0; i < event.length; i++) {
          if (userGuess === event[i]) {
            line[i] = event[i];

            console.log("underline " + line[i]);
            console.log("event " + event[i]);
            correct++;
            console.log("correct " + correct);
            console.log(line);
          }
        }
        $("#hiddenLyricalText").text(line.join("  "));
      }
    };
  }
  
  function GameOver() {
    $("#playArea").hide();
    $("#gameOverDiv").show();
    if (correct < incorrect) {
      $("#gameOverText").text("Oh No! You got " + correct + " out of " + total + "right. You got " + incorrect + "wrong....yikes")
    } else {
      $("#gameOverText").text("Way to go! You got " + correct + "out of " + total + "right and only " + incorrect + "wrong! You're a rockstar!")
    }
  }
});
  ///////////////////////////////////////////////////////////timer////////////////////////////////////////////////////////
  var time = 10;
  var clockRunning = false;
  
  
  //timer reset
  function reset() {
    
    time = 120;
    $("#display").text("0:00");
  }
  
  //start timer function
  
  function startTimer() {
    if (!clockRunning) {
      intervalId = setInterval(count, 1000);
      clockRunning = true;
    }
  }
  
  //stops timer function
  
  function stopTimer() {
    
    clearInterval(intervalId);
    clockRunning = false;
  }
  
  function count() {
    if (time === 0) {
      stopTimer();
      $("#playArea").hide();
       $("#gameOverDiv").show();
    } else {
    time--;
    console.log(time);
    var converted = timeConverter(time);
    // console.log(converted);

    $("#display").text(converted);
    }
    
}

function timeConverter(t) {

  var minutes = Math.floor(t / 60);
  var seconds = t - (minutes * 60);
  
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  
  if (minutes === 0) {
    minutes = "00";
  } else if (minutes < 10) {
    minutes = "0" + minutes;
  }
  
  return minutes + ":" + seconds;
}

