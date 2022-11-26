// Get the objects we need to modify
let updateCuisineForm = document.getElementById('update-cuisine-form-ajax');

//Modify the objects we need
updateCuisineForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault(); 

    var error = document.getElementById("edit-cuisine-error")
    if (document.getElementById("update-cuisine-name").value === "") {
        error.textContent = "Please enter all required fields."
        error.style.color = "red"
    }  
    else {
        error.textContent = "";
    }

    // Get form fields we need to get data from
    let cuisineID = document.getElementById("selectedCuisine")
    let newCuisineName = document.getElementById("update-cuisine-name");

    // Get the values from the form fields
    let cuisineIdValue = cuisineID.value;
    let cuisineNameValue = newCuisineName.value;

    // Capture NULL values when possible
    if (cuisineNameValue.length === 0) {
        return; 
    }; 

    // Pull our data we want to send in a JS object
    let data = {
        cuisine_id: cuisineIdValue,
        cuisine_name: cuisineNameValue
    }

    // Setup AJAX request
    var xhttp = new XMLHttpRequest(); 
    xhttp.open("PUT", "/cuisines/put-cuisine-ajax", true); 
    xhttp.setRequestHeader("Content-type", "application/json"); 

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add the new data to the table
            console.log(data)
            updateCuisineRow(data, cuisineIdValue); 
            alert(`Successfully Updated Cuisine ID #${cuisineIdValue}`);

            // Clear input fields for another entry
            cuisineID.value='';
            newCuisineName.value='';

        } else if (xhttp.readyState == 4 && xhttp.status !== 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data)); 
}); 

function updateCuisineRow(data, cuisineID) {
    // let parsedData = JSON.parse(data); 
    // console.log(parsedData)
    let table = document.getElementById("cuisines-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        // iterate through rows 
        // rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") === cuisineID) {
            var counter = i; 
            let currentTable = document.getElementById("cuisines-table"); 
            
            // Get the location of the row where we found the matching restaurant ID
            let updateRowIndex = currentTable.getElementsByTagName("tr")[counter]; 

            let cuisineNameTd = updateRowIndex.getElementsByTagName("td")[1]; 
            cuisineNameTd.innerHTML = data.cuisine_name;
        }
    }
}; 