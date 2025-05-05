/**
 * Tracks visibility state of password fields.
 * @type {{passwordReg: boolean, passwordConf: boolean}}
 */
let visiblePasswords = {
    passwordReg: false,
    passwordConf: false,
};

/**
 * Updates the icon for password input fields based on visibility and input content.
 * @param {string} id - The ID of the password input field.
 */
function updateSignupIcon(id) {
    const input = document.getElementById(id);
    const icon = document.getElementById(`icon-${id}`);
    if (input.value.length > 0) {
        icon.src = visiblePasswords[id] ? '../assets/img/icon/visibility.svg' : '../assets/img/icon/visibility_off.svg';
    } else {
        icon.src = '../assets/img/icon/lock.svg';
    }
}

/**
 * Toggles password visibility for a given input field and updates the icon.
 * @param {string} id - The ID of the password input field.
 */
function toggleSignupVisibility(id) {
    const input = document.getElementById(id);
    const icon = document.getElementById(`icon-${id}`);
    visiblePasswords[id] = !visiblePasswords[id];
    input.type = visiblePasswords[id] ? 'text' : 'password';
    icon.src = visiblePasswords[id] ? '../assets/img/icon/visibility.svg' : '../assets/img/icon/visibility_off.svg';
}

/**
 * Toggles the state of the checkbox and updates its image.
 * @param {Event} event - The triggering event.
 */
function toggleCheckbox(event) {
    event.preventDefault();
    const checkbox = document.getElementById("checkbox");
    const checkboxImage = document.getElementById("checkboxImg");
    let isChecked = checkbox.dataset.checked === "true";
    isChecked = !isChecked;
    checkbox.dataset.checked = isChecked;
    checkbox.checked = isChecked;
    checkboxImage.src = checkbox.checked ? "../assets/img/icon/checked.svg" : "../assets/img/icon/rectangle.svg";
}

/**
 * Handles hover state over the checkbox image and updates the icon accordingly.
 * @param {boolean} isHover - Whether the mouse is over the checkbox.
 * @param {Event} event - The triggering mouse event.
 */
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

/**
 * Prevents form submission if the checkbox is not checked.
 */
document.getElementById('signup').addEventListener("submit", function (event) {
    const checkbox = document.getElementById("checkbox");
    if (!checkbox.checked) {
        checkbox.reportValidity();
        event.preventDefault();
    }
});
