/**
 * Initializes the page by loading header and navbar, and triggers greeting logic on the summary page.
 * 
 * @async
 * @function init
 * @param {string} page - The ID of the page being initialized (e.g., 'summary_page').
 */
async function init(page) {
    await loadHTML("header.html", "header-placeholder");
    await loadHTML("navbar.html", "navbar-section");
    activePageHiglight(page);

    if (page === 'summary_page') {
        initGreeting();
        initGreetingRepeat();
    }
}


/**
 * Checks if the user is logged in and redirects to the start page if not.
 * 
 * @function isUserLoged
 */
function isUserLoged() {
    let statusLogIn = localStorage.getItem("loggedIn");
    if (statusLogIn === "false") {
        window.location.href = "../index.html";
    }
}


/**
 * Logs the user out by clearing login state and redirecting to the login page.
 * 
 * @function logOut
 */
function logOut() {
    localStorage.setItem("loggedIn", "false");
    localStorage.removeItem("layout");
    window.location.href = "../index.html";
}


/**
 * Loads an HTML snippet into a target DOM element.
 * 
 * @async
 * @function loadHTML
 * @param {string} file - Path to the HTML file.
 * @param {string} elementId - ID of the target container element.
 */
async function loadHTML(file, elementId) {
    let response = await fetch(file);
    let html = await response.text();
    let container = document.getElementById(elementId);
    if (container) container.innerHTML = html;
}


/**
 * Highlights the currently active page in the navigation menu.
 * 
 * @function activePageHiglight
 * @param {string} page - ID of the currently active menu element.
 */
function activePageHiglight(page) {
    const ids = ["summary_page", "add_task_page", "board_page", "contact_page", "help_page"];
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.remove("active-menu");
    });
    const current = document.getElementById(page);
    if (current) current.classList.add("active-menu");
}


/**
 * Toggles the burger menu's slide animation on mobile devices.
 * 
 * @function burgerMenuSliding
 */
function burgerMenuSliding() {
    document.getElementById("burger_menu").classList.toggle("burger-menu-transition");
}


/**
 * Stores layout preference and redirects to a new page.
 * 
 * @function setLayoutAndRedirect
 * @param {string} layout - Either 'intern' or 'extern'.
 * @param {string} url - Destination URL to redirect to.
 */
function setLayoutAndRedirect(layout, url) {
    localStorage.removeItem('layout');
    localStorage.setItem('layout', layout);
    window.location.href = url;
}


/**
 * Loads the internal header and navbar for authenticated users.
 * 
 * @async
 * @function loadHeaderNavbarIntern
 */
async function loadHeaderNavbarIntern() {
    await Promise.all([
        loadHTML("/html/header.html", "header-placeholder"),
        loadHTML("/html/navbar.html", "navbar-section")
    ]);
    markLegalPrivacyActiveLink();
}


/**
 * Loads the external header and navbar for guests.
 * 
 * @async
 * @function loadHeaderNavbarExtern
 */
async function loadHeaderNavbarExtern() {
    await Promise.all([
        loadHTML("/html/header_extern.html", "header-placeholder"),
        loadHTML("/html/navbar_extern.html", "navbar-section")
    ]);
}


/**
 * Marks the current page in the navbar as active for legal/privacy pages.
 * 
 * @function markLegalPrivacyActiveLink
 */
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


/**
 * Accepts cookies and enables the login area and buttons.
 * Saves the acceptance time in localStorage.
 * 
 * @function acceptCookies
 */
function acceptCookies() {
    let now = new Date().getTime();
    localStorage.setItem("cookiesAcceptedAt", now);
    document.getElementById("cookieBanner").classList.add("d-none");
    enableLogin();
    enableLoginButtons();
}


/**
 * Checks whether the cookie acceptance is still valid (within 1 year).
 * 
 * @function cookiesStillValid
 * @returns {boolean} True if cookies are still valid, false otherwise.
 */
function cookiesStillValid() {
    let timestamp = localStorage.getItem("cookiesAcceptedAt");
    if (!timestamp) return false;
    let acceptedAt = parseInt(timestamp);
    let now = new Date().getTime();
    let oneYear = 1000 * 60 * 60 * 24 * 365;
    return now - acceptedAt < oneYear;
}


/**
 * Shows the login area.
 * 
 * @function enableLogin
 */
function enableLogin() {
    let loginArea = document.getElementById("loginArea");
    if (loginArea) loginArea.classList.remove("d-none");
}


/**
 * Disables the login and guest login buttons.
 * 
 * @function disableLoginButtons
 */
function disableLoginButtons() {
    let logInBtn = document.getElementById("logIn");
    let guestBtn = document.getElementById("guestLogIn");
    if (logInBtn) logInBtn.disabled = true;
    if (guestBtn) guestBtn.disabled = true;
}


/**
 * Enables the login and guest login buttons.
 * 
 * @function enableLoginButtons
 */
function enableLoginButtons() {
    let logInBtn = document.getElementById("logIn");
    let guestBtn = document.getElementById("guestLogIn");
    if (logInBtn) logInBtn.disabled = false;
    if (guestBtn) guestBtn.disabled = false;
}


/**
 * Handles layout and login state based on localStorage on page load.
 * Also sets up cookie banner visibility and back arrow behavior.
 */
window.addEventListener("DOMContentLoaded", async () => {
    if (window.location.pathname.includes("privacy_policy.html") ||
        window.location.pathname.includes("legal_notice.html")) {
        localStorage.removeItem("layout");
    }

    await loadHTML("/html/rotate_warning.html", "rotate-warning-placeholder");
    checkOrientation();

    let layout = localStorage.getItem("layout");
    let loggedIn = localStorage.getItem("loggedIn");

    if (!layout && loggedIn === "true") {
        layout = "intern";
        localStorage.setItem("layout", "intern");
    }

    if (layout === "intern") {
        await loadHeaderNavbarIntern();
    } else {
        await loadHeaderNavbarExtern();
    }

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

    let backClick = document.getElementById("backArrow");
    if (backClick) {
        backClick.addEventListener("click", () => history.back());
    }
});


/**
 * Checks the device orientation and toggles a fullscreen warning overlay.
 * Only active on mobile-sized screens in landscape mode.
 * 
 * @function checkOrientation
 */
function checkOrientation() {
    const warning = document.getElementById("rotateWarning");
    if (!warning) return;

    const isLandscape = window.matchMedia("(orientation: landscape)").matches;
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    const smallScreen = Math.min(window.innerWidth, window.innerHeight) <= 800;

    warning.style.display = (isMobile && smallScreen && isLandscape) ? "flex" : "none";
}

window.addEventListener("load", checkOrientation);
window.addEventListener("resize", checkOrientation);
window.addEventListener("orientationchange", checkOrientation);


function spinningLoaderStart() {
    let spinner = document.getElementById('spinnerOverLay');
    spinner.classList.remove('d-none');
}


function spinningLoaderEnd() {
    let spinner = document.getElementById('spinnerOverLay');
    spinner.classList.add('d-none');
}