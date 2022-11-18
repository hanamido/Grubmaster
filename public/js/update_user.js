// Update User
// Get the objects we need to modify
let updateUserForm = document.getElementById('update-user-form-ajax');

// Modify the objects we need
updateUserForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let selectedUserId = document.getElementById("selected_user_id");
    let updateFirstName = document.getElementById("update_first_name");
    let updateLastName = document.getElementById("update_last_name");
    let updateEmailAddress = document.getElementById("update_email_address");
    let updateCity = document.getElementById("update_city");

    let test = document.getElementById()

    // Get the values from the form fields
    let userIdValue = selectedUserId.value;
    let firstNameValue = updateFirstName.value;
    let lastNameValue = updateLastName.value;
    let emailAddressValue = updateEmailAddress.value;
    let cityValue = updateCity.value;

    // Capture NULL values when possible
    if (firstNameValue.length === 0) {
        // set firstNameValue equal to current name for the this userId 
    }

    // currently the database table for Users does not allow updating values to NULL
    // so we must abort if being passed NULL for Cities -- check on other values

    // Put our data we want to send in a javascript object
    let data = {
        user_id: userIdValue,
        user_first_name: firstNameValue,
        user_last_name: lastNameValue,
        user_email: emailAddressValue,
        user_city_id: cityValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-user-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, userIdValue);
            location.reload();
            alert("Succesfully Updated User!");

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})

function updateRow(data, selected_user_id){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("users-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == selected_user_id) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of homeworld value
            let td = updateRowIndex.getElementsByTagName("td")[4];

            // Reassign homeworld to our value we updated to
            td.innerHTML = parsedData[0].city_name; 
       }
    }
}