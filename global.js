
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