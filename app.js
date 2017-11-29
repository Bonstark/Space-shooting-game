$(document).ready(function(){
    gameTime = 10000; // default time set to ten seconds
    $('#container').append('<div id="timeChoices"><h3>How long would you like to play for?</h3></div>');
    $('#container').append('<input type="button" class="display button selected" id="10s" value="10 seconds" onClick="chooseTime10()">');
    $('#container').append('<input type="button" class="display button " id="30s" value="30 seconds" onClick="chooseTime30()">');
    $('#container').append('<input type="button" class="display button " id="1m" value="1 minute" onClick="chooseTime1m()">');
    $('#container').append('<input type="button" class="display  start" id="start" value="start" onClick="startGame()" >');
    $(".button").on("click", function() {
      $(".button").removeClass("selected");
      $(this).addClass("selected"); //applies the selected class, used by the following global.
      });
})
function startGame(){
  rocketDetach = $("#rocket").detach();
  $('#spaceship1').append(rocketDetach);
  score = 0;
  counter = gameTime*0.03333; //changes the counter from setInterval's ticks to readable time remaining.
  mouseMovements();
  $('#start, #timeChoices, #title, #10s, #30s, #1m').css("display", "none");
  $('.hidden').show();
  setTimeout(endGame, gameTime);
  timer = setInterval(function() {
        countdown();
        $("#score").empty().append("<h3>Score: " + score + "</h3>");
        if ( $('#rocket').length ) { var alienCollision = collision($("#rocket"), $("#alienDiv")) }; //This checks to see if #rocket is present before trying to check for collision.
        // console.log("There is a collision. " + alienCollision);
        if (alienCollision === true) {
          explosion();
          score++
        };
    }, 33);
}
function countdown(){
  counter--;
  var secondsRemaining = Math.round(counter/33.33);
  $('#gameTimer').empty().append("<h3>" + secondsRemaining + " seconds left</h3>");
  }
function spawnAlien(){
      // console.log("Alien was spawned");
      $('#container').append($('#alienDiv'));
      var docHeight = $('#container').height(),
          docWidth = $('#container').width(),
          $div = $('#alienDiv'),
          divWidth = $div.width(),
          divHeight = $div.height(),
          heightMax = docHeight - divHeight,
          widthMax = docWidth - divWidth;
          leftPosition = Math.floor( Math.random() * widthMax );
          // console.log("Alien's left position is " +leftPosition);
          topPosition = Math.floor( Math.random() * heightMax );
          // console.log("Alien's top position is " +topPosition);
      if ((leftPosition>230 && leftPosition<435)&&(topPosition>230&&topPosition<435))spawnAlien();
      $div.css({
          left: leftPosition,
          top: topPosition
        });
  }
function endGame(){
  clearInterval(timer);
  $('#spaceship1, #rocket, #alienDiv, #score, #scoreboard').hide();
  $('#title').show();
  $('#container').append('<div class="display" id="final"><h3>You killed ' + score + ' aliens.</h3></div>');
  $('#container').append('<input type="button" class="display start" id="restart" value="Menu" onClick="reloadGame()" />');
}
function mouseMovements(){
  $(document).mousemove(function(e){
     var box=$(".spaceship1");
     var boxCenter=[box.offset().left+box.width()/2, box.offset().top+box.height()/2];
     var angle = Math.atan2(e.pageX- boxCenter[0],- (e.pageY- boxCenter[1]) )*(180/Math.PI);
     var angle = angle-180
     box.css({ "-webkit-transform": 'rotate(' + angle + 'deg)'});
     box.css({ '-moz-transform': 'rotate(' + angle + 'deg)'});
     box.css({ 'transform': 'rotate(' + angle + 'deg)'});
   }); //rotate function of the spaceship
  $(document).mousedown(function(){
    $("#spaceship1").removeClass('spaceship').addClass('spaceshipFire');
    fireRocket();
  }); // changes image and fires rocket
  $(document).mouseup(function(){
      $("#spaceship1").removeClass('spaceshipFire').addClass('spaceship');
    });  // reverts to original image
} //rotates spaceship, toggles images, fireRocket
function fireRocket(){
  $('#spaceship1').append(rocketDetach);
  $("#rocket").empty();
  $("#rocket").append($('<img src="' + "https://i.imgur.com/AjHoktj.png" + '" />'));
  $('#rocket').animate({top: '1000%'}, "slow", "easeInCirc", function () {
    $(this).removeAttr('style');
  });
}
function collision(cOne, cTwo) {
      var x1 = cOne.offset().left;
      var y1 = cOne.offset().top;
      var h1 = cOne.outerHeight(false);
      var w1 = cOne.outerWidth(false);
      var b1 = y1 + h1;
      var r1 = x1 + w1;
      var x2 = cTwo.offset().left;
      var y2 = cTwo.offset().top;
      var h2 = cTwo.outerHeight(true);
      var w2 = cTwo.outerWidth(true);
      var b2 = y2 + h2;
      var r2 = x2 + w2;

      if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
      return true;
    }
function explosion(){
    $('#rocket').detach();
    $("#alienDiv").css("background-image", " url('https://i.imgur.com/6A16iLL.png')");
    function explosion2(){
	     $("#alienDiv").css("background-image", " url('https://i.imgur.com/bIP1ftQ.png')");
     };
    function resetAlien(){
       $("#alienDiv").css("background-image", " url('https://i.imgur.com/1Jb9ah4.png')");
       spawnAlien();
    }
    setTimeout(explosion2,150);
    setTimeout(resetAlien,250);
        }
function chooseTime10(){
    gameTime = 10000
  }
function chooseTime30(){
    gameTime = 30000;
  }
function chooseTime1m(){
    gameTime = 60000;
  }
function reloadGame(){
      location.reload();
    }
