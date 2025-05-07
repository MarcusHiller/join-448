/**
 * Next available task ID for new tasks.
 * @type {number}
 */
let nextTaskId = 5;

/**
 * List of current subtasks.
 * @type {Array}
 */
let subtasks = [];

/**
 * Global index tracker for subtasks.
 * @type {number}
 */
let subtaskIndex = -1;

/**
 * Shows the clear button on the form.
 */
function addClearButtonToThePage() {
  document.getElementById("clear_button").classList.remove("d_none");
}


/**
 * Opens the user selection dropdown menu.
 */
function openUserDropMenu() {
  document.getElementById("dropdown_menu_arrow").classList.add("rotate-img");
  document.getElementById("assigned_select").classList.add("blue-border");
  document.getElementById("add_user_list").classList.add("dropdown-animation-user");
  document.getElementById("assigned_select").classList.add("border-radius-custom");
  document.getElementById("list_overlay").classList.remove("d_none");
}


/**
 * Closes the user selection dropdown menu.
 */
function closeUserDropMenu() {
  document.getElementById("dropdown_menu_arrow").classList.remove("rotate-img");
  document.getElementById("assigned_select").classList.remove("blue-border");
  document.getElementById("add_user_list").classList.remove("dropdown-animation-user");
  document.getElementById("assigned_select").classList.remove("border-radius-custom");
  document.getElementById("list_overlay").classList.add("d_none");
}


/**
 * Sorts the user list alphabetically by username.
 */
function resortUserlist() {
  contactsFirebase.sort((a, b) =>
    a.username.localeCompare(b.username, 'de', { sensitivity: 'base' })
  );
}


/**
 * Renders the user list into the dropdown menu.
 */
function renderUserList() {
  resortUserlist();
  const usersListRef = document.getElementById("add_user_list");
  usersListRef.innerHTML = "";
  for (let i = 0; i < contactsFirebase.length; i++) {
    usersListRef.innerHTML += getUserListTemplate(i);
  }
}


/**
 * Adds or removes a user's avatar after selection.
 * @param {number} indexUsers - Index of the selected user.
 */
function addCheckedUsers(indexUsers) {
  const avatarList = document.getElementById("user_logo_after_seleceted");
  const userCheckbox = document.getElementById("user_" + indexUsers);
  const userAvatar = document.getElementById("user_checked_" + indexUsers);

  if (userCheckbox.checked) {
    avatarList.innerHTML += getCheckedAvatar(indexUsers);
    document.getElementById("user_" + indexUsers + "_label").classList.remove("user-dropmenu-hover-effekt");
  } else {
    userAvatar?.remove();
    document.getElementById("user_" + indexUsers + "_label").classList.add("user-dropmenu-hover-effekt");
  }
}


/**
 * Toggles the category dropdown open/closed.
 */
function openCatDropMenu() {
  document.getElementById("dropdown_menu_arrow_select").classList.add("rotate-img");
  document.getElementById("category_input").classList.add("blue-border");
  document.getElementById("category_list").classList.add("dropdown-animation");
  document.getElementById("overlay_category").classList.remove("d_none");
}


/**
 * Closes the category dropdown menu.
 */
function closeCatDropMenu() {
  document.getElementById("dropdown_menu_arrow_select").classList.remove("rotate-img");
  document.getElementById("category_input").classList.remove("blue-border");
  document.getElementById("category_list").classList.remove("dropdown-animation");
  document.getElementById("overlay_category").classList.add("d_none");
}


/**
 * Sets the selected category and closes dropdown.
 * @param {string} category - The selected category.
 */
function selectCategory(category) {
  const input = document.getElementById("category_select_input");
  input.value = category;
  input.parentElement.classList.remove("error-label-border");
  document.getElementById("error-cat").classList.remove("visible");
  closeCatDropMenu();
}


/**
 * Adds highlight border to subtask input.
 */
