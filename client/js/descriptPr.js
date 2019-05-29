function $_GET(key) {
  let p = window.location.search;
  p = p.match(new RegExp(key + '=([^&=]+)'));
  return p ? p[1] : false;
}
jQuery(document).ready(function($) {
  $.ajax({
    type: 'POST',
    url: '/project.json',
    data: {id: $_GET('id')},
    success: function(jsonPackage) {
      stopLoading();
      setToPage(jsonPackage);
    },
  });
  startLoading();
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
          .append( parsedData.projects[i].project_info.substr(0, 100)+'...');
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
