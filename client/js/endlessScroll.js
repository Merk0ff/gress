/** @private variable to store offset for every user. */
let Offset = 0;
const enumTag = {
  '0': '',
  '1': 'IT',
  '2': 'Art',
  '3': 'Social',
};
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
      const type = $('#projectType').val();
      $.ajax({
        type: 'POST',
        url: '/package.json',
        data: {offset: Offset, type: type},
        success: function(jsonPackage) {
          stopLoading();
          setToPage(jsonPackage);
        },
      });

      startLoading();
    }
  });
  const type = $('#projectType').val();
  $.ajax({
    type: 'POST',
    url: '/package.json',
    data: {offset: Offset, type: type},
    success: function(jsonPackage) {
      stopLoading();
      setToPage(jsonPackage);
    },
  });

  startLoading();

  const layout =
    `<div class="col-lg-6 col-md-6 col-sm-6">
          <div class="card projectImage">
              <div class="card-body">
                  <h4 class="card-title text-uppercase projectTitle">
                   </h4>
                  <p class="card-text projectText"></p>
                  <a class="link projectLink" href="DescriptionOfTheProject.html">Read More</a>
                  <span class="text-uppercase float-right projectTag"></span>
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
      img.attr('src', (
        parsedData.projects[i].project_media.length>0)?
        parsedData.projects[i].project_media[0].media_url:
        'files/project/1559083366870_be10fe2ea.png'
      );
      img.attr('style', 'width: auto; height: 100%;');
      // Check the :eq("+i+")"
      $('.projectImage:eq(' + Offset + ')').prepend(img);

      $('.projectTitle:eq(' + Offset + ')')
          .append(parsedData.projects[i].project_title);
      $('.projectText:eq(' + Offset + ')')
          .append( parsedData.projects[i].project_info.substr(0, 100) + (parsedData.projects[i].project_info.length>100?'...':''));
      $('.projectLink:eq(' + Offset + ')')
          .attr('href', 'DescriptionOfTheProject.html?id='+ parsedData.projects[i]._id);
      $('.projectTag:eq(' + Offset + ')')
          .append(enumTag[parsedData.projects[i].project_status]);
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

