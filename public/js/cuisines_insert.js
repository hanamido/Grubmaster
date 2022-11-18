// Get objects we need to modify
let addCuisineForm = document.getElementById('add-cuisine-form-ajax'); 

// Modify the objects we need
addCuisineForm.addEventListener("submit", function (e) {
    e.preventDefault(); 

    var error = document.getElementById("add-cuisine-error")
    if (document.getElementById("input-cuisine-name").value === "") {
        error.textContent = "Please enter all required fields."
        error.style.color = "red";
        alert("Please enter all required fields.")
        location.reload();
    }  
    else {
        error.textContent = "";
    }

    // Get form fields we need data from
    let inputCuisineName = document.getElementById("input-cuisine-name");

    // Data validation
    if (inputCuisineName.value == "") {
        return;
    }

    // Get values from inside the form fields
    let cuisineNameValue = inputCuisineName.value;

    // Encapsulate data in JS object
    let data = {
        cuisine_name: cuisineNameValue, 
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest(); 
    xhttp.open('POST', '/cuisines/add-cuisine-ajax', true); 
    xhttp.setRequestHeader('Content-type', 'application/json'); 

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response); 
            alert("Successfully Added Cuisine!");
            location.reload();

            // Clear input fields for another entry
            inputCuisineName.value = ""; 
            
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
    let currentTable = document.getElementById("cuisines-table"); 

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get reference to new row from the db query (last object)
    let parsedData = JSON.parse(data); 
    let newRow = parsedData[parsedData.length - 1];

    // Create a new row and new cells for remaining data
    let row = document.createElement("TR"); 
    let idCell = document.createElement("TD");
    let cuisineNameCell = document.createElement("TD"); 

    // Fill the cells with the correct data
    idCell.innerText = newRow.cuisine_id; 
    cuisineNameCell.innerText = newRow.cuisine_name;

    // Add the cells to the row
    row.appendChild(idCell); 
    row.appendChild(cuisineNameCell); 

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.cuisine_id); 

    // Add the row to the table 
    currentTable.appendChild(row); 

    // Find dropdown menu, create new option, fill data in the option
    // let selectMenu = document.getElementById("selectedCity"); 
    // let option = document.createElement("option"); 
    // option.text = newRow.restaurant_name + newRow.restaurant_website + newRow.restaurant_email + newRow.city_id; 
    // option.value = newRow.restaurant_id;
    // selectMenu.add(option); 
};