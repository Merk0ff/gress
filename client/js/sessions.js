$(document).ready(function(){
    var email,pass;
    $("#submit").click(function(){
        email=$("#myEmail").val();
        pass=$("#myPassword").val();
        /*
        * Perform some validation here.
        */
        $.post("/login",{email:email,pass:pass},function(data){
            windows.alert('Im here!'); // need to rewrite
            if(data==='done') {
                //just example
                //window.location.href="/admin";
                windows.alert('Done');
            }
        });
    });
});
