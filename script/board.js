let currentDraggableTask;
let tasks = [];
let currentCondition = "ToDo";
let usersToDeleteFromFirebase = [];

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

// Add Task functions

async function openAddTask(condition = "") {
  if (condition) {
    currentCondition = condition;
  }
  await getAddTaskHTML();
  document.getElementById("cancel_button").classList.remove("d_none");
  document.getElementById("clear_button").classList.add("d_none");
  document.getElementById("close_add_task_overlay").classList.remove("d_none");
  document.getElementById("board_overlay").classList.remove("d_none");
  document.getElementById("add_container").classList.remove("d_none");
  setTimeout(() => { document.getElementById("add_container").classList.remove("overlay-container-sliding") }, 1);
  document.getElementById("body").classList.add("overflow-hidden");
  renderUserList();
}


function closeAddTask() {
  document.getElementById("add_container").classList.add("overlay-container-sliding");
  setTimeout(() => {
    document.getElementById("board_overlay").classList.add("d_none"),
      document.getElementById("add_container").classList.add("d_none")
  }, 100);
  document.getElementById("body").classList.remove("overflow-hidden");
}


function searchTask() {
  const input = document.getElementById("search_task");
  input.blur();
  input.value = "";
  document.activeElement.blur();
}



// Search //

function searchTask() {
  const inputField = document.getElementById("search_task");
  const inputValue = inputField.value.toLowerCase();

  for (let indexTask = 0; indexTask < tasks.length; indexTask++) {
    const taskIndex = indexTask;
    const task = document.getElementById("task_index_" + taskIndex);

    if (!task) continue; // Sicherheits-Check

    const title = tasks[indexTask].title.toLowerCase();
    const descripton = tasks[indexTask].descripton.toLowerCase(); // <-- richtig geschrieben

    // Wenn das Suchfeld leer ist → alle Tasks zeigen
    if (inputValue === "") {
      task.classList.remove("d_none");
    }
    // Wenn etwas eingegeben wurde → filtern
    else {
      const isMatch = title.includes(inputValue) || descripton.includes(inputValue);

      if (isMatch) {
        task.classList.remove("d_none");
      } else {
        task.classList.add("d_none");
      }
    }
  }

  // Wichtig: danach erneut leere Spalten prüfen
  renderEmptyColumn();
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

    if (taskCondition == "ToDo") {
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
  renderEmptyColumn();

  renderDragDropHighlights(toDoColumnRef, inProgColumnRef, feedbackColumnRef, doneColumnRef)
}


function renderDragDropHighlights(toDoColumnRef, inProgColumnRef, feedbackColumnRef, doneColumnRef) {
  toDoColumnRef.innerHTML += "<div id='empty_task_toDo' class='empty-task d_none'></div>";
  inProgColumnRef.innerHTML += "<div id='empty_task_inProg' class='empty-task d_none'></div>";
  feedbackColumnRef.innerHTML += "<div id='empty_task_feedback' class='empty-task d_none'></div>";
  doneColumnRef.innerHTML += "<div id='empty_task_done' class='empty-task d_none'></div>";

}


function renderEmptyColumn() {
  let toDoColumnRef = document.getElementById("toDo_column");
  let inProgColumnRef = document.getElementById("inProg_column");
  let feedbackColumnRef = document.getElementById("feedback_column");
  let doneColumnRef = document.getElementById("done_column");

  checkAndRenderEmptyMessage(toDoColumnRef, "No task To do");
  checkAndRenderEmptyMessage(inProgColumnRef, "No task in Progress");
  checkAndRenderEmptyMessage(feedbackColumnRef, "No task waiting");
  checkAndRenderEmptyMessage(doneColumnRef, "No task is done");
}


function checkAndRenderEmptyMessage(columnRef, message) {
  const visibleTasks = Array.from(columnRef.children).filter(child =>
    !child.classList.contains("d_none") &&
    !child.classList.contains("empty-column")
  );

  const alreadyHasPlaceholder = columnRef.querySelector(".empty-column");

  // Wenn keine sichtbaren Tasks vorhanden sind → dann Platzhalter hinzufügen (aber nur wenn er nicht schon existiert)
  if (visibleTasks.length === 0 && !alreadyHasPlaceholder) {
    const placeholder = document.createElement("div");
    placeholder.classList.add("empty-column");
    placeholder.innerHTML = `<p>${message}</p>`;
    columnRef.appendChild(placeholder);
  }

  // Wenn wieder sichtbare Tasks da sind → Platzhalter entfernen
  if (visibleTasks.length > 0 && alreadyHasPlaceholder) {
    alreadyHasPlaceholder.remove();
  }
}


function renderCategoryColor(taskIndex) {
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

  if (taskPrio === "low") {
    prioRef.src = "/assets/img/icon/prio_low.svg";
  } else if (taskPrio === "medium") {
    prioRef.src = "/assets/img/icon/prio_medium.svg";
  } else if (taskPrio === "urgent") {
    prioRef.src = "/assets/img/icon/prio_urgent.svg";
  }

}


function renderSubtasks(taskIndex) {
  let subtaskProgressBar = document.getElementById("subtasks_user_" + taskIndex);
  let subtaskMaxRef = document.getElementById("subtask_max_user_" + taskIndex);
  let subtaskMax = tasks[taskIndex].subtask.length;
  let subtaskValueRef = document.getElementById("subtask_value_user_" + taskIndex);
  let subtaskValue = subtaskProgressBar.value;

  subtaskProgressBar.setAttribute("max", subtaskMax);
  if (subtaskMax) {
    subtaskMaxRef.innerHTML = subtaskMax;
  }

  subtaskValue = checkedSubtaskChecked(taskIndex, subtaskMax);

  if (subtaskValue > 0) {
    subtaskProgressBar.setAttribute("value", subtaskValue);
    subtaskValueRef.innerHTML = subtaskValue;
  }
}


function renderAssignedTo(taskIndex) {
  let userListRef = document.getElementById("task_users_" + taskIndex);
  let userList = tasks[taskIndex].assignedTo;
  userListRef.innerHTML = "";
  console.log(userList)

  if (userList.length) {
    for (let indexUser = 0; indexUser < userList.length; indexUser++) {
      userListRef.innerHTML += getUserInTaskTemplate(indexUser, userList)

    }
  } else {
    userListRef.innerHTML = "<span style='opacity: 0.2'>No User added</span>";
  }
  return userListRef.innerHTML
}

//  Get Data //
//ANCHOR - Get Data

async function getDataFromServer(path = "") {
  await loadContactsFromFirebase();
  let response = await fetch(BASE_URL + path + ".json");
  let responseToJson = await response.json();

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
        assignedTo: assignedUsers,
        id: tasksKeysArray[index],
        condition: responseToJson[tasksKeysArray[index]].condition

      }
    )
  }
  renderTaskInToColumn();
  await deleteNotFoundedUserFromTask();
}

