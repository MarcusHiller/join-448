const users = [
    { id: 0, username: "Max Bäcker", email: "max.baecker@email.de", phone: "0123456", color: "#FF7A00" },
    { id: 1, username: "Anna Fischer", email: "anna.fischer@email.de", phone: "0123457", color: "#FF5EB3" },
    { id: 2, username: "Sophie Förster", email: "sophie.foerster@email.de", phone: "0123458", color: "#6E52FF" },
    { id: 3, username: "Lukas Schreiner", email: "lukas.schreiner@email.de", phone: "0123459", color: "#9327FF" },
    { id: 4, username: "Marie Koch", email: "marie.koch@email.de", phone: "0123460", color: "#00BEE8" },
    { id: 5, username: "Jonas Müller", email: "jonas.mueller@email.de", phone: "0123461", color: "#1FD7C1" },
    { id: 6, username: "Lea Schneider", email: "lea.schneider@email.de", phone: "0123462", color: "#FF745E" },
    { id: 7, username: "Felix Weber", email: "felix.weber@email.de", phone: "0123463", color: "#FFA35E" },
    { id: 8, username: "Emma Zimmermann", email: "emma.zimmermann@email.de", phone: "0123464", color: "#FC71FF" },
    { id: 9, username: "Paul Bauer", email: "paul.bauer@email.de", phone: "0123465", color: "#FFC701" },
    { id: 10, username: "Clara Seiler", email: "clara.seiler@email.de", phone: "0123466", color: "#0038FF" },
    { id: 11, username: "Niklas Meier", email: "niklas.meier@email.de", phone: "0123467", color: "#C3FF2B" },
    { id: 12, username: "Hannah Richter", email: "hannah.richter@email.de", phone: "0123468", color: "#FFE62B" },
    { id: 13, username: "Tom Wolf", email: "tom.wolf@email.de", phone: "0123469", color: "#FF4646" },
    { id: 14, username: "Lena Hartmann", email: "lena.hartmann@email.de", phone: "0123470", color: "#FFBB2B" },
    { id: 15, username: "Julian Beck", email: "julian.beck@email.de", phone: "0123471", color: "#FF7A00" },
    { id: 16, username: "Sophia Brandt", email: "sophia.brandt@email.de", phone: "0123472", color: "#FF5EB3" },
    { id: 17, username: "David Schuster", email: "david.schuster@email.de", phone: "0123473", color: "#6E52FF" },
    { id: 18, username: "Mia Neumann", email: "mia.neumann@email.de", phone: "0123474", color: "#9327FF" },
    { id: 19, username: "Florian Wagner", email: "florian.wagner@email.de", phone: "0123475", color: "#00BEE8" }
];

function eventBubbling(event) {
    event.stopPropagation();
}


function renderContacts() {
    cleanContactsList();
    groupInitials();
}


function cleanContactsList() {                                  // clears the entire list
    let list = document.getElementById('contactList');
    list.innerHTML = "";
}


