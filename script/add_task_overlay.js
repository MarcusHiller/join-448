let nextTaskId = 5;
let subtasks = [];
let subtaskIndex = -1;


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


function checkRequiredInputsField() {
  const fields = [
    { id: 'titel_input', errorId: 'error-title' },
    { id: 'date_input', errorId: 'error-date' },
    { id: 'category_select_input', errorId: 'error-cat' }
  ];
  removeErrorMsg();
  return fields;
}


function removeErrorMsg() {
  document.querySelectorAll('.error-message').forEach(e => e.classList.remove('visible'));
  document.querySelectorAll('.error-border').forEach(e => e.classList.remove('error-border'));
  document.querySelectorAll('.error-label-border').forEach(e => e.classList.remove('error-label-border'));
}


function getCheckStatus(taskIndex, subtaskIndex) {
  const task = tasks?.[taskIndex];
  const subtask = task?.subtask?.[subtaskIndex];
  return !!subtask?.subtaskCheck;
}


function extractSubtask(inputId, taskIndex, i) {
  const input = document.getElementById(inputId);
  const value = input ? input.value.trim() : "";
  if (!value) return null;

  return {
    name: value,
    checked: getCheckStatus(taskIndex, i)
  };
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
  successfulClearTask()
  userFeedback();
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


function successfulClearTask() {
  let success = document.getElementById('success');
  success.innerHTML = showSuccessfulClear();
}


function successfulAddedTask() {
  let success = document.getElementById('success');
  success.innerHTML = showSuccessfulAddedTask();
}


function userFeedback() {
  setTimeout(() => {
    let success = document.getElementById('success');
    success.classList.remove('d-none');
    setTimeout(() => { success.classList.add('show-successful'); }, 1);
    setTimeout(() => { success.classList.remove('show-successful'); }, 1510);
    setTimeout(() => { success.classList.add('d-none'); }, 1730);
  }, 200);
}