async function deleteNotFoundedUserFromTask() {
  for (let del of usersToDeleteFromFirebase) {
    await fetch(`${BASE_URL}/tasks/${del.taskKey}/assignedTo/${del.userKey}.json`, {
      method: "DELETE"
    });
    console.log(`Gelöscht nach dem Laden: ${del.username} (Key: ${del.userKey})`);
  }
}

function arraySubtasks(index, responseToJson, tasksKeysArray) {


  let subtasks = []

  if (responseToJson[tasksKeysArray[index]].subtask !== undefined) {
    let subtasksKeys = Object.keys(responseToJson[tasksKeysArray[index]].subtask)


    for (let indexSubtask = 0; indexSubtask < subtasksKeys.length; indexSubtask++) {

      subtasks.push(
        {
          "subtaskName": responseToJson[tasksKeysArray[index]].subtask[subtasksKeys[indexSubtask]].name,
          "subtaskCheck": responseToJson[tasksKeysArray[index]].subtask[subtasksKeys[indexSubtask]].checked
        })

    }

  }

  return subtasks;
}


function arrayAssignedTo(index, responseToJson, tasksKeysArray) {
  let usersArray = [];
  let taskKey = tasksKeysArray[index];
  let assignedTo = responseToJson[taskKey].assignedTo;

  if (assignedTo) {
    let usersKeysArray = Object.keys(assignedTo);

    for (let userKey of usersKeysArray) {
      let username = assignedTo[userKey];
      let contact = contactsFirebase.find(user =>
        user.username.toLowerCase() === username.toLowerCase()
      );

      if (contact) {
        usersArray.push(contact);
      } else {
        // ❌ Statt sofort zu löschen → merken
        usersToDeleteFromFirebase.push({
          taskKey: taskKey,
          userKey: userKey,
          username: username
        });
      }
    }
  }

  return usersArray;
}


