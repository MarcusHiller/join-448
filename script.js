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

    const isExternPage = path.includes("legal_notice.html") || path.includes("privacy_policy.html");

    if (isExternPage) {
        if (layout === "intern") {
            loadInternHeaderAndNavbar();
        } else {
            loadHeaderNavbarExtern();
        }

        localStorage.removeItem("layout");
    }
});

function acceptCookies() {
    const now = new Date().getTime();
    localStorage.setItem("cookiesAcceptedAt", now);
    document.getElementById('cookieBanner').classList.add('d-none');
    enableLogin();
    enableLoginButtons();
}

function cookiesStillValid() {
    const timestamp = localStorage.getItem("cookiesAcceptedAt");
    if (!timestamp) return false;

    const acceptedAt = parseInt(timestamp);
    const now = new Date().getTime();
    const oneYear = 1000 * 60 * 60 * 24 * 365; // 1 Jahr

    return (now - acceptedAt) < oneYear;
}

function enableLogin() {
    const loginArea = document.getElementById('loginArea');
    if (loginArea) {
        loginArea.classList.remove('d-none');
    }
}

function disableLoginButtons() {
    const logInBtn = document.getElementById('logIn');
    const guestBtn = document.getElementById('guestLogIn');
    if (logInBtn) logInBtn.disabled = true;
    if (guestBtn) guestBtn.disabled = true;
}

function enableLoginButtons() {
    const logInBtn = document.getElementById('logIn');
    const guestBtn = document.getElementById('guestLogIn');
    if (logInBtn) logInBtn.disabled = false;
    if (guestBtn) guestBtn.disabled = false;
}

window.addEventListener('DOMContentLoaded', () => {
    const stillValid = cookiesStillValid();
    const acceptBtn = document.getElementById('acceptCookiesBtn');
    const banner = document.getElementById('cookieBanner');
    const loginArea = document.getElementById('loginArea');

    console.log("cookiesAcceptedAt:", localStorage.getItem("cookiesAcceptedAt"));
    console.log("cookiesStillValid():", stillValid);

    if (!stillValid) {
        // Kein Cookie oder abgelaufen
        if (banner) banner.classList.remove('d-none');
        if (loginArea) loginArea.classList.remove('d-none');
        disableLoginButtons();
    } else {
        // Zustimmung gültig
        if (banner) banner.classList.add('d-none');
        if (loginArea) loginArea.classList.remove('d-none');
        enableLoginButtons();
    }

    if (acceptBtn) {
        acceptBtn.addEventListener('click', acceptCookies);
    }
});