// Define featuredBannersView
const featuredBannersView = document.getElementById("FeaturedBannersView")

// Get Repo from URL
const currentDirectory = window.location.origin + window.location.pathname.replace("index.html","")
var repoURL = window.location.search.substring(1)
if (!repoURL.match(/https/)) {
    // Set Repo Name in Window Title / Navbar (Only if not a URL)
    document.getElementById("websiteTitle").innerText  = repoURL + " Repo"
    document.getElementById("repositoryName").innerText  = repoURL
    // Redefine RepoURL as a full URL
    repoURL = currentDirectory + repoURL
}

// Set Page Icon
document.getElementById("websiteIcon").href  = repoURL.toLowerCase() + "/CydiaIcon.png"

// Get Sileo Featured JSON
try {
    var sileoFeaturedJSON = JSON.parse(loadFile(repoURL.toLowerCase() + "/sileo-featured.json"))
} catch (err) {
    alert("Failed to load Sileo Featured!")
    var sileoFeaturedJSON = ""
}

// Render Packages File
try {
    // Check Packages File Exists
    var validPackagesFile = true

    // Following line will throw an exception if packages file does not exist
    var packagesFile = loadFile(repoURL.toLowerCase() + "/Packages")

    // Set total packages (All Categories)
    const numOfPackages = packagesFile.match(/Package:/g).length
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
} catch (err) {
    validPackagesFile = false
    alert("Failed to load Packages!")
}

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
    // Append Tweak Name Text to BannerImage
    bannerImageClone.appendChild(bannerTweakName)
    // Get HREF URL from Packages File
    var alreadyAppended = false
    if (validPackagesFile) {
        // Remove first half of Packages File upto first match of bundle ID 
        var bannerURL = packagesFile.slice(packagesFile.match(sileoFeaturedJSON.banners[i].package).index)
        // Check Package File contains any Sileo Depictions (Prevent exception on null)
        if (bannerURL.match(/SileoDepiction:.*/) != null) {
            // Check Specific Package contains Sileo Depiction
            if (bannerURL.match(/SileoDepiction:.*/).index < bannerURL.match(/Package:/).index) {
                // Extract line with next instance of "SileoDepiction:"
                bannerURL = bannerURL.match(/SileoDepiction:.*/)[0]
                // Remove "SileoDepiction:" from the start of the line leaving just the URL
                bannerURL = bannerURL.replace(/SileoDepiction:\s/g,"")
                // Create Link Element around BannerImage
                var bannerImageLink = document.createElement("a")
                bannerImageLink.href = bannerURL
                bannerImageLink.appendChild(bannerImageClone)
                // Append to Featured View
                featuredBannersView.appendChild(bannerImageLink)
                // Set alreadyAppended to prevent bannerImageClone from being appended later
                alreadyAppended = true
            }
        }
    }
    // Append to Featured View (if couldn't find link in packages file)
    if (!alreadyAppended) {
        featuredBannersView.appendChild(bannerImageClone)
    }
}


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