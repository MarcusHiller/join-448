/**
 * Opens the task overlay for the given task.
 * @param {number} taskIndex - Index of the task to display.
 */
function openOverlayTask(taskIndex) {
    document.getElementById("board_overlay").classList.remove("d_none");
    document.getElementById("overlay_container").classList.remove("d_none");
    setTimeout(() => {
        document.getElementById("overlay_container").classList.remove("overlay-container-sliding");
    }, 1);
    document.getElementById("body").classList.add("overflow-hidden");
    creatOverlayFromTask(taskIndex);
}

/**
 * Populates the overlay with task details.
 * @param {number} taskIndex - Task index.
 */
function creatOverlayFromTask(taskIndex) {
    document.getElementById("overlay_titel").innerHTML = tasks[taskIndex].title;
    document.getElementById("overlay_description").innerHTML = tasks[taskIndex].descripton;
    document.getElementById("overlay_date").innerHTML = tasks[taskIndex].date;
    renderUserIntoTaskOverlay(taskIndex);
    renderSubtaskIntoTaskOverlay(taskIndex);
    renderPrioIntoTaskOverlay(taskIndex);
    renderCategoryIntoTaskOverlay(taskIndex);
    renderButtons(taskIndex);
}

/**
 * Adds edit and delete handlers to the overlay buttons.
 * @param {number} taskIndex - Task index.
 */
function renderButtons(taskIndex) {
    let deleteTask = document.getElementById("delete_task_on_overlay");
    let editTask = document.getElementById("edit_task_on_overlay");
    deleteTask.setAttribute("onclick", `deleteTaskOnOverlay(${taskIndex})`);
    editTask.setAttribute("onclick", `editTaskOnOverlay(${taskIndex})`);
}

/**
 * Displays the category in the overlay and applies color coding.
 * @param {number} taskIndex - Task index.
 */
function renderCategoryIntoTaskOverlay(taskIndex) {
    let categoryRef = document.getElementById("overlay_category");
    let category = tasks[taskIndex].category;
    categoryRef.innerHTML = category;
    categoryRef.style.backgroundColor = category === "Technical Task" ? "#1FD7C1" : "#0038FF";
}

/**
 * Displays the task priority and its corresponding icon.
 * @param {number} taskIndex - Task index.
 */
function renderPrioIntoTaskOverlay(taskIndex) {
    let prioImg = document.getElementById("task_overlay_prio_img");
    let prioTask = document.getElementById("task_overlay_prio_text");
    let prio = tasks[taskIndex].priority;
    prioTask.innerHTML = prio;
    prioImg.src = `/assets/img/icon/prio_${prio}.svg`;
}

/**
 * Displays the subtasks list in the overlay.
 * @param {number} taskIndex - Task index.
 */
function renderSubtaskIntoTaskOverlay(taskIndex) {
    let subtaskListRef = document.getElementById("task_overlay_subtask_list");
    let subtaskList = tasks[taskIndex].subtask;
    subtaskListRef.innerHTML = "";

    if (subtaskList.length) {
        for (let i = 0; i < subtaskList.length; i++) {
            subtaskListRef.innerHTML += getTaskSubtaskOverlayTemplate(taskIndex, i);
        }
    } else {
        subtaskListRef.innerHTML = "<span style='opacity: 0.2; font-size: 16px'>No Subtask added</span>";
    }

    checkCheckboxInOverlay(taskIndex, subtaskList);
}

/**
 * Applies checked state to subtask checkboxes in overlay.
 * @param {number} taskIndex - Task index.
 * @param {Array} subtaskList - List of subtasks.
 */
function checkCheckboxInOverlay(taskIndex, subtaskList) {
    for (let i = 0; i < subtaskList.length; i++) {
        document.getElementById(`task_${taskIndex}_checkbox_${i}`).checked = !!subtaskList[i].subtaskCheck;
    }
}

/**
 * Renders assigned users into the task overlay.
 * @param {number} taskIndex - Task index.
 */
function renderUserIntoTaskOverlay(taskIndex) {
    let taskUsers = tasks[taskIndex].assignedTo;
    let taskUsersTableRef = document.getElementById("task_overlay_user_list");
    taskUsersTableRef.innerHTML = "";

    if (taskUsers.length) {
        for (let i = 0; i < taskUsers.length; i++) {
            taskUsersTableRef.innerHTML += getTaskUsersOverlayTemplate(taskIndex, i);
        }
    } else {
        taskUsersTableRef.innerHTML = "<span style='opacity: 0.2; font-size: 16px'>No User added</span>";
    }
}

/**
 * Closes the task overlay with animation and resets scroll.
 */
function closeOverlayTask() {
    document.getElementById("overlay_container").classList.add("overlay-container-sliding");
    setTimeout(() => {
        document.getElementById("board_overlay").classList.add("d_none");
        document.getElementById("overlay_container").classList.add("d_none");
    }, 100);
    document.getElementById("body").classList.remove("overflow-hidden");
    getTaskOverlayHTML();
}
