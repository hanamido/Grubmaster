function showform(dowhat) {
    /*
    * four DIVS: browse (Read), Insert, Update, Delete
    */
    if (dowhat == 'insert'){
        document.getElementById('search-review').style.display = 'none';
        document.getElementById('browse-reviews').style.display = 'block';
        document.getElementById('add-review-form-ajax').style.display = 'block';
        document.getElementById('update-review-form-ajax').style.display = 'none';
    }
    else if (dowhat == 'update'){
        document.getElementById('browse-reviews').style.display = 'block';
        document.getElementById('add-review-form-ajax').style.display = 'none';
        document.getElementById('search-review').style.display = 'none';
        document.getElementById('update-review-form-ajax').style.display = 'block'; 
    }
    else if (dowhat == 'all'){
        document.getElementById('browse-reviews').style.display = 'block';
        document.getElementById('add-review-form-ajax').style.display = 'block';
        document.getElementById('search-review').style.display = 'block';
        document.getElementById('update-review-form-ajax').style.display = 'block'; 
    }
    else if (dowhat == 'browse') { //by default display browse
        document.getElementById('search-review').style.display = 'block'; 
        document.getElementById('browse-reviews').style.display = 'block';
        document.getElementById('add-review-form-ajax').style.display = 'none';
        document.getElementById('update-review-form-ajax').style.display = 'none'; 
    }
}
function searchReview() {showform('search'); }
function newReview() { showform('insert'); }
function browseReviews() { showform('browse'); }
function showAll() { showform('all'); }
function updateReview() {showform('update'); }