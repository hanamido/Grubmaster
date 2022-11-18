// Get objects we need to modify
let addRestCuisineForm = document.getElementById('add-restaurant-cuisine-form-ajax'); 

// Modify the objects we need
addRestCuisineForm.addEventListener("submit", function (e) {
    e.preventDefault(); 

    // Get form fields we need data from
    let inputRestaurant = document.getElementById("input-rc-restaurant");
    let inputCuisine = document.getElementById("input-rc-cuisine");

    // Get values from inside the form fields
    let restaurantValue = inputRestaurant.value;
    let cuisineValue = inputCuisine.value; 

    // Encapsulate data in JS object
    let data = {
        restaurant: restaurantValue, 
        cuisine: cuisineValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest(); 
    xhttp.open('POST', '/restaurant_has_cuisines/add-restaurant-cuisine-ajax', true); 
    xhttp.setRequestHeader('Content-type', 'application/json'); 

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response); 
            alert("Successfully Added Restaurant-Cuisine Association!")
            location.reload();

        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }
    // Send request and wait for response
    xhttp.send(JSON.stringify(data)); 
}); 

// Creates a single row from an Object representing a single record
addRowToTable = (data) => {
    // Get a reference to the current table on the page and clear it out. 
    let currentTable = document.getElementById("restaurant-cuisines-table"); 

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get reference to new row from the db query (last object)
    let parsedData = JSON.parse(data); 
    let newRow = parsedData[parsedData.length - 1];

    // Create a new row and new cells for remaining data
    let row = document.createElement("TR"); 
    let idCell = document.createElement("TD");
    let restaurantCell = document.createElement("TD"); 
    let cuisineCell = document.createElement("TD"); 

    let deleteCell = document.createElement("TD")

    // Fill the cells with the correct data
    idCell.innerText = newRow.restaurant_cuisine_id; 
    restaurantCell.innerText = newRow.restaurant;
    cuisineCell.innerText = newRow.cuisine; 

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete"; 
    deleteCell.onClick = function() {
        deleteRestaurantCuisine(newRow.restaurant_cuisine_id); 
    }; 

    // Add the cells to the row
    row.appendChild(idCell); 
    row.appendChild(restaurantCell); 
    row.appendChild(cuisineCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.restaurant__cuisine_id); 

    // Add the row to the table 
    currentTable.appendChild(row); 

    // Find dropdown menu, create new option, fill data in the option
    // let selectMenu = document.getElementById("selectedRestaurant"); 
    // let option = document.createElement("option"); 
    // option.text = newRow.restaurant_name + newRow.restaurant_website + newRow.restaurant_email + newRow.city_id; 
    // option.value = newRow.restaurant_id;
    // selectMenu.add(option); 
};