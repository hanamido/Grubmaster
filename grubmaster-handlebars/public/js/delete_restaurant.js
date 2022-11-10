function deleteRestaurant(restaurantID) {
    let link = '/delete-restaurant-ajax';
    let data = {
        restaurant_id: restaurantID
    }; 

    $.ajax({
        url: link, 
        type: 'DELETE', 
        data: JSON.stringify(data), 
        contentType: "application/json; charset=utf-8",
        success: function(result) {
            deleteRow(restaurantID); 
        }
    }); 
};

function deleteRow(restaurantID) {
    let table = document.getElementById("restaurants-table"); 
    for (let i=0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == restaurantID) {
            table.deleteRow(i);
            deleteDropDownMenu(restaurantID)
            break; 
        }
    }
}; 

function deleteDropDownMenu(restaurantID) {
    let selectMenu = document.getElementById("selectedRestaurant"); 
    for (let i = 0; i < selectMenu.length; i++) {
        if (Number(selectMenu.options[i].value) === Number(restaurantID)) {
            selectMenu[i].remove(); 
            break; 
        }
    }
};