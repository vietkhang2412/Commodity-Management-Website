$(document).ready(function () {
  $("#inputSearchProduct").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#tableBodyProduct tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });
});
