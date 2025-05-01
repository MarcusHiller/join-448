let urlParams = new URLSearchParams(window.location.search);
let greetsName = urlParams.get('name');
let isLogin = urlParams.get('login') === 'true';
let now = new Date();
let hour = now.getHours() + now.getMinutes() / 60;
let greetingPhrase = 'Good day';

if (hour >= 5.5 && hour < 10.5) greetingPhrase = 'Good morning';
else if (hour >= 10.5 && hour < 17) greetingPhrase = 'Good day';
else if (hour >= 17 && hour < 21.5) greetingPhrase = 'Good evening';
else greetingPhrase = 'Good night';

function navigateTo(url, element) {
    element.classList.add('clicked');
    setTimeout(() => {
        window.location.href = url;
    }, 80);
}

function setGreetingText(element, name) {
    if (!element) return;

    if (name && name !== "Guest") {
        element.innerHTML = `${greetingPhrase}, <span class="greeting-name">${name}</span>`;
    } else {
        element.innerHTML = `${greetingPhrase}!`;
    }
}

function showMetricsGrid(event) {
    if (window.innerWidth <= 990) {
        event.preventDefault();
        let greeting = document.querySelector('.greeting');
        let grid = document.querySelector('.metrics-grid');

        if (greeting) greeting.classList.add('d-none');
        if (grid) {
            grid.classList.remove('d-none')
            grid.classList.add('show-mobile');
        }
        return false;
    }
    return true;
}

function initGreeting() {
    let greetingContainer = document.querySelector('.greeting');
    let greetingText = document.querySelector('.greeting-text');
    let grid = document.querySelector('.metrics-grid');
    let header = document.querySelector('.dashboard-header');

    if (!greetingContainer || !greetingText || !grid || !header) return;

    setGreetingText(greetingText, greetsName);

    if (isLogin && window.innerWidth <= 990) {
        greetingContainer.style.display = 'flex';
        grid.style.display = 'none';
        header.style.display = 'none';

        urlParams.delete('login');
        window.history.replaceState({}, document.title, `?${urlParams}`);
    } else {
        greetingContainer.style.display = 'none';
        grid.style.display = 'block';
        header.style.display = 'flex';
    }
}

function initGreetingRepeat() {
    let greetingRepeatText = document.querySelector('.greeting-text-repeat');
    setGreetingText(greetingRepeatText, greetsName);
}
