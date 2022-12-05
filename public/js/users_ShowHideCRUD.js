function showform(dowhat) {
    /*
    * four DIVS: browse (Read), Insert, Update, Delete
    */
    if (dowhat == 'insert'){
        document.getElementById('search-user').style.display = 'none';
        document.getElementById('browse-users').style.display = 'block';
        document.getElementById('add-user-form-ajax').style.display = 'block';
    }
    else if (dowhat == 'all'){
        document.getElementById('browse-users').style.display = 'block';
        document.getElementById('add-user-form-ajax').style.display = 'block';
        document.getElementById('search-user').style.display = 'block';
    }
    else if (dowhat == 'browse') { //by default display browse
        document.getElementById('search-user').style.display = 'block'; 
        document.getElementById('browse-users').style.display = 'block';
        document.getElementById('add-user-form-ajax').style.display = 'none';
    }
}
function searchUser() {showform('search'); }
function newUser() { showform('insert'); }
function browseUsers() { showform('browse'); }
function showAll() { showform('all'); }