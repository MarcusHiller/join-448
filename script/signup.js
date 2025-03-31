function toggleCheckbox(event) {
    event.preventDefault();
    const checkbox = document.getElementById("checkbox");
    const checkboxImage = document.getElementById("checkboxImg");
    let isChecked = checkbox.dataset.checked === "true";
    isChecked = !isChecked;
    checkbox.dataset.checked = isChecked;
    checkbox.checked = isChecked
    checkboxImage.src = checkbox.checked ? "../assets/img/icon/checked.svg" : "../assets/img/icon/rectangle.svg";
}


function hoverImage(isHover, event) {
    event.preventDefault();
    const checkbox = document.getElementById("checkbox");
    const checkboxImage = document.getElementById("checkboxImg");
    if (checkbox.dataset.checked) {
        checkboxImage.src = isHover ? "../assets/img/icon/rectangle.svg" : "../assets/img/icon/checked.svg";
    }
    if (!checkbox.checked) {
        checkboxImage.src = isHover ? "../assets/img/icon/checked.svg" : "../assets/img/icon/rectangle.svg";
    }
}


document.getElementById('signup').addEventListener("submit", function (event) {
    const checkbox = document.getElementById("checkbox");
    if (!checkbox.checked) {
        checkbox.reportValidity(); // Zeigt die Standard-Fehlermeldung
        event.preventDefault();
    }
});