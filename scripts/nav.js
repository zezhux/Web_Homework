
// Update the list to generate more nav buttons
const pages = ["exercise_01.html", "exercise_02.html", "exercise_03.html", "exercise_04.html"];

// DON'T MODIFY ANYTHING BELOW THIS LINE, ITS WHAT GENERATES THE NAV BUTTONS
const nav = document.getElementById("main-nav");

// Are we currently inside /pages/ ?
const inPages = window.location.pathname.includes("/pages/");
// How to get from current page back to the site root:
const toRoot = inPages ? "../" : "./";

// Always keep Instructions first
nav.innerHTML = `<a class="main-nav-btn" href="${toRoot}">Instructions</a>`;

pages.forEach(file => {
    const label = file.replace(".html", "").replaceAll("_", " ");
    const a = document.createElement("a");
    a.className = "main-nav-btn";
    a.href = `${toRoot}pages/${file}`;
    a.textContent = label;
    nav.appendChild(a);
});

// Highlight current page
[...nav.querySelectorAll("a")].forEach(a => {
    const abs = new URL(a.getAttribute("href"), window.location);
    if (abs.pathname === window.location.pathname) a.classList.add("active");
});