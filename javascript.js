var incorrect = 0;
var correct = 0;
var total = 20;
var timeleft = 10;

var band = "";
var song = "";
var startLength = 0;
var Lyrics = "";

$(document).ready(function() {
  function getLyrics() {
    var queryURL = "https://api.lyrics.ovh/v1/" + band + "/" + song;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      Lyrics = response.lyrics;
      console.log(response.lyrics);

      showLyrics(Lyrics);
    });
  }

  var enter = [];
  var hiddenlyrics = [];
  var underline = [];
  var front = [];
  var back = [];

  function showLyrics(lyricsobj) {
    var replace = lyricsobj.replace(/\n/g, " ");
    enter = replace.split(" ");
    console.log(enter);

    for (var i = 0; i < enter.length; i++) {
      if (enter[i] === "") {
        enter.splice(i, 1);
      }
    }
    console.log("Enter: " + enter);
    var startWord =
      Math.floor(Math.random() * (enter.length - (startLength + 5))) +
      startLength;
    console.log(startWord);

    temp = enter.slice();

    if (!startWord < enter.length - 20) {
      hiddenlyrics = temp.slice(startWord - 20, startWord);
    } else {
      hiddenlyrics = temp.slice(startWord, startWord + 20);
    }

    console.log("hidden Lyrics " + hiddenlyrics);

    var hidnwrd2 = "";
    for (var i = 0; i < hiddenlyrics.length; i++) {
      for (var x = 0; x < hiddenlyrics[i].length; x++) {
        hidnwrd2 += "_";
      }
      underline.push(hidnwrd2);
      hidnwrd2 = "";
    }
    console.log("underline: " + underline);

    var front = temp.slice(startWord - 5, startWord);
    var back = temp.slice(startWord + 20, startWord + 25);

    console.log(temp);
    console.log(front);
    console.log(back);

    $("#lyricalText").text(enter.join(" "));
    $("#hiddenLyricalText").text(
      front.join(" ") + " " + underline.join("  ") + " " + back.join(" ")
    );
  }

  document.onkeyup = function(event) {
    userGuess = event.key.toLowerCase();
  };

  var time = 30;
  var clockRunning = false;

  //timer reset
  function reset() {
    time = 120;
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
    if (time === 0) {
      stopTimer();
      $("#playArea").hide();
      $("#gameOverDiv").show();
      GameOver(correct, incorrect, total);
    } else {
      time--;
      var converted = timeConverter(time);
      // console.log(converted);
      $("#display").text(converted);
    }
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

  var incorrect = 0;
  var correct = 0;

  document.body.onkeyup = function(e) {
    if (e.keyCode == 32) {
      checkUSerGuess(hiddenlyrics, underline);
      $("#textBox").val("");
    }
    function checkUSerGuess(event, line) {
      userGuess = $("#textBox")
        .val()
        .trim();
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
        $("#hiddenLyricalText").text(
          front.join(" ") + " " + line.join("  ") + " " + back.join(" ")
        );
      }
    }
  };

  function GameOver() {
    $("#playArea").hide();
    $("#gameOverDiv").show();
    if (correct < incorrect) {
      $("#gameOverText").text(
        "Oh No! You got " +
          correct +
          " out of " +
          total +
          " right. You got " +
          incorrect +
          " wrong....yikes"
      );
    } else {
      $("#gameOverText").text(
        "Way to go! You got " +
          correct +
          " out of " +
          total +
          " right and only " +
          incorrect +
          " wrong! You're a rockstar!"
      );
    }
    console.log(correct, incorrect);
  }

  var trackId = "";
  var mp3Player = "";

  function progressBar() {
    console.log(window.location.pathname);
    if (window.location.pathname === "/songPage.html") {
      trackId = "394338442";
      mp3Player =
        "https://cdns-preview-5.dzcdn.net/stream/c-5fe470199ecb4b094576965a3288f42b-4.mp3";
      band = "Pharrell Williams";
      song = "Happy";
      startLength = 145;
    } else if (window.location.pathname === "/zombieSongPage.html") {
      trackId = "5652656";
      mp3Player =
        "https://cdns-preview-3.dzcdn.net/stream/c-3f9241907a470bd4a29d2cf137dfc870-8.mp3";
      band = "The Cranberries";
      song = "Zombie";
      startLength = 30;
    } else if (window.location.pathname === "/timeSongPage.html") {
      trackId = "608756";
      mp3Player =
        "hhttps://cdns-preview-a.dzcdn.net/stream/c-adf8199f340d68ad579ebe31321225c8-4.mp3";
      band = "Cyndi Lauper";
      song = "Time After Time";
      startLength = 145;
    } else if (window.location.pathname === "/lobsterSongPage.html") {
      trackId = "882083172";
      mp3Player =
        "https://cdns-preview-c.dzcdn.net/stream/c-ce054ab331a0bf0fece4cfc1fb7a72b6-8.mp3";
      band = "B-52s";
      song = "Rock Lobster";
      startLength = 145;
    }

    if (Lyrics.length < 1) {
      getLyrics();
    }
    console.log(trackId);
    console.log(mp3Player);

    if (timeleft == 0) {
      $(".playingTheGame").show();
      $("#beforeGame").hide();
      $("#display").show();

      var settings = {
        async: true,
        crossDomain: true,
        url: "https://deezerdevs-deezer.p.rapidapi.com/track/" + trackId,
        method: "GET",
        headers: {
          "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
          "x-rapidapi-key": "86c58d10b1msh8d0d204efb10993p118dbfjsn1cf0dff99932"
        }
      };

      $.ajax(settings).done(function(response) {
        console.log(response);
        var audioElement = document.createElement("audio");

        audioElement.setAttribute("src", mp3Player);

        audioElement.addEventListener(
          "ended",
          function() {
            this.play();
          },
          false
        );

        $("#play").click(function(event) {
          event.target.value;
          audioElement.play();
          startTimer();
        });

        $("#pause").click(function() {
          audioElement.pause();
        });
      });
    }

    document.getElementById("progressBar").value = 10 - timeleft;
    timeleft -= 1;
  }

  var currentDiv = $("#hint1");
  var hint = 1;
  var myInterval = setInterval(function() {
    if (hint == 2) {
      clearInterval(myInterval);
    } else {
      hint++;
      currentDiv.hide();
      currentDiv = currentDiv.next();
      currentDiv.show();
    }
  }, 6000);

  var progressBarInterval = setInterval(progressBar, 1000);
  ////
  if (timeleft === 0) {
    clearInterval(progressBarInterval);
  }
}); /////

