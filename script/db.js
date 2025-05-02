/* Local contact list, if too many contacts have been deleted or edited, 
the old list can be saved in Firebase using the two functions available below. 
These must be executed in the console.*/


/* FOR ABGABE LÖSCHEN!!!! */

async function saveUsers() {
    const usersAsObject = {};
    users.forEach((user, index) => {
        usersAsObject[index] = user;
    });
    const response = await fetch(BASE_URL + "/users.json", {
        method: "PUT",
        body: JSON.stringify(usersAsObject)
    });

    if (response.ok) {
        console.log("User erfolgreich gespeichert.");
    } else {
        console.error("Fehler beim Speichern:", await response.text());
    }
}


let users = [
    { 'username': 'Max Mustermann', 'email': 'maxmustermann@email.de', 'password': 'test' },
    { 'username': 'Rainer Zufall', 'email': 'rainerzufall@email.de', 'password': 'test' },
    { 'username': 'Beate Baum', 'email': 'beatebaum@email.de', 'password': 'test' }
];


const contacts = [
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


async function loadUser() {
    let response = await fetch(BASE_URL + "/contacts.json");
    let responseToJson = await response.json();
    //console.log(responseToJson);
    const usersArray = Object.values(responseToJson);
    console.log(usersArray);
    contactsFirebase = usersArray;
}


async function saveContacts() {
    const usersAsObject = {};
    contacts.forEach(user => {
        usersAsObject[user.id] = user;
    });
    const response = await fetch(BASE_URL + "/contacts.json", {
        method: "PUT", 
        body: JSON.stringify(usersAsObject)
    });

    if (response.ok) {
        console.log("User erfolgreich gespeichert.");
    } else {
        console.error("Fehler beim Speichern:", await response.text());
    }
}


/* firebase functions loading and saving contacts */

let contactsFirebase = [];
const BASE_URL = "https://join-2c200-default-rtdb.europe-west1.firebasedatabase.app/";


async function loadContactsFromFirebase() {
    let response = await fetch(BASE_URL + "/contacts.json");
    if (response.ok) {
        let data = await response.json();
        contactsFirebase = Object.values(data || {});
        renderAvatar();
    } else {
        contactsFirebase = [];
    }
}

 function renderAvatar() {
    contactsFirebase.forEach(contact => {
        contact.avatar = contact.username
            .split(" ")                   // Zerlege in einzelne Wörter
            .map(name => name[0].toUpperCase())  // Nimm jeweils den ersten Buchstaben und mach ihn groß
            .join("");                    // Füge die Buchstaben zusammen
    });
}


async function saveContactsToFirebase() {
    const contactsAsObject = {};
    contactsFirebase.forEach((contact, index) => {
        contactsAsObject[index] = { ...contact, id: index };
    });
    await fetch(BASE_URL + `/contacts.json`, {
        method: 'PUT',
        body: JSON.stringify(contactsAsObject),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

