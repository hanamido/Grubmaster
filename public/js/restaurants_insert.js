// Get objects we need to modify
let addRestaurantForm = document.getElementById('add-restaurant-form-ajax'); 

// Modify the objects we need
addRestaurantForm.addEventListener("submit", function (e) {
    e.preventDefault(); 

    // Get form fields we need data from
    let inputRestaurantName = document.getElementById("input-restaurant-name");
    let inputRestaurantWebsite = document.getElementById("input-restaurant-website");
    let inputRestaurantEmail = document.getElementById("input-restaurant-email");
    let inputRestaurantCity = document.getElementById("input-restaurant-city");

    var error = document.getElementById("add-rest-error")
    if (document.getElementById("input-restaurant-name").value === "") {
        error.textContent = "Please enter all required fields."
        error.style.color = "red"
        alert("Please enter all required fields.")
        location.reload();
    }  if (isNaN(document.getElementById("input-restaurant-city").value)) {
        error.textContent = "Please enter all required fields."
        error.style.color = "red"
    }
    else {
        error.textContent = "";
    };

    // Data validation
    if (inputRestaurantName.value == "") {
        return;
    }
    if (isNaN(inputRestaurantCity.value)) {
        return;
    }

    // Get values from inside the form fields
    let restaurantNameValue = inputRestaurantName.value;
    let restaurantWebsiteValue = inputRestaurantWebsite.value; 
    let restaurantEmailValue = inputRestaurantEmail.value; 
    let restaurantCityValue = inputRestaurantCity.value; 

    // Encapsulate data in JS object
    let data = {
        restaurant_name: restaurantNameValue, 
        restaurant_website: restaurantWebsiteValue, 
        restaurant_email: restaurantEmailValue, 
        city: restaurantCityValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest(); 
    xhttp.open('POST', '/restaurants/add-restaurant-ajax', true); 
    xhttp.setRequestHeader('Content-type', 'application/json'); 

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response); 
            alert("Successfully Added Restaurant!")
            location.reload();

            // Clear input fields for another entry
            inputRestaurantName.value=''; 
            inputRestaurantWebsite.value=''; 
            inputRestaurantEmail.value='';
            inputRestaurantCity.value=''; 

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
    let currentTable = document.getElementById("restaurants-table"); 

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get reference to new row from the db query (last object)
    let parsedData = JSON.parse(data); 
    let newRow = parsedData[parsedData.length - 1];

    // Create a new row and new cells for remaining data
    let row = document.createElement("TR"); 
    let idCell = document.createElement("TD");
    let restaurantNameCell = document.createElement("TD"); 
    let restaurantWebsiteCell = document.createElement("TD"); 
    let restaurantEmailCell = document.createElement("TD"); 
    let restaurantCityCell = document.createElement("TD"); 

    let deleteCell = document.createElement("TD")

    // Fill the cells with the correct data
    idCell.innerText = newRow.restaurant_id; 
    restaurantNameCell.innerText = newRow.restaurant_name;
    restaurantWebsiteCell.innerText = newRow.restaurant_website; 
    restaurantEmailCell.innerText = newRow.restaurant_email;
    restaurantCityCell.innerText = newRow.city;  

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete"; 
    deleteCell.onClick = function() {
        deleteRestaurant(newRow.restaurant_id); 
    }; 

    // Add the cells to the row
    row.appendChild(idCell); 
    row.appendChild(restaurantNameCell); 
    row.appendChild(restaurantWebsiteCell);
    row.appendChild(restaurantEmailCell);
    row.appendChild(restaurantCityCell); 

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.restaurant_id); 

    // Add the row to the table 
    currentTable.appendChild(row); 

    // Find dropdown menu, create new option, fill data in the option
    // let selectMenu = document.getElementById("selectedRestaurant"); 
    // let option = document.createElement("option"); 
    // option.text = newRow.restaurant_name + newRow.restaurant_website + newRow.restaurant_email + newRow.city_id; 
    // option.value = newRow.restaurant_id;
    // selectMenu.add(option); 
};