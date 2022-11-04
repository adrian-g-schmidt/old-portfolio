var doc = window.document,
  context = doc.querySelector('.js-loop'),
  topClone = context.querySelectorAll('.top-clone'),
  botClone = context.querySelectorAll('.bot-clone'),
  shown = context.querySelectorAll('.shown'),
  dots = doc.querySelectorAll('.dot')
  disableScroll = false,
  scrollHeight = 0,
  scrollPos = 0,
  sectionHeight = 0,
  i = 0,
  load = true;

function getScrollPos () {
  return (context.pageYOffset || context.scrollTop) - (context.clientTop || 0);
}

window.addEventListener('load', (event) => {
    reCalc();
    setScrollPos(sectionHeight);
    disableScroll = true;
    window.setTimeout(function () {
        disableScroll = false;
    }, 40);  
});



function setScrollPos (pos) {
  context.scrollTop = pos;
}

function getSectionHeight () {
  sectionHeight = 0;

  for (i = 0; i < topClone.length; i += 1) {
    sectionHeight = sectionHeight + topClone[i].offsetHeight;
  }

  return sectionHeight;
}



function reCalc () {
  scrollPos = getScrollPos();
  scrollHeight = context.scrollHeight;
  clonesHeight = getSectionHeight();
  if (scrollPos <= 0) {
    setScrollPos(1); // Scroll 1 pixel to allow upwards scrolling
  }
}

$("#1").click(function(){
    setScrollPos((1)*(sectionHeight+150));
});

$("#2").click(function(){
    setScrollPos((2)*(sectionHeight+150));
});

$("#3").click(function(){
    setScrollPos((3)*(sectionHeight+150));
});

var colorList = ["#A4036F", "#048BA8", "#16DB93", "#EFEA5A", "#F29E4C"]

function pageUpdate(){
    if (load){
        currentPage=0;
        load=false;
    } else{
        var currentPage = Math.round(scrollPos/(sectionHeight+150) -1);
        if (currentPage == dots.length){
            currentPage=0
          } else if (currentPage == -1){
              currentPage=2
          };
    }
    for (i=0; i<dots.length; i++){
      if (i == currentPage){
          dots[i].style.backgroundColor = "#eee";
          dots[i].style.scale=1.4;
      }
      else{
          dots[i].style.backgroundColor = "#555";
          dots[i].style.scale=1;
      }
    }
    $("#square").css("background-color", colorList[currentPage]);
}

function scrollUpdate () {
  if (!disableScroll) {
    scrollPos = getScrollPos();

    if (scrollPos >= scrollHeight-sectionHeight) {
      // Scroll to the top when you’ve reached the bottom
      setScrollPos(sectionHeight); // Scroll down 1 pixel to allow upwards scrolling
      disableScroll = true;
    } else if (scrollPos<=0) {
      // Scroll to the bottom when you reach the top
      setScrollPos(scrollHeight-sectionHeight*2);
      disableScroll = true;
    }
  }

  if (disableScroll) {
    // Disable scroll-jumping for a short time to avoid flickering
    window.setTimeout(function () {
      disableScroll = false;
    }, 40);
  }
  pageUpdate();
}

function init () {
  reCalc();
  
  context.addEventListener('scroll', function () {
    window.requestAnimationFrame(scrollUpdate);
  }, false);

  window.addEventListener('resize', function () {
    window.requestAnimationFrame(reCalc);
  }, false);
}

if (document.readyState !== 'loading') {
  init()
} else {
  doc.addEventListener('DOMContentLoaded', init, false)
}

