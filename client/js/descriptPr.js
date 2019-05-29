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
      getAuthor(jsonPackage);
    },
  });
  startLoading();

  function getAuthor(jsonPackage) {
    const parsedData = JSON.parse(jsonPackage);
    $.ajax({
      type: 'POST',
      url: '/user.json',
      data: {id: parsedData.project_author},
      success: function(user) {
        stopLoading();
        parsedData.project_author = JSON.parse(user);
        setToPage(parsedData);
      },
    });
  }
  /**
   * Function that insert received JSON to page
   * @param {Object} parsedData, package that had been received.
   */
  function setToPage(parsedData) {
    $('#project_title').text(parsedData.project_title);
    $('#project_author').text('Сreator: '+parsedData.project_author.user_fullname);
    // Check the path (!)
    $('#project_img').attr('src', (
        parsedData.project_media.length>0)?
        parsedData.project_media[0].media_url:
        'files/project/1559083366870_be10fe2ea.png'
    );
    // Check the :eq("+i+")"
    const date1 = new Date();
    const date2 = new Date(parsedData.project_date);
    const datediff = Math.ceil(Math.abs(date1.getTime() - date2.getTime()) / (1000 * 3600 * 24));
    $('#project_date').text(180 - datediff);
    $('#project_date').attr('aria-valuenow', (100/180)*datediff);
    $('#project_date').attr('style', 'width:'+(100/180)*datediff+'%;color:darkblue');
    $('#project_info')
        .append(parsedData.project_info);
    if (typeof parsedData.project_need == 'undefined' ) {
      $('#project_need').append('<li class="list-group-item"></li>');
    } else {
      if (parsedData.project_need.length == 0) {
        $('#project_need').append('<li class="list-group-item"></li>');
      }
      for (i = 0; i < parsedData.project_need.length; i++) {
        $('#project_need').append('<li class="list-group-item">' + parsedData.project_need[i] + '</li>');
      }
    }
    $('#project_users').text('Count of users: ' + parsedData.project_users.length);
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
