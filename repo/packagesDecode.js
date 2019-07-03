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

// Function to decode Packages File
function decodePackagesFile(packagesFile) {
    // Clean empty lines out of packages File
    packagesFile = packagesFile.replace(/^\s*[\r\n]/gm,"")
    // Split PackagesFile into Packages
    let packages = packagesFile.split("Package:")
    // Remove first blank from Packages
    packages.shift()
    // Loop through packages and convert them to objects
    for (packageNum = 0; packageNum < packages.length; packageNum++) {
        // Define the package
        let package = {}
        // Set the package's bundle ID property
        Object.defineProperty(package, "Package", {
            value: packages[packageNum].split('\n', 1)[0].replace(" ","")
        })
        // Remove Bundle ID line from Package String
        packages[packageNum] = packages[packageNum].slice(packages[packageNum].indexOf('\n') + 1)
        // Get all remaining properties of package
        let properties = packages[packageNum].split("\n")
        for (i=0; i<properties.length; i++) {
            // Extract Property Name from before first colon
            let propertyName = properties[i].substring(0, properties[i].indexOf(":"))
            // Extract Property Value from after first colon
            let propertyValue = properties[i].substring(properties[i].indexOf(":") + 2, properties[i].length)
            // Set the property within the object
            // Try catch incase repo maintainer accidently wrote a property twice
            try {
                Object.defineProperty(package, propertyName, {
                    value: propertyValue
                })
            } catch (error) {
                console.log("Note to developer: Your packages file is messed up!")
            }
        }
        // Convert the package from string into new object
        packages[packageNum] = package
    }
    return packages
}