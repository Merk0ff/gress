$(document).ready(function() {
  let email; let pass;

  $('#submit').click(function() {
    email = $('#myEmail').val();
    pass = $('#myPassword').val();
    $.ajax({
      type: 'POST',
      url: '/login',
      data: {email: email, pass: pass},
      success: function(data) {
        if (data != '') {
          // just example
          localStorage.setItem('user', JSON.stringify(data));
          window.location.href = '/';
        } else {
          localStorage.setItem('user', JSON.stringify(''));
          alert('Log in error');
        }
      },
    });
  });
});
