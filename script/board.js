/**
 * Currently selected task index for mobile navigation.
 * @type {number}
 */
let currentDraggableTask;

/**
 * Array storing all task objects.
 * @type {Array<Object>}
 */
let tasks = [];

/**
 * Current selected task condition (status/category).
 * @type {string}
 */
let currentCondition = "ToDo";

/**
 * List of users that need to be deleted from Firebase due to being unassigned or missing.
 * @type {Array<Object>}
 */
let usersToDeleteFromFirebase = [];

/**
 * Loads the Add Task overlay into the DOM.
 * @async
 */
async function getAddTaskHTML() {
  await Promise.all([
    loadHTML("add_task_overlay.html", "add_container"),
  ]);
}

/**
 * Loads the Task Overlay into the DOM.
 * @async
 */
async function getTaskOverlayHTML() {
  await Promise.all([
    loadHTML("task_overlay.html", "overlay_container"),
  ]);
}

/**
 * Loads the Edit Task overlay into the DOM.
 * @async
 */
async function getEditTaskHTML() {
  await Promise.all([
    loadHTML("add_task_overlay.html", "overlay_container"),
  ]);
}

/**
 * Opens the Add Task overlay and sets condition if provided.
 * @async
 * @param {string} [condition=""] - Optional condition to set for the new task.
 */
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
  setTimeout(() => {
    document.getElementById("add_container").classList.remove("overlay-container-sliding");
  }, 1);
  document.getElementById("body").classList.add("overflow-hidden");
  renderUserList();
}

/**
 * Closes the Add Task overlay and restores scroll behavior.
 */
function closeAddTask() {
  document.getElementById("add_container").classList.add("overlay-container-sliding");
  setTimeout(() => {
    document.getElementById("board_overlay").classList.add("d_none");
    document.getElementById("add_container").classList.add("d_none");
  }, 100);
  document.getElementById("body").classList.remove("overflow-hidden");
}


/**
 * Filters tasks based on search input and toggles visibility.
 */
function searchTask() {
  const inputValue = document.getElementById("search_task").value.toLowerCase();

  for (let indexTask = 0; indexTask < tasks.length; indexTask++) {
    const task = document.getElementById("task_index_" + indexTask);
    if (!task) continue;
    const title = tasks[indexTask].title.toLowerCase();
    const descripton = tasks[indexTask].descripton.toLowerCase();
    if (inputValue === "") {
      task.classList.remove("d_none");
    } else {
      const isMatch = title.includes(inputValue) || descripton.includes(inputValue);
      task.classList.toggle("d_none", !isMatch);
    }
  }
  renderEmptyColumn();
}


/**
 * Renders all tasks into their corresponding status columns.
 */
function renderTaskInToColumn() {
  let columns = clearColumn();
  sortTask(columns);
  renderEmptyColumn();
  renderDragDropHighlights(columns);
}

/**
 * Sorts tasks by their condition and injects them into the correct columns.
 * @param {Object} columns - References to each column container in the DOM.
 */
function sortTask(columns) {
  for (let taskIndex = 0; taskIndex < tasks.length; taskIndex++) {
    let taskCondition = tasks[taskIndex].condition;
    if (taskCondition == "ToDo") {
      columns.toDoColumnRef.innerHTML += getTaskTemplate(taskIndex);
    } else if (taskCondition == "inProgress") {
      columns.inProgColumnRef.innerHTML += getTaskTemplate(taskIndex);
    } else if (taskCondition == "feedback") {
      columns.feedbackColumnRef.innerHTML += getTaskTemplate(taskIndex);
    } else if (taskCondition == "done") {
      columns.doneColumnRef.innerHTML += getTaskTemplate(taskIndex);
    }
    renderDetails(taskIndex);
  }
}

/**
 * Calls sub-functions to render specific task details.
 * @param {number} taskIndex - Index of the task to render.
 */
function renderDetails(taskIndex) {
  renderAssignedTo(taskIndex);
  renderSubtasks(taskIndex);
  renderPrio(taskIndex);
  renderCategoryColor(taskIndex);
}

/**
 * Clears all task columns in the DOM.
 * @returns {Object} References to cleared column elements.
 */
function clearColumn() {
  let toDoColumnRef = document.getElementById("toDo_column");
  let inProgColumnRef = document.getElementById("inProg_column");
  let feedbackColumnRef = document.getElementById("feedback_column");
  let doneColumnRef = document.getElementById("done_column");

  toDoColumnRef.innerHTML = "";
  inProgColumnRef.innerHTML = "";
  feedbackColumnRef.innerHTML = "";
  doneColumnRef.innerHTML = "";
  return { toDoColumnRef, inProgColumnRef, feedbackColumnRef, doneColumnRef };
}

/**
 * Adds invisible drop targets to each column for drag-and-drop support.
 * @param {Object} columns - The task columns DOM references.
 */
