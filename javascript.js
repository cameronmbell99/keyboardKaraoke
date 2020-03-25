$(document).ready(function() {

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
    $.ajax(settings).done(function(response) {
        console.log(response);
        var player = 0;
        $("#playAgain").on("click", function() {
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

        function paint(text, spn, el, vel) {
            $(spn).html(text);
            $(el).each(function(i) {
                var sp = $(this);
                setTimeout(function() {
                    sp.css("color", "yellow");
                }, i * vel);
            });
        }

        var lyrics = [];
        var band = "Pharrell Williams";
        var song = "Happy";
        var startLength = 145;

        function getLyrics() {

            var queryURL = "https://api.lyrics.ovh/v1/" + band + "/" + song;

            $.ajax({
                url: queryURL,
                method: "GET",
            }).then(function(response) {
                var Lyrics = response.lyrics;
                console.log(response.lyrics);

                startTimer();
                showLyrics(Lyrics);
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
            console.log("Enter: " + enter);
            var startWord = Math.floor(Math.random() * (enter.length - (startLength + 5))) + startLength;
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



            if (!startWord < enter.length - 20) {
                for (var i = startWord - 20; i < underline + 1; i++) {
                    temp.splice(i, 0, underline);
                }
            } else {
                for (var i = startWord; i < underline + 1; i++) {
                    temp.splice(startWord, 0, underline);
                }
            }
            var front = temp.slice(startWord - 5, startWord);
            var back = temp.slice(startWord + 20, startWord + 25);

            console.log(temp);
            console.log(front);
            console.log(back);

            $("#lyricalText").text(enter.join(" "));
            $("#hiddenLyricalText").text(front.join(" ") + " " + underline.join("  ") + " " + back.join(" "));

        };

        document.onkeyup = function(event) {
            userGuess = event.key.toLowerCase();
        }

        function checkUserGuess() {
            if (!lyrics.includes(userGuess)) {
                document.getElementById("textBox").value("");
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
        };


        var time = 120;
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
            time--;
            var converted = timeConverter(time);
            //console.log(converted);

            $("#display").text(converted);
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

        function TimerExpireGameOver() {
            if (time == 0) {
                //link to Game Over page
            }
        }


        var incorrect = 0;
        var correct = 0;

        document.body.onkeyup = function(e) {
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
    };

    var time = 10;
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
});