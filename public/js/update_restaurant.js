// Get the objects we need to modify
let updateRestaurantForm = document.getElementById('update-restaurant-form-ajax');

//Modify the objects we need
updateRestaurantForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault(); 

    // Get form fields we need to get data from
    let restaurantID = document.getElementById("selectedRestaurant")
    let newRestaurantName = document.getElementById("update-restaurant-name");
    let newRestaurantWebsite = document.getElementById("update-restaurant-website");  
    let newRestaurantEmail = document.getElementById("update-restaurant-email"); 
    let newRestaurantCity = document.getElementById("update-restaurant-city"); 

    // Get the values from the form fields
    let restaurantIdValue = restaurantID.value;
    let restaurantNameValue = newRestaurantName.value;
    let restaurantWebsiteValue = newRestaurantWebsite.value; 
    let restaurantEmailValue = newRestaurantEmail.value; 
    let restaurantCityValue = newRestaurantCity.value; 

    // Capture NULL values when possible
    if (restaurantNameValue.length === 0) {
        return; 
    }
    if (restaurantWebsiteValue.length === 0) {
        restaurantWebsiteValue = 'NULL'; 
    } else if (restaurantEmailValue.length === 0) {
        restaurantEmailValue = 'NULL'; 
    }; 

    // Pull our data we want to send in a JS object
    let data = {
        restaurant_id: restaurantIdValue,
        restaurant_name: restaurantNameValue, 
        restaurant_website: restaurantWebsiteValue,
        restaurant_email: restaurantEmailValue,
        city: restaurantCityValue
    }

    // Setup AJAX request
    var xhttp = new XMLHttpRequest(); 
    xhttp.open("PUT", "/restaurants/put-restaurant-ajax", true); 
    xhttp.setRequestHeader("Content-type", "application/json"); 

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add the new data to the table
            console.log(xhttp.response)
            updateRow(xhttp.response, restaurantIdValue); 
            updateRows(data, restaurantIdValue);

            // Clear input fields for another entry
            restaurantID.value='';
            newRestaurantName.value=''; 
            newRestaurantWebsite.value=''; 
            newRestaurantEmail.value='';
            newRestaurantCity.value=''; 

        } else if (xhttp.readyState == 4 && xhttp.status !== 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data)); 
}); 

function updateRow(data, restaurantID) {
    let parsedData = JSON.parse(data); 
    let table = document.getElementById("restaurants-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        // iterate through rows 
        // rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") === restaurantID) {
            var counter = i; 
            let currentTable = document.getElementById("restaurants-table"); 
            
            // Get the location of the row where we found the matching restaurant ID
            let updateRowIndex = currentTable.getElementsByTagName("tr")[counter]; 

            let restaurantCityTd = updateRowIndex.getElementsByTagName("td")[4]; 
            restaurantCityTd.innerHTML = parsedData[0].city_name;
        }
    }
}; 

function updateRows(data, restaurantID) {
    let table = document.getElementById("restaurants-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        // iterate through rows 
        // rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") === restaurantID) {
            var counter = i; 
            let currentTable = document.getElementById("restaurants-table"); 
            
            // Get the location of the row where we found the matching restaurant ID
            let updateRowIndex = currentTable.getElementsByTagName("tr")[counter]; 
            // Get td of restaurant name, website, email, and city
            let restaurantNameTd = updateRowIndex.getElementsByTagName("td")[1]; 
            restaurantNameTd.innerHTML = data.restaurant_name;
            
            let restWebsiteTd = updateRowIndex.getElementsByTagName("td")[2];
            restWebsiteTd.innerHTML = data.restaurant_website; 

            let restEmailTd = updateRowIndex.getElementsByTagName("td")[3];
            restEmailTd.innerHTML = data.restaurant_email;
        }
    }
};