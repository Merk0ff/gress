function ShowByClickOn(cb, ct) {
  if ($('#'+cb).prop('checked')) $('#'+ct).show();
  else $('#'+ct).hide();
}

/**
 *
 * @param cb
 * @param ct
 * @constructor
 */
function HideByClickOn(cb, ct) {
  if ($('#'+cb).prop('checked')) $('#'+ct).hide();
  else $('#'+ct).show();
}

/* $(function(){
    $("#InvestorBlock").on("click", function(){
        $("#StuButtons").hide();
    });
});*/

