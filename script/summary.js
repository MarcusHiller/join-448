function navigateTo(url, element) {
    element.classList.add('clicked');
    setTimeout(() => {
        window.location.href = url;
    }, 80);
}