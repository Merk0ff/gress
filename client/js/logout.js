$(document).ready(function() {
  $('#logout').click(function() {
    localStorage.clear();
    window.location.href = '/logout';
  });
});
