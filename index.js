
// * getBoundingClientRect()
// * pageYOffset
// * slice
// * offsetTop

// set date
const date = document.getElementById("date");
date.innerHTML = new Date().getFullYear();

// close links
const linksContainer = document.querySelector(".links-container");
const navToggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".links");

navToggle.addEventListener("click", function () {
    // This can be used if we are not using a dynamic content and we knw that the links will always be the same number then using this method is fine
    // linksContainer.classList.toggle("show-links");

    const containerHeight = linksContainer.getBoundingClientRect().height; // getting height of the container containing all the links which is 0 by default
    
    //console.log(containerHeight);
    const linksHeight = links.getBoundingClientRect().height; // getting height of each link

    //console.log(linksHeight);

    if (containerHeight === 0) {
        // meaning whn links are closed then if we click on the burger it will set the height of the container acc to the height of the links
        linksContainer.style.height = `${linksHeight}px`;
    }
    else {
        // now since the height of the container isnt 0 which means the container is open...now whn we click the burger it will set the height to 0 meaning closing it
        linksContainer.style.height = 0;
    }
});

// fixed navbar and back to top
const navBar = document.getElementById("nav");
const topLink = document.querySelector(".top-link");
window.addEventListener("scroll", function () {
    const scrollHeight = window.pageYOffset;
    const navHeight = navBar.getBoundingClientRect().height;
    if (scrollHeight > navHeight) {
        navBar.classList.add("fixed-nav");
    }
    else {
        navBar.classList.remove("fixed-nav");
    }
    // back to top
    if (scrollHeight > 400) {
        topLink.classList.add("show-link");
    }
    else {
        topLink.classList.remove("show-link");
    }
});

// smooth scroll
// selecting the links
const scrolLinks = document.querySelectorAll(".scroll-link");

scrolLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
        // prevent default
        e.preventDefault();

        // navigate to specific spot
        const id = e.currentTarget.getAttribute("href").slice(1); // slice(1) means start from index 1 and skip the "#"
        //console.log(id);
        const element = document.getElementById(id); // we got the id of the link dynamically by clicking on it and then we put it in the "id" variable above and now we are passing it into the element variable

        // calculate the heights
        const navHeight = navBar.getBoundingClientRect().height;
        const containerHeight = linksContainer.getBoundingClientRect().height;
        const fixedNav = navBar.classList.contains("fixed-nav");


        let position = element.offsetTop - navHeight;

        if (!fixedNav) {
            position = position - navHeight;
        }
        if (navHeight > 82) {
            position = position + containerHeight;
        }
        window.scrollTo({
             left: 0, top: position,
        });
            linksContainer.style.height = 0;
    });
});