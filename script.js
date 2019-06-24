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
// Define Popup (Improve Popup Responsiveness)
const modifyPopup = document.getElementById("modifyPopup")
const popupButtonWrapper = document.getElementsByClassName('popupButtonWrapper')[0]
// Define BannerImage (Improve Scrolling Animation Responsiveness)
const bannerImage = document.getElementById("bannerImage")
// Get Info from URL
const tweakName = window.location.search.substring(1).split("-")[0]
const tweakDeveloperName = window.location.search.substring(1).split("-")[1]
const tweakPrice = window.location.search.substring(1).split("-")[2]
// Load Sileo JSON File
const currentDirectory = window.location.origin + window.location.pathname.replace("index.html","")
const tweakDirectory = currentDirectory + "packages/" + tweakName.toLowerCase()
try {
    const configFile = loadFile(tweakDirectory + "/config.json")
    var configJSON = JSON.parse(configFile)
} catch (err) {
    alert("Failed to load config")
    var configJSON = ""
}
// Set Settings Config URL placeholder
document.getElementById("customConfigUrl").setAttribute("placeholder", tweakDirectory + "/config.json")
// Set Navbar Tweak Icon
document.getElementById("navbarTweakIcon").style.backgroundImage = "url(" + currentDirectory + "packages/" + tweakName.toLowerCase() + "/icon.png)"
// Set Price Buttons
for (i=0; i<document.getElementsByClassName("priceButton").length;i++) {
    if (/[+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*)(?:[eE][+-]?\d+)?/.test(tweakPrice)) {
        document.getElementsByClassName("priceButton")[i].innerText = "$" + tweakPrice
    }
}
// Set Tweak Name
document.getElementById("tweakName").innerText = tweakName
// Set Developer Name
document.getElementById("developerName").innerText = tweakDeveloperName
// Set Tweak Icon
document.getElementById("tweakIcon").style.backgroundImage = "url(" + tweakDirectory + "/icon.png)"
// Set Page Title
document.getElementById("websiteTitle").innerText = tweakName
// Set Page Icon
document.getElementById("websiteIcon").href = tweakDirectory + "/icon.png"
//Render
if (configJSON != "") {
    renderFromConfig(configJSON)
}

//Generate from Config Function
function renderFromConfig(config) {
        // Set Background Color
        if (config.hasOwnProperty('backgroundColor')) {
            document.getElementsByTagName('html')[0].style.setProperty("--bg-color", config.backgroundColor)
        }
        // Set Tint Color
        if (config.hasOwnProperty('tintColor')) {
            document.getElementsByTagName('html')[0].style.setProperty("--tint-color", config.tintColor)
        }
        // Set Banner Image
        if (config.hasOwnProperty('headerImage')) {
            bannerImage.style.backgroundImage = "url(" + config.headerImage + ")"
            bannerImage.style.filter = "brightness(0.5)";
            bannerImage.style.webkitFilter = "brightness(0.5)";
        }
        // Generate Tabs
        for (currentTab = 0; currentTab < config.tabs.length; currentTab++) {
            // Create Pill Selectors at Top
            var pillText = document.createElement("div")
            pillText.className = "pillText"
            pillText.id = config.tabs[currentTab].tabname + "Button"
            pillText.innerText = config.tabs[currentTab].tabname
            pillText.setAttribute("onclick", "changePillSelector(this)")
            pillText.style.left = (50 / config.tabs.length) * (2 * currentTab + 1) + "%"
            document.getElementsByClassName("headerPillSelector")[0].appendChild(pillText)
            // Create Tab for Content to Go In
            var tabContent = document.createElement("div")
            tabContent.className = "tabContent"
            tabContent.id = config.tabs[currentTab].tabname + "Content"
            // Add Content Views to Tab
            for (currentViewNum = 0; currentViewNum < config.tabs[currentTab].views.length; currentViewNum++) {
                var view = handleView(config.tabs[currentTab].views[currentViewNum], false)
                tabContent.appendChild(view)
            }
            // Handle Landscape Oreintation of StackViews
            var landscapeOrientationObjects = document.getElementsByClassName("landscapeOrientation")
            // Loop Every Single Landscape StackView
            for (i = 0; i < landscapeOrientationObjects.length; i++) {
                // Loop Every Child View within the StackView
                for (j = 0; j < landscapeOrientationObjects[i].childNodes.length; j++) {
                    landscapeOrientationObjects[i].childNodes[j].style.display = "inline-block"
                    landscapeOrientationObjects[i].childNodes[j].style.width = "50%"
                }
            }
            document.getElementById("mainWrapper").appendChild(tabContent)
            // Initial Styling of Pill Selector (Page Load)
            document.getElementsByClassName("pillText")[0].style.color = "var(--tint-color)"
            document.getElementsByClassName("pillSelectorLine")[0].style.left = (50 / config.tabs.length) + "%"
            // Initial Display of Main Content
            document.getElementsByClassName("tabContent")[0].style.display = "block"
        }
}

