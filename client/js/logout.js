$(document).ready(function(){
    $("#logout").click(function(){
        $.get("/logout");
    });
});