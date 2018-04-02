$(document).ready(function() {

  const element = $("<div></div>");
  const speed = localStorage.getItem("userLevel");
  const name = localStorage.getItem("userName");
  const seconds = 15;
  const display = $("#time");
  const sound = $('#sound');
  const level = $('#level');
  const stopMusic = $('#stopMusic');
  const gameWords = $(".marquee span")
    .text()
    .split("")
    .slice(0, 26);

    $(level).text(`Level ${speed}`)


  function getGreeting() {
    let userName;
    let userLevel;

    // setting the local storage from the gretting page
    $("#submit").on("click", function(e) {
      userName = $("#name").val();
      userLevel = parseInt($("#level").val());
      localStorage.setItem("userName", userName);
      localStorage.setItem("userLevel", userLevel);
    });
  }
  getGreeting();

  function game() {
    // jQuery marquee api
    const $mq = $(".marquee").marquee({
      speed: speed
    });
    $($mq).hide();

    $("#start").on("click", function() {
      $($mq).show();
      $("input").focus();
      return timerFunction(seconds, display);
    });

    function stopSound(){
        $(stopMusic).on('click', function(){
            sound.attr("src","");
        });
    }
    stopSound();


    // http://jsfiddle.net/wr1ua0db/17/
    function timerFunction(duration, display) {
      let timer = duration;
      let start = setInterval(function() {
        let seconds = parseInt(timer);
        display.html(seconds);
        if (--timer < 0) {
          clearInterval(start);
          const stringToArray = $("input").val();
          const userArray = stringToArray.split("");
          const message = `${name} you scored ${compare(gameWords, userArray)} out of ${gameWords.length}!`;
          alertbox(message);
          stopSound()
          return $mq.marquee("pause");
        }
      }, 1000);
    }

    // matching the key events with the marquee
    $(document).on("keypress", function(event) {
      for (let i = 0; i < gameWords.length; i++) {
        if (gameWords[i] === event.key) {
          let id = `#m${event.key}`;
          $(id).css("color", "white");
          setTimeout(function() {
            $(id).css("color", "green");
          }, 200);
        }
      }
    });

    // matching the key events with the game's keyboard
    $(document).on("keypress", function(event) {
      let id = event.key;
      let selectedId = $(`#${id}`).attr("id");
      let selectedElement = $(`#${selectedId}`);

      if (id === selectedId) {
        selectedElement.css("background-color", "green");
        selectedElement.css("color", "white");

        setTimeout(function() {
          selectedElement.css("background-color", "white");
          selectedElement.css("color", "grey");
        }, 200);
      }
    });

    // compares expected with actual
    function compare(gameWords, userArray) {
      let score = 0;
      for (let i = 0; i < userArray.length; i++) {
        if (userArray[i] !== gameWords[i]) {
        }
        if (userArray[i] === gameWords[i]) {
          score++;
        }
      }
      return score;
    }

    // custom alert box for user score
    function alertbox(message) {
      let content = element.html(message);
      element.addClass("alert");
      element.append(content);
      $(body).append(element);
    }

    $("#restart").on("click", event => {
      window.location.reload();
    });
  }
  game();
});
