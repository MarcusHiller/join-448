const users = [
    { "username": "Max Bäcker", "email": "max.baecker@email.de", "telefonnumber": "0123456001" },
    { "username": "Lisa Schneider", "email": "lisa.schneider@email.de", "telefonnumber": "0123456002" },
    { "username": "Tom Müller", "email": "tom.mueller@email.de", "telefonnumber": "0123456003" },
    { "username": "Anna Fischer", "email": "anna.fischer@email.de", "telefonnumber": "0123456004" },
    { "username": "Felix Koch", "email": "felix.koch@email.de", "telefonnumber": "0123456005" },
    { "username": "Julia Maler", "email": "julia.maler@email.de", "telefonnumber": "0123456006" },
    { "username": "David Lehrer", "email": "david.lehrer@email.de", "telefonnumber": "0123456007" },
    { "username": "Sarah Arzt", "email": "sarah.arzt@email.de", "telefonnumber": "0123456008" },
    { "username": "Markus Tischler", "email": "markus.tischler@email.de", "telefonnumber": "0123456009" },
    { "username": "Nina Bauer", "email": "nina.bauer@email.de", "telefonnumber": "0123456010" },
    { "username": "Leon Gärtner", "email": "leon.gaertner@email.de", "telefonnumber": "0123456011" },
    { "username": "Hannah Fleischer", "email": "hannah.fleischer@email.de", "telefonnumber": "0123456012" },
    { "username": "Paul Maurer", "email": "paul.maurer@email.de", "telefonnumber": "0123456013" },
    { "username": "Emma Schreiner", "email": "emma.schreiner@email.de", "telefonnumber": "0123456014" },
    { "username": "Jonas Wagner", "email": "jonas.wagner@email.de", "telefonnumber": "0123456015" },
    { "username": "Sophie Förster", "email": "sophie.foerster@email.de", "telefonnumber": "0123456016" },
    { "username": "Tim Weber", "email": "tim.weber@email.de", "telefonnumber": "0123456017" },
    { "username": "Mia Schuster", "email": "mia.schuster@email.de", "telefonnumber": "0123456018" },
    { "username": "Lukas Metzger", "email": "lukas.metzger@email.de", "telefonnumber": "0123456019" },
    { "username": "Clara Zimmermann", "email": "clara.zimmermann@email.de", "telefonnumber": "0123456020" }
];


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
        section.innerHTML = `<h2>${letter}</h2><hr>`;
        userData(list, letter, section);
        containerList.appendChild(section);
    })
}


function userData(list, letter, section) {                                           // creates an element with user information
    list[letter].forEach(user => {
        const initials = user.username.split(" ").map(n => n[0]).join("");
        const contact = document.createElement("div");
        contact.className = "contact";
        contact.innerHTML = showUserInformation(user, initials);
        section.appendChild(contact);
    })
}


function showUserInformation(user, initials) {
    return `
          <div class="avatar">${initials}</div>
          <div class="info">
            <strong>${user.username}</strong>
            <p>${user.email}</p>
          </div>
        `;
}