$(document).ready(function(){
    var email,pass;
    $("#submit").click(function(){
        email=$("#myEmail").val();
        pass=$("#myPassword").val();
        /*
        * Perform some validation here.
        */
        $.post("/login",{email:email,pass:pass},function(data){
            windows.alert('Im here!');
            if(data==='done') {
                window.location.href="/admin";
            }
        });
    });
});
