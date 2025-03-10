(function($){

    window.scrollTo(0, 0);

    
    setTimeout(function() { 
        bodyTl.play();
        //openingTl.play();
    }, 1000);


    $(document).ready(function () {
      function handleVideoStreaming() {
          $("video").each(function () {
              var $video = $(this);
              var isVisible = isInViewport($video);
              var placeholder = $video.siblings(".video-placeholder");
  
              if (isVisible) {
                  if (!$video.attr("src") && $video.data("src")) {
                      var src = $video.data("src");
                      $video.attr("src", src);
                      $video[0].load();
  
                      // Quand la vidéo est chargée, masquer le placeholder
                      $video.on("loadeddata", function () {
                          $video.closest(".video-wrapper").addClass("video-loaded");
                      });
                  }
  
                  if ($video[0].paused) {
                      $video[0].play();
                  }
              } else {
                  if (!$video[0].paused) {
                      $video[0].pause();
                  }
                  $video.removeAttr("src");
                  $video[0].load();
                  $video.closest(".video-wrapper").removeClass("video-loaded"); // Remet le poster en place
              }
          });
      }
  
      function isInViewport($element) {
          var elementTop = $element.offset().top;
          var elementBottom = elementTop + $element.height();
          var viewportTop = $(window).scrollTop();
          var viewportBottom = viewportTop + $(window).height();
          return elementBottom > viewportTop && elementTop < viewportBottom;
      }
  
      setTimeout(handleVideoStreaming, 500);
      $(window).on("scroll resize", handleVideoStreaming);
  });
  
  
  

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


     
  




   

         

	

        var options = {
            series: [{
              name: 'Taux de suicide pour 100\'000 habitants',
              data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]  // Start with zero values
            },{
              name: 'Moyenne mondiale de <b>9</b>',
              type: 'line',
              data: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9]
            }],
            chart: {
            height: 400,
            type: 'bar',
            toolbar: {
              show: false
            }
          },
          colors: ['rgb(10, 106, 165)', 'rgb(235, 227, 88)'],
          plotOptions: {
            bar: {
              borderRadius: 4,
              columnWidth: '60%',
            }
          },
          stroke: {
            width: [0, 3],
            curve: 'straight'
          },
          dataLabels: {
            enabled: true,
            enabledOnSeries: [0],
            formatter: function (val) {
              return val;
            },
            style: {
              fontSize: '12px',
              colors: ['#ffffff']
            }
          },
          xaxis: {
            categories: ['Groenland', 'Lesotho', 'Guyana', 'Eswatini', 'Corée', 'Kiribati', 'Micronésie', 'Lituanie', 'Suriname', 'Russie', 'Suisse'],
            labels: {
              rotate: -45,
              style: {
                fontSize: '12px'
              }
            }
            // title: {
            //   text: 'Pays'
            // }
          },
          grid: {
            borderColor: '#e7e7e7',
            row: {
              colors: ['#f3f3f3', 'transparent'],
              opacity: 0.5
            },
          },
          yaxis: {
            min: 0,
            max: 100,
            tickAmount: 10,
            labels: {
              formatter: function(val) {
                return Math.round(val)
              }
            }
          },
          tooltip: {
            enabled: false,
            y: {
              formatter: function (val) {
                return val + " suicides pour 100'000 habitants"
              }
            }
          }
          };
  
          var chart = new ApexCharts(document.querySelector("#chart"), options);
          
          // Render empty chart immediately
          chart.render();
          
          // Cacher le titre initialement
          gsap.set("#chart-title", { autoAlpha: 1 });
          
          // Données finales
          var finalData = [80, 72, 40, 29, 29, 28, 28, 26, 25, 25, 14];
          
          var chartRendered = false;
          new ScrollMagic.Scene({
            triggerElement: "#chart",
            triggerHook: 0.5
          })
          .on("enter", function (event) {
            if (!chartRendered) {
              // Animer les barres
              chart.updateSeries([{
                name: 'Taux de suicide pour 100\'000 habitants',
                data: finalData
              }, {
                name: 'Moyenne mondiale de <b>9</b>',
                type: 'line',
                data: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9]
              }], true);
              
              // Fade in du titre
              gsap.to("#chart-title", {
                duration: 1,
                autoAlpha: 1,
                ease: "power2.out"
              });
              chartRendered = true;
            }
          })
          .addTo(controller);
          


          
  
})(jQuery);