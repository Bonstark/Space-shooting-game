function startGame(){

    var score = 0;
  $('#start').css("display", "none");
  $('.hidden').show();
  countdown(); //You can change how many seconds you have left in the function line. You must also change the timeout below.
    timer = setInterval(function() {
        window.setTimeout(endGame, 10000);
        $("#score").text("You score is " + score + " so far.");
        var alienCollision =  collision($("#rocket"), $("#alienDiv"));
        console.log(alienCollision);
        if (alienCollision === true) {
        $("#rocket").empty();
        spawnAlien();
        score++
        };
    }, 33);
}

$(document).ready(function(){
  $(document).mousemove(function(e){
     var box=$(".spaceship1");
     var boxCenter=[box.offset().left+box.width()/2, box.offset().top+box.height()/2];
     var angle = Math.atan2(e.pageX- boxCenter[0],- (e.pageY- boxCenter[1]) )*(180/Math.PI);
     var angle = angle-180
     box.css({ "-webkit-transform": 'rotate(' + angle + 'deg)'});
     box.css({ '-moz-transform': 'rotate(' + angle + 'deg)'});
     box.css({ 'transform': 'rotate(' + angle + 'deg)'});
   });
  $(document).mousedown(function(){
    $("#spaceship1").removeClass('spaceship').addClass('spaceshipFire');
    $("#rocket").append($('<img src="' + "https://i.imgur.com/AjHoktj.png" + '" />'));
    $('#rocket').animate({top: '580px'}, "slow", function () {
      $(this).removeAttr('style');
      $('#rocket').empty();
    });
    });
  $(document).mouseup(function(){
      $("#spaceship1").removeClass('spaceshipFire').addClass('spaceship');
    });
});

function endGame(){
  $('#container').empty();
  $('#score').hide();
  $('#title').empty().append("<h3>SPACE BLASTINGS</h3>");
  $('#final').append("<h3>Your score was " + score + "</h3>");
  // $('#score').removeClass('score').addClass('start');
  // clearInterval(timer);
  // alert('FINISH');
  // $('.spaceship', '.rocket', '.alien').css("display", "none");
}

function countdown(){
  var counter = 10;
  id = setInterval(function() {
    counter--;
    if(counter < 0) {
        clearInterval(id);
    } else {
          $('#title').empty().append("<h3>You have " + counter + " seconds left.</h3>");
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
function firerocket(){
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
