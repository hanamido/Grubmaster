// Source for scroll to specific div on page: https://stackoverflow.com/questions/18071046/smooth-scroll-to-specific-div-on-click
function scrollToForm(formID) {
    var elmntToView = document.getElementById(formID);
    elmntToView.scrollIntoView({behavior: "smooth"}); 
}