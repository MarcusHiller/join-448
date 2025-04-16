const BASE_URL = "https://join-4215a-default-rtdb.europe-west1.firebasedatabase.app/"


// async function getDataFromServer(path="") {
//   let response = await fetch(BASE_URL + path + ".json");
//   let responseToJson =  await response.json()
//   tasks.push(responseToJson);
//   console.log(tasks);
  
// }

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

//let tasks = [
  // {
  //   id: 1,
  //   title: "Kochwelt Page Testing",
  //   descripton: "Lorem ipsum dolor sit amet consectetur adipisicin",
  //   date: "2025-03-14",
  //   priority: 1,
  //   category: "User Story",
  //   assignedTo: [
  //     { user: { name: "Muster Mann", logo: "MM" } },
  //     { user: { name: "Max Testing", logo: "MT" } }
  //   ],
  //   subtasks: ["Testing", "Testing", "Testing"],
  //   condition: "ToDo"
  // },
  // {
  //   id: 2,
  //   title: "Dashboard UI Fixes",
  //   descripton: "Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.",
  //   date: "2025-03-15",
  //   priority: 2,
  //   category: "Bug Fix",
  //   assignedTo: [
  //     { user: { name: "Lisa Dev", logo: "LD" } },
  //     { user: { name: "John Doe", logo: "JD" } }
  //   ],
  //   subtasks: ["Fix layout", "Adjust colors", "Optimize performance"],
  //   condition: "feedback"
  // },
  // {
  //   id: 3,
  //   title: "Backend API Update",
  //   descripton: "Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.",
  //   date: "2025-03-16",
  //   priority: 3,
  //   category: "Feature",
  //   assignedTo: [
  //     { user: { name: "Backend Guru", logo: "BG" } },
  //     { user: { name: "API Tester", logo: "AT" } }
  //   ],
  //   subtasks: ["Update endpoints", "Improve security", "Add logging"],
  //   condition: "inProgress"
  // },
  // {
  //   id: 4,
  //   title: "Mobile App Testing",
  //   descripton: "Pellentesque in ipsum id orci porta dapibus.",
  //   date: "2025-03-17",
  //   priority: 1,
  //   category: "done",
  //   assignedTo: [
  //     { user: { name: "QA Expert", logo: "QE" } },
  //     { user: { name: "Mobile Dev", logo: "MD" } }
  //   ],
  //   subtasks: ["Run test cases", "Report bugs", "Verify fixes"],
  //   condition: "done"
  // }
//];

const users = [
  { id: 0, username: "Max Bäcker", email: "max.baecker@email.de", phone: "0123456", color: "#FF7A00", avatar: "MB"},
  { id: 1, username: "Anna Fischer", email: "anna.fischer@email.de", phone: "0123457", color: "#FF5EB3", avatar: "AF" },
  { id: 2, username: "Sophie Förster", email: "sophie.foerster@email.de", phone: "0123458", color: "#6E52FF", avatar: "SF" },
  { id: 3, username: "Lukas Schreiner", email: "lukas.schreiner@email.de", phone: "0123459", color: "#9327FF", avatar: "LS" },
  { id: 4, username: "Marie Koch", email: "marie.koch@email.de", phone: "0123460", color: "#00BEE8", avatar: "MK" },
  { id: 5, username: "Jonas Müller", email: "jonas.mueller@email.de", phone: "0123461", color: "#1FD7C1", avatar: "JM" },
  { id: 6, username: "Lea Schneider", email: "lea.schneider@email.de", phone: "0123462", color: "#FF745E", avatar: "LS" },
  { id: 7, username: "Felix Weber", email: "felix.weber@email.de", phone: "0123463", color: "#FFA35E", avatar: "FW" },
  { id: 8, username: "Emma Zimmermann", email: "emma.zimmermann@email.de", phone: "0123464", color: "#FC71FF", avatar: "EZ" },
  { id: 9, username: "Paul Bauer", email: "paul.bauer@email.de", phone: "0123465", color: "#FFC701", avatar: "PB" },
  { id: 10, username: "Clara Seiler", email: "clara.seiler@email.de", phone: "0123466", color: "#0038FF", avatar: "CS" },
  { id: 11, username: "Niklas Meier", email: "niklas.meier@email.de", phone: "0123467", color: "#C3FF2B", avatar: "NM" },
  { id: 12, username: "Hannah Richter", email: "hannah.richter@email.de", phone: "0123468", color: "#FFE62B", avatar: "HR" },
  { id: 13, username: "Tom Wolf", email: "tom.wolf@email.de", phone: "0123469", color: "#FF4646", avatar: "TW" },
  { id: 14, username: "Lena Hartmann", email: "lena.hartmann@email.de", phone: "0123470", color: "#FFBB2B", avatar: "LH" },
  { id: 15, username: "Julian Beck", email: "julian.beck@email.de", phone: "0123471", color: "#FF7A00", avatar: "JB" },
  { id: 16, username: "Sophia Brandt", email: "sophia.brandt@email.de", phone: "0123472", color: "#FF5EB3", avatar: "SB" },
  { id: 17, username: "David Schuster", email: "david.schuster@email.de", phone: "0123473", color: "#6E52FF", avatar: "DS" },
  { id: 18, username: "Mia Neumann", email: "mia.neumann@email.de", phone: "0123474", color: "#9327FF", avatar: "MN" },
  { id: 19, username: "Florian Wagner", email: "florian.wagner@email.de", phone: "0123475", color: "#00BEE8", avatar: "FW" }
];

