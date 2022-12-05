// Get the objects we need to modify
let updateReviewForm = document.getElementById('update-review-form-ajax');

//Modify the objects we need
updateReviewForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault(); 

    // Get form fields we need to get data from
    let reviewId = document.getElementById("selected_review_id")
    let updatedRestaurantRating = document.getElementById("updated_restaurant_rating");

    // Get the values from the form fields
    let reviewIdValue = reviewId.value;
    let updatedRestaurantRatingValue = updatedRestaurantRating.value;

    // Pull our data we want to send in a JS object
    let data = {
        review_id: reviewIdValue,
        updated_restaurant_rating: updatedRestaurantRatingValue, 
    }

    // Setup AJAX request
    var xhttp = new XMLHttpRequest(); 
    xhttp.open("PUT", "/put-review-ajax", true); 
    xhttp.setRequestHeader("Content-type", "application/json"); 

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            console.log('test');
            // Add the new data to the table
            updateRow(xhttp.response, reviewIdValue);
            location.reload(forcedReload);
            alert("Succesfully Updated Review!");

            // Clear input fields for another entry
            //reviewId.value='';
            //updatedRestaurantRating.value=''; 

        } else if (xhttp.readyState == 4 && xhttp.status !== 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data)); 
}); 

function updateRow(data, reviewIdValue) {
    let parsedData = JSON.parse(data); 

    let table = document.getElementById("reviews-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        // iterate through rows 
        // rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") === reviewIdValue) {
            var counter = i; 
            let currentTable = document.getElementById("reviews-table"); 
            
            // Get the location of the row where we found the matching restaurant ID
            let updateRowIndex = currentTable.getElementsByTagName("tr")[counter]; 

            let reviewRatingTd = updateRowIndex.getElementsByTagName("td")[2]; 
            reviewRatingTd.innerHTML = data.updated_restaurant_rating;
        }
    }
}; 