function addBorder() {
  document.getElementById("subtask_input_label").classList.add("blue-border");
}


/**
 * Removes highlight border from subtask input.
 */
function removeBorder() {
  document.getElementById("subtask_input_label").classList.remove("blue-border");
}


/**
 * Adds event listener to the task form submission.
 */
function addTaskButton() {
  document.getElementById("addTask_form").addEventListener("submit", addTask(condition = ""));
}


/**
 * Checks for required inputs and returns field info.
 * @returns {Array<{id: string, errorId: string}>} Required fields.
 */
function checkRequiredInputsField() {
  const fields = [
    { id: 'titel_input', errorId: 'error-title' },
    { id: 'date_input', errorId: 'error-date' },
    { id: 'category_select_input', errorId: 'error-cat' }
  ];
  removeErrorMsg();
  return fields;
}


/**
 * Removes all visible error messages and styling.
 */
function removeErrorMsg() {
  document.querySelectorAll('.error-message').forEach(e => e.classList.remove('visible'));
  document.querySelectorAll('.error-border').forEach(e => e.classList.remove('error-border'));
  document.querySelectorAll('.error-label-border').forEach(e => e.classList.remove('error-label-border'));
}


/**
 * Returns the checked status of a subtask.
 * @param {number} taskIndex - Index of the task.
 * @param {number} subtaskIndex - Index of the subtask.
 * @returns {boolean} True if checked.
 */
function getCheckStatus(taskIndex, subtaskIndex) {
  const task = tasks?.[taskIndex];
  const subtask = task?.subtask?.[subtaskIndex];
  return !!subtask?.subtaskCheck;
}


/**
 * Extracts a subtask object from the input field.
 * @param {string} inputId - ID of the input field.
 * @param {number} taskIndex - Task index.
 * @param {number} i - Subtask index.
 * @returns {{name: string, checked: boolean}|null} Subtask object.
 */
function extractSubtask(inputId, taskIndex, i) {
  const input = document.getElementById(inputId);
  const value = input ? input.value.trim() : "";
  if (!value) return null;
  return {
    name: value,
    checked: getCheckStatus(taskIndex, i)
  };
}


/**
 * Toggles visibility of subtask icons depending on input presence.
 */
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


/**
 * Adds a new subtask to the subtask list in the UI.
 */
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


/**
 * Shows edit/delete icons for a given subtask on hover/focus.
 * @param {number} indexSubTask - Index of the subtask.
 */
function showEditIcons(indexSubTask) {
  document.getElementById("edit_and_delete_icons_" + indexSubTask).classList.remove("opacity-null")
}


/**
 * Hides edit/delete icons for a given subtask.
 * @param {number} indexSubTask - Index of the subtask.
 */
function blindEditIcons(indexSubTask) {
  document.getElementById("edit_and_delete_icons_" + indexSubTask).classList.add("opacity-null")
}


/**
 * Enables editing of a subtask input field.
 * @param {number} indexSubTask - Index of the subtask.
 */
function editSubtask(indexSubTask) {
  let input = document.getElementById("editable_input_" + indexSubTask);
  const len = input.value.length;

  input.readOnly = false;
  input.setSelectionRange(len, len);
  input.focus();
  editSubtaskStyle(indexSubTask, input);
}


/**
 * Applies styles for subtask editing mode.
 * @param {number} indexSubTask - Index of the subtask.
 * @param {HTMLInputElement} input - Input element of the subtask.
 */
