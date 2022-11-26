function showform(dowhat) {
    /*
    * four DIVS: browse (Read), Insert, Update, Delete
    */
    if (dowhat == 'insert'){
        document.getElementById('search-restaurant-cuisine').style.display = 'none';
        document.getElementById('browse-restaurant-cuisines').style.display = 'block';
        document.getElementById('add-restaurant-cuisine').style.display = 'block';
    }
    else if (dowhat == 'all'){
        document.getElementById('search-restaurant-cuisine').style.display = 'block';
        document.getElementById('browse-restaurant-cuisines').style.display = 'block';
        document.getElementById('add-restaurant-cuisine').style.display = 'block';
    }
    else if (dowhat == 'browse') { //by default display browse
        document.getElementById('search-restaurant-cuisine').style.display = 'block'; 
        document.getElementById('browse-restaurant-cuisines').style.display = 'block';
        document.getElementById('add-restaurant-cuisine').style.display = 'none';
    }
}

function browseRestaurantCuisines() { showform('browse'); }
function searchRestaurantCuisine() {showform('search'); }
function newRestaurantCuisine() { showform('insert'); }
function showAll() { showform('all'); }