let users = [
    { 'username': 'Harald', 'email': 'test@email.de', 'password': 'test' }
];


function addUser() {
    let username = document.getElementById('username');
    let email = document.getElementById('emailSignUp');
    let passwordRegister = document.getElementById('passwordReg');
    let passwordConfirm = document.getElementById('passwordConf');
    if (checkSamePasswd(passwordRegister.value, passwordConfirm.value) && checkUserExists(email.value)) {
        users.push({username: username.value, email: email.value, password: passwordRegister.value });
        window.location.href = '../index.html?msg=Du hast dich erfolgreich registriert.'
    }
}


function checkSamePasswd(a, b) {
    let labelPassw = document.getElementById('labelPasswdConf');
    let poppinError = document.getElementById('errorPoppin');
    labelPassw.classList.remove('input-field-error');
    poppinError.classList.add('d-none');
    if (a !== b) {
        labelPassw.classList.add('input-field-error');
        poppinError.classList.remove('d-none');
        poppinError.innerHTML = "Ups! your password don't match.";
        return false;
    }
    return true;
}


function checkUserExists(params) {
    let labelEmailSignUp = document.getElementById('labelEmailSignUp');
    let poppinError = document.getElementById('errorPoppin');
    labelEmailSignUp.classList.remove('input-field-error');
    poppinError.classList.add('d-none');
    let result = users.find(obj => obj.email === params);
    if (result) {
        labelEmailSignUp.classList.add('input-field-error');
        poppinError.classList.remove('d-none');
        poppinError.innerHTML = "The e-mail already exists. Please select another e-mail.";
        return false;
    }
    return true;
}