// Add user
// Get the objects we need to modify
let addUserForm = document.getElementById('add-user-form-ajax');

// Modify the objects we need
addUserForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputFirstName = document.getElementById("first_name");
    let inputLastName = document.getElementById("last_name");
    let inputEmailAddress = document.getElementById("email_address");
    let inputCity = document.getElementById("city");

    // Get the values from the form fields
    let firstNameValue = inputFirstName.value;
    let lastNameValue = inputLastName.value;
    let emailAddressValue = inputEmailAddress.value;
    let cityValue = inputCity.value;

    // Capture allowed null value
    if (emailAddressValue.length === 0) {
        emailAddressValue = 'NULL'; 
    }

    // Put our data we want to send in a javascript object
    let data = {
        user_first_name: firstNameValue,
        user_last_name: lastNameValue,
        user_email: emailAddressValue,
        user_city_id: cityValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-user-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);
            location.reload();
            alert("Succesfully Added User!");

            // Clear the input fields for another transaction
            inputFirstName.value = '';
            inputLastName.value = '';
            inputEmailAddress.value = '';
            inputCity.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})

// Creates a single row from an Object representing a single record from 
// Users
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("users-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let firstNameCell = document.createElement("TD");
    let lastNameCell = document.createElement("TD");
    let emailAddressCell = document.createElement("TD");
    let cityCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.user_id;
    firstNameCell.innerText = newRow.user_first_name;
    lastNameCell.innerText = newRow.user_last_name;
    emailAddressCell.innerText = newRow.user_email;
    cityCell.innerText = newRow.address_city;

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(firstNameCell);
    row.appendChild(lastNameCell);
    row.appendChild(emailAddressCell);
    row.appendChild(cityCell);
    
    // Add the row to the table
    currentTable.appendChild(row);
}