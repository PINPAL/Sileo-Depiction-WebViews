//Function to get variables from URL
function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return null;
}
// Detect prefers-color-scheme and set dark mode if enabled
// Run once on page load
if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  document.body.classList.add("darkMode");
}
// Function called by buttons that toggle dark mode on/off
function toggleDarkMode() {
  document.getElementsByTagName("html")[0].classList.toggle("darkMode");
}