let nextTaskId = 5;

let subtasks = [];
let subtaskIndex = -1;




document.querySelectorAll("select").forEach(select => {
    select.addEventListener("change", () => {
      select.blur();
    });
  });

function addClearButtonToThePage() {
  document.getElementById("clear_button").classList.remove("d_none");
  }



function openUserDropMenu() {
  document.getElementById("dropdown_menu_arrow").classList.toggle("rotate-img");
  document.getElementById("assigned_select").classList.toggle("blue-border");
  document.getElementById("add_user_list").classList.toggle("dropdown-animation-user"); 
  }

function renderUserList() {
  let usersListRef = document.getElementById("user_list_dropdown");
  usersListRef.innerHTML = "";



  for (let indexUsers = 0; indexUsers < users.length; indexUsers++) {
    usersListRef.innerHTML += getUserListTemplate(indexUsers);
    
  }
}

function addCheckedUsers(indexUsers) {
  let avatarList = document.getElementById("user_logo_after_seleceted");
  let userCheckbox = document.getElementById("user_" + indexUsers);
  let userAvatar = document.getElementById("user_checked_" + indexUsers);

    if(userCheckbox.checked) {
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
  document.getElementById("category_select_input").value = category;
  closeOpenCatDropMenu();
}

function addBorder() {
  document.getElementById("subtask_input_label").classList.add("blue-border");
}

function removeBorder() {
  document.getElementById("subtask_input_label").classList.remove("blue-border");
}


function addTaskButton() {
  document.getElementsById("addTask_form").addEventListener("submit", addTask(condition=""))
}


function addTask(condition="") {
    let newTask = {}
    let title = document.getElementById("titel_input");
    let descripton = document.getElementById("description_input");
    let date = document.getElementById("date_input");
    let category = document.getElementById("category_select_input");
    let priority = "medium";
    let subtasks = getSubtasks();
    let assignedTo = getAssignedTo();
    let taskID = generateID();
    let firstCondition = currentCondition;

    let urgent = document.getElementById("prio_urgent");
    let medium = document.getElementById("prio_medium");
    let low = document.getElementById("prio_low");
    let prio = [urgent, medium, low];
    
    for (i = 0; i < prio.length; i++) {
      if (prio[i].checked) {
        priority = prio[i].value;
    }
    }



  newTask = {
      title: title.value,
      descripton: descripton.value,
      date: date.value,
      category: category.value,
      priority: priority,
      subtask: subtasks,
      assignedTo : assignedTo,
      id : taskID,
      condition: firstCondition
    }

    console.log(newTask);

    putDataToServer(`/join/tasks/${taskID}`, newTask);
  };

  function generateID() {
    return (new Date()).getTime();
  }

  function getAssignedTo() {
    
    let userID = [];
    let allUsers = [];
  

    for (let userIdIndex = 0; userIdIndex < users.length; userIdIndex++) {
      let userCheckbox = document.getElementById("user_" + userIdIndex);
      if(userCheckbox.checked) {
        userID.push(users[userIdIndex].username)
      }
    }

    for (let index = 0; index < userID.length; index++) {
      let user = ["user" + index, userID[index]]
      allUsers.push(user);
      
    }

     return Object.fromEntries(allUsers)
  }


function getSubtasks() {
  let subtasksCount = document.getElementById("sub_list").children.length;
  let subtasksValue = [];
  let subtasksArray = [];
  

  for (let indexSubTask = 0; indexSubTask < subtasksCount; indexSubTask++) {
    let subtask = document.getElementById("editable_input_" + indexSubTask).value;

    subtasksValue.push(subtask);
  }

  for (let index = 0; index < subtasksValue.length; index++) {
    let subtaskValue = subtasksValue[index];
    let subtaskKey = "subtask" + index;
    let subtaskArray = [subtaskKey, subtaskValue];

    subtasksArray.push(subtaskArray);
  }

  return Object.fromEntries(subtasksArray);
}

function showAddSubtaskButton() {
  let subtask = document.getElementById("subtask_input");

  if(subtask.value) {
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

  if(subtask.value) {
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

function removeSubtask(indexSubTask) {
  document.getElementById("subtask_" + indexSubTask).remove();
}

function searchContactToTask() {  // not avalieble yet
  let input = document.getElementById("assigned_select_input").value;
}

function clearAddTaskField() {
  document.getElementById("titel_input").value = "";
  document.getElementById("description_input").value = "";
  document.getElementById("date_input").value = "";
}

function addEditedTask(taskIndex) {
  let newEditedTask = {}
  let title = document.getElementById("titel_input");
  let descripton = document.getElementById("description_input");
  let date = document.getElementById("date_input");
  let category = document.getElementById("category_select_input");
  let priority;
  let subtasks = getSubtasks();
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
    assignedTo : assignedTo,
    condition: condition,
    id: taskID
  }

  console.log(newEditedTask);
  console.log(taskID);
  

  putDataToServer(`/join/tasks/${taskID}`, newEditedTask);

}
