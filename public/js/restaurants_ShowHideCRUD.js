function showform(dowhat) {
    /*
    * four DIVS: browse (Read), Insert, Update, Delete
    */
    if (dowhat == 'insert'){
        document.getElementById('search-restaurant').style.display = 'none';
        document.getElementById('browse-restaurants').style.display = 'block';
        document.getElementById('add-restaurant').style.display = 'block';
    }
    else if (dowhat == 'all'){
        document.getElementById('browse-restaurants').style.display = 'block';
        document.getElementById('add-restaurant').style.display = 'block';
        document.getElementById('search-restaurant').style.display = 'block'; 
    }
    else if (dowhat == 'browse') { //by default display browse
        document.getElementById('search-restaurant').style.display = 'block'; 
        document.getElementById('browse-restaurants').style.display = 'block';
        document.getElementById('add-restaurant').style.display = 'none';
    }
}
function searchRestaurant() {showform('search'); }
function newRestaurant() { showform('insert'); }
function browseRestaurants() { showform('browse'); }
function showAll() { showform('all'); }