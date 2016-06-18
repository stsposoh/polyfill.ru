;(function() {
  'use-strict';

  //jQuery Page Preload
  $(".loader-inner").fadeOut(); 
  $(".loader").delay(400).fadeOut("slow"); 

  //top menu
  $("#toggle-mnu").click(function() {
    $(this).toggleClass("on");
    $(".logo").toggleClass("off");
    $(".main-mnu").fadeToggle();
    $(".main-mnu ul").addClass("animated fadeInUp");
    return false;
  });
  
  $(".main-mnu ul a").mPageScroll2id();
  
  $(".main-mnu ul a").click(function() {
    $("#toggle-mnu").click();
  });
  
  //logo
  $("#logo-text").addClass('animated fadeIn');
  $("#logo-desc").addClass('animated slideInUp');
  
  $(".arrow-down").on('click', function() {
    $('html, body').animate({
      scrollTop: $('header').height()
    },
      "slow"                     
    );
  });
  
  //about
  addAnimation('.about','.anim1','zoomIn','50%');
  addAnimation('.about','.myself','flipInY','20%');
  addAnimation('.about','.anim2','fadeInUp','30%');
  
  //skills
  addAnimation('.skills','.anim3','zoomIn','50%');
  addItemsAnimation('.skills', 13, 'ol>li', 'fadeInLeft', '30%');
  addItemsAnimation('.skills', 16, '.icons>img', 'fadeInRight', '30%');
  
  //education
  addAnimation('.education','.anim4','zoomIn','50%');
  addAnimation('.education','.anim10','zoomIn','40%');
  addItemsAnimation('.education', 5, '.anim5 p', 'fadeInUp', '30%');
  addItemsAnimation('.education', 16, '.anim7>li:nth-child(odd)', 'fadeInLeft', '30%');
  addItemsAnimation('.education', 16, '.anim7>li:nth-child(even)', 'fadeInRight', '30%');

  //portfolio
  addAnimation('.portfolio','.anim8','zoomIn','50%');
  
  $('.certificates-gallery').mixItUp();
  
  $('.portfolio-gallery').magnificPopup({
    delegate: 'a',
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    removalDelay: 700,
    mainClass: 'mfp-fade',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1]
    }
  });
  
  //certificates
  addAnimation('.certificates','.anim9','zoomIn','50%');
  
  $('.certificates-gallery').magnificPopup({
    delegate: 'a',
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    removalDelay: 700,
    mainClass: 'mfp-fade',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1]
    },
  });
  
  //footer
  $(".on-top").on('click', function() {
    $('html, body').animate({
      scrollTop: 0
    },
      "slow"                     
    );
  });
  
  //FUNCTIONS
  function addItemsAnimation(point, numberOfItems, elementsName, effectName, topOffset) {
    $(point).waypoint( function(dir) {
      let self = this.element;

      if(dir === 'down') {
        var elemNumb = 0;
        var addCl = setInterval(function() {
          $(self).find(elementsName).eq(elemNumb).css('opacity','1').addClass('animated ' + effectName);
          ++elemNumb;

          if(elemNumb == numberOfItems) {
            clearInterval(addCl);
          }
        }, 100);
      }
    }, {
      offset: topOffset
    });
  }
  
  function addAnimation(point, elementName, effectName, topOffset) {
    $(point).waypoint( function(dir) {

      if(dir === 'down') {
        $(elementName).css('opacity','1');
        $(elementName).addClass('animated ' + effectName);
      }
    }, {
      offset: topOffset
    }); 
  }

  //Запрет перетаскивать картинки
  $("img, a").on("dragstart", function(event) {
    event.preventDefault();
  });

})();