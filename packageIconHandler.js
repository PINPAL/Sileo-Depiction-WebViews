const imagesDirectory = "https://pinpal.github.io/Sileo-Depiction-WebViews/assets/categories/"

function returnIcon(tweakSection) {
    tweakSection = tweakSection.toLowerCase()
    if (tweakSection.match(/.*(themes)|(winterboard)|(ithemer)|(snowboard)|(winterboard)|(anemone).*/) ) {
        return imagesDirectory + "Theme.png"
    } else if (tweakSection.match(/.*(addons)|(addon).*/) ) {
        return imagesDirectory + "Addons.png"
    } else if (tweakSection.match(/.*(admin)|(adminstration).*/) ) {
        return imagesDirectory + "Administration.png"
    } else if (tweakSection.match(/.*(adult)|(xxx)|(nsfw).*/) ) {
        return imagesDirectory + "Adult.png"
    } else if (tweakSection.match(/.*(alkaline).*/) ) {
        return imagesDirectory + "Alkaline.png"
    } else if (tweakSection.match(/.*(applications)|(apps).*/) ) {
        return imagesDirectory + "Applications.png"
    } else if (tweakSection.match(/.*(archive)|(archiving).*/) ) {
        return imagesDirectory + "Archiving.png"
    } else if (tweakSection.match(/.*(carrier)|(cellular).*/) ) {
        return imagesDirectory + "Carrier.png"
    } else if (tweakSection.match(/.*(cc)|(control center)|(controlcenter).*/) ) {
        return imagesDirectory + "CC.png"
    } else if (tweakSection.match(/.*(cydgets)|(cydget).*/) ) {
        return imagesDirectory + "Cydgets.png"
    } else if (tweakSection.match(/.*(data).*/) ) {
        return imagesDirectory + "Data.png"
    } else if (tweakSection.match(/.*(developer).*/) ) {
        return imagesDirectory + "Developer.png"
    } else if (tweakSection.match(/.*(development).*/) ) {
        return imagesDirectory + "Development.png"
    } else if (tweakSection.match(/.*(dictionary)|(dict).*/) ) {
        return imagesDirectory + "Dictionary.png"
    } else if (tweakSection.match(/.*(ebooks)|(books).*/) ) {
        return imagesDirectory + "eBooks.png"
    } else if (tweakSection.match(/.*(education)|(learn).*/) ) {
        return imagesDirectory + "Education.png"
    } else if (tweakSection.match(/.*(entertain)|(entertainment)).*/) ) {
        return imagesDirectory + "Entertainment.png"
    } else if (tweakSection.match(/.*(fonts)|(bytafont).*/) ) {
        return imagesDirectory + "Fonts.png"
    } else if (tweakSection.match(/.*(game)|(gaming).*/) ) {
        return imagesDirectory + "Games.png"
    } else if (tweakSection.match(/.*(java).*/) ) {
        return imagesDirectory + "Java.png"
    } else if (tweakSection.match(/.*(keyboard).*/) ) {
        return imagesDirectory + "Keyboards.png"
    } else if (tweakSection.match(/.*(localise)|(localization)|(localize).*/) ) {
        return imagesDirectory + "Localization.png"
    } else if (tweakSection.match(/.*(lock info)|(lockinfo).*/) ) {
        return imagesDirectory + "LockInfo.png"
    } else if (tweakSection.match(/.*(lockscreen)|(coversheet).*/) ) {
        return imagesDirectory + "Lockscreen.png"
    } else if (tweakSection.match(/.*(messaging)|(message).*/) ) {
        return imagesDirectory + "Messaging.png"
    } else if (tweakSection.match(/.*(multimedia)|(music).*/) ) {
        return imagesDirectory + "Multimedia.png"
    } else if (tweakSection.match(/.*(navigation)|(maps)|(navigate).*/) ) {
        return imagesDirectory + "Navigation.png"
    } else if (tweakSection.match(/.*(Network)|(Web).*/) ) {
        return imagesDirectory + "Network.png"
    } else if (tweakSection.match(/.*(packaging).*/) ) {
        return imagesDirectory + "Packaging.png"
    } else if (tweakSection.match(/.*(preferences)|(prefs)|(settings).*/) ) {
        return imagesDirectory + "Settings.png"
    } else if (tweakSection.match(/.*(social).*/) ) {
        return imagesDirectory + "Social.png"
    } else if (tweakSection.match(/.*(soundboard)|(voice changer)|(voicechanger).*/) ) {
        return imagesDirectory + "Soundboards.png"
    } else if (tweakSection.match(/.*(system).*/) ) {
        return imagesDirectory + "System.png"
    } else if (tweakSection.match(/.*(terminal)|(scripting)|(script).*/) ) {
        return imagesDirectory + "Terminal.png"
    } else if (tweakSection.match(/.*(test).*/) ) {
        return imagesDirectory + "Test.png"
    } else if (tweakSection.match(/.*(text editor)|(texteditor)|(notepad).*/) ) {
        return imagesDirectory + "TextEditor.png"
    } else if (tweakSection.match(/.*(tools).*/) ) {
        return imagesDirectory + "Tools.png"
    } else if (tweakSection.match(/.*(toys)|(fun).*/) ) {
        return imagesDirectory + "Toys.png"
    } else if (tweakSection.match(/.*(utilities)|(utils).*/) ) {
        return imagesDirectory + "Utilities.png"
    } else if (tweakSection.match(/.*(wallpaper).*/) ) {
        return imagesDirectory + "Wallpaper.png"
    } else if (tweakSection.match(/.*(widget).*/) ) {
        return imagesDirectory + "Widgets.png"
    } else if (tweakSection.match(/.*(zeppelin)|(xeon).*/) ) {
        return imagesDirectory + "Zeppelin.png"
    } else {
        return imagesDirectory + "Tweaks.png"
    }
}