  $(document).ready(function(){
    spawnAlien();
    containerCollision();

    var box=$(".helmet");
    var boxCenter=[box.offset().left+box.width()/2, box.offset().top+box.height()/2];
    var orbImage = $('<img src="' + "https://i.imgur.com/q4AXsg3.png" + '" />');


    $(document).mousemove(function(e){
  	   var angle = Math.atan2(e.pageX- boxCenter[0],- (e.pageY- boxCenter[1]) )*(180/Math.PI);
       var angle = angle-180
       box.css({ "-webkit-transform": 'rotate(' + angle + 'deg)'});
       box.css({ '-moz-transform': 'rotate(' + angle + 'deg)'});
       box.css({ 'transform': 'rotate(' + angle + 'deg)'});
     });
    $(document).mousedown(function(){
      $("#helmetId").removeClass('helmetGrin').addClass('helmetOm');
      var orb = $("#orb").append(orbImage);
      fireOrb();
      });


    $(document).mouseup(function(){
        $("#helmetId").removeClass('helmetOm').addClass('helmetGrin');
        });

});

function containerCollision(){
	var collisionOne = $('#container');
	var collisionTwo = $('.orb');
	window.setInterval(function() {
			$('#containerResult').text(collision(collisionOne, collisionTwo));
	}, 2);
}


//checks collision
		function collision(collisionOne, collisionTwo) {
      var x1 = collisionOne.offset().left;
      var y1 = collisionOne.offset().top;
      var h1 = collisionOne.outerHeight(true);
      var w1 = collisionOne.outerWidth(true);
      var b1 = y1 + h1;
      var r1 = x1 + w1;
      var x2 = collisionTwo.offset().left;
      var y2 = collisionTwo.offset().top;
      var h2 = collisionTwo.outerHeight(true);
      var w2 = collisionTwo.outerWidth(true);
      var b2 = y2 + h2;
      var r2 = x2 + w2;

      if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
      return true;

    }


function fireOrb(){
  $('#orb').animate({top: '580px'}, "slow", function () {
    $(this).removeAttr('style');
    $('#orb').empty();
  });
  };

function alienNewPosition(){
  var h = $('#container').height();
  var w = $('#container').width();
  var nh = Math.floor(Math.random() * h);
  var nw = Math.floor(Math.random() * w);
  return [nh,nw];
}

function spawnAlien(){
  var newq = alienNewPosition();
  var oldq = $('.alien').offset();
  var speed = calcSpeed([oldq.top, oldq.left], newq);
  $('.alien').animate({ top: newq[0], left: newq[1] }, speed, function(){
    spawnAlien();
  });
}

function calcSpeed(prev, next) {
  var x = Math.abs(prev[1] - next[1]);
  var y = Math.abs(prev[0] - next[0]);
  var greatest = x > y ? x : y;
  var speedModifier = 0.1;
  var speed = Math.ceil(greatest/speedModifier);
  return speed;
}