function renderDragDropHighlights(columns) {
  columns.toDoColumnRef.innerHTML += "<div id='empty_task_toDo' class='empty-task d_none'></div>";
  columns.inProgColumnRef.innerHTML += "<div id='empty_task_inProg' class='empty-task d_none'></div>";
  columns.feedbackColumnRef.innerHTML += "<div id='empty_task_feedback' class='empty-task d_none'></div>";
  columns.doneColumnRef.innerHTML += "<div id='empty_task_done' class='empty-task d_none'></div>";
}

/**
 * Renders empty placeholder messages for columns without visible tasks.
 */
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

/**
 * Checks if a column is empty and inserts or removes the empty message accordingly.
 * @param {HTMLElement} columnRef - DOM element reference of the column.
 * @param {string} message - Message to display if the column is empty.
 */
function checkAndRenderEmptyMessage(columnRef, message) {
  const visibleTasks = Array.from(columnRef.children).filter(child =>
    !child.classList.contains("d_none") &&
    !child.classList.contains("empty-column")
  );

  const alreadyHasPlaceholder = columnRef.querySelector(".empty-column");
  if (visibleTasks.length === 0 && !alreadyHasPlaceholder) {
    const placeholder = document.createElement("div");
    placeholder.classList.add("empty-column");
    placeholder.innerHTML = `<p>${message}</p>`;
    columnRef.appendChild(placeholder);
  }

  if (visibleTasks.length > 0 && alreadyHasPlaceholder) {
    alreadyHasPlaceholder.remove();
  }
}

/**
 * Renders the background color of a task based on its category.
 * @param {number} taskIndex - Index of the task.
 */
function renderCategoryColor(taskIndex) {
  let categoryRef = document.getElementById("task_category_" + taskIndex);
  let category = tasks[taskIndex].category;

  if (category === "Technical Task") {
    categoryRef.style.backgroundColor = "#1FD7C1";
  } else {
    categoryRef.style.backgroundColor = "#0038FF";
  }
}

/**
 * Renders the priority icon for the task.
 * @param {number} taskIndex - Index of the task.
 */
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

/**
 * Renders the subtask progress bar and value for a task.
 * @param {number} taskIndex - Index of the task.
 */
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

/**
 * Renders avatars or user labels assigned to a task.
 * @param {number} taskIndex - Index of the task.
 * @returns {string} HTML content inserted into the task user list.
 */
function renderAssignedTo(taskIndex) {
  let userListRef = document.getElementById("task_users_" + taskIndex);
  let userList = tasks[taskIndex].assignedTo;
  userListRef.innerHTML = "";

  if (userList.length) {
    for (let indexUser = 0; indexUser < userList.length; indexUser++) {
      userListRef.innerHTML += getUserInTaskTemplate(indexUser, userList);
    }
  } else {
    userListRef.innerHTML = "<span style='opacity: 0.2'>No User added</span>";
  }
  return userListRef.innerHTML;
}

//  Get Data //
//ANCHOR - Get Data

/**
 * Loads tasks from server, parses them, and updates the task list.
 * @async
 * @param {string} [path=""] - API endpoint path for tasks.
 */
async function getDataFromServer(path = "") {
  await loadContactsFromFirebase();
  let response = await fetch(BASE_URL + path + ".json");
  let responseToJson = await response.json();
  let tasksKeysArray = Object.keys(responseToJson);

  for (let index = 0; index < tasksKeysArray.length; index++) {
    tasks.push(firbaseObject(index, responseToJson, tasksKeysArray));
  }
  renderTaskInToColumn();
  await deleteNotFoundedUserFromTask();
}

/**
 * Constructs a task object from Firebase response data.
 * @param {number} index - Task index.
 * @param {Object} responseToJson - Parsed Firebase response.
 * @param {Array<string>} tasksKeysArray - Array of task keys.
 * @returns {Object} The constructed task object.
 */
function firbaseObject(index, responseToJson, tasksKeysArray) {
  return {
    title: responseToJson[tasksKeysArray[index]].title,
    descripton: responseToJson[tasksKeysArray[index]].descripton,
    date: responseToJson[tasksKeysArray[index]].date,
    category: responseToJson[tasksKeysArray[index]].category,
    priority: responseToJson[tasksKeysArray[index]].priority,
    subtask: arraySubtasks(index, responseToJson, tasksKeysArray),
    assignedTo: arrayAssignedTo(index, responseToJson, tasksKeysArray),
    id: tasksKeysArray[index],
    condition: responseToJson[tasksKeysArray[index]].condition
  };
}

/**
 * Deletes user entries from Firebase that no longer exist locally.
 * @async
 */
async function deleteNotFoundedUserFromTask() {
  for (let del of usersToDeleteFromFirebase) {
    await fetch(`${BASE_URL}/join/tasks/${del.taskKey}/assignedTo/${del.userKey}.json`, {
      method: "DELETE"
    });
    console.log(`Gelöscht nach dem Laden: ${del.username} (Key: ${del.userKey})`);
  }
}

/**
 * Extracts subtask data from Firebase task object.
 * @param {number} index - Task index.
 * @param {Object} responseToJson - Parsed Firebase response.
 * @param {Array<string>} tasksKeysArray - Array of task keys.
 * @returns {Array<Object>} Array of subtask objects.
 */
