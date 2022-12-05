// Citation: Function to validate that all required fields are entered in a form 
// Date: 12/01/2022
// Adapted from: 
// Source: https://stackoverflow.com/questions/57087145/check-if-all-required-fields-are-filled-in-a-specific-div 
// Checks if every required field is filled out before sending alert
function validateAddForm(formID) {
    let requiredFields = document.getElementById(formID)
        .querySelectorAll('[required]')
    let valid = []; 
    requiredFields.forEach((element) => {
        if (element.value !== "") {
            valid.push(true)
        } else {valid.push(false)}
    })
    let entity; 
    if (formID.includes('restaurant-cuisine')) {
        entity = 'restaurant-cuisine pair'
    } if (formID.includes('restaurant')) {
        entity = 'restaurant'
    } if (formID.includes('city')) {
        entity = 'city'
    } if (formID.includes('cuisine')) {
        entity = 'cuisine'
    } if (formID.includes('user')) {
        entity = 'user'
    } if (formID.includes('review')) {
        entity = 'review'
    }

    // Citation Scope: Line to check if all values in an array are true
    // Date: 11/23/2022
    // Adapted from: 
    // Source: https://bobbyhadz.com/blog/javascript-check-if-all-array-values-true#:~:text=To%20check%20if%20all%20of,met%20for%20all%20array%20elements.&text=Copied!
    let checker = arr => arr.every(v => v === true); 
    if (checker(valid)) {
        alert(`Successfully added new ${entity}! Refreshing page...`);
    }
};