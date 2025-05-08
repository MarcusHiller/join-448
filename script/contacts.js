/**
 * Initializes the contacts page, loading contact data and rendering UI.
 * @async
 */
async function initContactsPage() {
    isUserLoged();
    await loadContactsFromFirebase();
    await renderContacts();
    init('contact_page');
}

/**
 * Prevents event propagation during bubbling phase.
 * @param {Event} event - The event object.
 */
function eventBubbling(event) {
    event.stopPropagation();
}

/**
 * Renders all contacts grouped by initials.
 * @async
 */
async function renderContacts() {
    cleanContactsList();
    groupInitials();
}

/**
 * Clears the contact list display.
 */
function cleanContactsList() {
    let list = document.getElementById('contactList');
    list.innerHTML = "";
}

/**
 * Groups contacts by the first letter of their name and triggers HTML generation.
 */
function groupInitials() {
    let group = {};
    contactsFirebase.forEach(contact => {
        let lastNameInitinal = contact.username.split(" ")[0][0].toUpperCase();
        if (!group[lastNameInitinal]) group[lastNameInitinal] = [];
        group[lastNameInitinal].push(contact);
    });
    createHTML(group);
}

/**
 * Creates HTML elements for each initial group.
 * @param {Object} list - Grouped contact list.
 */
function createHTML(list) {
    let containerList = document.getElementById('contactList');
    Object.keys(list).sort().forEach(letter => {
        const section = document.createElement("div");
        section.classList.add('tab');
        section.innerHTML = `<h3>${letter}</h3><hr>`;
        userData(list, letter, section);
        containerList.appendChild(section);
    });
}

/**
 * Appends user data HTML to a section based on their initials.
 * @param {Object} list - Grouped contact list.
 * @param {string} letter - Initial letter.
 * @param {HTMLElement} section - Section to append to.
 */
function userData(list, letter, section) {
    list[letter].forEach(contact => {
        const initials = contact.username.split(" ").map(n => n[0]).join("");
        section.innerHTML += showUserInformation(contact, initials);
    });
}

/**
 * Highlights the selected contact and displays their information.
 * @param {string|number} id - Contact ID.
 */
function chooseContact(id) {
    resetClassChooseContact();
    setClassChoooseContact(id);
    clearMainContact();
    userInfo(id);
}

/**
 * Adds active class to selected contact.
 * @param {string|number} id - Contact ID.
 */
function setClassChoooseContact(id) {
    let contact = document.getElementById(`contact${id}`);
    contact.classList.add('choose-contact');
}

/**
 * Resets the selected class from all contact elements.
 */
function resetClassChooseContact() {
    let allContacts = document.querySelectorAll('.contact');
    allContacts.forEach((element) => {
        element.classList.remove('choose-contact');
    });
}

/**
 * Finds a contact object by ID.
 * @param {string|number} id - Contact ID.
 * @returns {Object|undefined} - Found contact.
 */
function findContact(id) {
    return contactsFirebase.find(c => c.id == id);
}

/**
 * Clears the main contact display area.
 */
function clearMainContact() {
    let contactInformation = document.getElementById('contactInformation');
    contactInformation.innerHTML = "";
}

/**
 * Displays full information for selected contact.
 * @param {string|number} id - Contact ID.
 */
function userInfo(id) {
    let individualContact = findContact(id);
    let contactInformation = document.getElementById('contactInformation');
    contactInformation.innerHTML += showContact(individualContact);
    slideIn();
}

/**
 * Animates sliding in the contact details pane.
 */
function slideIn() {
    setTimeout(() => {
        document.getElementById('slide').classList.add('active');
    }, 10);
}

/**
 * Opens the contact overlay with animation.
 */
function openOverlay() {
    document.getElementById('overlayContact').classList.remove('d-none');
    document.getElementById('overlay').classList.remove('d-none');
    setTimeout(() => {
        document.getElementById('overlay').classList.add('slide');
    }, 10);
}

/**
 * Closes the contact overlay.
 * @param {Event} event - The event to suppress.
 */
function closeOverlay(event) {
    suppressActionEvent(event);
    document.getElementById('overlay').classList.remove('slide');
    setTimeout(() => {
        document.getElementById('overlay').classList.add('d-none');
    }, 200);
    setTimeout(() => {
        document.getElementById('overlayContact').classList.add('d-none');
    }, 100);
}

/**
 * Prevents default action of an event if defined.
 * @param {Event} event - The event object.
 */
function suppressActionEvent(event) {
    if (event) {
        event.preventDefault();
    }
}

/**
 * Opens the add contact overlay.
 */
function addContact() {
    clerOverlay();
    openAddContact();
    openOverlay();
}

