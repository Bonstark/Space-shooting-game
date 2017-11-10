  $(document).ready(function(){
    animateAlien();

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

function fireOrb(){
  $('#orb').animate({top: '1000px'}, "slow", function () {
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

function animateAlien(){
  var newq = alienNewPosition();
  var oldq = $('.alien').offset();
  var speed = calcSpeed([oldq.top, oldq.left], newq);
  $('.alien').animate({ top: newq[0], left: newq[1] }, speed, function(){
    animateAlien();
  });
};

function calcSpeed(prev, next) {
  var x = Math.abs(prev[1] - next[1]);
  var y = Math.abs(prev[0] - next[0]);
  var greatest = x > y ? x : y;
  var speedModifier = 0.1;
  var speed = Math.ceil(greatest/speedModifier);
  return speed;
}
