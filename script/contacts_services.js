/**
 * Prevents event propagation during bubbling phase.
 * @param {Event} event - The event object.
 */
function eventBubbling(event) {
    event.stopPropagation();
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
 * Changes button in responsive view to "Add Person".
 */
function changeOfAddPersoneBtn() {
    document.getElementById('addBtnResp').innerHTML = changeAddBtnPerson();
}