/**
 * Opens the edit contact overlay.
 * @param {string|number} id - Contact ID.
 */
function editContact(id) {
    clerOverlay();
    openEditContact(id);
    openOverlay();
}

/**
 * Opens the responsible add contact overlay.
 */
function addRespContact() {
    clerOverlay();
    openAddRespContact();
    openOverlay();
}

/**
 * Opens the responsible edit contact overlay.
 * @param {string|number} id - Contact ID.
 */
function editRespContact(id) {
    clerOverlay();
    openEditRespContact(id);
    openOverlay();
    closeToolsresp();
}

/**
 * Clears the content inside the contact overlay.
 */
function clerOverlay() {
    let overlay = document.getElementById('overlayContact');
    overlay.innerHTML = "";
}

/**
 * Renders the overlay with add contact form.
 */
function openAddContact() {
    let overlay = document.getElementById('overlayContact');
    overlay.innerHTML = showOverlayAddContact();
}

/**
 * Renders the overlay with edit contact form.
 * @param {string|number} id - Contact ID.
 */
function openEditContact(id) {
    let contact = findContact(id);
    let overlay = document.getElementById('overlayContact');
    overlay.innerHTML = overlayEditContact(contact);
}

/**
 * Renders the overlay with responsible add contact form.
 */
function openAddRespContact() {
    let overlay = document.getElementById('overlayContact');
    overlay.innerHTML = showOverlayAddResp();
}

/**
 * Renders the overlay with responsible edit contact form.
 * @param {string|number} id - Contact ID.
 */
function openEditRespContact(id) {
    let contact = findContact(id);
    let overlay = document.getElementById('overlayContact');
    overlay.innerHTML = showOverlayEditResp(contact);
}

/**
 * Saves updated contact data and refreshes UI.
 * @async
 * @param {string|number} id - Contact ID.
 */
async function saveContact(id) {
    if (checkValueInput()) return;
    updateUserData(id);
    await saveContactsToFirebase();
    showRespContactList();
    renderContacts();
    clearMainContact();
    closeOverlay();
    clearSuccessfulContainer();
    successfulAddContact();
    successChange();
}

/**
 * Updates user data in contacts array from input fields.
 * @param {string|number} id - Contact ID.
 */
function updateUserData(id) {
    let n = document.getElementById('contactname');
    let e = document.getElementById('email');
    let p = document.getElementById('phone');
    let contact = contactsFirebase.find(c => c.id === id);
    if (contact) {
        contact.username = n.value;
        contact.email = e.value;
        contact.phone = p.value;
    } else {
        console.log("Kontakt nicht gefunden");
    }
}

/**
 * Retrieves the color assigned to a contact by ID.
 * @param {string|number} id - Contact ID.
 * @returns {string} The color string or default 'brown'.
 */
function getContactColorById(id) {
    const contact = contactsFirebase.find(c => c.id === id);
    return contact ? contact.color : "brown";
}

/* Delete Contact */

/**
 * Deletes a contact and updates the interface accordingly.
 * @async
 * @function deleteContact
 * @param {Event} event - The triggering event.
 * @param {number} id - ID of the contact to delete.
 */
async function deleteContact(event, id) {
    suppressActionEvent(event)
    deleteUserData(id);
    reSortUser();
    await saveContactsToFirebase();
    showRespContactList();
    renderContacts();
    clearMainContact();
    clearSuccessfulContainer();
    successfulDeleteContact();
    successChange();
}

/**
 * Removes a contact from the contacts array by ID.
 * @param {number} id - ID of the contact to remove.
 */
function deleteUserData(id) {
    contactsFirebase = contactsFirebase.filter(user => user.id !== id);
}

/**
 * Re-indexes contact IDs to maintain sequential order.
 */
function reSortUser() {
    contactsFirebase.forEach((user, index) => { user.id = index; });
}

/**
 * Creates a new contact and updates Firebase.
 * @async
 * @function createNewContact
 */
async function createNewContact() {
    if (checkValueInput()) return;
    pushNewContact();
    await saveContactsToFirebase();
    renderContacts();
    closeOverlay();
    clearSuccessfulContainer();
    successfulAddContact();
    successChange();
}

/**
 * Gathers form input data and pushes a new contact into the array.
 */
function pushNewContact() {
    let n = document.getElementById('contactname');
    let e = document.getElementById('email');
    let p = document.getElementById('phone');
    let newContact = {
        id: contactsFirebase.length,
        username: n.value,
        email: e.value,
        phone: p.value,
        color: "brown"
    };
    contactsFirebase.push(newContact);
}

/**
 * Animates the success feedback container.
 */
