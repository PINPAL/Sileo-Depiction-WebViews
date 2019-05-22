//Function to Handle Views
function handleView(currentView) {
    var view = document.createElement("div")
    view.className = currentView.class
    switch (view.className) {
        //Handle Header View
        case "DepictionHeaderView":
            view.innerText = currentView.title
            if (currentView.useBoldText == false) {
                view.style.fontWeight = "normal"
            }
            break;
        //Handle Subheader View
        case "DepictionSubheaderView":
            view.innerText = currentView.title
            if (currentView.useBoldText) {
                view.style.fontWeight = "bold"
            }
            break;
        //Handle Label View
        case "DepictionLabelView":
            view.innerText = currentView.text
            break;
        //Handle Markdown Text View
        case "DepictionMarkdownView":
            var converter = new showdown.Converter()
            view.innerHTML = converter.makeHtml(currentView.markdown)
            break;
        //Handle Image View
        case "DepictionImageView":
            var image = document.createElement("img")
            image.src = currentView.URL
            image.width = currentView.width
            image.height = currentView.height
            image.style.borderRadius = currentView.cornerRadius
            if (currentView.alignment == "1") {
                view.style.textAlign = "center"
            } else if (currentView.alignment == "2") {
                view.style.textAlign = "right"
            }
            view.appendChild(image)
        //Handle Screenshots View
        case "DepictionScreenshotsView":
            if (currentView.hasOwnProperty('screenshots')) {
                for (screenshotNum = 0; screenshotNum < currentView.screenshots.length; screenshotNum++) {
                    var screenshot = document.createElement("img")
                    screenshot.className = "screenshot"
                    screenshot.src = currentView.screenshots[screenshotNum].url
                    view.appendChild(screenshot)
                }
            }
            break;
        //Handle Spacer View
        case "DepictionSpacerView":
            view.style.minHeight = currentView.spacing + "px"
            break;
        //Handle Seperator View
        case "DepictionSeparatorView":
            break;
        //Handle Table Views
        case "DepictionTableTextView":
            //Create the Table
            var depictionTable = document.createElement("table")
            depictionTable.className = "depictionTable"
            //Create the Table Row
            var depictionTableRow = document.createElement("tr")
            //Create the Table Columns
            var depictionTableColumnLeft = document.createElement("td")
            depictionTableColumnLeft.innerText = currentView.title
            var depictionTableColumnRight = document.createElement("td")
            depictionTableColumnRight.innerText = currentView.text
            depictionTableRow.append(depictionTableColumnLeft, depictionTableColumnRight)
            //Add Row to Table and Table to View
            depictionTable.appendChild(depictionTableRow)
            view.appendChild(depictionTable)
            break;
        //Handle Table Button Views
        case "DepictionTableButtonView":
            //Create the link
            var link = document.createElement("a")
            link.href = currentView.action
            //Create link contents
            var linkContents = document.createElement("div")
            linkContents.className = "depictionButton"
            linkContents.innerText = currentView.title
            link.appendChild(linkContents)
            //Create the arrow
            var backwardsArrow = document.createElement("div")
            backwardsArrow.className = "backwardsArrow"
            link.appendChild(backwardsArrow)
            view.appendChild(link)
            break;
        //Handle Depiction Stack View
        case "DepictionStackView":
            if (currentView.hasOwnProperty('backgroundColor')) {
                view.style.backgroundColor = currentView.backgroundColor
            }
            for (currentStackedView = 0; currentStackedView < currentView.views.length; currentStackedView++) {
                var stackView = handleView(currentView.views[currentStackedView])
                view.appendChild(stackView)
            }
            break;
        //Other Views
        default:
            view.innerHTML = "Unsupported: " + view.className
            view.id = "unsupportedView"
    }
    return(view)
}