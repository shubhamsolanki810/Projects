// NAVBAR JS START
window.onscroll = function () {
    var navbar = document.getElementById("navbar");

    // selection of nav bar links to change the color
    var links = navbar.querySelectorAll("a");

    // selection of svg to change the color
    var svgs = navbar.querySelectorAll("svg");

    // selection of the logo. 
    var logo = document.getElementById("logo");

    // changing or enabling the second logo
    var logo = document.getElementById("logo");
    var originalLogo = document.getElementById("originalLogo");
    var scrolledLogo = document.getElementById("scrolledLogo");


    if (window.pageYOffset > 0) {
        navbar.style.backgroundColor = "white";
        // navbar.style.backdropFilter = "blur(40px)";
        navbar.style.boxShadow = "0px -12px 20px 15px black";
        navbar.style.transition = "all 0.3s";
        logo.src = "resources/onscroll_navbar.svg";


        // navbar color change to black.
        links.forEach(function (link) {
            link.style.color = "black";
            link.style.transition = "0.3s";
        });

        // svg color change to black
        svgs.forEach(function (svg) {
            // svg.style.filter = "invert(1)";
            svg.style.fill = "black";
            svg.style.transition = "0.3s";
        })

        originalLogo.style.display = "none";
        scrolledLogo.style.display = "block";

    } else {
        logo.src = "resources/logo_1.svg";

        navbar.style.backgroundColor = "transparent";
        navbar.style.boxShadow = "none";

        // navbar color change to default.
        links.forEach(function (link) {
            link.style.color = "white";
            link.style.transition = "0.3s";
        });

        // svg color change to default
        svgs.forEach(function (svg) {
            // svg.style.filter = "invert(0)";
            svg.style.fill = "white";
            svg.style.transition = "0.3s";
        })

        // changing the logo to defaults
        originalLogo.style.display = "block";
        scrolledLogo.style.display = "none";
    }
};
// NAVBAR JS END


var videoInput = document.getElementById("heading-input");

videoInput.addEventListener("focusin", () => {
    videoInput.style.width = "65pc";
    videoInput.style.transition = "0.4s";
})

videoInput.addEventListener("focusout", () => {
    videoInput.style.width = "45pc";
    videoInput.style.transition = "0.4s";
})
