function showform(dowhat) {
    /*
    * four DIVS: browse (Read), Insert, Update, Delete
    */
    if (dowhat == 'insert'){
        document.getElementById('search-restaurant').style.display = 'none';
        document.getElementById('browse-restaurants').style.display = 'block';
        document.getElementById('add-restaurant').style.display = 'block';
        document.getElementById('update-restaurant').style.display = 'none';
    }
    else if (dowhat == 'update'){
        document.getElementById('search-restaurant').style.display = 'none';
        document.getElementById('browse-restaurants').style.display = 'block';
        document.getElementById('add-restaurant').style.display = 'none';
        document.getElementById('update-restaurant').style.display = 'block';
    }
    // else if (dowhat == 'delete-restaurant'){
    //     document.getElementById('browse').style.display = 'none';
    //     document.getElementById('insert').style.display = 'none';
    //     document.getElementById('update').style.display = 'none';
    //     document.getElementById('delete').style.display = 'block';
    // }
    else if (dowhat == 'all'){
        document.getElementById('browse-restaurants').style.display = 'block';
        document.getElementById('add-restaurant').style.display = 'block';
        document.getElementById('update-restaurant').style.display = 'block';
    }
    else if (dowhat == 'browse') { //by default display browse
        document.getElementById('search-restaurant').style.display = 'block'; 
        document.getElementById('browse-restaurants').style.display = 'block';
        document.getElementById('add-restaurant').style.display = 'none';
        document.getElementById('update-restaurant').style.display = 'none';
    }
}
function searchRestaurant() {showform('search'); }
function newRestaurant() { showform('insert'); }
function updateRestaurant(restaurant_id) { 
    showform('update'); 
    updateRestaurantEntry(restaurant_id);
}; 
function browseRestaurants() { showform('browse'); }
function showAll() { showform('all'); }


function updateRestaurantEntry(restaurantID) {
    let table = document.getElementById("restaurants-table"); 
    for (let i = 0, row; row = table.rows[i]; i++) {
        // iterate through rows 
        // rows would be accessed using the "row" variable assigned in the for loop
        if (row.getAttribute("data-value") === restaurantID) {
            var counter = i; 
            let currentTable = document.getElementById("restaurants-table"); 
            let updateRestName = document.getElementById("update-restaurant-name");
            let updateRestWebsite = document.getElementById("update-restaurant-website"); 
            let updateRestEmail = document.getElementById("update-restaurant-email"); 
                
            // Get the location of the row where we found the matching restaurant ID
            let updateRowIndex = table.getElementsByTagName("tr")[counter]; 

            let restaurantNameTd = updateRowIndex.getElementsByTagName("td")[1]; 
            updateRestName.value = restaurantNameTd;  
                
            let restWebsiteTd = updateRowIndex.getElementsByTagName("td")[2];
            updateRestWebsite.value = restWebsiteTd; 

            let restEmailTd = updateRowIndex.getElementsByTagName("td")[3];
            updateRestEmail.value = restEmailTd
        }
    }
}; 