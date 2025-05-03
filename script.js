/**
 * Initializes the page by loading header and navbar, and triggers greeting logic on the summary page.
 * 
 * @async
 * @function init
 * @param {string} page - The ID of the page being initialized (e.g., 'summary_page').
 */
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
    localStorage.setItem("loggedIn", "false");   // bleibt wie bei dir
    localStorage.removeItem("layout");           // Layout zurücksetzen (intern vs. extern)
    window.location.href = "../index.html";      // Weiterleitung bleibt bestehen
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
    document.getElementById("summary_page").classList.remove("active-menu");
    document.getElementById("add_task_page").classList.remove("active-menu");
    document.getElementById("board_page").classList.remove("active-menu");
    document.getElementById("contact_page").classList.remove("active-menu");
    document.getElementById("help_page").classList.remove("active-menu");
    document.getElementById(page).classList.add("active-menu");
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
 * 
 * @event DOMContentLoaded
 */
window.addEventListener("DOMContentLoaded", async () => {
    await loadHTML("/html/rotate_warning.html", "rotate-warning-placeholder");
    checkOrientation();

    let layout = localStorage.getItem("layout");
    if (layout === "intern") {
        await loadHeaderNavbarIntern();
    } else if (layout === "extern") {
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
 * Checks the current device orientation and toggles a fullscreen warning overlay.
 * 
 * The warning only appears on mobile devices (viewport width < 990px)
 * and only when the device is in landscape mode (width > height).
 * 
 * The overlay must be present in the DOM with the ID "rotateWarning".
 * 
 * @function checkOrientation
 * @returns {void}
 */
function checkOrientation() {
    const warning = document.getElementById("rotateWarning");
    if (!warning) return;

    const isMobile = window.innerWidth < 990;
    const isLandscape = window.innerWidth > window.innerHeight;

    warning.style.display = (isMobile && isLandscape) ? "flex" : "none";
}
// Attach orientation check to relevant window events
window.addEventListener("load", checkOrientation);
window.addEventListener("resize", checkOrientation);
window.addEventListener("orientationchange", checkOrientation);
