const users = [
    { id: 0, username: "Max Bäcker", email: "max.baecker@email.de", telefonnumber: "0123456", color: "#FF7A00" },
    { id: 1, username: "Anna Fischer", email: "anna.fischer@email.de", telefonnumber: "0123457", color: "#FF5EB3" },
    { id: 2, username: "Sophie Förster", email: "sophie.foerster@email.de", telefonnumber: "0123458", color: "#6E52FF" },
    { id: 3, username: "Lukas Schreiner", email: "lukas.schreiner@email.de", telefonnumber: "0123459", color: "#9327FF" },
    { id: 4, username: "Marie Koch", email: "marie.koch@email.de", telefonnumber: "0123460", color: "#00BEE8" },
    { id: 5, username: "Jonas Müller", email: "jonas.mueller@email.de", telefonnumber: "0123461", color: "#1FD7C1" },
    { id: 6, username: "Lea Schneider", email: "lea.schneider@email.de", telefonnumber: "0123462", color: "#FF745E" },
    { id: 7, username: "Felix Weber", email: "felix.weber@email.de", telefonnumber: "0123463", color: "#FFA35E" },
    { id: 8, username: "Emma Zimmermann", email: "emma.zimmermann@email.de", telefonnumber: "0123464", color: "#FC71FF" },
    { id: 9, username: "Paul Bauer", email: "paul.bauer@email.de", telefonnumber: "0123465", color: "#FFC701" },
    { id: 10, username: "Clara Seiler", email: "clara.seiler@email.de", telefonnumber: "0123466", color: "#0038FF" },
    { id: 11, username: "Niklas Meier", email: "niklas.meier@email.de", telefonnumber: "0123467", color: "#C3FF2B" },
    { id: 12, username: "Hannah Richter", email: "hannah.richter@email.de", telefonnumber: "0123468", color: "#FFE62B" },
    { id: 13, username: "Tom Wolf", email: "tom.wolf@email.de", telefonnumber: "0123469", color: "#FF4646" },
    { id: 14, username: "Lena Hartmann", email: "lena.hartmann@email.de", telefonnumber: "0123470", color: "#FFBB2B" },
    { id: 15, username: "Julian Beck", email: "julian.beck@email.de", telefonnumber: "0123471", color: "#FF7A00" },
    { id: 16, username: "Sophia Brandt", email: "sophia.brandt@email.de", telefonnumber: "0123472", color: "#FF5EB3" },
    { id: 17, username: "David Schuster", email: "david.schuster@email.de", telefonnumber: "0123473", color: "#6E52FF" },
    { id: 18, username: "Mia Neumann", email: "mia.neumann@email.de", telefonnumber: "0123474", color: "#9327FF" },
    { id: 19, username: "Florian Wagner", email: "florian.wagner@email.de", telefonnumber: "0123475", color: "#00BEE8" }
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
        <div class="contact" id="user${user.id}" onclick="chooseContact(${user.id})">
            <div class="avatar flex-box-center-center" style="background-color: ${user.color}">${initials}</div>
            <div class="info">
                <strong>${user.username}</strong>
                <p class="accessibility">${user.email}</p>
            </div>
        </div>
        `;
}