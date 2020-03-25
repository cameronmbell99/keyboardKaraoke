$(document).ready(function() {
  var text = $(".word")
      .text()
      .split(""),
    count = text.length,
    wrapped = "";

  $.each(text, function(i, el) {
    wrapped = wrapped.concat('<span class="letter">' + el + "</span>");
    if (!--count) paint(wrapped, ".word", ".letter", 200);
  });

  function paint(text, spn, el, vel) {
    $(spn).html(text);
    $(el).each(function(i) {
      var sp = $(this);
      setTimeout(function() {
        sp.css("color", "yellow");
      }, i * vel);
    });
  }

  // function searchSong() {

  //     var song = $(this).attr("data-name");
  //     var queryURL = "https://api.spotify.com/v1/search?q=guns%20n'%20roses&type=welcome%20to%20the%20jungle%2C%20guns%20n'%20roses&market=United%20States&limit=1";

  //     $.ajax({
  //       url: queryURL,
  //       method: "GET"
  //     }).then(function(response) {
  //       $("#lyrics").text(JSON.stringify(response));
  //       console.log(response);
  //     });
  //   }

  //   searchSong();

  var allLyrics = "";

  function getLyrics() {
    var queryURL = "https://api.lyrics.ovh/v1/Coldplay/Adventure of a Lifetime";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      allLyrics = JSON.stringify(response);
      console.log(response);
      console.log(allLyrics);
    });
  }

  getLyrics();

  var lyrics = [];
  function showLyrics() {
    var word = "";
    for (i = 1; allLyrics.length; i++) {
      if (allLyrics.charAt(i) === " ") {
        lyrics.push(word);
        word = "";
      } else {
        word += allLyrics.charAt(i);
      }
    }
    console.log(lyrics);
    console.log(word);
  }
  showLyrics();
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  $("#start").on("click", startTimer);

  var time = 0;
  var clockRunning = false;

  //timer reset
  function reset() {
    time = 0;
    $("#display").text("02:00");
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
    time--;
    var converted = timeConverter(time);
    console.log(converted);

    $("#display").text(converted);
  }
  function timeConverter(t) {
    var minutes = Math.floor(t / 60);
    var seconds = t - minutes * 60;

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

  function TimerExpireGameOver() {
    if (time == 0) {
      //link to Game Over page
    }
  }

  var incorrect = 0;
  var correct = 0;

  document.body.onkeyup = function(e) {
    if (e.keyCode == 32) {
      checkUSerGuess();
    }

    function checkUSerGuess() {
      userGuess = document.getElementById("textBox").value("");
      if (!lyrics.includes(userGuess)) {
        incorrect++;
      } else {
        for (i = 0; i < lyricsArray.length; i++) {
          if (userGuess === lyricsArray[i]) {
            // whereTheBlanksGo[i] = userGuess;
            // lyrics.innerHTML = whereTHeBlanksGo;
          }
        }
        document.getElementById("textBox").value("");
        correct++;
      }
    }

    function GameOver() {
      //gameOverDiv.text("Congrats! You got " + correct + "out of " + incorrect + "right! Press the button below to play a new song!")
    }
  };
});
// --------- End of document ready ----------

// ------------ PROGRESS BAR -------------------

// var timeleft = 2;
// var startGameTimer = setInterval(function() {
//   if (timeleft === 0) {
//     $("#playingTheGame").show();
//     $("#beforeGame").hide();

//     clearInterval(startGameTimer);
//   }

//   document.getElementById("progressBar").value = 10 - timeleft;
//   timeleft -= 1;
// }, 1000);

// ------- ME TRYING TO GET IT TO WORK ----------

var timeleft = 2;
var startGameTimer = setInterval(function() {
  if (timeleft === 0) {
    $("#playingTheGame").show();
    $("#beforeGame").hide();

    var audioElement = document.createElement("audio");

    audioElement.setAttribute(
      "src",
      "https://cdns-preview-c.dzcdn.net/stream/c-ce054ab331a0bf0fece4cfc1fb7a72b6-8.mp3"
    );

    audioElement.addEventListener(
      "ended",
      function() {
        this.play();
      },
      false
    );

    $("#play").click(function() {
      audioElement.play();
    });

    $("#pause").click(function() {
      audioElement.pause();
    });

    clearInterval(startGameTimer);
  }

  document.getElementById("progressBar").value = 10 - timeleft;
  timeleft -= 1;
}, 1000);

// __________TEST API _______

// var settings = {
//   async: true,
//   crossDomain: true,
//   url: "https://deezerdevs-deezer.p.rapidapi.com/track/518458092",
//   method: "GET",
//   headers: {
//     "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
//     "x-rapidapi-key": "86c58d10b1msh8d0d204efb10993p118dbfjsn1cf0dff99932"
//   }
// };

