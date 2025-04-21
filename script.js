async function init(page) {
    await Promise.all([
        loadHTML("header.html", "header-placeholder"),
        loadHTML("navbar.html", "navbar-section")
    ]);
    
    activePageHiglight(page);
    if (page === 'summary_page') {
        initGreeting();
        initGreetingRepeat();
    }

}

//window.onload = init;

async function loadHTML(file, ID) {
        const res = await fetch(file);
        const data = await res.text();
        document.getElementById(ID).innerHTML = data;
}

function activePageHiglight(page) {
    document.getElementById("summary_page").classList.remove("active-menu");
    document.getElementById("add_task_page").classList.remove("active-menu");
    document.getElementById("board_page").classList.remove("active-menu");
    document.getElementById("contact_page").classList.remove("active-menu");
    document.getElementById("help_page").classList.remove("active-menu");

    document.getElementById(page).classList.add("active-menu");
}

function burgerMenuSliding() {
    document.getElementById("burger_menu").classList.toggle("burger-menu-transition");
}


function acceptCookies() {
    document.getElementById('cookieBanner').style.display = 'none';
    document.cookie = "cookiesAccepted=true; path=/; max-age=" + 60 * 60 * 24 * 365;
}

window.addEventListener('load', function () {
    const cookiesAccepted = document.cookie.includes("cookiesAccepted=true");
    const acceptBtn = document.getElementById('acceptCookiesBtn');
    const banner = document.getElementById('cookieBanner');

    if (!cookiesAccepted && banner) {
        banner.style.display = 'flex';
    }

    if (acceptBtn) {
        acceptBtn.addEventListener('click', acceptCookies);
    }
});

async function loadInternHeaderAndNavbar() {
    await Promise.all([
        loadHTML("header.html", "header-placeholder"),
        loadHTML("navbar.html", "navbar-section")
    ]);
}

async function loadHeaderNavbarExtern() {
    await loadHTML("navbar_header_extern.html", "navbar-section");
    const header = document.getElementById("header-placeholder");
    if (header) header.innerHTML = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const layout = localStorage.getItem("layout");
    const path = window.location.pathname;

    if (layout === "intern") {
        if (path.includes("legal_notice.html")) {
            loadInternHeaderAndNavbar();
        } else if (path.includes("privacy_policy.html")) {
            loadInternHeaderAndNavbar();
        }
    } else {
        loadHeaderNavbarExtern();
    }

    localStorage.removeItem("layout");
});