// Scroll Snapping to Bottom of Banner
var isScrolling;
// Listen for scroll events
window.addEventListener('scroll', function ( event ) {
	// Clear our timeout throughout the scroll
	window.clearTimeout( isScrolling );
	// Set a timeout to run after scrolling ends
	isScrolling = setTimeout(function() {
        // Run the callback
        var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
        if (scrollTop < 204 && scrollTop > 104) {
            window.scrollTo(0,154)
        }
	}, 66);
}, false);

//Reload Config from Custom URL (Developer Option)
function reloadConfig() {
    configJSON = JSON.parse(loadFile(document.getElementById("customConfigUrl").value))
    renderFromConfig(configJSON)
}

// Navbar & Banner Scrolling Animation
function updateNavbar() {
    var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    document.getElementsByClassName("navbar")[0].style.opacity = scrollTop / 150
    document.getElementById("bannerNavItems").style.opacity = 1 - (scrollTop / 100)
    // Banner Enlargement (When Users Scrolls into Negative - Mobile Browsers)
    if (scrollTop >= 0) {
        bannerImage.style.position = "absolute"
        bannerImage.style.minHeight = "200px"
    } else {
        bannerImage.style.position = "fixed"
        bannerImage.style.minHeight = 200 + (scrollTop * -1) + "px"
    }
    // Only show right/center navbar items after 150 pixels of scroll
    if (scrollTop > 150) {
        document.getElementsByClassName("changedNavbarItems")[0].style.opacity  = 1
    } else {
        document.getElementsByClassName("changedNavbarItems")[0].style.opacity  = 0
    }
}

// Switch between Details and Changelog
function changePillSelector(element) {
    // Reset color of all Pill Texts
    pillTexts = document.getElementsByClassName("pillText")
    for (i=0; i<pillTexts.length; i++) {
        pillTexts[i].style.color = "var(--medium-text-color)"
    }
    // Hide all Tab Content
    tabContents = document.getElementsByClassName("tabContent")
    for (i=0; i<tabContents.length; i++) {
        tabContents[i].style.display = "none"
    }
    // Move Pill Selector Line
    document.getElementsByClassName("pillSelectorLine")[0].style.left = element.style.left
    // Set Color of Selected Pill text 
    element.style.color = "var(--tint-color)"
    // Show Tab Content
    document.getElementById(element.id.slice(0,-6) + "Content").style.display = "block"
}

// Set Dark Mode Cookie if non-existant
if (!document.cookie) {
    setCookie("enableDarkMode",false)
}
// Load Dark Mode from Cookie
if (getCookie("enableDarkMode")) {
    toggleDarkMode(true)
}

// Modify Button
function modifyButton() {
    disableScroll()
    modifyPopup.style.visibility = "visible"
    modifyPopup.style.backgroundColor = "rgba(0,0,0,0.6)"
    popupButtonWrapper.style.transform = "translate(-50%, 0%)"
}
// Hide popup when clicking on background ONLY (prevent propagation of onClick)
modifyPopup.addEventListener("click", function (e) {
    e = window.event || e;
        if (this === e.target) {
            hidePopup()
        }
});
// Function to hide popup messages
function hidePopup() {
    popupButtonWrapper.style.transform = "translate(-50%, calc(100% + 10px))"
    modifyPopup.style.backgroundColor = "rgba(0,0,0,0)"
    enableScroll()
    setTimeout(function(){modifyPopup.style.visibility = "hidden"}, 350);
}

