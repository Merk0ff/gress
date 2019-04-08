
jQuery(document).ready(function($) {
  $(window).scroll(function() {
    if ($(window).height() + $(window).scrollTop() >= $(document).height()) {
      $.ajax({
        type: 'GET',
        url: '/package.json',
        success: function(jsonPackage) {
          stopLoading();
          setToPage(jsonPackage);
          jsonPackage['count'];
        },
      });
      startLoading();
    }
  });

  // Ты скажешь мне, что так пишут только идиоты
  // На что я отвечу: "на стэковерфлоу был только такой пример"
  var layout = '<div class="col-lg-3 col-md-4 col-sm-12">';
  layout += '<div class="card">';
  layout += '<img class="card-img-top projectImage">';
  layout += '<div class="card-body">';
  layout += '<h4 class="card-title text-uppercase projectTitle">Sometitle</h4>';
  layout += '<p class="card-text projectText">sometext</p>';
  layout += '<a class="link projectLink" href="#">Read More</a>';
  layout += '<span class="text-uppercase float-right projectTag">Tag</span>';
  layout += '</div>';
  layout += '</div>';
  layout += '</div>';

  function setToPage(jsonPackage) {
    var parsedData = JSON.parse(jsonPackage);
    var counter = parsedData.count;
    for (var i=0; i<counter; i++) {
      $('.project').append(layout);
      var projImg = parsedData[i].img;
      var $img = $("<img>"); // ???
      $img.attr("src", "img/" + projImg); // Check the path (!)
      $(".projectImage:eq("+i+")").append($img); // Check the :eq("+i+")"
      var projTitle = parsedData[i].title;
      $(".projectTitle:eq("+i+")").append(projTitle);
      var projText = parsedData[i].description;
      $(".projectText:eq("+i+")").append(projText);
      var projLink = parsedData[i].url;
      $(".projectLink:eq("+i+")").append(projLink);
      var projTag = parsedData[i].tag;
      $(".projectTag:eq("+i+")").append(projTag);
    }
  }

  function startLoading() {
    $('#load').fadeIn(300);
  }

  function stopLoading() {
    $('#load').fadeOut();
  }
});