function editSubtaskStyle(indexSubTask, input) {
  let inputSubtask = document.getElementById("subtask_" + indexSubTask);
  let inputSubtaskChild = document.getElementById("list_subtask_element_" + indexSubTask);
  let editIcon = document.getElementById("edit_subtask_icon_" + indexSubTask);
  let editConfirmIcon = document.getElementById("confirm_edit_icon_" + indexSubTask);

  inputSubtaskChild.classList.add("edit-subtask-style");
  editIcon.classList.add("d_none");
  editConfirmIcon.classList.remove("d_none");
  inputSubtask.removeAttribute("onmouseover");
  inputSubtask.removeAttribute("onmouseout");
  inputSubtaskChild.classList.remove("list-subtask-element-hover");
  document.getElementById("edit_and_delete_icons_" + indexSubTask).classList.remove("opacity-null");
  document.getElementById("disc_" + indexSubTask).classList.add("d_none");
}


/**
 * Deletes a subtask if its content is empty.
 * @param {number} indexSubTask - Index of the subtask.
 */
function emptySubtaskDelete(indexSubTask) {
  let input = document.getElementById("editable_input_" + indexSubTask).value;

  if (!input) {
    removeSubtask(indexSubTask);
  }
}


/**
 * Finalizes the subtask input after editing.
 * @param {number} indexSubTask - Index of the subtask.
 */
function editSubmit(indexSubTask) {
  document.getElementById("editable_input_" + indexSubTask).readOnly = true;
  removeEditSubtaskStyle(indexSubTask);
}


/**
 * Restores original style after subtask editing is finished.
 * @param {number} indexSubTask - Index of the subtask.
 */
function removeEditSubtaskStyle(indexSubTask) {
  let inputSubtask = document.getElementById("subtask_" + indexSubTask);
  let inputSubtaskChild = document.getElementById("list_subtask_element_" + indexSubTask);
  let editIcon = document.getElementById("edit_subtask_icon_" + indexSubTask);
  let editConfirmIcon = document.getElementById("confirm_edit_icon_" + indexSubTask);

  inputSubtaskChild.classList.remove("edit-subtask-style");
  editIcon.classList.remove("d_none");
  editConfirmIcon.classList.add("d_none");
  inputSubtask.setAttribute("onmouseover", `showEditIcons(${indexSubTask})`);
  inputSubtask.setAttribute("onmouseout", `blindEditIcons(${indexSubTask})`);
  inputSubtaskChild.classList.add("list-subtask-element-hover");
  document.getElementById("edit_and_delete_icons_" + indexSubTask).classList.add("opacity-null")
  document.getElementById("disc_" + indexSubTask).classList.remove("d_none");
}


/**
 * Removes a subtask from the DOM.
 * @param {number} indexSubTask - Index of the subtask.
 * @param {number} taskIndex - (Optional) Task index (not used).
 */
function removeSubtask(indexSubTask, taskIndex) {
  document.getElementById("subtask_" + indexSubTask).remove();
}


/**
 * Clears all input fields for adding a task.
 */
function clearAddTaskField() {
  document.getElementById("titel_input").value = "";
  document.getElementById("description_input").value = "";
  document.getElementById("date_input").value = "";
  document.getElementById("prio_medium").checked = true;
  unsetCheckbox();
  document.getElementById("user_logo_after_seleceted").innerHTML = "";
  document.getElementById("category_select_input").value = "";
  clearSubtaskInput();
  successfulClearTask();
  userFeedback();
}


/**
 * Clears all input fields for adding a task after a new task has been added.
 */
function clearAddTaskAfterAdd() {
  document.getElementById("titel_input").value = "";
  document.getElementById("description_input").value = "";
  document.getElementById("date_input").value = "";
  document.getElementById("prio_medium").checked = true;
  unsetCheckbox();
  document.getElementById("user_logo_after_seleceted").innerHTML = "";
  document.getElementById("category_select_input").value = "";
  clearSubtaskInput();
}


/**
 * Clears the subtask input field and subtask list.
 */
function clearSubtaskInput() {
  document.getElementById("subtask_input").value = "";
  document.getElementById("sub_list").innerHTML = "";
}

/**
 * Unchecks all user checkboxes in the user list.
 */
function unsetCheckbox() {
  for (let userIndex = 0; userIndex < contactsFirebase.length; userIndex++) {
    document.getElementById("user_" + userIndex).checked = false;
  }
}


