let currentDraggableTask;
let tasks = [];
let currentCondition = "ToDo";


async function getAddTaskHTML() {
 await Promise.all([
   loadHTML("add_task_overlay.html", "add_container"),
 ]);
}

async function getTaskOverlayHTML() {
  await Promise.all([
    loadHTML("task_overlay.html", "overlay_container"),
  ]);
 }

 async function getEditTaskHTML() {
  await Promise.all([
    loadHTML("add_task_overlay.html", "overlay_container"),
  ]);
}
// Overlay functions

function openOverlayTask(taskIndex) {
   

   document.getElementById("board_overlay").classList.remove("d_none");
   document.getElementById("overlay_container").classList.remove("d_none");
   creatOverlayFromTask(taskIndex);
   setTimeout(() => {document.getElementById("overlay_container").classList.remove("overlay-container-sliding")}, 1)   
}

function openAddTask(condition="") {

  if (condition) {
    currentCondition = condition;
  }
  getAddTaskHTML();
  document.getElementById("cancel_button").classList.remove("d_none");
  document.getElementById("clear_button").classList.add("d_none");
  document.getElementById("close_add_task_overlay").classList.remove("d_none");
  document.getElementById("board_overlay").classList.remove("d_none");
  document.getElementById("add_container").classList.remove("d_none");
  setTimeout(() => {document.getElementById("add_container").classList.remove("overlay-container-sliding")}, 1);
  renderUserList();
}

function creatOverlayFromTask(taskIndex) {
 
 document.getElementById("overlay_titel").innerHTML = tasks[taskIndex].title;
 document.getElementById("overlay_description").innerHTML = tasks[taskIndex].descripton
 document.getElementById("overlay_date").innerHTML = tasks[taskIndex].date;
 renderUserIntoTaskOverlay(taskIndex);
 renderSubtaskIntoTaskOverlay(taskIndex);
 renderPrioIntoTaskOverlay(taskIndex);
 renderCategoryIntoTaskOverlay(taskIndex);
 renderButtons(taskIndex);
}

function renderButtons(taskIndex) {
  let deleteTask = document.getElementById("delete_task_on_overlay");
  let editTask = document.getElementById("edit_task_on_overlay");
  let deleteAttribute = `deleteTaskOnOverlay(${taskIndex})`;
  let editTaskAttribute = `editTaskOnOverlay(${taskIndex})`;

  deleteTask.setAttribute("onclick", deleteAttribute);
  editTask.setAttribute("onclick", editTaskAttribute);


}

function renderCategoryIntoTaskOverlay(taskIndex) {
  let categoryRef = document.getElementById("overlay_category");
  let category = tasks[taskIndex].category
  categoryRef.innerHTML = category;

  if (category === "Technical Task") {
    categoryRef.style.backgroundColor = "#1FD7C1";
  } else {
    categoryRef.style.backgroundColor = "#0038FF";
  }
}

function renderPrioIntoTaskOverlay(taskIndex) {
  let prioImg = document.getElementById("task_overlay_prio_img");
  let prioTask = document.getElementById("task_overlay_prio_text");
  let prio = tasks[taskIndex].priority;
  prioTask.innerHTML = prio;

  if(prio === "low") {
    prioImg.src = "/assets/img/icon/prio_low.svg";
  } else if (prio === "medium") {
    prioImg.src = "/assets/img/icon/prio_medium.svg";
  } else if(prio === "urgent") {
    prioImg.src = "/assets/img/icon/prio_urgent.svg";
  }
}

function renderSubtaskIntoTaskOverlay(taskIndex) {
  let subtaskListRef = document.getElementById("task_overlay_subtask_list");
  let subtaskList = tasks[taskIndex].subtask;
  subtaskListRef.innerHTML = "";

  for (let indexSubtask = 0; indexSubtask < subtaskList.length; indexSubtask++) {
    subtaskListRef.innerHTML += getTaskSubtaskOverlayTemplate(taskIndex, indexSubtask);
  }
  
}

