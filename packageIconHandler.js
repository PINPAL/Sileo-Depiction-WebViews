const imagesDirectory = "https://pinpal.github.io/Sileo-Depiction-WebViews/assets/categories/"

function returnIcon(tweakSection) {
    tweakSection = tweakSection.toLowerCase()
    if (tweakSection.match(/.*(themes).*/) ) {
        return imagesDirectory + "Themes.png"
    } else if (tweakSection.match(/.*(zeppelin)|(xeon).*/) ) {
        return imagesDirectory + "Zeppelin.png"
    }
}