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
    const greetingPhrase = getGreetingPhrase();
    element.innerHTML = (name && name !== "Guest")
        ? `${greetingPhrase}, <span class="greeting-name">${name}</span>`
        : `${greetingPhrase}!`;
}

/**
 * Initializes the greeting logic on page load.
 * Shows animated greeting only once after login on mobile.
 */
function initGreeting() {
    let greetingContainer = document.querySelector(".greeting");
    let greetingText = document.querySelector(".greeting-text");
    let grid = document.querySelector(".metrics-grid");
    let header = document.querySelector(".dashboard-header");

    if (!greetingContainer || !greetingText || !grid || !header) return;

    setGreetingText(greetingText, greetsName);

    if (isLogin && window.innerWidth <= 990) {
        showGreetingWithTransition();

        // Remove login parameter to avoid re-showing greeting on reload
        urlParams.delete("login");
        window.history.replaceState({}, document.title, `?${urlParams}`);
    } else {
        greetingContainer.style.display = "none";
        grid.style.display = "block";
        header.style.display = "flex";
    }
}

/**
 * Shows the greeting with animation and fades it out automatically.
 */
function showGreetingWithTransition() {
    const greeting = document.querySelector(".greeting");
    const grid = document.querySelector(".metrics-grid");
    const header = document.querySelector(".dashboard-header");

    if (!greeting || !grid || !header) return;

    greeting.style.display = "flex";
    greeting.classList.add("animate-in");
    grid.style.display = "none";
    header.style.display = "none";

    setTimeout(() => {
        greeting.classList.remove("animate-in");
        greeting.classList.add("animate-out");

        setTimeout(() => {
            greeting.style.display = "none";
            grid.style.display = "block";
            header.style.display = "flex";
        }, 400);
    }, 850);
}

/**
 * Re-applies the greeting text (e.g. when returning to the page from another view).
 */
function initGreetingRepeat() {
    let greetingRepeatText = document.querySelector(".greeting-text-repeat");
    setGreetingText(greetingRepeatText, greetsName);
}

/**
 * Fetches task data from Firebase and updates metrics.
 */
async function loadSummaryData() {
    try {
        let response = await fetch(FIREBASE_URL);
        let tasks = await response.json();

        let todo = 0;
        let done = 0;
        let inProgress = 0;
        let awaitingFeedback = 0;
        let urgent = 0;
        let total = 0;
        let upcomingDate = null;

        for (let taskId in tasks) {
            let task = tasks[taskId];
            total++;

            switch (task.condition) {
                case "ToDo": todo++; break;
                case "done": done++; break;
                case "inProgress": inProgress++; break;
                case "feedback": awaitingFeedback++; break;
            }

            if (task.priority === "urgent") urgent++;

            let taskDate = new Date(task.date);
            if (taskDate > new Date() && (!upcomingDate || taskDate < new Date(upcomingDate))) {
                upcomingDate = task.date;
            }
        }

        document.getElementById("summaryTodo").textContent = todo;
        document.getElementById("summaryDone").textContent = done;
        document.getElementById("summaryProgress").textContent = inProgress;
        document.getElementById("summaryFeedback").textContent = awaitingFeedback;
        document.getElementById("summaryUrgent").textContent = urgent;
        document.getElementById("summaryTotal").textContent = total;

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
