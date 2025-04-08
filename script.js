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
    document.getElementById("privacy_policy_page").classList.remove("active-menu");
    document.getElementById("legal_notice_page").classList.remove("active-menu");

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


document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const isPublicPage = location.pathname.includes('privacy_policy.html') || location.pathname.includes('legal_notice.html');

    if (!isLoggedIn && isPublicPage) {
        // Auth-Links in der Navbar ausblenden
        document.querySelectorAll('.nav-auth-only').forEach(link => {
            link.classList.add('d_none');
        });

        // (Optional: nav-public sichtbar machen, falls sie per Default versteckt wären)
        document.querySelectorAll('.nav-public').forEach(link => {
            link.classList.remove('d_none');
        });
    }
});




