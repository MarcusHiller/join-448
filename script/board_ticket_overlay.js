/// Tikcet Overlay //

function openOverlayTask(taskIndex) {
    document.getElementById("board_overlay").classList.remove("d_none");
    document.getElementById("overlay_container").classList.remove("d_none");
    setTimeout(() => { document.getElementById("overlay_container").classList.remove("overlay-container-sliding") }, 1);
    document.getElementById("body").classList.add("overflow-hidden");
    creatOverlayFromTask(taskIndex);
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

    if (prio === "low") {
        prioImg.src = "/assets/img/icon/prio_low.svg";
    } else if (prio === "medium") {
        prioImg.src = "/assets/img/icon/prio_medium.svg";
    } else if (prio === "urgent") {
        prioImg.src = "/assets/img/icon/prio_urgent.svg";
    }
}


function renderSubtaskIntoTaskOverlay(taskIndex) {
    let subtaskListRef = document.getElementById("task_overlay_subtask_list");
    let subtaskList = tasks[taskIndex].subtask;
    subtaskListRef.innerHTML = "";

    if (subtaskList.length) {
        for (let indexSubtask = 0; indexSubtask < subtaskList.length; indexSubtask++) {
            subtaskListRef.innerHTML += getTaskSubtaskOverlayTemplate(taskIndex, indexSubtask);
        }
    } else {
        subtaskListRef.innerHTML = "<span style='opacity: 0.2; font-size: 16px'>No Subtask added</span>"
    }
    checkCheckboxInOverlay(taskIndex, subtaskList)
}


function checkCheckboxInOverlay(taskIndex, subtaskList) {
    for (let indexSubtask = 0; indexSubtask < subtaskList.length; indexSubtask++) {
        if (subtaskList[indexSubtask].subtaskCheck) {
            document.getElementById("task_" + taskIndex + "_checkbox_" + indexSubtask).checked = true;
        } else {
            document.getElementById("task_" + taskIndex + "_checkbox_" + indexSubtask).checked = false;
        }
    }

}

function renderUserIntoTaskOverlay(taskIndex) {
    let taskUsers = tasks[taskIndex].assignedTo;
    let taskUsersTableRef = document.getElementById("task_overlay_user_list");
    taskUsersTableRef.innerHTML = "";

    if (taskUsers.length) {
        for (let indexUser = 0; indexUser < taskUsers.length; indexUser++) {
            taskUsersTableRef.innerHTML += getTaskUsersOverlayTemplate(taskIndex, indexUser)
        }
    } else {
        taskUsersTableRef.innerHTML = "<span style='opacity: 0.2; font-size: 16px'>No User added</span>"
    }

}

function closeOverlayTask() {
    document.getElementById("overlay_container").classList.add("overlay-container-sliding");
    setTimeout(() => {
        document.getElementById("board_overlay").classList.add("d_none"),
            document.getElementById("overlay_container").classList.add("d_none")
    }, 100);
    document.getElementById("body").classList.remove("overflow-hidden");
    getTaskOverlayHTML();
}


// Edit Task from Ticket Overlay //


async function editTaskOnOverlay(taskIndex) {
    document.getElementById("add_container").innerHTML = "";
    await getEditTaskHTML();
    fitEditTaskToContainer();
    renderUserList();
    currentInputFieldvalue(taskIndex);
}


function fitEditTaskToContainer() {
    document.getElementById("addTask_headline_h1").classList.add("d_none");
    document.getElementById("spaceholder").classList.add("d_none");
    document.getElementById("addTask_form_container").classList.add("flex-direction");
    document.getElementById("edit_scrolling").classList.add("scrolling");
    document.getElementById("addTask_form_container").classList.add("height-unset");
    document.getElementById("close_edit_task_overlay").classList.remove("d_none");
    document.getElementById("addTask_form_container").classList.add("overflow-hidden");
    document.getElementById("addTask_prio").classList.add("gap-8");
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
    formSubmit.setAttribute("onsubmit", `addEditedTask(${taskIndex}); return false`);
}


function checkSubtasks(taskIndex) {
    let subtaskListRef = document.getElementById("sub_list");
    let subtaskList = tasks[taskIndex].subtask;
    subtaskIndex = subtaskList.length;
    subtaskListRef.innerHTML = "";
    for (let indexCheckSubtask = 0; indexCheckSubtask < subtaskList.length; indexCheckSubtask++) {
        let subtaskCheckValue = subtaskList[indexCheckSubtask].subtaskName;
        subtaskListRef.innerHTML += getSubtaskTemplate(indexCheckSubtask, subtaskCheckValue, taskIndex)
    }
}

function checkCategory(taskIndex) {
    let category = tasks[taskIndex].category;
    selectCategory(category);
}

function checkPrio(taskIndex) {
    const prio = tasks[taskIndex].priority;
    const prioIds = ["urgent", "medium", "low"];

    prioIds.forEach(level => {
        document.getElementById(`prio_${level}`).checked = (level === prio);
    });
}


function checkAssignedTo(taskIndex) {
    let checkedUsers = tasks[taskIndex].assignedTo;
    let ids = [];

    for (let index = 0; index < checkedUsers.length; index++) {
        let username = tasks[taskIndex].assignedTo[index]
        let user = contactsFirebase.indexOf(username)
        ids.push(user);
    }
    for (let index = 0; index < ids.length; index++) {
        const userIndex = ids[index];
        let checkbox = document.getElementById("user_" + userIndex);
        checkbox.checked = true;
        addCheckedUsers(userIndex);
    }
}


// Delete Task from Ticket //


async function deleteTaskOnOverlay(taskIndex) {
    let task = tasks[taskIndex].id
    let path = "join/tasks/";
        await fetch(BASE_URL + path + task + ".json", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    
    deleteTaskFromTaskArray(taskIndex)
    renderTaskInToColumn();
    closeOverlayTask();
    successfulTaskDeleted();
    userFeedback();
    
}

function successfulTaskDeleted() {
    let success = document.getElementById('success');
    success.innerHTML = showTaskDeleted();
  }


function deleteTaskFromTaskArray(taskIndex) {
    tasks.splice(taskIndex, 1)
}