// $.ajax(settings).done(function(response) {
//   console.log(response);
//   var player = 0;

//   $("#playAgain").on("click", function() {
//     if (player === 0) {
//       $("#musicPlayer").append(
//         `<video controls="" autoplay="" name="media"><source src="https://cdns-preview-3.dzcdn.net/stream/c-3e477a6671b162c3d05dac2cfffbe2e7-4.mp3" type="audio/mpeg"></video>`
//       );
//       // $("#musicPlayer").hide();
//       $("#musicPlayer");
//       player++;
//     }
//     console.log(response.preview);
//   });
// });

// ------------- Happy API DATA --------------------

// var settings = {
//   async: true,
//   crossDomain: true,
//   url: "https://deezerdevs-deezer.p.rapidapi.com/track/394338442",
//   method: "GET",
//   headers: {
//     "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
//     "x-rapidapi-key": "86c58d10b1msh8d0d204efb10993p118dbfjsn1cf0dff99932"
//   }
// };

// $.ajax(settings).done(function(response) {
//   console.log(response);
//   var player = 0;

//   $("#playAgain").on("click", function() {
//     if (player === 0) {
//       $("#musicPlayer").append(
//         `<audio controls="" autoplay="" name="media" id="getMusic"><source src="https://cdns-preview-5.dzcdn.net/stream/c-5fe470199ecb4b094576965a3288f42b-4.mp3" type="audio/mpeg"></audio>`
//       );
//       // $("#musicPlayer").hide();
//       player++;
//     }
//     console.log(response.preview);
//   });

//   $("#pauseMusic").on("click", function() {
//     $("#getMusic").pause();
//   });
// });

// // ------------- THE CRANBERRIES API DATA --------------------

// var settings = {
//   async: true,
//   crossDomain: true,
//   url: "https://deezerdevs-deezer.p.rapidapi.com/track/5652656",
//   method: "GET",
//   headers: {
//     "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
//     "x-rapidapi-key": "86c58d10b1msh8d0d204efb10993p118dbfjsn1cf0dff99932"
//   }
// };

// $.ajax(settings).done(function(response) {
//   console.log(response);
//   var player = 0;

//   $("#playAgain").on("click", function() {
//     if (player === 0) {
//       $("#musicPlayer").append(
//         `<video controls="" autoplay="" name="media"><source src="https://cdns-preview-3.dzcdn.net/stream/c-3f9241907a470bd4a29d2cf137dfc870-8.mp3" type="audio/mpeg"></video>`
//       );
//       // $("#musicPlayer").hide();
//       player++;
//     }
//     console.log(response.preview);
//   });
// });

// // ------------- Cyndi Lauper API DATA --------------------
// var settings = {
//   async: true,
//   crossDomain: true,
//   url: "https://deezerdevs-deezer.p.rapidapi.com/track/608756",
//   method: "GET",
//   headers: {
//     "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
//     "x-rapidapi-key": "86c58d10b1msh8d0d204efb10993p118dbfjsn1cf0dff99932"
//   }
// };

// $.ajax(settings).done(function(response) {
//   console.log(response);
//   var player = 0;

//   $("#playAgain").on("click", function() {
//     if (player === 0) {
//       $("#musicPlayer").append(
//         `<video controls="" autoplay="" name="media"><source src="https://cdns-preview-a.dzcdn.net/stream/c-adf8199f340d68ad579ebe31321225c8-4.mp3" type="audio/mpeg"></video>`
//       );
//       // $("#musicPlayer").hide();
//       player++;
//     }
//     console.log(response.preview);
//   });
// });

// // ------------- B-52s API DATA --------------------

// var settings = {
//   async: true,
//   crossDomain: true,
//   url: "https://deezerdevs-deezer.p.rapidapi.com/track/882083172",
//   method: "GET",
//   headers: {
//     "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
//     "x-rapidapi-key": "86c58d10b1msh8d0d204efb10993p118dbfjsn1cf0dff99932"
//   }
// };

// $.ajax(settings).done(function(response) {
//   console.log(response);
//   var player = 0;

//   $("#playAgain").on("click", function() {
//     if (player === 0) {
//       $("#musicPlayer").append(
//         `<video controls="" autoplay="" name="media"><source src="https://cdns-preview-c.dzcdn.net/stream/c-ce054ab331a0bf0fece4cfc1fb7a72b6-8.mp3" type="audio/mpeg"></video>`
//       );
//       // $("#musicPlayer").hide();
//       player++;
//     }
//     console.log(response.preview);
//   });
// });
