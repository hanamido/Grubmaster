// Get the objects we need to modify
let updateRestCuisineForm = document.getElementById('update-restaurant-cuisine-form-ajax');

//Modify the objects we need
updateRestCuisineForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault(); 

    // Get form fields we need to get data from
    let restaurantCuisineID = document.getElementById("selectedRestaurantCuisine")
    let newRestaurant = document.getElementById("update-rc-restaurant");
    let newCuisine = document.getElementById("update-rc-cuisine");  

    // Get the values from the form fields
    let restaurantCuisineIdValue = restaurantCuisineID.value;
    let restaurantValue = newRestaurant.value;
    let cuisineValue = newCuisine.value; 

    // Pull our data we want to send in a JS object
    let data = {
        restaurant_cuisine_id: restaurantCuisineIdValue,
        restaurant: restaurantValue, 
        cuisine: cuisineValue
    }

    // Setup AJAX request
    var xhttp = new XMLHttpRequest(); 
    xhttp.open("PUT", "/restaurant_has_cuisines/put-restaurant-cuisine-ajax", true); 
    xhttp.setRequestHeader("Content-type", "application/json"); 

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add the new data to the table
            console.log(xhttp.response)
            updateRows(xhttp.response, restaurantCuisineIdValue); 
            alert(`Successfully Updated Restaurant-Cuisine ID #${restaurantCuisineIdValue}`); 
            location.reload();

        } else if (xhttp.readyState == 4 && xhttp.status !== 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data)); 
}); 

function updateRows(data, restaurantCuisineID) {
    let table = document.getElementById("restaurant-cuisines-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        // iterate through rows 
        // rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") === restaurantCuisineID) {
            var counter = i; 
            let currentTable = document.getElementById("restaurant-cuisines-table"); 
            
            // Get the location of the row where we found the matching restaurant ID
            let updateRowIndex = currentTable.getElementsByTagName("tr")[counter]; 
            // Get td of restaurant name, website, email, and city
            let restaurantTd = updateRowIndex.getElementsByTagName("td")[1]; 
            restaurantTd.innerHTML = data.restaurant;
            
            let cuisineTd = updateRowIndex.getElementsByTagName("td")[2];
            cuisineTd.innerHTML = data.cuisine; 
        }
    }
};