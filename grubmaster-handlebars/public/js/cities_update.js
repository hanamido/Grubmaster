// Get the objects we need to modify
let updateCityForm = document.getElementById('update-city-form-ajax');

//Modify the objects we need
updateCityForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault(); 

    var error = document.getElementById("edit-city-error")
    if (document.getElementById("update-city-name").value === "") {
        error.textContent = "Please enter all required fields."
        error.style.color = "red"
    }  
    else {
        error.textContent = "";
    }

    // Get form fields we need to get data from
    let cityID = document.getElementById("selectedCity")
    let newCityName = document.getElementById("update-city-name");

    // Get the values from the form fields
    let cityIdValue = cityID.value;
    let cityNameValue = newCityName.value;

    // Capture NULL values when possible
    if (cityNameValue.length === 0) {
        return; 
    }; 

    // Pull our data we want to send in a JS object
    let data = {
        city_id: cityIdValue,
        city_name: cityNameValue
    }

    // Setup AJAX request
    var xhttp = new XMLHttpRequest(); 
    xhttp.open("PUT", "/cities/put-city-ajax", true); 
    xhttp.setRequestHeader("Content-type", "application/json"); 

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add the new data to the table
            console.log(data)
            updateCityRow(data, cityIdValue); 
            alert(`Successfully Updated City ID #${cityIdValue}`);

            // Clear input fields for another entry
            cityID.value='';
            newCityName.value='';

        } else if (xhttp.readyState == 4 && xhttp.status !== 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data)); 
}); 

function updateCityRow(data, cityID) {
    // let parsedData = JSON.parse(data); 
    // console.log(parsedData)
    let table = document.getElementById("cities-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        // iterate through rows 
        // rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") === cityID) {
            var counter = i; 
            let currentTable = document.getElementById("cities-table"); 
            
            // Get the location of the row where we found the matching restaurant ID
            let updateRowIndex = currentTable.getElementsByTagName("tr")[counter]; 

            let cityNameTd = updateRowIndex.getElementsByTagName("td")[1]; 
            cityNameTd.innerHTML = data.city_name;
        }
    }
}; 