function renderUserIntoTaskOverlay(taskIndex) {
  let taskUsers = tasks[taskIndex].assignedTo;
  let taskUsersTableRef = document.getElementById("task_overlay_user_list");
  taskUsersTableRef.innerHTML = "";

  for (let indexUser = 0; indexUser < taskUsers.length; indexUser++) {
    taskUsersTableRef.innerHTML += getTaskUsersOverlayTemplate(taskIndex, indexUser)
    
  }
}

function closeOverlayTask() {
   document.getElementById("overlay_container").classList.add("overlay-container-sliding");
   setTimeout(() => {document.getElementById("board_overlay").classList.add("d_none"),
        document.getElementById("overlay_container").classList.add("d_none")
       }, 100);

}

function closeAddTask() {
   document.getElementById("add_container").classList.add("overlay-container-sliding");
   setTimeout(() => {document.getElementById("board_overlay").classList.add("d_none"),
        document.getElementById("add_container").classList.add("d_none")
       }, 100);
       


}

function searchTask() {
   const input = document.getElementById("search_task");
   input.blur();
   input.value = "";
   document.activeElement.blur();
 }

//  Overlay Edit Function //


async function editTaskOnOverlay(taskIndex) {
  document.getElementById("add_container").innerHTML = "";
  await getEditTaskHTML();
  fitEditTaskToContainer();
  renderUserList();
  currentInputFieldvalue(taskIndex);
  
 
}

function fitEditTaskToContainer() {
  document.getElementById("addTask_headline").classList.add("d_none");
  document.getElementById("spaceholder").classList.add("d_none");
  document.getElementById("addTask_form_container").classList.add("flex-direction");
  document.getElementById("edit_scrolling").classList.add("scrolling");

}

function currentInputFieldvalue(taskIndex) {
document.getElementById("titel_input").value = tasks[taskIndex].title;
document.getElementById("description_input").value = tasks[taskIndex].descripton;
document.getElementById("date_input").value = tasks[taskIndex].date;
checkPrio(taskIndex);
checkAssignedTo(taskIndex);
checkCategory(taskIndex);
checkSubtasks(taskIndex);
renderEditButton(taskIndex);
}

function renderEditButton(taskIndex) {
  let formSubmit = document.getElementById("addTask_form");
  let editButton = document.getElementById("edit_button");
  let addButton = document.getElementById("add_button");
  let clearButton = document.getElementById("clear_button");


  clearButton.classList.add("d_none");
  addButton.classList.add("d_none");
  editButton.classList.remove("d_none");
  formSubmit.removeAttribute("onsubmit")
  formSubmit.setAttribute("onsubmit", `addEditedTask(${taskIndex})`);
}
  

function checkSubtasks(taskIndex) {
  let subtaskListRef = document.getElementById("sub_list");
  let subtaskList = tasks[taskIndex].subtask;
  subtaskListRef.innerHTML = "";

  for (let indexCheckSubtask = 0; indexCheckSubtask < subtaskList.length; indexCheckSubtask++) {
    let subtaskCheckValue = subtaskList[indexCheckSubtask].subtask;
    subtaskListRef.innerHTML += getSubtaskTemplate(indexCheckSubtask, subtaskCheckValue)
  }
  
}

function checkCategory(taskIndex) {
let category = tasks[taskIndex].category;

selectCategory(category);
}

function checkPrio(taskIndex) {
  let prio = tasks[taskIndex].priority;
  let urgent = document.getElementById("prio_urgent");
  let medium = document.getElementById("prio_medium");
  let low = document.getElementById("prio_low");

  if (prio === "urgent") {
    urgent.checked = true
    medium.checked = false;
    low.checked = false;
  }

  if (prio === "medium") {
    urgent.checked = false
    medium.checked = true;
    low.checked = false;
  }

  if (prio === "low") {
    urgent.checked = false
    medium.checked = false;
    low.checked = true;
  }
}

