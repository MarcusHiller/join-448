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

function isUserLoged() {
    let statusLogIn = localStorage.getItem("loggedIn");
    if (statusLogIn === "false") {
        window.location.href = "../index.html";
    }
}


function logOut() {
    localStorage.setItem("loggedIn", "false");
    window.location.href = "../index.html";
    localStorage.removeItem("layout");
}

//window.onload = init;

async function loadHTML(file, ID) {
        let res = await fetch(file);
        let data = await res.text();
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


async function loadHTML(file, elementId) {
    let response = await fetch(file);
    let html = await response.text();
    let container = document.getElementById(elementId);
    if (container) container.innerHTML = html;
}

// Layout Handling
function setLayoutAndRedirect(layout, url) {
    localStorage.setItem('layout', layout);
    window.location.href = url;
}

async function loadHTML(file, elementId) {
    let response = await fetch(file);
    let html = await response.text();
    let container = document.getElementById(elementId);
    if (container) container.innerHTML = html;
}

async function loadHeaderNavbarIntern() {
    await Promise.all([
        loadHTML("/html/header.html", "header-placeholder"),
        loadHTML("/html/navbar.html", "navbar-section")
    ]);
    markLegalPrivacyActiveLink();
}

async function loadHeaderNavbarExtern() {
    await Promise.all([
        loadHTML("/html/header_extern.html", "header-placeholder"),
        loadHTML("/html/navbar_extern.html", "navbar-section")
    ]);
}

function markLegalPrivacyActiveLink() {
    let path = window.location.pathname;
    if (path.includes("privacy_policy.html")) {
        let el = document.getElementById("privacy_page");
        if (el) el.classList.add("active-menu");
    }
    if (path.includes("legal_notice.html")) {
        let el = document.getElementById("legal_notice_page");
        if (el) el.classList.add("active-menu");
    }
}

// Login & Cookies
function acceptCookies() {
    let now = new Date().getTime();
    localStorage.setItem("cookiesAcceptedAt", now);
    document.getElementById("cookieBanner").classList.add("d-none");
    enableLogin();
    enableLoginButtons();
}

function cookiesStillValid() {
    let timestamp = localStorage.getItem("cookiesAcceptedAt");
    if (!timestamp) return false;
    let acceptedAt = parseInt(timestamp);
    let now = new Date().getTime();
    let oneYear = 1000 * 60 * 60 * 24 * 365;
    return now - acceptedAt < oneYear;
}

function enableLogin() {
    let loginArea = document.getElementById("loginArea");
    if (loginArea) loginArea.classList.remove("d-none");
}

function disableLoginButtons() {
    let logInBtn = document.getElementById("logIn");
    let guestBtn = document.getElementById("guestLogIn");
    if (logInBtn) logInBtn.disabled = true;
    if (guestBtn) guestBtn.disabled = true;
}

function enableLoginButtons() {
    let logInBtn = document.getElementById("logIn");
    let guestBtn = document.getElementById("guestLogIn");
    if (logInBtn) logInBtn.disabled = false;
    if (guestBtn) guestBtn.disabled = false;
}

function logOut() {
    localStorage.setItem("loggedIn", "false");
    window.location.href = "../index.html";
    localStorage.removeItem("layout");
}

function isUserLoged() {
    let statusLogIn = localStorage.getItem("loggedIn");
    if (statusLogIn === "false") {
        window.location.href = "../index.html";
    }
}

// Init
window.addEventListener("DOMContentLoaded", async () => {
    let layout = localStorage.getItem("layout");
    if (layout === "intern") {
        await loadHeaderNavbarIntern();
    } else if (layout === "extern") {
        await loadHeaderNavbarExtern();
    }

    // Cookie Banner
    let stillValid = cookiesStillValid();
    let acceptBtn = document.getElementById("acceptCookiesBtn");
    let banner = document.getElementById("cookieBanner");
    let loginArea = document.getElementById("loginArea");

    if (!stillValid) {
        if (banner) banner.classList.remove("d-none");
        if (loginArea) loginArea.classList.remove("d-none");
        disableLoginButtons();
    } else {
        if (banner) banner.classList.add("d-none");
        if (loginArea) loginArea.classList.remove("d-none");
        enableLoginButtons();
    }

    if (acceptBtn) {
        acceptBtn.addEventListener("click", acceptCookies);
    }

    // Back Arrow
    let backClick = document.getElementById("backArrow");
    if (backClick) {
        backClick.addEventListener("click", () => history.back());
    }
});

/*async function loadHeaderNavbarIntern() {
    await Promise.all([
        loadHTML("/html/header.html", "header-placeholder"),
        loadHTML("/html/navbar.html", "navbar-section")
    ]);
    markLegalPrivacyActiveLink();
}


async function loadHeaderNavbarExtern() {
    await Promise.all([
        loadHTML("/html/header_extern", "header-placeholder"),
        loadHTML("/html/navbar_extern.html", "navbar-section")
    ]);
}



function setLayoutAndRedirect(layout, url) {
    localStorage.setItem('layout', layout);
    window.location.href = url;
}

document.addEventListener("DOMContentLoaded", () => {
    let layout = localStorage.getItem("layout");

    if (layout === "intern") {
        loadHeaderNavbarIntern();
    } else if (layout === "extern") {
        loadHeaderNavbarExtern();
    }
});

function markLegalPrivacyActiveLink() {
    let path = window.location.pathname;

    if (path.includes("privacy_policy.html")) {
        let el = document.getElementById("privacy_page");
        if (el) el.classList.add("active-menu");
    }

    if (path.includes("legal_notice.html")) {
        let el = document.getElementById("legal_notice_page");
        if (el) el.classList.add("active-menu");
    }
}


function acceptCookies() {
    let now = new Date().getTime();
    localStorage.setItem("cookiesAcceptedAt", now);
    document.getElementById('cookieBanner').classList.add('d-none');
    enableLogin();
    enableLoginButtons();
}


function cookiesStillValid() {
    let timestamp = localStorage.getItem("cookiesAcceptedAt");
    if (!timestamp) return false;
    let acceptedAt = parseInt(timestamp);
    let now = new Date().getTime();
    let oneYear = 1000 * 60 * 60 * 24 * 365; // 1 Jahr
    return (now - acceptedAt) < oneYear;
}


function enableLogin() {
    let loginArea = document.getElementById('loginArea');
    if (loginArea) {
        loginArea.classList.remove('d-none');
    }
}


function disableLoginButtons() {
    let logInBtn = document.getElementById('logIn');
    let guestBtn = document.getElementById('guestLogIn');
    if (logInBtn) logInBtn.disabled = true;
    if (guestBtn) guestBtn.disabled = true;
}


function enableLoginButtons() {
    let logInBtn = document.getElementById('logIn');
    let guestBtn = document.getElementById('guestLogIn');
    if (logInBtn) logInBtn.disabled = false;
    if (guestBtn) guestBtn.disabled = false;
}


window.addEventListener('DOMContentLoaded', () => {
    let stillValid = cookiesStillValid();
    let acceptBtn = document.getElementById('acceptCookiesBtn');
    let banner = document.getElementById('cookieBanner');
    let loginArea = document.getElementById('loginArea');
    if (!stillValid) {
        if (banner) banner.classList.remove('d-none');
        if (loginArea) loginArea.classList.remove('d-none');
        disableLoginButtons();
    } else {
        if (banner) banner.classList.add('d-none');
        if (loginArea) loginArea.classList.remove('d-none');
        enableLoginButtons();
    }
    if (acceptBtn) {
        acceptBtn.addEventListener('click', acceptCookies);
    }
});


window.addEventListener("DOMContentLoaded", () => {
    let backClick = document.getElementById("backArrow");
    if (backClick) {
        backClick.addEventListener("click", () => {
            history.back();
        });
    }
});
*/