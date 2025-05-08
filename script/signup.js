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


function inputError(inputLabel) {
    let info = document.getElementById('errorPoppin');
    info.classList.remove('opacity');
    info.innerHTML = errorMessage(inputLabel);
    errorInputField(inputLabel);
}


function errorMessage(key) {
    const messages = {
        "Username": "Please check your name entry!",
        "EmailSignUp": "Please check your email entry!",
        "PasswordReg": "Please use 6 - 15 characters!",
        "PasswdConf": "Please use 6 - 15 characters!",
        "Checkbox": "Please accept the privacy policy!"
    };
    return messages[key] || "Unknown error!";
}


function errorInputField(inputLabel) {
    const label = document.getElementById('label' + inputLabel);
    if (label) {
        label.classList.add('input-field-error');
    }
}


function checkEmptyInput(value) {
    return value.trim() === "";
}


function readsTheInputValues() {
    return {
        username: document.getElementById('username').value,
        email: document.getElementById('emailSignUp').value,
        passwdReg: document.getElementById('passwordReg').value,
        passwdConf: document.getElementById('passwordConf').value,
        checkBox: document.getElementById('checkbox').dataset.checked
    }; 
}


function checkValues() {
    let {username, email, passwdReg, passwdConf, checkBox} = readsTheInputValues();
    if (checkEmptyInput(username) || !/^[a-zA-ZäöüÄÖÜß\s]+$/.test(username)) return "Username";
    if (checkEmptyInput(email) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "EmailSignUp"; 
    if (checkEmptyInput(passwdReg) || !/^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,15}$/.test(passwdReg)) return "PasswordReg"; 
    if (checkEmptyInput(passwdConf) || !/^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,15}$/.test(passwdConf)) return "PasswdConf";
    if (checkBox !== "true") return "Checkbox";
}


function checkValueInput() {
    let input = checkValues();
    if (input) {
        inputError(input);
        return true
    }
    return false;
}


function datasetauslesen(params) {
    let boolen =  document.getElementById('checkbox').dataset.checked;
    console.log(boolen);
}