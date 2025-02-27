(function($){

    window.scrollTo(0, 0);

    
    setTimeout(function() { 
        bodyTl.play();
        //openingTl.play();
    }, 1000);




    $('.card .front button').on('click', function() {
        $(this).parent().parent().addClass('is-flipped');
    });

    $('.card .back button').on('click', function() {
        $(this).parent().parent().removeClass('is-flipped');
        $('.jBox-closeButton').trigger('click');
    });

    $('.hotspot').on('click', function() {
        $('.hotspot').removeClass('is-animated');
    });


    
    var controller = new ScrollMagic.Controller();
    var $body = $('body');
    var bodyTl = new TimelineMax({ paused: true })
        .to($body, 0.15, { autoAlpha: 1, ease: Power4.easeInOut });
       
    hideBody();
    function hideBody(){
        var hideBodyTl = new TimelineMax();
        hideBodyTl
            .set($body, { autoAlpha: 0 });
        return hideBodyTl;
    }

    new ScrollMagic.Scene({triggerElement: "#img-cards"})
    .on("enter", function (event) {
       // alert('lol');
       bodyTl.play();       
    }).triggerHook(0.6).addTo(controller);


     
    // --------------------------------------------------------------
    // --------------------------------------------------------------
    // --------------------------------------------------------------
    $hero = $('.hero');
    $opening = $hero.find('.opening');
    $openingL = $opening.find('.opening-left');
    $openingR = $opening.find('.opening-right');
    var openingTl = new TimelineMax({ paused: true })
        .to($openingL, 1, { xPercent: "+=50", yPercent: "-=30", ease: Power4.easeInOut })
        .to($openingR, 1, { xPercent: "-=50", yPercent: "-=30", ease: Power4.easeInOut }, "-=1")
        .to($hero, 0.1, { filter: "brightness(1.3)", ease: Power4.easeInOut }, "-=0.3") // Add this line to animate $hero to filter: brightness(2)
        .to($hero, 0.1, { filter: "brightness(1)", ease: Power4.easeInOut }, "-=0.2")
        .to($hero, 0.1, { filter: "brightness(1.3)", ease: Power4.easeInOut }, "-=0.05") // Add this line to animate $hero to filter: brightness(2)
        .to($hero, 0.1, { filter: "brightness(1)", ease: Power4.easeInOut }, "-=0.04"); // Add this line to animate $hero to filter: brightness(2.4)
       

    setOpening();
    function setOpening(){
        var setOpeningTl = new TimelineMax();
        setOpeningTl
            .set($openingL, { xPercent: "-=50", yPercent: "+=30", autoAlpha: 1 })
            .set($openingR, { xPercent: "+=50", yPercent: "+=30", autoAlpha: 1 });
        return setOpeningTl;
    }

    // --------------------------------------------------------------
    // --------------------------------------------------------------
    // --------------------------------------------------------------
    var $chartImmigration = $('#chart-immigration');
    
    $listImmigration = $chartImmigration.find('li');
    var $barBaseW = $(".bar-first").width();
    var $barBaseVal = $listImmigration.first().find('.bar').attr('value');
    $('.bar').removeClass('grow');

    setImmigrationBars();
    function setImmigrationBars(){
        var setImmigrationBarsTl = new TimelineMax();
        setImmigrationBarsTl
            .set($listImmigration.find('.bar'), { width: '0' }); 
        return setImmigrationBarsTl;
    }
       
    // var $barValInPercent = 100 / $barBaseVal * 18
    
    // alert($barValInPercent);

    // $listImmigration.each(function(index) {
    //     var value = $(this).find('.bar').attr('value');
    //     $(this).html(value);
    // });
    var graphImmigrationDone = false;
    new ScrollMagic.Scene({triggerElement: "#chart-immigration"})
        .on("enter", function (event) {
            if (!graphImmigrationDone)
            {
                var $resultInNbr;
                $listImmigration.each(function(index) {
                    var value = $(this).find('.bar').attr('value');
                    $(this).find('.counter').html(value);
    
                    $resultInNbr = 100 / $barBaseVal * value;
                    $resultInPx = $barBaseW / 100 * $resultInNbr;
                    $resultInPxFraction = $resultInPx / 100 * 30;

                    var barElement = $(this).find('.bar');
                    var counterElement = $(this).find('.counter');
                    TweenMax.to(barElement, 1.5, { width: $resultInPx-$resultInPxFraction, ease: Power4.easeInOut });
    
                    //console.log($resultInPx-20);
                });
    
    
                $('.counter').counterUp({
                    delay: 10,
                    time: 1000
                });

                graphImmigrationDone = true;
            }
           
        }).triggerHook(0.7).addTo(controller);









    var $chartSmic = $('#chart-smic');
    var $listSmic = $chartSmic.find('li');
    var graphSmicDone = false;


    

    new ScrollMagic.Scene({triggerElement: "#chart-smic"})
        .on("enter", function (event) {
            var $barBaseVal = $listSmic.first().find('.bar').attr('value');
            if (!graphSmicDone)
            {
               
                $listSmic.each(function(index) {
                    var value = $(this).find('.bar').attr('value');
                    $(this).find('.counter2').html(value);
                    
    
                    $resultInNbr = 100 / $barBaseVal * value;
                    $resultInPx = $barBaseW / 100 * $resultInNbr;
                    $resultInPxFraction = $resultInPx / 100 * 30;
    
                    var barElement = $(this).find('.bar');
                    TweenMax.to(barElement, 1.5, { width: $resultInPx-$resultInPxFraction, ease: Power4.easeInOut });
    
                });
    
    
                $('.counter2').counterUp({
                    delay: 10,
                    time: 1000
                });

                graphSmicDone = true;
            }
           
        }).triggerHook(0.7).addTo(controller);




    new jBox('Tooltip', {
        attach: '.tooltip',
        trigger: 'click',
        closeOnMouseleave: false,
        closeButton: true,
        maxWidth: 350,
        position: {x: 'center', y: 'top'},
        offset: {x: 0, y: -10},
        animation: 'move'
    });
    
   

         

            $('#chapter-selection').on('change', function() {
                var selectedChapter = $(this).val();
                var targetElement = $('#' + selectedChapter);
                if (targetElement.length) {
                    $('html, body').animate({
                        scrollTop: targetElement.offset().top
                    }, 1000);
                }
            });

            // Rest of your code...



        $('#btn-encart').on('click', function() {
            // Your code here
            //alert('Button #btn-encart clicked!');
            $('.encart-hidden').removeClass('encart-hidden');
            $('.encart-tohide').addClass('encart-hidden');
            $(this).remove();
        });
	

  
})(jQuery);