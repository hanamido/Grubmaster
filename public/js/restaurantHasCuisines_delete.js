// Delete a restaurant-cuisine
function deleteRestaurantCuisine(restaurantCuisineID) {
    let link = '/restaurant_has_cuisines/delete-restaurant-cuisine-ajax';
    // Put our data we want to send in a javascript object
    let data = {
        restaurant_cuisine_id: restaurantCuisineID
    }; 

    // Setup our AJAX request
    $.ajax({
        url: link, 
        type: 'DELETE', 
        data: JSON.stringify(data), 
        contentType: "application/json; charset=utf-8",
        success: function(result) {
            deleteRow(restaurantCuisineID); 
            alert(`Successfully Deleted Restaurant-Cuisine ID# ${restaurantCuisineID}`); 
        }
    }); 
};

function deleteRow(restaurantCuisineID) {
    let table = document.getElementById("restaurant-cuisines-table"); 
    for (let i=0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == restaurantCuisineID) {
            table.deleteRow(i);
            deleteDropDownMenu(restaurantCuisineID)
            break; 
        }
    }
}; 

function deleteDropDownMenu(restaurantCuisineID) {
    let selectMenu = document.getElementById("selectedRestaurantCuisine"); 
    for (let i = 0; i < selectMenu.length; i++) {
        if (Number(selectMenu.options[i].value) === Number(restaurantCuisineID)) {
            selectMenu[i].remove(); 
            break; 
        }
    }
};