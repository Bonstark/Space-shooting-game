  $(document).ready(function(){
    animateDiv();

    var box=$(".helmet");
    var boxCenter=[box.offset().left+box.width()/2, box.offset().top+box.height()/2];

    $(document).mousemove(function(e){
  	   var angle = Math.atan2(e.pageX- boxCenter[0],- (e.pageY- boxCenter[1]) )*(180/Math.PI);
       var angle = angle-180
       box.css({ "-webkit-transform": 'rotate(' + angle + 'deg)'});
       box.css({ '-moz-transform': 'rotate(' + angle + 'deg)'});
       box.css({ 'transform': 'rotate(' + angle + 'deg)'});
     });

    $(document).mousedown(function(){
      $("#helmetId").removeClass('helmetGrin').addClass('helmetOm');
      });
    $(document).mouseup(function(){
        $("#helmetId").removeClass('helmetOm').addClass('helmetGrin');
        });

});



function makeNewPosition(){
  var h = $('#container').height();// Get viewport dimensions (remove the dimension of the div)
  var w = $('#container').width();
  var nh = Math.floor(Math.random() * h);
  var nw = Math.floor(Math.random() * w);
  return [nh,nw];
}

function animateDiv(){
  var newq = makeNewPosition();
  var oldq = $('.alien').offset();
  var speed = calcSpeed([oldq.top, oldq.left], newq);
  $('.alien').animate({ top: newq[0], left: newq[1] }, speed, function(){
    animateDiv();
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