// --------- End of document ready ----------

// var currentDiv = $("#hint1");
// var nextDiv,
//   hint = 1;
// var myInterval = setInterval(function() {
//   if (hint == 2) {
//     clearInterval(myInterval);
//   } else {
//     hint++;
//     currentDiv.hide();
//     currentDiv = currentDiv.next();
//     currentDiv.show();
//     progressBar();
//   }
// }, 6000);

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

// var timeleft = 10;
// var trackId = "";
// var mp3Player = "";

// function progressBar() {
//   console.log(window.location.pathname);
//   if (
//     window.location.pathname ===
//     "/Users/niasha/Desktop/U%20of%20A%20Bootcamp/Homework/First-Group-Project/keyboardKaraoke/songPage.html"
//   ) {
//     trackId = "394338442";
//     mp3Player =
//       "https://cdns-preview-5.dzcdn.net/stream/c-5fe470199ecb4b094576965a3288f42b-4.mp3";
//   } else if (
//     window.location.pathname ===
//     "/Users/niasha/Desktop/U%20of%20A%20Bootcamp/Homework/First-Group-Project/keyboardKaraoke/zombieSongPage.html"
//   ) {
//     trackId = "5652656";
//     mp3Player =
//       "https://cdns-preview-3.dzcdn.net/stream/c-3f9241907a470bd4a29d2cf137dfc870-8.mp3";
//   } else if (window.location.pathname === "/timeSongPage.html") {
//     trackId = "608756";
//     mp3Player =
//       "hhttps://cdns-preview-a.dzcdn.net/stream/c-adf8199f340d68ad579ebe31321225c8-4.mp3";
//   } else if (window.location.pathname === "/lobsterSongPage.html") {
//     trackId = "882083172";
//     mp3Player =
//       "https://cdns-preview-c.dzcdn.net/stream/c-ce054ab331a0bf0fece4cfc1fb7a72b6-8.mp3";
//   }