function checkAssignedTo(taskIndex) {
  let checkedUsers = tasks[taskIndex].assignedTo;
  let ids = [];

  for (let index = 0; index < checkedUsers.length; index++) {
    let username = tasks[taskIndex].assignedTo[index]
    let user = users.indexOf(username)
    ids.push(user);
  }

  for (let index = 0; index < ids.length; index++) {
    const userIndex = ids[index];
    let checkbox = document.getElementById("user_" + userIndex);
    checkbox.checked = true;
    addCheckedUsers(userIndex);
    
  }
}





 // Render //


 function renderTaskInToColumn() {
   let toDoColumnRef = document.getElementById("toDo_column");
   let inProgColumnRef = document.getElementById("inProg_column");
   let feedbackColumnRef = document.getElementById("feedback_column");
   let doneColumnRef = document.getElementById("done_column");

   toDoColumnRef.innerHTML = "";
   inProgColumnRef.innerHTML = "";
   feedbackColumnRef.innerHTML = "";
   doneColumnRef.innerHTML = "";

   

   for (let taskIndex = 0; taskIndex < tasks.length; taskIndex++) {
     let taskCondition = tasks[taskIndex].condition;

     if(taskCondition == "ToDo") {
       toDoColumnRef.innerHTML += getTaskTemplate(taskIndex);
     } else if (taskCondition == "inProgress") {
       inProgColumnRef.innerHTML += getTaskTemplate(taskIndex);
     } else if (taskCondition == "feedback") {
       feedbackColumnRef.innerHTML += getTaskTemplate(taskIndex);
     } else if (taskCondition == "done") {
       doneColumnRef.innerHTML += getTaskTemplate(taskIndex);
     }

     renderAssignedTo(taskIndex);
     renderSubtasks(taskIndex);
     renderPrio(taskIndex);
     renderCategoryColor(taskIndex);
   }

   

   

  

   if(toDoColumnRef.innerHTML == "") {
       toDoColumnRef.innerHTML = "<div class='empty-column'><p>No task To do</p></div>"
   }

   if(inProgColumnRef.innerHTML == "") {
       inProgColumnRef.innerHTML = "<div class='empty-column'><p>No task in Progress</p></div>"
   }

   if(feedbackColumnRef.innerHTML == "") {
       feedbackColumnRef.innerHTML = "<div class='empty-column'><p>No task waiting</p></div>"
   }

   if(doneColumnRef.innerHTML == "") {
       doneColumnRef.innerHTML = "<div class='empty-column'><p>No task is done</p></div>"
   };

   toDoColumnRef.innerHTML += "<div id='empty_task_toDo' class='empty-task d_none'></div>";
   inProgColumnRef.innerHTML += "<div id='empty_task_inProg' class='empty-task d_none'></div>";
   feedbackColumnRef.innerHTML += "<div id='empty_task_feedback' class='empty-task d_none'></div>";
   doneColumnRef.innerHTML += "<div id='empty_task_done' class='empty-task d_none'></div>";
}

function renderCategoryColor(taskIndex){
  let categoryRef = document.getElementById("task_category_" + taskIndex);
  let category = tasks[taskIndex].category;

  if (category === "Technical Task") {
    categoryRef.style.backgroundColor = "#1FD7C1";
  } else {
    categoryRef.style.backgroundColor = "#0038FF";
  }
}


function renderPrio(taskIndex) {
  let prioRef = document.getElementById("task_prio_user_" + taskIndex);
  let taskPrio = tasks[taskIndex].priority;

  if(taskPrio === "low") {
    prioRef.src = "/assets/img/icon/prio_low.svg";
  } else if (taskPrio === "medium") {
    prioRef.src = "/assets/img/icon/prio_medium.svg";
  } else if(taskPrio === "urgent") {
    prioRef.src = "/assets/img/icon/prio_urgent.svg";
  }

}

