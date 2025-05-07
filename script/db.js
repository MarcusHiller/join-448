/**
 * Base URL for Firebase Realtime Database.
 * @type {string}
 */
const BASE_URL = "https://join-4215a-default-rtdb.europe-west1.firebasedatabase.app/";


/**
 * Loaded contacts stored in Firebase.
 * @type {Array<Object>}
 */
let contactsFirebase = [];

/**
 * Loads contacts from Firebase and assigns them to `contactsFirebase`.
 * @returns {Promise<void>}
 */
async function loadContactsFromFirebase() {
  let response = await fetch(BASE_URL + "/join/contacts.json");
  if (response.ok) {
    let data = await response.json();
    contactsFirebase = Object.values(data || {});
    renderAvatar();
  } else {
    contactsFirebase = [];
  }
}

/**
 * Renders avatar initials from usernames into `contactsFirebase` objects.
 */
function renderAvatar() {
  contactsFirebase.forEach(contact => {
    contact.avatar = contact.username
      .split(" ")
      .map(name => name[0].toUpperCase())
      .join("");
  });
}

/**
 * Saves `contactsFirebase` to Firebase.
 * @returns {Promise<void>}
 */
async function saveContactsToFirebase() {
  const contactsAsObject = {};
  contactsFirebase.forEach((contact, index) => {
    contactsAsObject[index] = { ...contact, id: index };
  });
  await fetch(BASE_URL + "/join/contacts.json", {
    method: 'PUT',
    body: JSON.stringify(contactsAsObject),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

/**
 * Saves user data from `userFirebase` to Firebase.
 * Falls back to `resetUserArray` on failure.
 * @returns {Promise<void>}
 */
async function saveUsersToFirebase() {
  const usersAsObject = {};
  userFirebase.forEach((user, index) => {
    usersAsObject[index] = { ...user };
  });
  try {
    await fetch(BASE_URL + "/join/users.json", {
      method: 'PUT',
      body: JSON.stringify(usersAsObject),
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("Error when saving:", error.message);
    resetUserArray();
  }
}

/**
 * Sends a new or updated task to Firebase using PUT.
 * @param {string} path - Firebase path.
 * @param {Object} data - Task object to store.
 * @returns {Promise<void>}
 */
async function putDataToServer(path = "", data) {
  try {
    const response = await fetch(BASE_URL + path + ".json", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    successfulAddedTask();
  } catch (error) {
    showErrorAddedTask();
  }
  userFeedback();
}

/**
 * Sends partial updates to a task object using PATCH.
 * @param {string} path - Firebase path.
 * @param {Object} data - Data to patch.
 * @returns {Promise<void>}
 */
async function patchDataToServer(path = "", data) {
  try {
    await fetch(BASE_URL + path + ".json", {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  } catch (error) {
    console.error('There was an error updating the data:', error);
  }
}