function successChange() {
    setTimeout(() => {
        let success = document.getElementById('success');
        let succContainer = document.getElementById('successContainer');
        success.classList.remove('d-none');
        succContainer.classList.remove('d-none');
        setTimeout(() => { success.classList.add('show-successful'); }, 10);
        setTimeout(() => { success.classList.remove('show-successful'); }, 1510);
        setTimeout(() => {
            success.classList.add('d-none');
            succContainer.classList.add('d-none');
        }, 1730);
    }, 500);
}

/**
 * Clears success message container content.
 */
function clearSuccessfulContainer() {
    let success = document.getElementById('success');
    success.innerHTML = "";
}

/**
 * Displays success message for contact creation.
 */
function successfulAddContact() {
    let success = document.getElementById('success');
    success.innerHTML = showSuccessfulCreated();
}

/**
 * Displays success message for contact deletion.
 */
function successfulDeleteContact() {
    let success = document.getElementById('success');
    success.innerHTML = showSuccessfulDeleted();
}

/**
 * Switches to responsive contact info view.
 */
function showRespUserInfo() {
    if (window.innerWidth <= 900) {
        document.getElementById('contactContainer').classList.add('d-none');
        document.getElementById('contactInfoContainer').classList.add('d-block');
        cleanContainerBtn();
        changeOfMoreBtn();
        setBackBtn();
    }
}

/**
 * Clears responsive add button container.
 */
function cleanContainerBtn() {
    document.getElementById('addBtnResp').innerHTML = "";
}

/**
 * Changes add button to show 'more' in responsive view.
 */
function changeOfMoreBtn() {
    document.getElementById('addBtnResp').innerHTML = changeBtnMore();
}

/**
 * Opens the responsive tools overlay.
 */
function openToolsResp() {
    let toolOverlay = document.getElementById('toolsRespContainer');
    let toolcontainer = document.getElementById('toolsResp');
    toolOverlay.classList.remove('d-none');
    toolcontainer.classList.remove('d-none');
    setTimeout(() => {
        toolcontainer.classList.add('tools-resp-active');
    }, 10);
}

/**
 * Closes the responsive tools overlay.
 */
function closeToolsresp() {
    let toolOverlay = document.getElementById('toolsRespContainer');
    let toolcontainer = document.getElementById('toolsResp');
    if (toolcontainer) {
        toolcontainer.classList.remove('tools-resp-active');
        setTimeout(() => {
            toolcontainer.classList.add('d-none');
            toolOverlay.classList.add('d-none');
        }, 200);
    }
}

/**
 * Displays back button for responsive view.
 */
function setBackBtn() {
    document.querySelector('.back-btn-resp').classList.add('d-opacity');
}

/**
 * Removes back button for responsive view.
 */
function removeBackBtn() {
    document.querySelector('.back-btn-resp').classList.remove('d-opacity');
}

/**
 * Returns to contact list view in responsive layout.
 */
function showRespContactList() {
    let container = document.getElementById('contactContainer');
    if (!container.classList == 'd-none') return;
    container.classList.remove('d-none');
    document.getElementById('contactInfoContainer').classList.remove('d-block');
    removeBackBtn();
    cleanContainerBtn();
    changeOfAddPersoneBtn();
}

/**
 * Changes button in responsive view to "Add Person".
 */
function changeOfAddPersoneBtn() {
    document.getElementById('addBtnResp').innerHTML = changeAddBtnPerson();
}


function inputError(inputLabel) {
    let info = document.getElementById('poppin');
    info.classList.remove('opacity');
    info.innerHTML = errorMessage(inputLabel);
    errorInputField(inputLabel);
}


function removeErrorText() {
    const labels = ["Contactname", "Email", "Phone"];
    const info = document.getElementById('poppin');
    info.classList.add('opacity');
    info.innerHTML = "";
    labels.forEach(label => {
        const inputLabel = document.getElementById('label' + label);
        if (inputLabel) {
            inputLabel.classList.remove('input-field-error');
        }
    });
}


function errorMessage(key) {
    const messages = {
        "Contactname": "Please check your name entry!",
        "Email": "Please check your email entry!",
        "Phone": "Please check your phonenumber entry!"
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
        n: document.getElementById('contactname').value,
        e: document.getElementById('email').value,
        p: document.getElementById('phone').value
    }; 
}


function checkValues() {
    let {n, e, p} = readsTheInputValues();
    if (checkEmptyInput(n) || !/^[a-zA-ZäöüÄÖÜß\s]+$/.test(n)) return "Contactname";
    if (checkEmptyInput(e) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) return "Email"; 
    if (checkEmptyInput(p) || !/^\d+$/.test(p)) return "Phone";
}


function checkValueInput() {
    let input = checkValues();
    if (input) {
        inputError(input);
        return true
    }
    return false;
}