// Extract parameters from the URL
let urlParams = new URLSearchParams(window.location.search);
let greetsName = urlParams.get("name");
let isLogin = urlParams.get("login") === "true";


// Firebase endpoint for retrieving task data
let FIREBASE_URL = "https://join-4215a-default-rtdb.europe-west1.firebasedatabase.app/join/tasks.json";



/**
 * Returns the appropriate greeting phrase based on the current time.
 * @returns {string} - Greeting phrase
 */
function getGreetingPhrase() {
    let now = new Date();
    let hour = now.getHours() + now.getMinutes() / 60;
    return (hour >= 5.5 && hour < 10.5) ? "Good morning" :
        (hour < 17) ? "Good day" :
            (hour < 21.5) ? "Good evening" :
                "Good night";
}



/**
 * Sets the greeting text dynamically based on login state and user name.
 * @param {HTMLElement} element - The element to insert the greeting text into
 * @param {string} name - User's name
 */
function setGreetingText(element, name) {
    if (!element) return;
    let greetingPhrase = getGreetingPhrase();
    element.innerHTML = (name && name !== "Guest")
        ? `${greetingPhrase}, <span class="greeting-name">${name}</span>`
        : `${greetingPhrase}!`;
}


/**
 * Initializes greeting logic on page load.
 * Triggers animated greeting once after login on mobile view.
 */
function initGreeting() {
    let greeting = document.querySelector(".greeting");
    let greetingText = document.querySelector(".greeting-text");
    let grid = document.querySelector(".metrics-grid");
    let header = document.querySelector(".dashboard-header");
    let dashboard = document.querySelector(".dashboard-container");
    if (!greeting || !greetingText || !grid || !header || !dashboard) return;
    setGreetingText(greetingText, greetsName);
    if (isLogin && window.innerWidth <= 990) {
        showGreetingWithTransition();
        urlParams.delete("login");
        window.history.replaceState({}, document.title, `?${urlParams}`);
    } else {
        [grid, header, dashboard].forEach(el => el.classList.remove("hidden"));
        loadSummaryData();
    }
}


/**
 * Displays the greeting with transition and starts hiding logic.
 */
function showGreetingWithTransition() {
    let greeting = document.querySelector(".greeting");
    let grid = document.querySelector(".metrics-grid");
    let header = document.querySelector(".dashboard-header");
    let dashboard = document.querySelector(".dashboard-container");
    if (!greeting || !grid || !header || !dashboard) return;
    [grid, header, dashboard].forEach(el => el.classList.add("hidden"));
    greeting.style.display = "flex";
    greeting.classList.add("animate-in");
    setGreetingHideTimeout(greeting, [grid, header, dashboard]);
}


/**
 * Starts timeout to hide the greeting and show other elements.
 * 
 * @param {HTMLElement} greeting - The greeting element.
 * @param {HTMLElement[]} toShow - Elements to show again after hiding greeting.
 */
function setGreetingHideTimeout(greeting, toShow) {
    setTimeout(() => {
        greeting.classList.replace("animate-in", "animate-out");
        setTimeout(() => {
            greeting.style.display = "none";
            greeting.classList.remove("animate-out");
            toShow.forEach(el => el.classList.remove("hidden"));
            loadSummaryData();
        }, 400);

    }, 2000);
}


/**
 * Re-applies the greeting text (e.g. when returning to the page from another view).
 */
function initGreetingRepeat() {
    let greetingRepeatText = document.querySelector(".greeting-text-repeat");
    setGreetingText(greetingRepeatText, greetsName);
}



/**
 * Fetches task data from Firebase and updates summary metrics in the DOM.
 */
async function loadSummaryData() {
    try {
        let response = await fetch(FIREBASE_URL);
        let tasks = await response.json();
        let {
            todo, done, inProgress, awaitingFeedback, urgent, total, upcomingDate
        } = computeTaskMetrics(tasks);
        let metrics = {
            summaryTodo: todo, summaryDone: done, summaryProgress: inProgress, summaryFeedback: awaitingFeedback, summaryUrgent: urgent, summaryTotal: total
        };
        for (let id in metrics) {
            document.getElementById(id).textContent = metrics[id];
        }
        if (upcomingDate) {
            document.getElementById("summaryDeadline").textContent = formatDate(upcomingDate);
        }
    } catch (err) {
        console.error("Error loading Firebase tasks:", err);
    }
}


/**
 * Formats ISO date string to readable format.
 * @param {string} dateString
 * @returns {string}
 */
function formatDate(dateString) {
    let date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}



/**
 * Handles metric tile click and visual feedback.
 * @param {string} url
 * @param {HTMLElement} element
 */
function navigateTo(url, element) {
    element.classList.add("clicked");
    setTimeout(() => {
        window.location.href = url;
    }, 80);
}