//   console.log(trackId);
//   console.log(mp3Player);

//   if (timeleft == 0) {
//     $(".playingTheGame").show();
//     $("#beforeGame").hide();
//     $("#display").show();

//     var settings = {
//       async: true,
//       crossDomain: true,
//       url: "https://deezerdevs-deezer.p.rapidapi.com/track/" + trackId,
//       method: "GET",
//       headers: {
//         "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
//         "x-rapidapi-key": "86c58d10b1msh8d0d204efb10993p118dbfjsn1cf0dff99932"
//       }
//     };

//     $.ajax(settings).done(function(response) {
//       console.log(response);
//       var audioElement = document.createElement("audio");

//       audioElement.setAttribute("src", mp3Player);

//       audioElement.addEventListener(
//         "ended",
//         function() {
//           this.play();
//         },
//         false
//       );

//       $("#play").click(function(event) {
//         event.target.value;
//         audioElement.play();
//       });

//       $("#pause").click(function() {
//         audioElement.pause();
//       });
//     });
//   }

//   document.getElementById("progressBar").value = 10 - timeleft;
//   timeleft -= 1;
// }

// $(location).attr("href");
// console.log(location);

// if (location === "songPage.html") {
//   (setting.url = "https://deezerdevs-deezer.p.rapidapi.com/track/394338442"),
//     (src =
//       "https://cdns-preview-5.dzcdn.net/stream/c-5fe470199ecb4b094576965a3288f42b-4");
// } else if (location === "zombieSongPage.html") {
//   (setting.url = "https://deezerdevs-deezer.p.rapidapi.com/track/394338442"),
//     (src =
//       "https://cdns-preview-5.dzcdn.net/stream/c-5fe470199ecb4b094576965a3288f42b-4");
// }

// var zombTimeleft = 10;

// var startGameTimerZomb = setInterval(function() {
//   if (zombTimeleft == 0) {
//     $(".playingTheGameZomb").show();
//     $("#beforeGameZomb").hide();
//     $("#display").show();

//     var settings = {
//       async: true,
//       crossDomain: true,
//       url: "https://deezerdevs-deezer.p.rapidapi.com/track/5652656",
//       method: "GET",
//       headers: {
//         "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
//         "x-rapidapi-key": "86c58d10b1msh8d0d204efb10993p118dbfjsn1cf0dff99932"
//       }
//     };

//     $.ajax(settings).done(function(response) {
//       console.log(response);
//       var audioElement = document.createElement("audio");

//       audioElement.setAttribute(
//         "src",
//         "https://cdns-preview-3.dzcdn.net/stream/c-3f9241907a470bd4a29d2cf137dfc870-8.mp3"
//       );

//       audioElement.addEventListener(
//         "ended",
//         function() {
//           this.play();
//         },
//         false
//       );

//       $("#playZombie").click(function() {
//         audioElement.play();
//       });

//       $("#pauseZombie").click(function() {
//         audioElement.pause();
//       });
//     });

//     clearInterval(startGameTimerZomb);
//   }

//   document.getElementById("progressBarZomb").value = 10 - timeleft;
//   timeleft -= 1;
// }, 1000);

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
//   crossDomain: true,5652656
//   url: "https://deezerdevs-deezer.p.rapidapi.com/track/",
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
