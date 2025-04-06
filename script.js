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

    document.getElementById(page).classList.add("active-menu");
}

function burgerMenuSliding() {
    document.getElementById("burger_menu").classList.toggle("burger-menu-transition");
}