/**
 * Shows success message after clearing the task form.
 */
function successfulClearTask() {
  let success = document.getElementById('success');
  success.innerHTML = showSuccessfulClear();
}


/**
 * Shows success message after a task was successfully added.
 */
function successfulAddedTask() {
  let success = document.getElementById('success');
  success.innerHTML = showSuccessfulAddedTask();
}


/**
 * Animates a temporary success message to the user.
 */
function userFeedback() {
  setTimeout(() => {
    let success = document.getElementById('success');
    success.classList.remove('d-none');
    setTimeout(() => { success.classList.add('show-successful'); }, 1);
    setTimeout(() => { success.classList.remove('show-successful'); }, 1510);
    setTimeout(() => { success.classList.add('d-none'); }, 1730);
  }, 200);
}


/**
 * Filters the user list by input and shows or hides matching users.
 */
function searchContactToTask() {
  let input = document.getElementById("assigned_select_input").value.toLowerCase().replace(/\s+/g, "");
  let list = document.getElementById("add_user_list");
  let userFoundCounter = 0;

  for (let index = 0; index < contactsFirebase.length; index++) {
    let user = document.getElementById("user_" + index + "_label");
    if (!user) continue;
    let name = contactsFirebase[index].username.toLowerCase().replace(/\s+/g, "")
    if (input === "") {
      user.classList.remove("d_none");
    } else {
      const isMatch = name.includes(input);
      if (isMatch) {
        user.classList.remove("d_none");
        userFoundCounter--;
      } else {
        user.classList.add("d_none");
        userFoundCounter++;
      }
    }
  }
  checkUserFound(input, userFoundCounter, list);
}


/**
 * Shows or removes a feedback message if no users were found.
 * @param {string} input - Search input string.
 * @param {number} userFoundCounter - Number of unmatched users.
 * @param {HTMLElement} list - DOM element of the user list.
 */
function checkUserFound(input, userFoundCounter, list) {
  let existingFeedback = document.getElementById("no_user_feedback");

  if (userFoundCounter === contactsFirebase.length && input !== "") {
    const message = `No user found: "${input}"`;
    if (!existingFeedback) {
      const feedback = createNoUserFeedback(message);
      list.appendChild(feedback);
    } else {
      existingFeedback.textContent = message;
    }
  } else {
    if (existingFeedback) {
      existingFeedback.remove();
    }
  }
}


/**
 * Creates a styled feedback element when no user is found.
 * @param {string} message - Message to show.
 * @returns {HTMLElement} Feedback element.
 */
function createNoUserFeedback(message) {
  const feedback = document.createElement("div");
  feedback.id = "no_user_feedback";
  feedback.textContent = message;
  Object.assign(feedback.style, {
    fontStyle: "italic",
    color: "#888",
    padding: "6px 10px"
  });
  return feedback;
}


/**
 * Toggles the style of a user label to indicate selection.
 * @param {number} indexUsers - Index of the user.
 */
function checkedStyle(indexUsers) {
  document.getElementById("user_" + indexUsers + "_label").classList.toggle("user-dropmenu-hover-effekt");
}


/**
 * Adds a subtask when Enter key is pressed.
 * @param {KeyboardEvent} event - Key press event.
 */
function checkEnterAddSubtask(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    addSubtask();
  }
}


/**
 * Finalizes subtask editing when Enter key is pressed.
 * @param {KeyboardEvent} event - Key press event.
 * @param {number} indexSubTask - Index of the subtask.
 */
function checkEnterEditSubtask(event, indexSubTask) {
  if (event.key === 'Enter') {
    event.preventDefault();
    editSubmit(indexSubTask);
  }
}


/**
 * Prevents default behavior when Enter is pressed.
 * @param {KeyboardEvent} event - Key press event.
 */
function checkEnter(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
  }
}
