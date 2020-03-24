$(document).ready(function() {

    // function searchSong() {

    //     var song = $(this).attr("data-name");
    //     var queryURL = "https://api.spotify.com/v1/search?q=guns%20n'%20roses&type=welcome%20to%20the%20jungle%2C%20guns%20n'%20roses&market=United%20States&limit=1";

    //     $.ajax({
    //         url: queryURL,
    //         method: "GET"
    //     }).then(function(response) {
    //         $("#lyrics").text(JSON.stringify(response));
    //         console.log(response);
    //     });
    // }

    // searchSong();

    var lyrics = [];
    // var Lyrics = "";
    // var allLyrics = "";

    function getLyrics() {

        var queryURL = "https://api.lyrics.ovh/v1/Coldplay/Adventure of a Lifetime";

        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function(response) {
            var Lyrics = response.lyrics;

            $("#start").on("click", function() {
                startTimer();
                showLyrics(Lyrics);
            });
        });

    }

    getLyrics()
    var enter = [];
    var hiddenlyrics = [];



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

        var underline = [];
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
        console.log(converted);

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
            checkUSerGuess()

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
        };
    }

    function GameOver() {
        //gameOverDiv.text("Congrats! You got " + correct + "out of " + incorrect + "right! Press the button below to play a new song!")
    }
});