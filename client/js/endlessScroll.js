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

  var OFFSET = 0;

  function setToPage(jsonPackage) {
    var parsedData = JSON.parse(jsonPackage);
    var counter = parsedData.count;
    for (var i=0; i<counter; i++) {
      $('.project').append(layout);
      var projImg = parsedData.projects[i].img;
      var $img = $("<img>");
      $img.attr("src", "img/" + projImg); // Check the path (!)
      $(".projectImage:eq("+OFFSET+")").append($img);
      var projTitle = parsedData.projects[i].title;
      $(".projectTitle:eq("+OFFSET+")").append(projTitle);
      var projText = parsedData.projects[i].description;
      $(".projectText:eq("+OFFSET+")").append(projText);
      var projLink = parsedData.projects[i].url;
      $(".projectLink:eq("+OFFSET+")").append(projLink);
      var projTag = parsedData.projects[i].tag;
      $(".projectTag:eq("+OFFSET+")").append(projTag);
      OFFSET++;
    }
  }

  function startLoading() {
    $('#load').fadeIn(300);
  }

  function stopLoading() {
    $('#load').fadeOut();
  }
});

