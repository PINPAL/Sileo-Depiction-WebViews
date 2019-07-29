// Define Navbar Items (Improve Scrolling Animation Responsiveness)
const navbar = document.getElementsByClassName("navbar")[0]
const bannerNavItems = document.getElementById("bannerNavItems")
const changedNavbarItems = document.getElementsByClassName("changedNavbarItems")[0]

// Navbar & Banner Scrolling Animation
window.addEventListener('scroll', function updateNavbar() {
    var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    navbar.style.opacity = scrollTop / 150
    bannerNavItems.style.opacity = 1 - (scrollTop / 100)
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
        changedNavbarItems.style.opacity  = 1
    } else {
        changedNavbarItems.style.opacity  = 0
    }
})