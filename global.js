
//Function to get variables from URL
function getQueryVariable(variable) {
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(null);
}

// Function to load files (async) (bypass cross-origin [CORS] errors)
async function corsBypass(URL) {
    function getData(URL) {
        return fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(URL)}`)
                            .then(response => {
                            if (response.ok) return response.json()
                            throw new Error('Network response was not ok.')
                            })
    }
    var data = await getData(URL)
    data = data.contents
    return data
}

//Function to set cookie
function setCookie(name,value) {
    var expires = "";
    var date = new Date();
    date.setTime(date.getTime() + 999999999);
    expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

//Function to get cookie
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

//Function to enable/disable Dark Mode
function toggleDarkMode(enable) {
    //Check Browser is not IE
    if (navigator.userAgent.indexOf("Trident") < 0) {
        if (enable) {
            document.getElementsByTagName('html')[0].style.setProperty("--bg-color", "#282828")
            document.getElementsByTagName('html')[0].style.setProperty("--bg-opacity-color", "rgba(35,35,35,.9)")
            document.getElementsByTagName('html')[0].style.setProperty("--text-color", "#FFFFFF")
            document.getElementsByTagName('html')[0].style.setProperty("--navbar-bg-color", "#1E1E1E")
            document.getElementsByTagName('html')[0].style.setProperty("--border-color", "#303030")
        } else {
            document.getElementsByTagName('html')[0].style.setProperty("--bg-color", "#FFFFFF")
            document.getElementsByTagName('html')[0].style.setProperty("--bg-opacity-color", "rgba(255,255,255,.9)")
            document.getElementsByTagName('html')[0].style.setProperty("--text-color", "#000000")
            document.getElementsByTagName('html')[0].style.setProperty("--navbar-bg-color", "#FEFEFE")
            document.getElementsByTagName('html')[0].style.setProperty("--border-color", "#c5c5c5")
        }
    } else {
        alert("Sorry Internet Explorer does not support this feature!")
    }
}