$(document).ready(function() {
  let email; let pass;
  $('#submit').click(function() {
    email=$('#myEmail').val();
    pass=$('#myPassword').val();
    /*
        * Perform some validation here.
        */
    $.post('/login', {email: email, pass: pass}, function(data) {
      if (data==='done') {
        window.location.href='/admin';
      }
    });
  });
});
