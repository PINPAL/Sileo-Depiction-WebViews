//Function to laod files
function loadFile(filename){
    if(window.XMLHttpRequest){xhttp=new XMLHttpRequest()}
    else{
        xhttp = new ActiveXObject("Microsoft.XMLHTTP")
    }
    xhttp.open("GET", filename, false);
    xhttp.send();
    return xhttp.responseText;
}
//Get Info from URL
var tweakPrice = window.location.search.substring(1).split("-")[2]
//Load Sileo JSON File
var config = JSON.parse(loadFile("/packages/" + window.location.search.substring(1).split("-")[0].toLowerCase() + "/config.json"))
//Set Background Color
if (config.hasOwnProperty('backgroundColor')) {
    document.getElementsByTagName('html')[0].style.setProperty("--bg-color",config.backgroundColor)
}
//Set Tint Color
if (config.hasOwnProperty('tintColor')) {
    document.getElementsByTagName('html')[0].style.setProperty("--tint-color",config.tintColor)
}
//Set Banner Image
if (config.hasOwnProperty('headerImage')) {
    document.getElementById("bannerImage").style.backgroundImage = "url(" + config.headerImage + ")"
    document.getElementById("bannerImage").style.filter = "brightness(0.5)";
    document.getElementById("bannerImage").style.webkitFilter = "brightness(0.5)";
}

//Generate Tabs
for (currentTab=0; currentTab<config.tabs.length; currentTab++) {
    //Create Pill Selectors at Top
    var pillText = document.createElement("div")
    pillText.className = "pillText"
    pillText.id = config.tabs[currentTab].tabname + "Button"
    pillText.innerText = config.tabs[currentTab].tabname
    pillText.setAttribute("onclick","changePillSelector(this)")
    pillText.style.left = (50 / config.tabs.length) * (2 * currentTab + 1) + "%"
    document.getElementsByClassName("headerPillSelector")[0].appendChild(pillText)
    //Create Tab for Content to Go In
    var tabContent = document.createElement("div")
    tabContent.className = "tabContent"
    tabContent.id = config.tabs[currentTab].tabname + "Content"
    //Add Content Views to Tab
    for (currentViewNum=0; currentViewNum < config.tabs[currentTab].views.length; currentViewNum++) {
        var view = handleView(config.tabs[currentTab].views[currentViewNum],false)
        tabContent.appendChild(view)
    }
    //Handle Landscape Oreintation of StackViews
    var landscapeOrientationObjects = document.getElementsByClassName("landscapeOrientation")
    //Loop Every Single Landscape StackView
    for (i=0; i<landscapeOrientationObjects.length; i++) {
        //Loop Every Child View within the StackView
        for (j=0; j<landscapeOrientationObjects[i].childNodes.length; j++) {
            landscapeOrientationObjects[i].childNodes[j].style.display = "inline-block"
            landscapeOrientationObjects[i].childNodes[j].style.width = "50%"
        }
    }
    document.getElementById("mainWrapper").appendChild(tabContent)
}
//Set Navbar Tweak Icon
document.getElementById("navbarTweakIcon").style.backgroundImage = "url(/packages/" + window.location.search.substring(1).split("-")[0] + "/icon.png)"
//Set Price Buttons
for (i=0; i<document.getElementsByClassName("priceButton").length;i++) {
    if (/[+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*)(?:[eE][+-]?\d+)?/.test(tweakPrice)) {
        document.getElementsByClassName("priceButton")[i].innerText = "$" + tweakPrice
    }
}
//Set Tweak Name
document.getElementById("tweakName").innerText = window.location.search.substring(1).split("-")[0]
//Set Developer Name
document.getElementById("developerName").innerText = window.location.search.substring(1).split("-")[1]
//Set Tweak Icon
document.getElementById("tweakIcon").style.backgroundImage = "url(/packages/" + window.location.search.substring(1).split("-")[0].toLowerCase() + "/icon.png)"
//Set Page Title
document.getElementById("websiteTitle").innerText = window.location.search.substring(1).split("-")[0]
//Set Page Icon
document.getElementById("websiteIcon").href = "/packages/" + window.location.search.substring(1).split("-")[0].toLowerCase() + "/icon.png"

//Initial Styling of Pill Selector (Page Load)
document.getElementsByClassName("pillText")[0].style.color = "var(--tint-color)"
document.getElementsByClassName("pillSelectorLine")[0].style.left = (50 / config.tabs.length) + "%"
//Initial Display of Main Content
document.getElementsByClassName("tabContent")[0].style.display = "block"

//Navbar Scrolling Animation
function updateNavbar() {
    var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    document.getElementsByClassName("navbar")[0].style.opacity = scrollTop / 150
    document.getElementById("bannerNavItems").style.opacity = 1 - (scrollTop / 100)
    if (scrollTop > 150) {
        document.getElementsByClassName("changedNavbarItems")[0].style.opacity  = 1
    } else {
        document.getElementsByClassName("changedNavbarItems")[0].style.opacity  = 0
    }
}

//Switch between Details and Changelog
function changePillSelector(element) {
    //Reset color of all Pill Texts
    pillTexts = document.getElementsByClassName("pillText")
    for (i=0; i<pillTexts.length; i++) {
        pillTexts[i].style.color = "var(--medium-text-color)"
    }
    //Hide all Tab Content
    tabContents = document.getElementsByClassName("tabContent")
    for (i=0; i<tabContents.length; i++) {
        tabContents[i].style.display = "none"
    }
    //Move Pill Selector Line
    document.getElementsByClassName("pillSelectorLine")[0].style.left = element.style.left
    //Set Color of Selected Pill text 
    element.style.color = "var(--tint-color)"
    //Show Tab Content
    document.getElementById(element.id.slice(0,-6) + "Content").style.display = "block"
}

//Constant to improve runtime performance (important for animation)
const modifyPopup = document.getElementById("modifyPopup")
const popupButtonWrapper = document.getElementsByClassName('popupButtonWrapper')[0]
//Modify Button
function modifyButton() {
    modifyPopup.style.visibility = "visible"
    modifyPopup.style.backgroundColor = "rgba(0,0,0,0.6)"
    popupButtonWrapper.style.transform = "translate(-50%, 0%)"
}
//Hide popup when clicking on background ONLY (prevent propagation of onClick)
modifyPopup.addEventListener("click", function (e) {
    e = window.event || e;
        if (this === e.target) {
            hidePopup()
        }
});
//Function to hide popup messages
function hidePopup() {
    popupButtonWrapper.style.transform = "translate(-50%, calc(100% + 10px))"
    modifyPopup.style.backgroundColor = "rgba(0,0,0,0)"
    setTimeout(function(){modifyPopup.style.visibility = "hidden"}, 350);
}