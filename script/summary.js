let urlParams = new URLSearchParams(window.location.search);
let greetsName = urlParams.get("name");
let isLogin = urlParams.get("login") === "true";

let FIREBASE_URL = "https://join-4215a-default-rtdb.europe-west1.firebasedatabase.app/join/tasks.json";

let now = new Date();
let hour = now.getHours() + now.getMinutes() / 60;

let greetingPhrase = (hour >= 5.5 && hour < 10.5) ? "Good morning" :
    (hour < 17) ? "Good day" :
        (hour < 21.5) ? "Good evening" :
            "Good night";

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

            if (task.priority === "urgent") urgent++;

            let taskDate = new Date(task.date);
            if (taskDate > now && (!upcomingDate || taskDate < new Date(upcomingDate))) {
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
        console.error("Fehler beim Laden der Firebase Tasks:", err);
    }
}

function formatDate(dateString) {
    let date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}

function navigateTo(url, element) {
    element.classList.add("clicked");
    setTimeout(() => {
        window.location.href = url;
    }, 80);
}

function setGreetingText(element, name) {
    if (!element) return;
    element.innerHTML = (name && name !== "Guest")
        ? `${greetingPhrase}, <span class="greeting-name">${name}</span>`
        : `${greetingPhrase}!`;
}

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

        urlParams.delete("login");
        window.history.replaceState({}, document.title, `?${urlParams}`);
    } else {
        greetingContainer.style.display = "none";
        grid.style.display = "block";
        header.style.display = "flex";
    }
}

function initGreetingRepeat() {
    let greetingRepeatText = document.querySelector(".greeting-text-repeat");
    setGreetingText(greetingRepeatText, greetsName);
}