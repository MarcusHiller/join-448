
let nextTaskId = 5;
let subtasks = [];
let subtaskIndex = -1;

/////  From Marcus
// let contactsFirebase = [];
// const BASE_URL_Marcus = "https://join-2c200-default-rtdb.europe-west1.firebasedatabase.app/";


// async function loadContactsFromFirebase() {
//   let response = await fetch(BASE_URL_Marcus + "/contacts.json");
//   if (response.ok) {
//     let data = await response.json();
//     contactsFirebase = Object.values(data || {});
//     renderAvatar();
//   } else {
//     contactsFirebase = [];
//   }
// }



// function renderAvatar() {
//   contactsFirebase.forEach(contact => {
//     contact.avatar = contact.username
//       .split(" ")                   // Zerlege in einzelne Wörter
//       .map(name => name[0].toUpperCase())  // Nimm jeweils den ersten Buchstaben und mach ihn groß
//       .join("");                    // Füge die Buchstaben zusammen
//   });
// }

////////// ------------   ///////////


async function putDataToServer(path = "", data) {
  try {
    const response = await fetch(BASE_URL + path + ".json", {
      method: 'PUT', // Use the PUT method
      headers: {
        'Content-Type': 'application/json' // Specify that you're sending JSON data
      },
      body: JSON.stringify(data) // Convert your data to a JSON string
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json(); // Parse the response body as JSON
    console.log('Data saved successfully:', responseData); // Log the response from the server (optional)

  } catch (error) {
    console.error('There was an error saving the data:', error);
  }
}




function addClearButtonToThePage() {
  document.getElementById("clear_button").classList.remove("d_none");
}


function openUserDropMenu() {
  document.getElementById("dropdown_menu_arrow").classList.toggle("rotate-img");
  document.getElementById("assigned_select").classList.toggle("blue-border");
  document.getElementById("add_user_list").classList.toggle("dropdown-animation-user");
}


function resortUserlist() {
  contactsFirebase.sort((a, b) => {
    return a.username.localeCompare(b.username, 'de', { sensitivity: 'base' });
  });
}


function renderUserList() {
  resortUserlist();
  let usersListRef = document.getElementById("user_list_dropdown");
  usersListRef.innerHTML = "";

  for (let indexUsers = 0; indexUsers < contactsFirebase.length; indexUsers++) {
    usersListRef.innerHTML += getUserListTemplate(indexUsers);

  }
}

function addCheckedUsers(indexUsers) {
  let avatarList = document.getElementById("user_logo_after_seleceted");
  let userCheckbox = document.getElementById("user_" + indexUsers);
  let userAvatar = document.getElementById("user_checked_" + indexUsers);

  if (userCheckbox.checked) {
    avatarList.innerHTML += getCheckedAvatar(indexUsers);
  }
  if (!userCheckbox.checked) {
    userAvatar.remove();
  }

}

function openCatDropMenu() {
  document.getElementById("dropdown_menu_arrow_select").classList.toggle("rotate-img");
  document.getElementById("category_input").classList.toggle("blue-border");
  document.getElementById("category_list").classList.toggle("dropdown-animation");
}

function closeOpenCatDropMenu() {
  document.getElementById("dropdown_menu_arrow_select").classList.remove("rotate-img");
  document.getElementById("category_input").classList.remove("blue-border");
  document.getElementById("category_list").classList.remove("dropdown-animation");
}



function selectCategory(category) {
  const input = document.getElementById("category_select_input");
  input.value = category;

  // Fehleranzeige entfernen
  input.parentElement.classList.remove("error-label-border");
  document.getElementById("error-cat").classList.remove("visible");

  closeOpenCatDropMenu();
}

function addBorder() {
  document.getElementById("subtask_input_label").classList.add("blue-border");
}

function removeBorder() {
  document.getElementById("subtask_input_label").classList.remove("blue-border");
}


function addTaskButton() {
  document.getElementsById("addTask_form").addEventListener("submit", addTask(condition = ""))
}


function addTask(condition = "") {
  let hasError = false;
  let newTask;
  const fields = [
    { id: 'titel_input', errorId: 'error-title' },
    { id: 'date_input', errorId: 'error-date' },
    { id: 'category_select_input', errorId: 'error-cat' }
  ];
  removeErrorMsg();
  hasError = checkInputFields(fields);
  if (hasError) return;
  newTask = getNewTask();
  putDataToServer(`/join/tasks/${newTask.id}`, newTask);
}

function removeErrorMsg() {
  document.querySelectorAll('.error-message').forEach(e => e.classList.remove('visible'));
  document.querySelectorAll('.error-border').forEach(e => e.classList.remove('error-border'));
  document.querySelectorAll('.error-label-border').forEach(e => e.classList.remove('error-label-border'));
}

function checkInputFields(fields) {
  fields.forEach(({ id, errorId }) => {
    const input = document.getElementById(id);
    const error = document.getElementById(errorId);
    const isEmpty = !input.value.trim();

    if (isEmpty) {
      error.classList.add('visible');
      if (id === 'category_select_input') {
        input.parentElement.classList.add('error-label-border');
      } else {
        input.classList.add('error-border');
      }
      hasError = true;
    }
  });
  return hasError;
}


function getNewTask() {
  let title = document.getElementById("titel_input").value;
  let descripton = document.getElementById("description_input").value;
  let date = document.getElementById("date_input").value;
  let category = document.getElementById("category_select_input").value;
  let priority = getPriority();
  let subtask = getSubtasks().subtasks;
  let assignedTo = getAssignedTo();
  let id = generateID();
  let condition = currentCondition;
  return { title, descripton, date, category, priority, subtask, assignedTo, id, condition }
}


function getPriority() {
  let priority;
  let urgent = document.getElementById("prio_urgent");
  let medium = document.getElementById("prio_medium");
  let low = document.getElementById("prio_low");
  let prio = [urgent, medium, low];

  for (i = 0; i < prio.length; i++) {
    if (prio[i].checked) {
      priority = prio[i].value;
    }
  }
  return priority;
}


function generateID() {
  return (new Date()).getTime();
}


function getAssignedTo() {
  let userID = getUserID();
  let allUsers = getUserObject(userID);
  return Object.fromEntries(allUsers)
}


function getUserID() {
  let userID = [];
  for (let userIdIndex = 0; userIdIndex < contactsFirebase.length; userIdIndex++) {
    let userCheckbox = document.getElementById("user_" + userIdIndex);
    if (userCheckbox.checked) {
      userID.push(contactsFirebase[userIdIndex].username)
    }
  }
  return userID;
}


function getUserObject(userID) {
  let allUsers = [];
  for (let index = 0; index < userID.length; index++) {
    let user = ["user" + index, userID[index]]
    allUsers.push(user);
  }
  return allUsers;
}

function sortSubtask() {
  let subtaskListLength = document.getElementById("sub_list").children.length;

  for (let index = 0; subtaskListLength < array.length; index++) {
    let subtask = document.getElementById("editable_input_" + i);

  }
}

function prepareSubtaskIDs() {
  const subtaskElements = document.getElementById("sub_list").children;

  for (let i = 0; i < subtaskElements.length; i++) {
    const element = subtaskElements[i];

    // Nur das Input-Feld sauber neu nummerieren
    const input = element.querySelector('input');
    if (input) {
      input.id = `editable_input_${i}`;
    }
  }
}

function getSubtasks(taskIndex) {
  prepareSubtaskIDs();
  const subtaskElements = document.getElementById("sub_list").children;
  const subtasksObject = {};

  for (let i = 0; i < subtaskElements.length; i++) {
    const input = document.getElementById("editable_input_" + i);
    const value = input ? input.value.trim() : "";
    let check;

    if (taskIndex !== undefined) {
      let subtaskCheck = tasks[taskIndex].subtask[i].subtaskCheck;

      if (subtaskCheck) {
        check = true;
      } else {
        check = false;
      }

    } else {
      check = false
    }


    if (value) {
      subtasksObject["subtask" + i] = {
        name: value,
        checked: check
      };
    }
  }

  return { subtasks: subtasksObject };
}

function showAddSubtaskButton() {
  let subtask = document.getElementById("subtask_input");

  if (subtask.value) {
    document.getElementById("delete_and_add_icon").classList.remove("d_none");
    document.getElementById("subtask_plus_icon").classList.add("d_none")
  } else {
    document.getElementById("delete_and_add_icon").classList.add("d_none");
    document.getElementById("subtask_plus_icon").classList.remove("d_none");
  }
}

function clearSubtaskInput() {
  document.getElementById("subtask_input").innerHTML = "";
}


function addSubtask() {
  let subtask = document.getElementById("subtask_input");
  let listRef = document.getElementById("sub_list");
  let subtaskValue = subtask.value;

  if (subtask.value) {
    subtaskIndex++;
    listRef.innerHTML += getSubtaskTemplate(subtaskIndex, subtaskValue);
    subtask.value = "";
    document.getElementById("delete_and_add_icon").classList.add("d_none");
    document.getElementById("subtask_plus_icon").classList.remove("d_none");
  }
}

function showEditIcons(indexSubTask) {
  document.getElementById("edit_and_delete_icons_" + indexSubTask).classList.remove("d_none")
}

function blindEditIcons(indexSubTask) {
  document.getElementById("edit_and_delete_icons_" + indexSubTask).classList.add("d_none")
}

function editSubtask(indexSubTask) {
  let input = document.getElementById("editable_input_" + indexSubTask);
  const len = input.value.length;

  input.readOnly = false;
  input.setSelectionRange(len, len);
  input.focus();
}

function emptySubtaskDelete(indexSubTask) {
  let input = document.getElementById("editable_input_" + indexSubTask).value;

  if (!input) {
    removeSubtask(indexSubTask);
  }
}

function editSubmit(indexSubTask) {
  document.getElementById("editable_input_" + indexSubTask).readOnly = true;
}

function removeSubtask(indexSubTask, taskIndex) {
  document.getElementById("subtask_" + indexSubTask).remove();
}

function searchContactToTask() {  // not avalieble yet
  let input = document.getElementById("assigned_select_input").value;
}

function clearAddTaskField() {
  document.getElementById("titel_input").value = "";
  document.getElementById("description_input").value = "";
  document.getElementById("date_input").value = "";
  document.getElementById("prio_medium").checked = true;
  unsetCheckbox();
  document.getElementById("user_logo_after_seleceted").innerHTML = "";
  document.getElementById("category_select_input").value = "";
  clearSubtaskInput();
}

function clearSubtaskInput() {
  document.getElementById("subtask_input").value = "";
  document.getElementById("sub_list").innerHTML = "";
}


function unsetCheckbox() {
  for (let userIndex = 0; userIndex < contactsFirebase.length; userIndex++) {
    document.getElementById("user_" + userIndex).checked = false
  }
}


function addEditedTask(taskIndex) {
  let newEditedTask = {}
  let title = document.getElementById("titel_input");
  let descripton = document.getElementById("description_input");
  let date = document.getElementById("date_input");
  let category = document.getElementById("category_select_input");
  let priority;
  let subtasks = getSubtasks(taskIndex).subtasks;
  let assignedTo = getAssignedTo();
  let taskID = tasks[taskIndex].id;
  let condition = tasks[taskIndex].condition;


  let urgent = document.getElementById("prio_urgent");
  let medium = document.getElementById("prio_medium");
  let low = document.getElementById("prio_low");
  let prio = [urgent, medium, low];

  for (i = 0; i < prio.length; i++) {
    if (prio[i].checked) {
      priority = prio[i].value;
    }
  }



  newEditedTask = {
    title: title.value,
    descripton: descripton.value,
    date: date.value,
    category: category.value,
    priority: priority,
    subtask: subtasks,
    assignedTo: assignedTo,
    condition: condition,
    id: taskID
  }

  console.log(newEditedTask);
  console.log(taskID);






  console.log(tasks);
  console.log(tasks[taskIndex]);
  console.log(newEditedTask);



  putDataToServer(`/join/tasks/${taskID}`, newEditedTask);
  tasks[taskIndex] = newEditedTask;
  getSubtasksArrayAfterEdit(taskIndex);
  getAssignedToArrayAfterEdit(taskIndex);
  renderSingleTaskInToColumn(taskIndex);
  closeOverlayTask();
  clearOverlay();
}

function getAssignedToArrayAfterEdit(taskIndex) {
  let usersArray = [];
  let usersObjekt = tasks[taskIndex].assignedTo;
  let usersKeysArray = Object.keys(usersObjekt);

  for (let userIndex = 0; userIndex < usersKeysArray.length; userIndex++) {
    let username = usersObjekt[usersKeysArray[userIndex]]
    let user = contactsFirebase.find(user => username === user.username)
    usersArray.push(user)
  }

  return tasks[taskIndex].assignedTo = usersArray;
}

function getSubtasksArrayAfterEdit(taskIndex) {
  let subtasksObj = tasks[taskIndex].subtask
  let subtasksKeys = Object.keys(subtasksObj)
  let subtasks = [];

  for (let index = 0; index < subtasksKeys.length; index++) {
    subtasks.push(
      {
        "subtaskName": subtasksObj[subtasksKeys[index]].name,
        "subtaskCheck": subtasksObj[subtasksKeys[index]].checked
      })

  }

  return tasks[taskIndex].subtask = subtasks;
}

async function clearOverlay() {
  await getTaskOverlayHTML();
}

function renderSingleTaskInToColumn(taskIndex) {
  selectConditionForSingleTask(taskIndex);
  renderAssignedTo(taskIndex);
  renderSubtasks(taskIndex);
  renderPrio(taskIndex);
  renderCategoryColor(taskIndex);
}

function selectConditionForSingleTask(taskIndex) {
  let taskRef = document.getElementById("task_" + "index_" + taskIndex);
  taskRef.innerHTML = getSingleTaskAfterEdit(taskIndex);
}
