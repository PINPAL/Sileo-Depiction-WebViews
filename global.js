
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

// Function to laod files
function loadFile(filename){
    if(window.XMLHttpRequest){xhttp=new XMLHttpRequest()}
    else{
        xhttp = new ActiveXObject("Microsoft.XMLHTTP")
    }
    xhttp.open("GET", filename, false);
    xhttp.send();
    return xhttp.responseText;
}

// Function to check image exists
function imageExists(image_url){
    var http = new XMLHttpRequest();
    http.open('HEAD', image_url, false);
    http.send();
    return http.status != 404;
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