let users = [
    { 'username': 'Harald', 'email': 'test@email.de', 'password': 'test' }
];


let textPasswdError = "Ups! your password don't match.";
let textEmailError = "The e-mail already exists. Please select another e-mail."

/* Sign UP */

function addUser() {
    let username = document.getElementById('username');
    let email = document.getElementById('emailSignUp');
    let passwordRegister = document.getElementById('passwordReg');
    let passwordConfirm = document.getElementById('passwordConf');
    if (checkSamePasswd(passwordRegister.value, passwordConfirm.value) && checkUserExists(email.value)) {
        users.push({username: username.value, email: email.value, password: passwordRegister.value });
        showOverlaySuccessful();
    }
}


function checkSamePasswd(a, b) {
    let labelPassw = document.getElementById('labelPasswdConf');
    let poppinError = document.getElementById('errorPoppin');
    labelPassw.classList.remove('input-field-error');
    poppinError.classList.add('opacity');
    if (a !== b) {
        labelPassw.classList.add('input-field-error');
        poppinError.classList.remove('opacity');
        poppinError.innerHTML = textPasswdError;
        return false;
    }
    return true;
}


function checkUserExists(params) {
    let labelEmailSignUp = document.getElementById('labelEmailSignUp');
    let poppinError = document.getElementById('errorPoppin');
    labelEmailSignUp.classList.remove('input-field-error');
    poppinError.classList.add('opacity');
    let result = users.find(obj => obj.email === params);
    if (result) {
        labelEmailSignUp.classList.add('input-field-error');
        poppinError.classList.remove('opacity');
        poppinError.innerHTML = textEmailError;
        return false;
    }
    return true;
}


function showOverlaySuccessful() {
    let overlay = document.getElementById('success');
    overlay.classList.remove('d-none');
    overlay.classList.add('overlay-successful');
    setTimeout(() => {window.location.href = '../index.html?msg=Du hast dich erfolgreich registriert.'}, 1500);
}




