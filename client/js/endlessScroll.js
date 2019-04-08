
/*
 * THIS
 * PIECE
 * OF
 * MASTERPIECE
 * DOESN'T
 * WANNA
 * START
 * WORKING
 *
 */


jQuery(document).ready(function($) {
  $(window).scroll(function() {
    if ($(window).height() + $(window).scrollTop() >= $(document).height()) {
      $.ajax({
        type: 'GET',
        url: '/package.json',
        success: function(jsonPackage) {
          stopLoading();
          jsonPackage['count'];
        },
      });
      stopLoading();
    }
  });
  /*
    function setToPage(jsonPackage) {
        var parsedData = JSON.parse(jsonPackage);
        while (parsedData.count > 0){
            $('#projects').append(jsonPackage);
        }
    } */

  function startLoading() {
    $('#load').fadeIn(300);
  }

  function stopLoading() {
    $('#loading').fadeOut();
  }
});

