/**
 * FIRST VERSION. IT WILL BE REWRITTEN
 *
 * Function that send email and password
 * to the server by post request
 *
 * @param {Object} jQuery. -- ???
 */
$(document).ready(function(){
    var email,pass;
    $("#submit").click(function(){
        console.log('Enter submit');
        email=$("#myEmail").val();
        pass=$("#myPassword").val();

        /*$.ajax({
            type: 'POST',
            url: '/login',
            data: {email:email, pass:pass},
            success: function(data) {
                window.alert('Im here!'); // need to rewrite
                if(data==='done') {
                    //just example
                    //window.location.href="/admin";
                    window.alert('Done');
                }
            },
        }); */

        $.post("/login",{email:email,pass:pass},function(data){
            window.alert('Im here!'); // line for debug
            if(data==='done') {
                //just example
                //window.location.href="/admin";
                window.alert('Done');
            }
        });
    });
});