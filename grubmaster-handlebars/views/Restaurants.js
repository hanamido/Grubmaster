
    $(document).ready(function(){
      $("#searchRestaurantInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#restaurants tr").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });