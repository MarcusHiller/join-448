let searchedTasks = [];

// Add Task //


function addTask(condition = "") {
    let newTask;
    let hasError = checkInputFields();
    if (hasError) return;
    newTask = getNewTask();
    putDataToServer(`/join/tasks/${newTask.id}`, newTask);
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


// Add Edited Task //

function addEditedTask(taskIndex) {
    let newEditedTask = {};
    let hasError = checkInputFields();
    if (hasError) return;
    newEditedTask = getEditedTask(taskIndex)

    putDataToServer(`/join/tasks/${newEditedTask.id}`, newEditedTask);
    tasks[taskIndex] = newEditedTask;
    getSubtasksArrayAfterEdit(taskIndex);
    getAssignedToArrayAfterEdit(taskIndex);
    renderSingleTaskInToColumn(taskIndex);
    closeOverlayTask();
    clearOverlay();
}

function getEditedTask(taskIndex) {
    let title = document.getElementById("titel_input").value;
    let descripton = document.getElementById("description_input").value;
    let date = document.getElementById("date_input").value;
    let category = document.getElementById("category_select_input").value;
    let priority = getPriority();
    let subtask = getSubtasks(taskIndex).subtasks;
    let assignedTo = getAssignedTo();
    let id = tasks[taskIndex].id;
    let condition = tasks[taskIndex].condition;
    return { title, descripton, date, category, priority, subtask, assignedTo, id, condition }
}



// Functions for Add- and Edited-Add Task //


function checkInputFields() {
    let hasError = false
    let fields = checkRequiredInputsField();
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


function getSubtasks(taskIndex) {
    prepareSubtaskIDs();

    const subList = document.getElementById("sub_list");
    if (!subList) return { subtasks: {} };

    const subtaskElements = subList.children;
    const subtasksObject = {};

    for (let i = 0; i < subtaskElements.length; i++) {
        const subtask = extractSubtask(`editable_input_${i}`, taskIndex, i);
        if (subtask) {
            subtasksObject[`subtask${i}`] = subtask;
        }
    }

    return { subtasks: subtasksObject };
}


function prepareSubtaskIDs() {
    const subList = document.getElementById("sub_list");
    if (!subList) return;

    const subtaskElements = subList.children;
    for (let i = 0; i < subtaskElements.length; i++) {
        const input = subtaskElements[i].querySelector("input");
        if (input) input.id = `editable_input_${i}`;
    }
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


//  Subtask Checked//


function addSubtaskChecked(indexSubtask, taskIndex) {
    let subtask = document.getElementById("task_" + taskIndex + "_checkbox_" + indexSubtask);
    let progressValue = document.getElementById("subtasks_user_" + taskIndex).value
  
    if (subtask.checked) {
      progressValue++;
    } else if (!subtask.checked && progressValue > 0) {
      progressValue--;
    } else {
      progressValue = 0;
    }
    saveCheckboxProcess(taskIndex, indexSubtask, subtask, progressValue)
  }
  
  function saveCheckboxProcess(taskIndex, indexSubtask, subtask, progressValue) {
    let progressValueTextRef = document.getElementById("subtask_value_user_" + taskIndex);
    let taskID = tasks[taskIndex].id;
    let subtaskName = "subtask" + indexSubtask;
    document.getElementById("subtasks_user_" + taskIndex).value = progressValue;
    progressValueTextRef.innerHTML = progressValue;
    tasks[taskIndex].subtask[indexSubtask].subtaskCheck = subtask.checked;
  
    patchDataToServer(`join/tasks/${taskID}/subtask/${subtaskName}`, { checked: subtask.checked })
  }


  function checkedSubtaskChecked(taskIndex, subtaskMax) {
    let subtaskProgress = 0;
  
    for (let index = 0; index < subtaskMax; index++) {
      let subtaskCkeck = tasks[taskIndex].subtask[index].subtaskCheck
  
      if (subtaskCkeck) {
        subtaskProgress++;
      }
    }
    return subtaskProgress;
  }
  
