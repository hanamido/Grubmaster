// Add review
// Get the objects we need to modify
let addReviewForm = document.getElementById('add-review-form-ajax');

// Modify the objects we need
addReviewForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let reviewRestaurantId = document.getElementById("review_restaurant_id");
    let reviewRestaurantRating = document.getElementById("review_restaurant_rating");
    let reviewUserId = document.getElementById("review_user_id");

    // Get the values from the form fields
    let reviewRestaurantIdValue = reviewRestaurantId.value;
    let reviewRestaurantRatingValue = reviewRestaurantRating.value;
    let reviewUserIdValue = reviewUserId.value;

    // Put our data we want to send in a javascript object
    let data = {
        review_restaurant_id: reviewRestaurantIdValue,
        review_restaurant_rating: reviewRestaurantRatingValue,
        review_user_id: reviewUserIdValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-review-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);
            location.reload();
            alert("Succesfully Added Review!");

            // Clear the input fields for another transaction
            reviewRestaurantId.value = '';
            reviewRestaurantRating.value = '';
            reviewUserId.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})

// Creates a single row from an Object representing a single record from 
// Reviews
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("reviews-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1];

    // Create a row
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let restaurantCell = document.createElement("TD");
    let ratingCell = document.createElement("TD");
    let dateCell = document.createElement("TD");
    let userCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.review_id;
    restaurantCell.innerText = newRow.review_restaurant_name;
    ratingCell.innerText = newRow.review_rating;
    dateCell.innerText = newRow.review_date;
    userCell.innerText = newRow.review_user;

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(restaurantCell);
    row.appendChild(ratingCell);
    row.appendChild(dateCell);
    row.appendChild(userCell);
    
    // Add the row to the table
    currentTable.appendChild(row); //
    
}