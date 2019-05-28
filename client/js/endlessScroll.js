/** @private variable to store offset for every user. */
let Offset = 0;

/**
 * Function that send post request to server,
 * to get JSON with new projects.
 *
 * @param {Object} jQuery.
 */
jQuery(document).ready(function($) {
  $(window).scroll(function() {
    if ($(window).height() + $(window).scrollTop() + 1
        >= $(document).height()) {
      $.ajax({
        type: 'POST',
        url: '/package.json',
        data: {offset: Offset},
        success: function(jsonPackage) {
          stopLoading();
          setToPage(jsonPackage);
        },
      });

      startLoading();
    }
  });

  const layout =
    `<div class="col-lg-3 col-md-4 col-sm-12">
          <div class="card">
              <img class="card-img-top projectImage">
              <div class="card-body">
                  <h4 class="card-title text-uppercase projectTitle">
                    Sometitle
                   </h4>
                  <p class="card-text projectText">sometext</p>
                  <a class="link projectLink" href="#">Read More</a>
                  <span class="text-uppercase float-right projectTag">Tag</span>
              </div>
          </div>
      </div>`;

  /**
   * Function that insert received JSON to page
   * @param {Object} jsonPackage, package that had been received.
   */
  function setToPage(jsonPackage) {
    const parsedData = JSON.parse(jsonPackage);

    for (let i = 0; i < parsedData.count; i++) {
      $('.project').append(layout);

      const img = $('<img>');
      // Check the path (!)
      img.attr('src', 'img/' + parsedData.projects[i].img);
      // Check the :eq("+i+")"
      $('.projectImage:eq(' + Offset + ')').append(img);

      $('.projectTitle:eq(' + Offset + ')')
          .append(parsedData.projects[i].title);
      $('.projectText:eq(' + Offset + ')')
          .append( parsedData.projects[i].description);
      $('.projectLink:eq(' + Offset + ')')
          .append(parsedData.projects[i].url);
      $('.projectTag:eq(' + Offset + ')')
          .append(parsedData.projects[i].tag);

      Offset++;
    }
  }


  /**
   * Start loading function
   */
  function startLoading() {
    $('#load').fadeIn(300);
  }

  /**
   * Stop loading function
   */
  function stopLoading() {
    $('#load').fadeOut();
  }
});

