function navigateTo(url, element) {
    element.classList.add('clicked');
    setTimeout(() => {
        window.location.href = url;
    }, 80);
}

function showMetricsGrid(event) {
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
