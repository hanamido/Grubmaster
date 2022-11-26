function showform(dowhat) {
    /*
    * four DIVS: browse (Read), Insert, Update, Delete
    */
    if (dowhat == 'insert'){
        document.getElementById('search-cuisine').style.display = 'none';
        document.getElementById('browse-cuisines').style.display = 'block';
        document.getElementById('add-cuisine').style.display = 'block';
    }
    else if (dowhat == 'all'){
        document.getElementById('search-cuisine').style.display = 'block';
        document.getElementById('browse-cuisines').style.display = 'block';
        document.getElementById('add-cuisine').style.display = 'block';
    }
    else if (dowhat == 'browse') { //by default display browse
        document.getElementById('search-cuisine').style.display = 'block';
        document.getElementById('browse-cuisines').style.display = 'block';
        document.getElementById('add-cuisine').style.display = 'none';
    }
}
function searchCuisine() {showform('search'); }
function newCuisine() { showform('insert'); }
function browseCuisines() { showform('browse'); }
function showAll() { showform('all'); }
