;(function() {
  'use-strict';

  //jQuery Page Preload
  $(".loader-inner").fadeOut(); 
  $(".loader").delay(400).fadeOut("slow"); 
  
  
  //эффект в header. Если webgl не поддерживается устройством или это мобильное устройство, тогда загрузить просто статичный фон
  if (!Modernizr.webgl || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    $("header").addClass('top-bg');
  } else {
    addHeaderEffect();
  }
  
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
  
  $('.portfolio').magnificPopup({
    delegate: '.link-img',
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
  function addHeaderEffect() {
    
    var canvas = document.querySelector("canvas");

    // Create the WebGL context, with fallback for experimental support.
    var context = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    // Compile the vertex shader.
    var vertexShader = context.createShader(context.VERTEX_SHADER);
    context.shaderSource(vertexShader, document.querySelector("#vertex-shader").textContent);
    context.compileShader(vertexShader);
    if (!context.getShaderParameter(vertexShader, context.COMPILE_STATUS)) throw new Error(context.getShaderInfoLog(vertexShader));

    // Compile the fragment shader.
    var fragmentShader = context.createShader(context.FRAGMENT_SHADER);
    context.shaderSource(fragmentShader, document.querySelector("#fragment-shader").textContent);
    context.compileShader(fragmentShader);
    if (!context.getShaderParameter(fragmentShader, context.COMPILE_STATUS)) throw new Error(context.getShaderInfoLog(fragmentShader));

    // Link and use the program.
    var program = context.createProgram();
    context.attachShader(program, vertexShader);
    context.attachShader(program, fragmentShader);
    context.linkProgram(program);
    if (!context.getProgramParameter(program, context.LINK_STATUS)) throw new Error(context.getProgramInfoLog(program));
    context.useProgram(program);

    // Define the positions (as vec2) of the square that covers the canvas.
    var positionBuffer = context.createBuffer();
    context.bindBuffer(context.ARRAY_BUFFER, positionBuffer);
    context.bufferData(context.ARRAY_BUFFER, new Float32Array([
        -1.0, -1.0,
        +1.0, -1.0,
        +1.0, +1.0,
        -1.0, +1.0
      ]), context.STATIC_DRAW);

    // Bind the position buffer to the position attribute.
    var positionAttribute = context.getAttribLocation(program, "a_position");
    context.enableVertexAttribArray(positionAttribute);
    context.vertexAttribPointer(positionAttribute, 2, context.FLOAT, false, 0, 0);

    // Extract the projection parameters.
    var translateUniform = context.getUniformLocation(program, "u_translate"),
        scaleUniform = context.getUniformLocation(program, "u_scale"),
        rotateUniform = context.getUniformLocation(program, "u_rotate");

    // Load the reference image.
    var image = new Image();
    image.src = "/img/milky-way.jpg";
    image.onload = readySoon;
    self.onresize = resize;

    // Hack to ensure correct inference of window dimensions.
    function readySoon() {
      setTimeout(function() {
        resize();
        ready();
      }, 10);
    }

    function resize() {
      var width = Math.max(100, self.innerWidth),
          height = Math.max(500, self.innerHeight);
      canvas.setAttribute("width", width);
      canvas.setAttribute("height", height);
      context.uniform2f(translateUniform, width / 2, height / 2);
      context.uniform1f(scaleUniform, 500);
      context.viewport(0, 0, width, height);
    }

    function ready() {

      // Create a texture and a mipmap for accurate minification.
      var texture = context.createTexture();
      context.bindTexture(context.TEXTURE_2D, texture);
      context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MAG_FILTER, context.LINEAR);
      context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MIN_FILTER, context.LINEAR_MIPMAP_LINEAR);
      context.texImage2D(context.TEXTURE_2D, 0, context.RGBA, context.RGBA, context.UNSIGNED_BYTE, image);
      context.generateMipmap(context.TEXTURE_2D);

      // The current rotation and speed.
      var rotate = [0, 0],
          speed = [-.001, .0004];

      redraw();

      // Rotate and redraw!
      function redraw() {
        rotate[0] += speed[0], rotate[1] += speed[1];
        context.uniform2fv(rotateUniform, rotate);
        context.bindTexture(context.TEXTURE_2D, texture); // XXX Safari
        context.drawArrays(context.TRIANGLE_FAN, 0, 4);
        requestAnimationFrame(redraw);
      }
    }

    // A polyfill for requestAnimationFrame.
    if (!self.requestAnimationFrame) requestAnimationFrame =
        self.webkitRequestAnimationFrame
        || self.mozRequestAnimationFrame
        || self.msRequestAnimationFrame
        || self.oRequestAnimationFrame
        || function(f) { setTimeout(f, 17); };
  //canvas end
  } 
  
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