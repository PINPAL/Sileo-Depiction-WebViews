
// Get Repo from URL
var repoURL = getQueryVariable("repo")
// Append slash to end of repo URL (if required)
if (repoURL.slice(-1) != "/") {
    repoURL += "/"
}

// Fetch Repo Packages File
var validPackagesFile = true
try {
    var packagesFile = loadFile(repoURL + "Packages")
} catch (error) {
    validPackagesFile = false
}   

// Fetch Repo Title from Cydia's Release File
var repoTitle = "Repo Title"
try {
    var repoTitle = loadFile(repoURL + "Release").match(/Label:.*/)[0].replace(/Label:\s/g,"")
} catch (error) {}

// Fetch Sileo Featured JSON from Repo
var validSileoFeatured = true
try {
    var sileoFeaturedJSON = JSON.parse(loadFile(repoURL + "sileo-featured.json"))
} catch (error) {
    validSileoFeatured = false
}

// Set Repo Title
document.getElementById("websiteTitle").innerText  = repoTitle
document.getElementById("repositoryName").innerText  = repoTitle

// Set Page Icon
document.getElementById("websiteIcon").href  = repoURL + "CydiaIcon.png"

// Render Packages File
if (validPackagesFile) {
    var packages = decodePackagesFile(packagesFile)

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
}

// Render Sileo Featured
if (validSileoFeatured) {
    // Define Banner Image
    var bannerImage = document.createElement("div")
    with (bannerImage) {
        className = "bannerImage"
        style.borderRadius = sileoFeaturedJSON.itemCornerRadius + "px"
        style.width = sileoFeaturedJSON.itemSize.replace(/\{|\,.*\}/g,"") + "px"
        style.height = sileoFeaturedJSON.itemSize.replace(/\{.*\,|\}|\s/g,"") + "px"
    }

    // Define featuredBannersView
    const featuredBannersView = document.getElementById("FeaturedBannersView")

    // Generate Sileo Featured as HTML
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
            for (packageNum=0; packageNum<packages.length; packageNum++) {
                if (packages[packageNum].Package == sileoFeaturedJSON.banners[i].package) {
                    // Create Link Element around BannerImage
                    var bannerImageLink = document.createElement("a")
                    // Set the link HREF
                    bannerImageLink.href = 
                        "../?json=" + packages[packageNum].SileoDepiction 
                        + "&name=" + packages[packageNum].Name
                        + "&dev=" + packages[packageNum].Author.replace(/\<.*\>/g,"") //Replace to remove emails in triangular brackets
                    // Append to Featured View
                    bannerImageLink.appendChild(bannerImageClone)
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
}