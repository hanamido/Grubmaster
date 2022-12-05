// Citation Scope: Function to scroll to specific div on page
// Date: 12/01/2022
// Copied from:
// Source: https://stackoverflow.com/questions/18071046/smooth-scroll-to-specific-div-on-click
function scrollToForm(formID) {
    var elmntToView = document.getElementById(formID);
    elmntToView.scrollIntoView({behavior: "smooth"}); 
}