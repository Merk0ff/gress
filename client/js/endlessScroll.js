  //global variable to store offset for every user
  var offset=0;


jQuery(document).ready(function($) {
  $(window).scroll(function() {
    if ($(window).height() + $(window).scrollTop() >= $(document).height()) {
      $.ajax({
        type: 'POST',
        url: '/package.json',
        data: {offset: offset},
        success: function(jsonPackage) {
          stopLoading();
          setToPage(jsonPackage);
         // jsonPackage['count'];
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
      var projImg = parsedData.projects[i].img;
      var $img = $("<img>"); // ???
      $img.attr("src", "img/" + projImg); // Check the path (!)
      $(".projectImage:eq("+offset+")").append($img); // Check the :eq("+i+")"
      var projTitle = parsedData.projects[i].title;
      $(".projectTitle:eq("+offset+")").append(projTitle);
      var projText = parsedData.projects[i].description;
      $(".projectText:eq("+offset+")").append(projText);
      var projLink = parsedData.projects[i].url;
      $(".projectLink:eq("+offset+")").append(projLink);
      var projTag = parsedData.projects[i].tag;
      $(".projectTag:eq("+offset+")").append(projTag);
      offset++;
    }
  }
  
  
  function startLoading() {
    $('#load').fadeIn(300);
  }

  function stopLoading() {
    $('#load').fadeOut();
  }
});

