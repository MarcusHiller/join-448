// Extract parameters from the URL
let urlParams = new URLSearchParams(window.location.search);
let greetsName = urlParams.get("name");
let isLogin = urlParams.get("login") === "true";

// Firebase endpoint for retrieving task data
let FIREBASE_URL = "https://join-4215a-default-rtdb.europe-west1.firebasedatabase.app/join/tasks.json";

// Get the current time
let now = new Date();
let hour = now.getHours() + now.getMinutes() / 60;

// Determine the appropriate greeting phrase based on the time of day
let greetingPhrase = (hour >= 5.5 && hour < 10.5) ? "Good morning" :
    (hour < 17) ? "Good day" :
        (hour < 21.5) ? "Good evening" :
            "Good night";

            
/**
 * Fetches task data from Firebase and updates the summary metrics on the page.
 * Calculates various counts like "To Do", "Done", "In Progress", etc.,
 * and finds the next upcoming deadline.
 * 
 * @async
 * @function loadSummaryData
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

            // Count tasks by condition
            switch (task.condition) {
                case "ToDo":
                    todo++;
                    break;
                case "done":
                    done++;
                    break;
                case "inProgress":
                    inProgress++;
                    break;
                case "feedback":
                    awaitingFeedback++;
                    break;
            }

            // Count urgent tasks
            if (task.priority === "urgent") urgent++;

            // Find the soonest upcoming deadline
            let taskDate = new Date(task.date);
            if (taskDate > now && (!upcomingDate || taskDate < new Date(upcomingDate))) {
                upcomingDate = task.date;
            }
        }

        // Update DOM elements with task counts
        document.getElementById("summaryTodo").textContent = todo;
        document.getElementById("summaryDone").textContent = done;
        document.getElementById("summaryProgress").textContent = inProgress;
        document.getElementById("summaryFeedback").textContent = awaitingFeedback;
        document.getElementById("summaryUrgent").textContent = urgent;
        document.getElementById("summaryTotal").textContent = total;

        // Display the upcoming deadline if one exists
        if (upcomingDate) {
            document.getElementById("summaryDeadline").textContent = formatDate(upcomingDate);
        }
    } catch (err) {
        console.error("Error loading Firebase tasks:", err);
    }
}


/**
 * Formats a date string into a readable format.
 * 
 * @param {string} dateString - Date in ISO format
 * @returns {string} - Formatted date string
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
 * Navigates to a new URL with a short delay and visual feedback.
 * 
 * @param {string} url - Destination URL
 * @param {HTMLElement} element - The clicked element for styling
 */
function navigateTo(url, element) {
    element.classList.add("clicked");
    setTimeout(() => {
        window.location.href = url;
    }, 80);
}


/**
 * Updates the greeting text element based on login state and user name.
 * 
 * @param {HTMLElement} element - The element to set greeting text inside
 * @param {string} name - Name of the user
 */
function setGreetingText(element, name) {
    if (!element) return;
    element.innerHTML = (name && name !== "Guest")
        ? `${greetingPhrase}, <span class="greeting-name">${name}</span>`
        : `${greetingPhrase}!`;
}


/**
 * For mobile: hides the greeting and shows the metrics grid when the user clicks a button.
 * 
 * @param {Event} event - The triggered click event
 * @returns {boolean} - False to prevent default if mobile, true otherwise
 */
function showMetricsGrid(event) {
    if (window.innerWidth <= 990) {
        event.preventDefault();
        let greeting = document.querySelector(".greeting");
        let grid = document.querySelector(".metrics-grid");

        if (greeting) greeting.classList.add("d-none");
        if (grid) {
            grid.classList.remove("d-none");
            grid.classList.add("show-mobile");
        }
        return false;
    }
    return true;
}


/**
 * Initializes the greeting message on the summary page after login.
 * On mobile, shows only the greeting initially.
 */
function initGreeting() {
    let greetingContainer = document.querySelector(".greeting");
    let greetingText = document.querySelector(".greeting-text");
    let grid = document.querySelector(".metrics-grid");
    let header = document.querySelector(".dashboard-header");

    if (!greetingContainer || !greetingText || !grid || !header) return;

    setGreetingText(greetingText, greetsName);

    if (isLogin && window.innerWidth <= 990) {
        greetingContainer.style.display = "flex";
        grid.style.display = "none";
        header.style.display = "none";

        // Remove login parameter from URL so greeting isn't shown again on refresh
        urlParams.delete("login");
        window.history.replaceState({}, document.title, `?${urlParams}`);
    } else {
        greetingContainer.style.display = "none";
        grid.style.display = "block";
        header.style.display = "flex";
    }
}


/**
 * Re-applies the greeting text, e.g. when returning to the summary page from another view.
 */
function initGreetingRepeat() {
    let greetingRepeatText = document.querySelector(".greeting-text-repeat");
    setGreetingText(greetingRepeatText, greetsName);
}

