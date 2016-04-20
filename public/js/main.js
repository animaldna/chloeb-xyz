$(document).ready(function(){

  /* Global
  –––––––––––––––––––––––––––––––––––––––––––––––––– */
  $(".nav-links [href]").each(function(){
    if(this.href == window.location.href){
      $(this).addClass("active-nav");
      $(this).removeClass("underline");
    }
  });


  /* Services
  –––––––––––––––––––––––––––––––––––––––––––––––––– */
  $('.help-btn').hover(function(){
    $(this).css({
      "color":"#fff",
      "background-color":"#FFAB40"
    });
  }, function(){
    $(this).css({
      "color":"#FFAB40",
      "background-color":"#fff"
    });
  });

  $('.service-headline').click(function(){        
    if(!$(this).hasClass('selected') && !($(this).hasClass('mobile-headline'))){
      var service = $(this).data('service');
      var detailsSelector = 'div[data-service="' + service + '"].service-details'; 
      var headlineSelector = 'div[data-service="' + service + '"].service-headline';  

      $('div[class*="visible"]').removeClass('visible');
      $('div[class*="selected"]').removeClass('selected');
      $(detailsSelector).addClass('visible');
      $(headlineSelector).addClass('selected');
    }
  });

  $('.mobile-headline').click(function(){
    if(!$(this).next().is(":visible"))
    {
        $(this).find('div i').removeClass('fa-caret-right').addClass('fa-caret-down');
        $(this).next().slideDown();
    } else {
        $(this).find('div i').removeClass('fa-caret-down').addClass('fa-caret-right');
        $(this).next().slideUp();
    }
  });
});