//Functions for enabling and disabling scrolling
var keys = {37: 1, 38: 1, 39: 1, 40: 1};
function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;  
}
function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}
function disableScroll() {
  if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', preventDefault, false);
  document.addEventListener('wheel', preventDefault, {passive: false}); // Disable scrolling in Chrome
  window.onwheel = preventDefault; // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  window.ontouchmove  = preventDefault; // mobile
  document.onkeydown  = preventDefaultForScrollKeys;
}
function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    document.removeEventListener('wheel', preventDefault, {passive: false}); // Enable scrolling in Chrome
    window.onmousewheel = document.onmousewheel = null; 
    window.onwheel = null; 
    window.ontouchmove = null;  
    document.onkeydown = null; 
}

//Function for displaying overlay popup
function displayOverlayPopup(element) {
    if (element.innerText == "About") {
        document.getElementById("aboutInfo").style.display = "block"
        hidePopup()
    } else if (element.className == "screenshot") {
        var largerScreenshot = element.cloneNode(true)
        largerScreenshot.removeAttribute("onclick")
        largerScreenshot.style.cursor = "auto"
        largerScreenshot.classList.add("largerScreenshot")
        document.getElementById("overlayPopupContent").appendChild(largerScreenshot)
    } else if (element.innerText == "Configure") {
        document.getElementById("configureSettings").style.display = "block"
        hidePopup()
    }
    disableScroll()
    document.getElementById("everythingWrapper").classList.add("blurred")
    document.getElementById("overlayPopup").style.transform = "translateY(0%)"
}
function hideOverlayPopup() {
    enableScroll()
    setTimeout(function(){
        document.getElementById("overlayPopupContent").innerHTML = ""
        document.getElementById("aboutInfo").removeAttribute("style")
        document.getElementById("configureSettings").removeAttribute("style")
    }, 350);
    document.getElementById("everythingWrapper").classList.remove("blurred")
    document.getElementById("overlayPopup").style.transform = "translateY(100%)"
}

// Function for sharing the package
function sharePackage() {
    navigator.share({
        title: tweakName,
        text: "Get " + tweakName,
        url: window.location.href,
    });
}

// Function for toggling settings
function toggleSetting(element) {
    if (element.className == "toggleSwitch enabledToggle") {
        // Make Toggle Disabled
        element.classList.remove("enabledToggle")
        // If Dark Mode
        if (element.id == "enableDarkMode") {
            setCookie("enableDarkMode",false)
            toggleDarkMode(false)
        }
        // If Custom Config (Developer)
        if (element.id == "enableCustomConfig") {
            document.getElementById("customConfigUrl").setAttribute("readonly")
            document.getElementById("customConfigSettings").classList.add("settingsNotEditable")
        }
    } else {
        // Make Toggle Enabled
        element.classList.add("enabledToggle")
        // If Dark Mode
        if (element.id == "enableDarkMode") {
            setCookie("enableDarkMode",true)
            toggleDarkMode(true)
        }
        // If Custom Config (Developer)
        if (element.id == "enableCustomConfig") {
            document.getElementById("customConfigUrl").removeAttribute("readonly")
            document.getElementById("customConfigSettings").classList.remove("settingsNotEditable")
        }
    }
}

//Function to enable/disable Dark Mode
function toggleDarkMode(enable) {
    //Check Browser is not IE
    if (navigator.userAgent.indexOf("Trident") < 0) {
        if (enable) {
            if (!configJSON.hasOwnProperty('backgroundColor')) {
                document.getElementsByTagName('html')[0].style.setProperty("--bg-color", "#282828")
            }
            document.getElementsByTagName('html')[0].style.setProperty("--text-color", "#FFFFFF")
            document.getElementsByTagName('html')[0].style.setProperty("--navbar-bg-color", "#1E1E1E")
            document.getElementsByTagName('html')[0].style.setProperty("--border-color", "#303030")
        } else {
            if (!configJSON.hasOwnProperty('backgroundColor')) {
                document.getElementsByTagName('html')[0].style.setProperty("--bg-color", "#FFFFFF")
            }
            document.getElementsByTagName('html')[0].style.setProperty("--text-color", "#000000")
            document.getElementsByTagName('html')[0].style.setProperty("--navbar-bg-color", "#FEFEFE")
            document.getElementsByTagName('html')[0].style.setProperty("--border-color", "#c5c5c5")
        }
    } else {
        alert("Sorry Internet Explorer does not support this feature!")
    }
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