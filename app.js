function startGame(){
  score = 0;
  mouseMovements();
  countdown(); //You can change how many seconds you have left in the timeout below, remember to change the time in function countdown too.
  $('#start').css("display", "none");
  $('.hidden').show();
  setTimeout(endGame, 10000);
  timer = setInterval(function() {
        $("#score").empty().append("<h3>Score: " + score + "</h3>");
        var alienCollision =  collision($("#rocket"), $("#alienDiv"));
        // console.log("There is a collision. " + alienCollision);
        if (alienCollision === true) {
        $("#rocket").empty();
        spawnAlien();
        score++
        };
    }, 33);
}
function endGame(){
  clearInterval(timer);
  $('#spaceship1, #rocket, #alienDiv, #score, #scoreboard').hide();
  $('#title').show();
  $('#container').append('<div class="display" id="final"><h3>You killed ' + score + ' aliens.</h3></div>');
  $('#container').append('<input type="button" class="display start" id="restart" value="Menu" onClick="reloadGame()" />');
}
function countdown(){
  var counter = 10;
  $('#gameTimer').empty().append("<h3>" + counter + " seconds left</h3>");
  id = setInterval(function() {
    counter--;
    if(counter < 0) {
        clearInterval(id);
    } else {
          $('#gameTimer').empty().append("<h3>" + counter + " seconds left</h3>");
    }
  }, 1000);
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
  $("#rocket").append($('<img src="' + "https://i.imgur.com/AjHoktj.png" + '" />'));
  $('#rocket').animate({top: '580px'}, "slow", function () {
    $(this).removeAttr('style');
    $('#rocket').empty();
  });
}
function spawnAlien(){
    $('#container').append($('#alienDiv'));
    var docHeight = $('#container').height(),
        docWidth = $('#container').width(),
        $div = $('#alienDiv'),
        divWidth = $div.width(),
        divHeight = $div.height(),
        heightMax = docHeight - divHeight,
        widthMax = docWidth - divWidth;

    $div.css({
        left: Math.floor( Math.random() * widthMax ),
        top: Math.floor( Math.random() * heightMax )
      });
}
function reloadGame(){
    location.reload();
  }
