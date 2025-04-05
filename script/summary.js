function navigateTo(url, element) {
    element.classList.add('clicked');
    setTimeout(() => {
        window.location.href = url;
    }, 80);
}

/*function showMetricsGrid(event) {
    if (window.innerWidth <= 570) {
        event.preventDefault();
        let greeting = document.querySelector('.greeting');
        let grid = document.querySelector('.metricsGrid');
        let devideContent = document.querySelector('.devideContent');
        let header = document.querySelector('.dashboardHeader');
        if (greeting && grid && devideContent) {
            greeting.style.display = 'none';
            grid.classList.add('show-mobile');
            devideContent.style.height = 'auto';
        }
        if (header) {
            header.style.display = 'flex';
        }
        return false;
    }
    return true;
}
*/

function showMetricsGrid(event) {
    if (window.innerWidth <= 990) {
        event.preventDefault();
        const greeting = document.querySelector('.greeting');
        const grid = document.querySelector('.metricsGrid');
        
        if (greeting) greeting.classList.add('d-none');
        if (grid) {
            grid.classList.remove('d-none')
            grid.classList.add('show-mobile');
        }
        /* if (devideContent) devideContent.style.height = 'auto';
        if (header) header.style.display = 'flex';
        const devideContent = document.querySelector('.devideContent');
        const header = document.querySelector('.dashboardHeader');*/

        return false;
    }
    return true;
}

function initGreeting() {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const greetingContainer = document.querySelector('.greeting');
    const greetingText = document.querySelector('.greetingText');
    const greetingName = document.getElementById('greetingUser');
    const grid = document.querySelector('.metricsGrid');

    if (!greetingContainer || !greetingText || !greetingName || !grid) return;

    // Uhrzeit-Logik
    const now = new Date();
    const hour = now.getHours() + now.getMinutes() / 60;
    let greetingPhrase = 'Good day';

    if (hour >= 5.5 && hour < 10.5) greetingPhrase = 'Good morning';
    else if (hour >= 10.5 && hour < 17) greetingPhrase = 'Good day';
    else if (hour >= 17 && hour < 21.5) greetingPhrase = 'Good evening';
    else greetingPhrase = 'Good night';

    // Name einfügen
    if (name && name !== "Guest") {
        greetingText.innerHTML = `${greetingPhrase}, <span class="greetingName" id="greetingUser">${name}</span>`;
    } else {
        greetingText.innerHTML = `${greetingPhrase}!`;
    }

    // Responsive Verhalten
    if (window.innerWidth <= 990) {
        greetingContainer.style.display = 'flex';
        grid.style.display = 'none';
    } else {
        greetingContainer.style.display = 'none';
        grid.style.display = 'block';
    }

}

