//Function to Handle Views
function handleView(currentView,isStacked) {
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
            /*
            if (currentView.hasOwnProperty("margins")) {
                var margins = currentView.margins.replace(/{|}/g,"").split(",")
                var marginString = ""
                for (i=0; i<margins.length; i++) {
                    marginString = marginString + margins[i] + "px "
                }
                view.style.margin = marginString
            }*/
            if (currentView.hasOwnProperty("fontWeight")) {
                if (currentView.fontWeight = "semibold") {
                    view.style.fontWeight = 600
                } else {
                    view.style.fontWeight = currentView.fontWeight
                }
            }
            if (currentView.hasOwnProperty("textColor")) {
                view.style.color = currentView.textColor
            }
            if (currentView.hasOwnProperty("fontSize")) {
                view.style.fontSize = currentView.fontSize + "px"
            }
            view.innerText = currentView.text
            break;
        //Handle Markdown Text View
        case "DepictionMarkdownView":
            var converter = new showdown.Converter()
            view.innerHTML = converter.makeHtml(currentView.markdown)
            //Custom Stylesheets
            var styleStartIndex = currentView.markdown.indexOf("<style>")
            var styleEndIndex = currentView.markdown.indexOf("</style>")
            if (styleStartIndex >= 0) {
                var styleString = currentView.markdown.slice(styleStartIndex+7,styleEndIndex).replace(/.*\{|\}/g,"")
                children = view.children
                for (i=0; i<children.length; i++) {
                    children[i].setAttribute("style",styleString)
                }
            }
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
            //Set Screenshot Corner Radius
            var screenshotCornerRadius = 8
            if (currentView.hasOwnProperty('itemCornerRadius')) {
                screenshotCornerRadius = currentView.itemCornerRadius
            }
            //Set Screenshot View Height
            var screenshotViewHeight = 400
            if (currentView.hasOwnProperty('itemSize')) {
                //Split {x,y} into just y
                var screenshotViewDimensions = currentView.itemSize
                screenshotViewHeight = screenshotViewDimensions.substring (
                    screenshotViewDimensions.lastIndexOf(",") + 1,
                    screenshotViewDimensions.lastIndexOf("}")
                )
            }
            if (currentView.hasOwnProperty('screenshots')) {
                for (screenshotNum = 0; screenshotNum < currentView.screenshots.length; screenshotNum++) {
                    var screenshot = document.createElement("img")
                    screenshot.setAttribute("onclick","displayOverlayPopup(this)")
                    screenshot.style.height = screenshotViewHeight + "px"
                    screenshot.className = "screenshot"
                    screenshot.style.borderRadius = screenshotCornerRadius + "px"
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
            depictionTableRow.appendChild(depictionTableColumnLeft)
            depictionTableRow.appendChild(depictionTableColumnRight)
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
        //Handle Depiction Admob View
        case "DepictionAdmobView":
            break;
        //Handle Depiction Stack View
        case "DepictionStackView":
            if (currentView.hasOwnProperty('orientation')) {
                if (currentView.orientation = "landscape") {
                    view.classList.add("landscapeOrientation")
                }
            }
            if (!isStacked) {
                if (currentView.hasOwnProperty('backgroundColor')) {
                    view.style.backgroundColor = currentView.backgroundColor
                }
                for (currentStackedView = 0; currentStackedView < currentView.views.length; currentStackedView++) {
                    var stackView = handleView(currentView.views[currentStackedView],true)
                    view.appendChild(stackView)
                }
            } else {
                //Handle Stacks in Stacks in Stacks (I don't even know how this works anymore)
                var stackedViewDivs = renderStackedView(currentView.views)
                for (eachDiv = 0; eachDiv < stackedViewDivs.length; eachDiv++) {
                    view.appendChild(stackedViewDivs[eachDiv])
                }
            }
            break;
        //Other Views
        default:
            view.innerHTML = "Unsupported: " + view.className
            view.id = "unsupportedView"
    }
    return(view)
}

function renderStackedView(stackedViews) {
    var stackedViewDivs = []
    for (i = 0; i < stackedViews.length; i++) {
        stackedViewDivs.push(handleView(stackedViews[i],true))
    }
    return stackedViewDivs
}