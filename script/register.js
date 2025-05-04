let = userFirebase = [];
let textPasswdError = "Ups! your password don't match.";
let textEmailError = "The e-mail already exists. Please select another e-mail."


/* Sign UP */

async function addUser() {
    spinningLoaderStart();
    const userInput = getFormElements();
    if (!checkSamePasswd(userInput.password.value, userInput.confirm.value)) return;
    if (await checkUserExists(userInput.email.value)) return;
    const newUser = createUserObject(userInput.username.value, userInput.email.value, userInput.password.value);
    userFirebase.push(newUser);
    await saveUsersToFirebase();
    await addUserToContacts(userInput.username, userInput.email);
    spinningLoaderEnd();
    showOverlaySuccessful();
}


function getFormElements() {
    return {
        username: document.getElementById('username'),
        email: document.getElementById('emailSignUp'),
        password: document.getElementById('passwordReg'),
        confirm: document.getElementById('passwordConf')
    };
}


async function addUserToContacts(username, email) {
    await loadContactsFromFirebase();
    createUserForContacts(username, email);
    await saveContactsToFirebase();
    contactsFirebase = [];
}


function createUserForContacts(n, e) {
    let newContact = {
        id: contactsFirebase.length,
        username: n.value,
        email: e.value,
        phone: "",
        color: "brown"
    };
    contactsFirebase.push(newContact);
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


async function checkUserExists(email) {
    prepareEmailValidationUI();
    try {
        const data = await loadUsersFromFirebase();
        userFirebase = Object.values(data || {});
        return checkIfEmailExists(data, email);
    } catch (error) {
        console.error("Fehler beim Prüfen der E-Mail:", error);
        resetUserArray();
        return true;
    }
}


function prepareEmailValidationUI() {
    document.getElementById('labelEmailSignUp').classList.remove('input-field-error');
    document.getElementById('errorPoppin').classList.add('opacity');
}


async function loadUsersFromFirebase() {
    const response = await fetch(BASE_URL + "/users.json");
    return await response.json();
}


function checkIfEmailExists(data, email) {
    for (const id in data) {
        if (data[id].email === email) {
            showEmailExistsError();
            resetUserArray();
            return true;
        }
    }
    return false;
}


function showEmailExistsError() {
    const label = document.getElementById('labelEmailSignUp');
    const errorMsg = document.getElementById('errorPoppin');
    label.classList.add('input-field-error');
    errorMsg.classList.remove('opacity');
    errorMsg.innerHTML = textEmailError;
}


function createUserObject(username, email, password) {
    return { username, email, password };
}


async function saveUsersToFirebase() {
    const usersAsObject = {};
    userFirebase.forEach((user, index) => { usersAsObject[index] = { ...user } });
    try {
        await fetch(BASE_URL + "/users.json", {
            method: 'PUT',
            body: JSON.stringify(usersAsObject),
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error("Error when saving:", error.message);
        resetUserArray();
    }
}


function showOverlaySuccessful() {
    let overlay = document.getElementById('success');
    overlay.classList.remove('d-none');
    overlay.classList.add('overlay-successful');
    setTimeout(() => { window.location.href = '../index.html?msg=You have successfully registered.' }, 1500);
}


function resetUserArray() {
    userFirebase = [];
}