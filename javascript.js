$(document).ready(function(){

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
          method: "GET",
        }).then(function(response) {
          allLyrics = JSON.stringify(response);
          console.log(response);
          console.log(allLyrics);
        });
      }

      getLyrics()

      var lyrics = [];
      function showLyrics(){
          var word = "";
          for(i=1; allLyrics.length; i++){
              if(allLyrics.charAt(i) === " "){
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

        function startTimer(){
          if(!clockRunning){
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
          }
          else if (minutes < 10) {
            minutes = "0" + minutes;
          }
        
          return minutes + ":" + seconds;
        }

        function TimerExpireGameOver(){
          if (time == 0){
            //link to Game Over page
          }
        }
















})