async function initContactsPage() {
    isUserLoged();                              // Access protection for the main pages
    await loadContactsFromFirebase();
    await renderContacts();
    init('contact_page');
}


function eventBubbling(event) {
    event.stopPropagation();
}


async function renderContacts() {
    cleanContactsList();
    groupInitials();
}


function cleanContactsList() {                                  // clears the entire list
    let list = document.getElementById('contactList');
    list.innerHTML = "";
}


function groupInitials() {                                    
    let group = {};
    contactsFirebase.forEach(contact => {
        let lastNameInitinal = contact.username.split(" ")[0][0].toUpperCase();
        if (!group[lastNameInitinal]) group[lastNameInitinal] = [];
        group[lastNameInitinal].push(contact);
    })
    createHTML(group);
}


function createHTML(list) {                                     // creates headings using the initials
    let containerList = document.getElementById('contactList');
    Object.keys(list).sort().forEach(letter => {
        const section = document.createElement("div");
        section.classList.add('tab');
        section.innerHTML = `<h3>${letter}</h3><hr>`;
        userData(list, letter, section);
        containerList.appendChild(section);
    })
}


function userData(list, letter, section) {                                           // creates an element with user information
    list[letter].forEach(contact => {
        const initials = contact.username.split(" ").map(n => n[0]).join("");
        section.innerHTML += showUserInformation(contact, initials);
    })
}


function chooseContact(id) {
    resetClassChooseContact();
    setClassChoooseContact(id);
    clearMainContact();
    userInfo(id);
}


function setClassChoooseContact(id) {
    let contact = document.getElementById(`contact${id}`);
    contact.classList.add('choose-contact');
}


function resetClassChooseContact() {
    let allContacts = document.querySelectorAll('.contact');
    allContacts.forEach((element) => {
        element.classList.remove('choose-contact');
    });
}


function findContact(id) {                              
    let contact = contactsFirebase.find(c => c.id == id);
    return contact;
}


function clearMainContact() {
    let contactInformation = document.getElementById('contactInformation');
    contactInformation.innerHTML = "";
}


function userInfo(id) {
    let individualContact = findContact(id);
    let contactInformation = document.getElementById('contactInformation');
    contactInformation.innerHTML += showContact(individualContact);
    slideIn();
}


function slideIn() {
    setTimeout(() => {
        document.getElementById('slide').classList.add('active');
    }, 10);
}


function openOverlay() {
    document.getElementById('overlayContact').classList.remove('d-none');
    document.getElementById('overlay').classList.remove('d-none');
    setTimeout(() => {
        document.getElementById('overlay').classList.add('slide');
    }, 10);
}


function closeOverlay(event) {
    if (event) {
        event.preventDefault();
    }
    document.getElementById('overlay').classList.remove('slide');
    setTimeout(() => {
        document.getElementById('overlay').classList.add('d-none');
    }, 200);
    setTimeout(() => {
        document.getElementById('overlayContact').classList.add('d-none');
    }, 100);
}


function addContact() {
    clerOverlay();
    openAddContact();
    openOverlay();
}


function editContact(id) {
    clerOverlay();
    openEditContact(id);
    openOverlay();
}


function addRespContact() {
    clerOverlay();
    openAddRespContact();
    openOverlay();
}


function editRespContact(id) {
    clerOverlay();
    openEditRespContact(id)
    openOverlay();
    closeToolsresp();
}


function clerOverlay() {
    let overlay = document.getElementById('overlayContact');
    overlay.innerHTML = "";
}


function openAddContact() {
    let overlay = document.getElementById('overlayContact');
    overlay.innerHTML = showOverlayAddContact();
}


function openEditContact(id) {
    let contact = findContact(id)
    let overlay = document.getElementById('overlayContact');
    overlay.innerHTML = overlayEditContact(contact);
}


function openAddRespContact() {
    let overlay = document.getElementById('overlayContact');
    overlay.innerHTML = showOverlayAddResp();
}


function openEditRespContact(id) {
    let contact = findContact(id)
    let overlay = document.getElementById('overlayContact');
    overlay.innerHTML = showOverlayEditResp(contact);
}


/* Edit Contact */

async function saveContact(id) {
    updateUserData(id);
    await saveContactsToFirebase();
    renderContacts();
    clearMainContact();
    closeOverlay();
    clearSuccessfulContainer();
    successfulAddContact();
    successChange();
}


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


function getContactColorById(id) {
    const contact = contactsFirebase.find(c => c.id === id);
    return contact ? contact.color : "brown"; 
}


/* Delete Contact */

async function deleteContact(id) {
    deleteUserData(id);
    reSortUser();
    await saveContactsToFirebase();
    renderContacts();
    clearMainContact();
    clearSuccessfulContainer();
    successfulDeleteContact();
    successChange();
}


function deleteUserData(id) {
    contactsFirebase = contactsFirebase.filter(user => user.id !== id);
}


function reSortUser() {
    contactsFirebase.forEach((user, index) => {user.id = index;});   
}


/* Create New Contact */

async function createNewContact() {
    pushNewContact();
    await saveContactsToFirebase();
    renderContacts();
    closeOverlay();
    clearSuccessfulContainer();
    successfulAddContact();
    successChange();
}


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


/* Animation action successful  */

function successChange() {
    setTimeout(() => {
        let success = document.getElementById('success');
        let succContainer = document.getElementById('successContainer');
        success.classList.remove('d-none');
        succContainer.classList.remove('d-none');
        setTimeout(() => {success.classList.add('show-successful');}, 10);
        setTimeout(() => {success.classList.remove('show-successful');}, 1510);
        setTimeout(() => {
            success.classList.add('d-none');
            succContainer.classList.add('d-none');
        }, 1730);
    }, 500);
}


function clearSuccessfulContainer() {
    let success = document.getElementById('success');
    success.innerHTML = "";
}


function successfulAddContact() {
    let success = document.getElementById('success');
    success.innerHTML = showSuccessfulCreated();
}


function successfulDeleteContact() {
    let success = document.getElementById('success');
    success.innerHTML = showSuccessfulDeleted();
}


/* responsive */

function showRespUserInfo() {
    if (window.innerWidth <= 900) {
        document.getElementById('contactContainer').classList.add('d-none');
        document.getElementById('contactInfoContainer').classList.add('d-block');
        cleanContainerBtn();
        changeOfMoreBtn();
        setBackBtn();
    }
}


function cleanContainerBtn() {
    document.getElementById('addBtnResp').innerHTML = "";
}


function changeOfMoreBtn() {
    document.getElementById('addBtnResp').innerHTML = changeBtnMore();
}


function openToolsResp() {
    let toolOverlay = document.getElementById('toolsRespContainer');
    let toolcontainer = document.getElementById('toolsResp');
    toolOverlay.classList.remove('d-none');
    toolcontainer.classList.remove('d-none');
    setTimeout(() => {
        toolcontainer.classList.add('tools-resp-active');
    }, 10);   
}


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


function setBackBtn() {
    document.querySelector('.back-btn-resp').classList.add('d-opacity');
}


function removeBackBtn() {
    document.querySelector('.back-btn-resp').classList.remove('d-opacity');
}


function showRespContactList() {
    document.getElementById('contactContainer').classList.remove('d-none');
    document.getElementById('contactInfoContainer').classList.remove('d-block');
    removeBackBtn();
    cleanContainerBtn();
    changeOfAddPersoneBtn();
}


function changeOfAddPersoneBtn() {
    document.getElementById('addBtnResp').innerHTML = changeAddBtnPerson();
}