function renderSubtasks(taskIndex) {
  let subtaskProgressBar = document.getElementById("subtasks_user_" + taskIndex);
  let subtaskMaxRef = document.getElementById("subtask_max_user_" + taskIndex);
  let subtaskMax = tasks[taskIndex].subtask.length;

  subtaskProgressBar.setAttribute("max", subtaskMax);
  subtaskMaxRef.innerHTML = subtaskMax;
}

 function renderAssignedTo(taskIndex) {
  let userListRef = document.getElementById("task_users_" + taskIndex);
  let userList = tasks[taskIndex].assignedTo;
  userListRef.innerHTML = "";
      
  console.log(userList)

  if(userList) {
    for (let indexUser = 0; indexUser < userList.length; indexUser++) {
      userListRef.innerHTML += getUserInTaskTemplate(indexUser, userList)
      
    }
  }
 return userListRef.innerHTML

 }


//   Drag and Drop  //



function dragoverHandler(ev) {
   ev.preventDefault();
 }

 function startDragging(taskIndex) {
   currentDraggableTask = taskIndex;
 }



 function moveTo(condition) {
   tasks[currentDraggableTask].condition = condition;
   renderTaskInToColumn();
 }


 function addHighlight() {

   if (tasks[currentDraggableTask].condition == "ToDo") {
     document.getElementById("empty_task_inProg").classList.remove("d_none");
   } else if (tasks[currentDraggableTask].condition == "inProgress") {
     document.getElementById("empty_task_toDo").classList.remove("d_none");
   document.getElementById("empty_task_feedback").classList.remove("d_none");
   } else if (tasks[currentDraggableTask].condition == "feedback") {
     document.getElementById("empty_task_inProg").classList.remove("d_none");
     document.getElementById("empty_task_done").classList.remove("d_none");
   } else if (tasks[currentDraggableTask].condition == "done") {
     document.getElementById("empty_task_feedback").classList.remove("d_none");
   }
 }
 

 function removeHighlight() {
   document.getElementById("empty_task_toDo").classList.add("d_none");
   document.getElementById("empty_task_inProg").classList.add("d_none");
   document.getElementById("empty_task_feedback").classList.add("d_none");
   document.getElementById("empty_task_done").classList.add("d_none");
 }

//  Get Data //


 async function getDataFromServer(path="") {
  let response = await fetch(BASE_URL + path + ".json");
  let responseToJson =  await response.json()
  console.log(responseToJson);
  

  let tasksKeysArray = Object.keys(responseToJson)


  for (let index = 0; index < tasksKeysArray.length; index++) {
    let assignedUsers = arrayAssignedTo(index, responseToJson, tasksKeysArray);
    let subtasks = arraySubtasks(index, responseToJson, tasksKeysArray);
    tasks.push(
      {
        title: responseToJson[tasksKeysArray[index]].title,
        descripton: responseToJson[tasksKeysArray[index]].descripton,
        date: responseToJson[tasksKeysArray[index]].date,
        category: responseToJson[tasksKeysArray[index]].category,
        priority: responseToJson[tasksKeysArray[index]].priority,
        subtask: subtasks,
        assignedTo : assignedUsers,
        id : tasksKeysArray[index],
        condition: responseToJson[tasksKeysArray[index]].condition
      
      }
    )
  }
  
  renderTaskInToColumn();
  console.log(tasks);
  
}

function arraySubtasks(index, responseToJson, tasksKeysArray) {
let subtasksKeys = Object.keys(responseToJson[tasksKeysArray[index]].subtask)
let subtasks = []

for (let indexSubtask = 0; indexSubtask < subtasksKeys.length; indexSubtask++) {
  subtasks.push(
    {
      "subtask" : responseToJson[tasksKeysArray[index]].subtask[subtasksKeys[indexSubtask]]
    })
  
}
 return subtasks
}

function arrayAssignedTo(index, responseToJson, tasksKeysArray) {
  let usersKeysArray = Object.keys(responseToJson[tasksKeysArray[index]].assignedTo);
  let usersArray = []

  console.log(usersKeysArray);


  



  for (let userIndex = 0; userIndex < usersKeysArray.length; userIndex++) {
    let username = responseToJson[tasksKeysArray[index]].assignedTo[usersKeysArray[userIndex]]
    let user = users.find(user => username === user.username)


    usersArray.push(user)
    
  }
  
  console.log(usersArray);

  return usersArray;
  
}