function arraySubtasks(index, responseToJson, tasksKeysArray) {
  let subtasks = [];
  if (responseToJson[tasksKeysArray[index]].subtask !== undefined) {
    let subtasksKeys = Object.keys(responseToJson[tasksKeysArray[index]].subtask);

    for (let indexSubtask = 0; indexSubtask < subtasksKeys.length; indexSubtask++) {
      subtasks.push({
        subtaskName: responseToJson[tasksKeysArray[index]].subtask[subtasksKeys[indexSubtask]].name,
        subtaskCheck: responseToJson[tasksKeysArray[index]].subtask[subtasksKeys[indexSubtask]].checked
      });
    }
  }
  return subtasks;
}

/**
 * Extracts and validates assigned users from Firebase task object.
 * @param {number} index - Task index.
 * @param {Object} responseToJson - Parsed Firebase response.
 * @param {Array<string>} tasksKeysArray - Array of task keys.
 * @returns {Array<Object>} Array of valid user objects.
 */
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

/**
 * Opens the mobile navigation overlay and sets up the appropriate move options.
 * @param {number} taskIndex - Index of the selected task.
 * @param {string} condition - Current condition/status of the task.
 */
function mobileNavigator(taskIndex, condition) {
  document.getElementById("mobile_nav").classList.remove("d_none");
  currentDraggableTask = taskIndex;

  if (condition === "ToDo") {
    renderTextProg();
  } else if (condition === "inProgress") {
    renderTextFeedback();
  } else if (condition === "feedback") {
    renderTextDone();
  } else if (condition === "done") {
    renderTextBackFeedback();
  }
}

/**
 * Sets up UI to move task from ToDo to inProgress.
 */
function renderTextProg() {
  document.getElementById("arrow_down_text").innerHTML = "in Progress";
  document.getElementById("move_to_arrow_down").classList.remove("d_none");
  document.getElementById("move_to_arrow_down").setAttribute("onclick", "moveTo('inProgress')");
  openMoveToDialog();
}

/**
 * Sets up UI to move task from inProgress to feedback or back to ToDo.
 */
function renderTextFeedback() {
  document.getElementById("arrow_down_text").innerHTML = "Feedback";
  document.getElementById("arrow_up_text").innerHTML = "To-Do";
  document.getElementById("move_to_arrow_up").classList.remove("d_none");
  document.getElementById("move_to_arrow_down").classList.remove("d_none");
  document.getElementById("move_to_arrow_down").setAttribute("onclick", "moveTo('feedback')");
  document.getElementById("move_to_arrow_up").setAttribute("onclick", "moveTo('ToDo')");
  openMoveToDialog();
}

/**
 * Sets up UI to move task from done to feedback.
 */
function renderTextBackFeedback() {
  document.getElementById("arrow_up_text").innerHTML = "Feedback";
  document.getElementById("move_to_arrow_up").classList.remove("d_none");
  document.getElementById("move_to_arrow_up").setAttribute("onclick", "moveTo('feedback')");
  openMoveToDialog();
}

/**
 * Sets up UI to move task from feedback to done or back to inProgress.
 */
function renderTextDone() {
  document.getElementById("arrow_down_text").innerHTML = "Done";
  document.getElementById("arrow_up_text").innerHTML = "in Progress";
  document.getElementById("move_to_arrow_up").classList.remove("d_none");
  document.getElementById("move_to_arrow_down").classList.remove("d_none");
  document.getElementById("move_to_arrow_down").setAttribute("onclick", "moveTo('done')");
  document.getElementById("move_to_arrow_up").setAttribute("onclick", "moveTo('inProgress')");
  openMoveToDialog();
}

/**
 * Opens the move-to modal overlay for mobile navigation.
 */
function openMoveToDialog() {
  document.getElementById("moveTo_overlay").classList.remove("d_none");
  document.getElementById("mobile_nav").classList.remove("d_none");
  setTimeout(() => {
    document.getElementById("mobile_nav").classList.remove("overlay-container-sliding");
  }, 1);
  document.getElementById("body").classList.add("overflow-hidden");
  document.getElementById(`task_index_${currentDraggableTask}`).classList.add('dragging');
}


/**
 * Closes the move-to modal overlay.
 */
function closeMoveToDialog() {
  document.getElementById("mobile_nav").classList.add("overlay-container-sliding");
  setTimeout(() => {
    document.getElementById("moveTo_overlay").classList.add("d_none");
    document.getElementById("mobile_nav").classList.add("d_none");
  }, 100);
  document.getElementById("body").classList.remove("overflow-hidden");
  document.getElementById(`task_index_${currentDraggableTask}`).classList.remove('dragging');
  resetDisplayMovtoDialog();
}


/**
 * Hides all move-to arrows after dialog close.
 */
function resetDisplayMovtoDialog() {
  document.getElementById("move_to_arrow_up").classList.add("d_none");
  document.getElementById("move_to_arrow_down").classList.add("d_none");
}
