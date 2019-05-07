function ShowByClickOn(cb, ct) {
    if ($('#'+cb).prop("checked")) $('#'+ct).show();
    else $('#'+ct).hide();
}

function HideByClickOn(cb, ct) {
    if ($('#'+cb).prop("checked")) $('#'+ct).hide();
    else $('#'+ct).show();
}

/*$(function(){
    $("#InvestorBlock").on("click", function(){
        $("#StuButtons").hide();
    });
});*/

