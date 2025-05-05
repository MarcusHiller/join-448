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
    spinningLoaderStart();
    let email = document.getElementById('email');
    let passwd = document.getElementById('passwd');
    await loadUserData();
    spinningLoaderEnd();

    let user = userFirebase.find(
        user => user.email === email.value && user.password === passwd.value
    );

    if (user) {
        window.location.href = `html/summary.html?name=${encodeURIComponent(user.username)}&login=true`;
        resetUserArray();
        usrerIsLoggedIn();
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
    info.innerHTML = "Check your e-mail and password. Please try again.";
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
    window.location.href = "html/summary.html?name=Guest&login=true";
    usrerIsLoggedIn();
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
