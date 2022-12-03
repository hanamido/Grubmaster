function showform(dowhat) {
    /*
    * four DIVS: browse (Read), Insert, Update, Delete
    */
    if (dowhat == 'insert'){
        document.getElementById('search-person-html').style.display = 'block';
        document.getElementById('browse-users').style.display = 'block';
        document.getElementById('add-user-form-ajax').style.display = 'block';
        document.getElementById('update-user').style.display = 'none';
    }
    else if (dowhat == 'update'){
        document.getElementById('browse-users').style.display = 'block';
        document.getElementById('add-user-form-ajax').style.display = 'none';
        document.getElementById('search-person-html').style.display = 'block';
        document.getElementById('update-user').style.display = 'block'; 
    }
    else if (dowhat == 'all'){
        document.getElementById('browse-users').style.display = 'block';
        document.getElementById('add-user-form-ajax').style.display = 'block';
        document.getElementById('search-person-html').style.display = 'block';
        document.getElementById('update-user').style.display = 'block'; 
    }
    else if (dowhat == 'browse') { //by default display browse
        document.getElementById('search-person-html').style.display = 'block'; 
        document.getElementById('browse-users').style.display = 'block';
        document.getElementById('add-user-form-ajax').style.display = 'none';
        document.getElementById('update-user').style.display = 'none'; 
    }
}
function searchUser() {showform('search'); }
function newUser() { showform('insert'); }
function browseUsers() { showform('browse'); }
function showAll() { showform('all'); }
function updateUser() {showform('update'); }