function groupInitials() {                                     //  saves all contacts in a list, sorted by initials
    let group = {};
    users.forEach(user => {
        let lastNameInitinal = user.username.split(" ")[0][0].toUpperCase();
        if (!group[lastNameInitinal]) group[lastNameInitinal] = [];
        group[lastNameInitinal].push(user);
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
    list[letter].forEach(user => {
        const initials = user.username.split(" ").map(n => n[0]).join("");
        section.innerHTML += showUserInformation(user, initials);
    })
}


function showUserInformation(user, initials) {
    return `
        <div class="contact" id="user${user.id}" onclick="chooseContact(${user.id}); showRespUserInfo()">
            <div class="avatar flex-box-center-center" style="background-color: ${user.color}">${initials}</div>
            <div class="info">
                <strong>${user.username}</strong>
                <p class="accessibility">${user.email}</p>
            </div>
        </div>
        `;
}


function chooseContact(id) {
    resetClassChooseContact();
    setClassChoooseContact(id);
    clearMainContact();
    userInfo(id);
}


function setClassChoooseContact(id) {
    let contact = document.getElementById(`user${id}`);
    contact.classList.add('choose-contact');
}


function resetClassChooseContact() {
    let allContacts = document.querySelectorAll('.contact');
    allContacts.forEach((element) => {
        element.classList.remove('choose-contact');
    });
}


function findContact(id) {
    let user = users.find(u => u.id == id);
    return user;
}


function clearMainContact() {
    let contactInformation = document.getElementById('userInformation');
    contactInformation.innerHTML = "";
}


function userInfo(id) {
    let individualUser = findContact(id);
    let contactInformation = document.getElementById('userInformation');
    contactInformation.innerHTML += showContact(individualUser);
    slideIn();
}


function slideIn() {
    setTimeout(() => {
        document.getElementById('slide').classList.add('active');
    }, 10);
}


function showContact(individualUser) {
    return `
    <div id="slide" class="user-slide-in">
        <div class="user-info-header">
            <div class="info-initial flex-box-center-center" style="background-color: ${individualUser.color}">${individualUser.username.split(" ").map(n => n[0]).join("")}</div>
                <div class="info-name">
                    <h4>${individualUser.username}</h4>
                    <div class="container-editing-tools">
                        <div class="dpl-fl-al-cetr tools" onclick="chooseOverlay('edit', ${individualUser.id})"><img class="icon tools-edit" src="../assets/img/icon/edit.svg" alt=""><span>edit</span></div>
                        <div class="dpl-fl-al-cetr tools" onclick="deleteContact(${individualUser.id})"><img class="icon tools-delete" src="../assets/img/icon/delete.svg" alt=""><span>delete</span></div>
                    </div>
                </div>
            </div>
            <div >
                <div>
                    <p class="user-contact-info">Contact Information</p>
                </div>
                <div>
                    <p class="accessibility-description">Email</p>
                    <a class="accessibility" href="mailto:${individualUser.email}"> ${individualUser.email}</a>
                    <p class="accessibility-description">Phone</p>
                    <a class="accessibility" href="tel:${individualUser.phone}">${individualUser.phone}</a>
                </div>
            </div>
        </div>
    </div>`;
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


function chooseOverlay(overlay, id) {
    if (overlay == "add") {
        addContact();
    } else if (overlay == "edit") {
        editContact(id);
    } else if (overlay == "addResp") {
        addRespContact();
    }
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


function clerOverlay() {
    let overlay = document.getElementById('overlayContact');
    overlay.innerHTML = "";
}


function openAddContact() {
    let overlay = document.getElementById('overlayContact');
    overlay.innerHTML = showOverlayAddContact();
}


function openEditContact(id) {
    let user = findContact(id)
    let overlay = document.getElementById('overlayContact');
    overlay.innerHTML = overlayEditContact(user);
}


function openAddRespContact() {
    let overlay = document.getElementById('overlayContact');
    overlay.innerHTML = showOverlayAddResp();
}


function showOverlayAddContact() {
    return `
        <div id="overlay" class="overlay-contact flex-box-center-center d-none" onclick="eventBubbling(event)">
            <div class="close-container" onclick="closeOverlay(event)"><img class="close-btn" src="../assets/img/icon/close.svg" alt=""></div>
            <div class="overlay-cover">
                <img class="logo-img" src="../assets/img/logo/cover_join_white.svg" alt="">
                <div class="card-title">
                    <h5>Add contact</h5>
                    <p class="motivation-text">Tasks are better with a Team!</p>
                </div>
            </div>
            <div class="overlay-main-container flex-box-center-center">
                <div class="profil-img-container flex-box-center-center"><img class="profil-img" src="../assets/img/icon/person.svg" alt=""></div>
                <form onsubmit="createNewContact(); return false">
                    <div class="dpl-fl-colu input-container">
                        <label class="input-field">
                            <div class="input-content">
                                <input id="username" type="text" placeholder="Name" required>
                                <img class="input-icon" src="../assets/img/icon/person.svg" alt="">
                            </div>
                        </label>
                        <label class="input-field">
                            <div class="input-content">
                                <input id="email" type="email" placeholder="E-mail">
                                <img class="input-icon" src="../assets/img/icon/mail.svg" alt="">
                            </div>
                        </label>
                        <label class="input-field">
                            <div class="input-content">
                                <input id="phone" type="tel" placeholder="Phone">
                                <img class="input-icon" src="../assets/img/icon/call.svg" alt="">
                            </div>
                        </label>
                    </div>
                    <div class="submit-container">
                        <button class="blue-white-btn" onclick="closeOverlay(event)">Cancel</button>
                        <button class="white-blue-btn">Create contact</button>
                    </div>
                </form>
            </div>
        </div>`;
}


function overlayEditContact(individualUser) {
    return `
        <div id="overlay" class="overlay-contact flex-box-center-center d-none" onclick="eventBubbling(event)">
            <div class="close-container" onclick="closeOverlay(event)"><img class="close-btn" src="../assets/img/icon/close.svg" alt=""></div>
            <div class="overlay-cover">
                <img class="logo-img" src="../assets/img/logo/cover_join_white.svg" alt="">
                <div class="card-title">
                    <h5>Edit Contact</h5>
                    <p class="motivation-text">Tasks are better with a Team!</p>
                </div>
            </div>
            <div class="overlay-main-container flex-box-center-center">
                <div class="info-initial flex-box-center-center" style="background-color: ${individualUser.color}">${individualUser.username.split(" ").map(n => n[0]).join("")}</div>
                <form onsubmit="return false">
                    <div class="dpl-fl-colu input-container">
                        <label class="input-field">
                            <div class="input-content">
                                <input id="username" type="text" value="${individualUser.username}" placeholder="Name" required>
                                <img class="input-icon" src="../assets/img/icon/person.svg" alt="">
                            </div>
                        </label>
                        <label class="input-field">
                            <div class="input-content">
                                <input id="email" type="email" value="${individualUser.email}" placeholder="E-mail">
                                <img class="input-icon" src="../assets/img/icon/mail.svg" alt="">
                            </div>
                        </label>
                        <label class="input-field">
                            <div class="input-content">
                                <input id="phone" type="tel" value="${individualUser.phone}" placeholder="Phone">
                                <img class="input-icon" src="../assets/img/icon/call.svg" alt="">
                            </div>
                        </label>
                    </div>
                    <div class="submit-container">
                        <button class="blue-white-btn" onclick="deleteContact(${individualUser.id})">Delete</button>
                        <button class="white-blue-btn" onclick="saveContact(${individualUser.id})">Save</button>
                    </div>
                </form>
            </div>
        </div>`;
}



function saveContact(id) {
    updateUserData(id);
    renderContacts();
    clearMainContact();
    closeOverlay();
    clearSuccessfulContainer();
    successfulAddContact();
    successChange();
}


function updateUserData(id) {
    let n = document.getElementById('username');
    let e = document.getElementById('email');
    let p = document.getElementById('phone');
    let user = users.find(u => u.id === id);
    if (user) {
        user.username = n.value;
        user.email = e.value;
        user.phone = p.value;
    }
}


function deleteContact(id) {
    deleteUserData(id);
    reSortUser();
    renderContacts();
    clearMainContact();
    closeOverlay();
    clearSuccessfulContainer();
    successfulDeleteContact();
    successChange();
}


function deleteUserData(id) {
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        users.splice(index, 1);
    }
}


function reSortUser() {
    users.forEach((user, index) => {
        user.id = index;
    });
}


function createNewContact() {
    pushNewContact();
    renderContacts();
    closeOverlay();
    clearSuccessfulContainer();
    successfulAddContact();
    successChange();
}


function pushNewContact() {
    let numberOfUser = users.length + 1;
    let n = document.getElementById('username');
    let e = document.getElementById('email');
    let p = document.getElementById('phone');
    let newContact = { id: numberOfUser, username: n.value, email: e.value, phone: p.value, color: "brown" }
    users.push(newContact);
    console.log(newContact);
}


function successChange() {
    setTimeout(() => {
        let success = document.getElementById('success');
        success.classList.remove('d-none');
        setTimeout(() => {
            success.classList.add('show-successful');
        }, 10);
        setTimeout(() => {
            success.classList.remove('show-successful');
        }, 1510);
        setTimeout(() => {
            success.classList.add('d-none');
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


function showSuccessfulCreated() {
    return `<p>Contact successfully created </p>`;
}


function showSuccessfulDeleted() {
    return `<p>Contact successfully deleted </p>`;
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


function changeBtnMore() {
    return `
        <div class="add-btn-resp" onclick="">
            <img class="contact-img" src="../assets/img/icon/more_vert.svg" alt="">
        </div>`;
}


function setBackBtn() {
    document.querySelector('.back-btn-resp').classList.add('d-opacity');
}


function showRespContactList() {
    document.getElementById('contactContainer').classList.remove('d-none');
    document.getElementById('contactInfoContainer').classList.remove('d-block');
    cleanContainerBtn();
    changeOfAddPersoneBtn();
}


function changeOfAddPersoneBtn() {
    document.getElementById('addBtnResp').innerHTML = changeAddBtnPerson();
}


function changeAddBtnPerson() {
    return `
        <div class="add-btn-resp" onclick="">
            <img class="contact-img" src="../assets/img/icon/person_add.svg" alt="">
        </div>`;
}



function showOverlayAddResp() {// id noch ändern und klasse display none hinzufügen
    return `
    <div id="overlay" class="overlay-contact overlay-contact-resp d-none" onclick="eventBubbling(event)">
            <div class="overlay-cover-resp">
                <div class="close-resp-overlay" onclick="closeOverlay(event)"><img class="close-btn" src="../assets/img/icon/close_white.svg" alt=""></div>    
                <div class="card-title">
                    <h5>Add contact</h5>
                    <p class="motivation-text">Tasks are better with a Team!</p>
                </div>
            </div>
            <div class="overlay-main-container-resp">
                <div class="profil-img-container flex-box-center-center profil-img-resp"><img class="profil-img" src="../assets/img/icon/person.svg" alt=""></div>
                <form onsubmit="createNewContact(); return false">
                    <div class="dpl-fl-colu input-container-resp">
                        <label class="input-field input-field-resp">
                            <div class="input-content-resp">
                                <input id="username" type="text" placeholder="Name" required>
                                <img class="input-icon" src="../assets/img/icon/person.svg" alt="">
                            </div>
                        </label>
                        <label class="input-field input-field-resp">
                            <div class="input-content-resp">
                                <input id="email" type="email" placeholder="E-mail">
                                <img class="input-icon" src="../assets/img/icon/mail.svg" alt="">
                            </div>
                        </label>
                        <label class="input-field input-field-resp">
                            <div class="input-content-resp">
                                <input id="phone" type="tel" placeholder="Phone">
                                <img class="input-icon" src="../assets/img/icon/call.svg" alt="">
                            </div>
                        </label>
                    </div>
                    <div class="submit-container submit-container-resp">
                        <button class="blue-white-btn" onclick="closeOverlay(event)">Cancel</button>
                        <button class="white-blue-btn">Create contact</button>
                    </div>
                </form>
            </div>
        </div>`;
}


function showOverlayEditResp() {// id noch ändern und klasse display none hinzufügen
    return `
    <div id="overlay" class="overlay-contact overlay-contact-resp" onclick="eventBubbling(event)">
            <div class="overlay-cover-resp">
                <div class="close-resp-overlay" onclick="closeOverlay(event)"><img class="close-btn" src="../assets/img/icon/close_white.svg" alt=""></div>    
                <div class="card-title">
                    <h5>Add contact</h5>
                    <p class="motivation-text">Tasks are better with a Team!</p>
                </div>
            </div>
            <div class="overlay-main-container-resp">
                <div class="profil-img-container flex-box-center-center profil-img-resp"><img class="profil-img" src="../assets/img/icon/person.svg" alt=""></div>
                <form onsubmit="createNewContact(); return false">
                    <div class="dpl-fl-colu input-container-resp">
                        <label class="input-field input-field-resp">
                            <div class="input-content-resp">
                                <input id="username" type="text" placeholder="Name" required>
                                <img class="input-icon" src="../assets/img/icon/person.svg" alt="">
                            </div>
                        </label>
                        <label class="input-field input-field-resp">
                            <div class="input-content-resp">
                                <input id="email" type="email" placeholder="E-mail">
                                <img class="input-icon" src="../assets/img/icon/mail.svg" alt="">
                            </div>
                        </label>
                        <label class="input-field input-field-resp">
                            <div class="input-content-resp">
                                <input id="phone" type="tel" placeholder="Phone">
                                <img class="input-icon" src="../assets/img/icon/call.svg" alt="">
                            </div>
                        </label>
                    </div>
                    <div class="submit-container submit-container-resp">
                        <button class="blue-white-btn" onclick="closeOverlay(event)">Cancel</button>
                        <button class="white-blue-btn">Create contact</button>
                    </div>
                </form>
            </div>
        </div>`;
}