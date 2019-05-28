/**
 * FIRST VERSION. IT WILL BE REWRITTEN
 *
 * Function that send info about new profile
 * to the server by post request
 *
 * @param {Object} jQuery. -- ???
 */

$(document).ready(function() {
  let investorBool;
  let firstName; let lastName;
  let email; let pass;
  let phoneNum;
  let education;
  let links;

  $('#submit').click(function() {
    investorBool = $('#InvestorBlock').is(':checked'); // Dunno is it gonna work
    firstName = $('#FirstNameBlock').val();
    lastName = $('#LastNameBlock').val();
    email = $('#EmailBlock').val();
    pass = $('#PasswordBlock').val();
    phoneNum = $('#Phone').val();
    education = $('#InlineFormCustomSelectPref').val(); // Dunno is it gonna work
    links = $('#Portfolio').val();

    $.ajax({
      type: 'POST',
      url: '/signup',
      data: {investor: investorBool, name: firstName,
        surname: lastName, email: email, pass: pass,
        phone: phoneNum, education: education,
        links: links},
      success: function(data) {
        window.alert('Im here!'); // need to rewrite
        if (data != '') {
          // just example
          localStorage.setItem('user', JSON.stringify(data));
          window.location.href = '/';
        } else {
          localStorage.setItem('user', JSON.stringify(''));
          alert('Sign in error');
        }
      },
    });
  });
});
