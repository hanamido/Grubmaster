// Data Validation for required fields 
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
    }
    let checker = arr => arr.every(v => v === true); 
    if (checker(valid)) {
        alert(`Successfully added new ${entity}! Refreshing page...`);
    }
};