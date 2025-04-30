const urlParams = new URLSearchParams(window.location.search);
const msg = urlParams.get('msg');
let info = document.getElementById('poppin');
let isPasswordVisible = false;


setTimeout(() => {
    document.getElementById('logoImg').classList.remove('d-none');
}, 1060);


if (msg) {
    let info = document.getElementById('poppin');
    info.classList.remove('opacity');
    info.classList.add('poppins-success');
    info.innerHTML = "";
    info.innerHTML = msg;
} else {
    info.classList.add('opacity');
    info.classList.remove('poppins-success');
}


async function login() {
    let email = document.getElementById('email');
    let passwd = document.getElementById('passwd');
    await loadUserData();
    let user = userFirebase.find(user => user.email == email.value && user.password == passwd.value);
    if (user) {
        window.location.href = `html/summary.html?name=${encodeURIComponent(user.username)}&login=true`;
        resetUserArray();
        usrerIsLoggedIn();
    } else {
        displayErrorLogin();
    }
}


function displayErrorLogin() {
    document.getElementById('labelPasswd').classList.add('input-field-error');
    info.classList.remove('opacity');
    info.innerHTML = "";
    info.innerHTML = "Check your e-mail and password. Please try again.";
}


async function loadUserData() {
    try {
        let data = await loadUsersFromFirebase();
        userFirebase = Object.values(data || {});
    } catch (error) {
        console.error("Error loading user login function:", error);
    }
}


function guestLogin(event) {
    event.preventDefault();
    document.getElementById('email').removeAttribute('required');
    document.getElementById('passwd').removeAttribute('required');
    window.location.href = "html/summary.html?name=Guest&login=true";
    usrerIsLoggedIn();
}


function updatePasswdIcon() {
    const passwdInput = document.getElementById('passwd');
    const passwdIcon = document.getElementById('passwdIcon');
    if (passwdInput.value.length > 0) {
        passwdIcon.src = isPasswordVisible ? '../assets/img/icon/visibility.svg' : '../assets/img/icon/visibility_off.svg';
    } else {
        passwdIcon.src = '../assets/img/icon/lock.svg';
    }
}


function togglePasswordVisibility() {
    const passwdInput = document.getElementById('passwd');
    const passwdIcon = document.getElementById('passwdIcon');
    isPasswordVisible = !isPasswordVisible;
    passwdInput.type = isPasswordVisible ? 'text' : 'password';
    passwdIcon.src = isPasswordVisible ? '../assets/img/icon/visibility.svg' : '../assets/img/icon/visibility_off.svg';
}


function usrerIsLoggedIn() {
    localStorage.setItem("loggedIn", "true");
}


function logOut() {
    localStorage.setItem("loggedIn", "false");
    window.location.href = "index.html";
}