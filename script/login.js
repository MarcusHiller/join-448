/**
 * Parses the URL for messages and displays them if present.
 */
const urlParams = new URLSearchParams(window.location.search);
const msg = urlParams.get('msg');
let info = document.getElementById('poppin');
let isPasswordVisible = false;

// Show logo after short delay
setTimeout(() => {
    document.getElementById('logoImg').classList.remove('d-none');
}, 1060);

// Display message from URL if exists
if (msg) {
    info.classList.remove('opacity');
    info.classList.add('poppins-success');
    info.innerHTML = msg;
} else {
    info.classList.add('opacity');
    info.classList.remove('poppins-success');
}

/**
 * Attempts to log in with user credentials from the form inputs.
 * Redirects on success or shows an error message on failure.
 */
async function login() {
    if (checkValueInput()) return;
    spinningLoaderStart();
    let email = document.getElementById('email');
    let passwd = document.getElementById('passwd');
    await loadUserData();
    spinningLoaderEnd();

    let user = userFirebase.find(
        user => user.email === email.value && user.password === passwd.value
    );

    if (user) {
        localStorage.setItem("username", user.username); // ✅ Speichert Namen für Initialen
        localStorage.setItem("loggedIn", "true");         // Optional: gleich hier setzen
        window.location.href = `html/summary.html?name=${encodeURIComponent(user.username)}&login=true`;
        resetUserArray();
    } else {
        displayErrorLogin();
    }
}


/**
 * Displays an error message if login fails.
 */
function displayErrorLogin() {
    document.getElementById('labelPasswd').classList.add('input-field-error');
    info.classList.remove('opacity');
    info.innerHTML = "Check your e-mail and password.<br> Please try again.";
}

/**
 * Loads user data from Firebase and assigns to `userFirebase`.
 */
async function loadUserData() {
    try {
        let data = await loadUsersFromFirebase();
        userFirebase = Object.values(data || {});
    } catch (error) {
        console.error("Error loading user login function:", error);
    }
}

/**
 * Logs in a guest user by bypassing required fields and redirecting.
 * @param {Event} event - The click event from the form.
 */
function guestLogin(event) {
    event.preventDefault();
    document.getElementById('email').removeAttribute('required');
    document.getElementById('passwd').removeAttribute('required');
    localStorage.setItem("username", "Guest");     // 👈 Auch hier speichern!
    localStorage.setItem("loggedIn", "true");
    window.location.href = "html/summary.html?name=Guest&login=true";
}


/**
 * Updates the password input icon depending on whether input is present and visible.
 */
function updatePasswdIcon() {
    const passwdInput = document.getElementById('passwd');
    const passwdIcon = document.getElementById('passwdIcon');

    if (passwdInput.value.length > 0) {
        passwdIcon.src = isPasswordVisible
            ? '../assets/img/icon/visibility.svg'
            : '../assets/img/icon/visibility_off.svg';
    } else {
        passwdIcon.src = '../assets/img/icon/lock.svg';
    }
}

/**
 * Toggles the password visibility in the input field and updates the icon accordingly.
 */
function togglePasswordVisibility() {
    const passwdInput = document.getElementById('passwd');
    const passwdIcon = document.getElementById('passwdIcon');
    isPasswordVisible = !isPasswordVisible;
    passwdInput.type = isPasswordVisible ? 'text' : 'password';
    passwdIcon.src = isPasswordVisible
        ? '../assets/img/icon/visibility.svg'
        : '../assets/img/icon/visibility_off.svg';
}

/**
 * Marks user as logged in by setting a flag in localStorage.
 */
function usrerIsLoggedIn() {
    localStorage.setItem("loggedIn", "true");
}


function inputError(inputLabel) {
    let info = document.getElementById('poppin');
    info.classList.remove('opacity');
    info.innerHTML = errorMessage(inputLabel);
    errorInputField(inputLabel);
}


function errorMessage(key) {
    const messages = {
        "Email": "Please check your email entry!",
        "Passwd": "Please use 6 - 15 characters!"
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
        email: document.getElementById('email').value,
        passwd: document.getElementById('passwd').value
    }; 
}


function checkValues() {
    let {email, passwd} = readsTheInputValues();
    if (checkEmptyInput(email) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Email"; 
    if (checkEmptyInput(passwd) || !/^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,15}$/.test(passwd)) return "Passwd";
}


function checkValueInput() {
    let input = checkValues();
    if (input) {
        inputError(input);
        return true
    }
    return false;
}