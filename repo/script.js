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

// Get Repo from URL
const repoURL = window.location.search.substring(1)
// Set Page Icon and Title
document.getElementById("websiteIcon").href  = repoURL.toLowerCase() + "/CydiaIcon.png"
document.getElementById("websiteTitle").innerText  = repoURL + " Repo"
document.getElementById("repositoryName").innerText  = repoURL
// Get Sileo Featured JSON
try {
    var sileoFeaturedJSON = JSON.parse(loadFile(repoURL.toLowerCase() + "/sileo-featured.json"))
} catch (err) {
    alert("Failed to load Sileo Featured")
    var sileoFeaturedJSON = ""
}

const featuredBannersView = document.getElementById("FeaturedBannersView")

// Define Banner Image
var bannerImage = document.createElement("div")
with (bannerImage) {
    className = "bannerImage"
    style.borderRadius = sileoFeaturedJSON.itemCornerRadius + "px"
    style.width = sileoFeaturedJSON.itemSize.replace(/\{|\,.*\}/g,"") + "px"
    style.height = sileoFeaturedJSON.itemSize.replace(/\{.*\,|\}|\s/g,"") + "px"
}

// Generate Sileo Featured
for (i=0; i<sileoFeaturedJSON.banners.length; i++) {
    // Create Banner
    var bannerImageClone = bannerImage.cloneNode(true)
    bannerImageClone.style.backgroundImage = "url('" + sileoFeaturedJSON.banners[i].url + "')"
    // Create Tweak Name Text
    var bannerTweakName = document.createElement("div")
    bannerTweakName.className = "bannerTweakName"
    bannerTweakName.innerText = sileoFeaturedJSON.banners[i].title
    if (sileoFeaturedJSON.banners[i].hideShadow) {
        bannerTweakName.style.textShadow = "none"
    }
    // Append to Featured View
    bannerImageClone.appendChild(bannerTweakName)
    featuredBannersView.appendChild(bannerImageClone)
}

// Generate Packages View
const packagesFile = loadFile(repoURL.toLowerCase() + "/Packages")
const numOfPackages = packagesFile.match(/Package:/g).length

// Function to return all different categories and amount of tweaks in them
function returnCategoryCount(categoriesDump) {
    // Define Variables
    let categories = []
    let count = []
    let contains = false
    // Loop through all categories dump (duplicates in one giant array)
    for (i=0; i<categoriesDump.length; i++) {
        var tempCategoryName = categoriesDump[i].replace(/Section:\s/g,"")
        contains = false
        // Loop through existing categories
        for (j=0; j<categories.length; j++) {
            // If already in existing category, increment the counter
            if (categories[j] == tempCategoryName) {
                contains = true
                count[j]++
            }
        }
        // If not in existing category, add it to it.
        if (!contains) {
            categories.push(tempCategoryName)
            count.push(1)
        }
    }
    // Return into 2 dimensional array
    return [categories, count]
}

// Set total packages (All Categories)
document.getElementById("totalPackages").innerText = numOfPackages

// Render other categories and tweak counts
var categories = returnCategoryCount(packagesFile.match(/Section:.*/g))
for (i=0; i<categories[0].length; i++) {
    // Define TableButtonView
    var tableButtonView = document.createElement("div")
    tableButtonView.className = "tableButtonView"
    tableButtonView.innerHTML = '<div class="backwardsArrow"></div>'
    // Create Category Title
    var categoryTitle = document.createElement("span")
    categoryTitle.className = "left"
    categoryTitle.innerText = categories[0][i]
    tableButtonView.appendChild(categoryTitle)
    // Create Category Tweak Count
    var categoryTweakCount = document.createElement("span")
    categoryTweakCount.className = "right"
    categoryTweakCount.innerText = categories[1][i]
    tableButtonView.appendChild(categoryTweakCount)
    // Append TableButtonView to TableList
    document.getElementById("tableList").appendChild(tableButtonView)
}