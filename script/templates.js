function getTaskTemplate(taskIndex) {
    return `<div draggable="true" id="task_index_${taskIndex}" class="task" ondragstart="startDragging(${taskIndex}); addHighlight()" ondragend="removeHighlight()" onclick="openOverlayTask(${taskIndex})">
                <div class="task-cat-technical">
                    <p id="task_category_${taskIndex}">${tasks[taskIndex].category}</p>
                    <img class="mobile-button" src="/assets/img/icon/mobile_button.svg" onclick="event.stopPropagation(); mobileNavigator(${taskIndex}, '${tasks[taskIndex].condition}')">
                </div>
                <div class="task-title"><span class="task-title">${tasks[taskIndex].title}</span></div>
                <div class="task-description"><span>${tasks[taskIndex].descripton}</span></div>
                <div class="progress">
                    <progress id="subtasks_user_${taskIndex}" max="" value="0"></progress>
                        <span class="subtask" id="subtask_text_user_${taskIndex}"><span id="subtask_value_user_${taskIndex}">0</span>/<span id="subtask_max_user_${taskIndex}">0</span><span class="subtask-text">&nbsp;Subtasks</span></span>
                </div>
                <div class="task-footer">
                    <div id="task_users_${taskIndex}" onload="renderAssignedTo(${taskIndex})"class="task-users">
                        
    
                    </div>
                    <div class="priority">
                        <img id="task_prio_user_${taskIndex}" src="/assets/img/icon/prio_medium.svg" alt="">
                    </div>
                </div>
            </div>`
}

function getSingleTaskAfterEdit(taskIndex) {
    return `<div class="task-cat-technical">
                    <p id="task_category_${taskIndex}">${tasks[taskIndex].category}</p>
                </div>
                <div class="task-title"><span class="task-title">${tasks[taskIndex].title}</span></div>
                <div class="task-description"><span>${tasks[taskIndex].descripton}</span></div>
                <div class="progress">
                    <progress id="subtasks_user_${taskIndex}" max="" value="0"></progress>
                        <span id="subtask_text_user_${taskIndex}"><span id="subtask_value_user_${taskIndex}">0</span>/<span id="subtask_max_user_${taskIndex}">0</span> Subtasks</span>
                </div>
                <div class="task-footer">
                    <div id="task_users_${taskIndex}" onload="renderAssignedTo(${taskIndex})"class="task-users">
                        
    
                    </div>
                    <div class="priority">
                        <img id="task_prio_user_${taskIndex}" src="/assets/img/icon/prio_medium.svg" alt="">
                    </div>
                </div>`
}

function getUserInTaskTemplate(indexUser, userList) {
    return `<div class="user" style="background-color:${userList[indexUser].color}">${userList[indexUser].avatar}</div>`
}

function getSubtaskTemplate(indexSubTask, subtaskValue, taskIndex) {
    return `<div id="subtask_${indexSubTask}" class="list-element-div" onmouseover="showEditIcons(${indexSubTask})" onmouseout="blindEditIcons(${indexSubTask})"><div class="list-subtask-element list-subtask-element-hover" id="list_subtask_element_${indexSubTask}"><div class="disc-with-input"><span id="disc_${indexSubTask}">&#9679;</span> <input id="editable_input_${indexSubTask}" readonly onchange="emptySubtaskDelete(${indexSubTask})" onblur="editSubmit(${indexSubTask})" value="${subtaskValue}"></div><div id="edit_and_delete_icons_${indexSubTask}"  class="delete-and-add-icon opacity-null margin-left"><img src="/assets/img/icon/edit.svg" id="edit_subtask_icon_${indexSubTask}" onclick="editSubtask(${indexSubTask})"><img id="confirm_edit_icon_${indexSubTask}" src="/assets/img/icon/check_subtask.svg" class="d_none" onclick="editSubmit(${indexSubTask})">
    <div class="placholder-for-icons"></div><img src="/assets/img/icon/delete.svg" onclick="removeSubtask(${indexSubTask}, ${taskIndex})" alt=""></div></div></div>`
}

function getUserListTemplate(indexUsers) {
    return `<label for="user_${indexUsers}" id="user_${indexUsers}_label" class="user-dropmenu" onclick="checkedStyle(${indexUsers})">
                <div class="user-logo-container">
                    <div id="avatar_user_${indexUsers}" class="user-logo-small" style="background-color:${contactsFirebase[indexUsers].color}">${contactsFirebase[indexUsers].avatar}</div>
                    <span>${contactsFirebase[indexUsers].username}</span>
                </div>
                <input id="user_${indexUsers}" type="checkbox" class="checkbox" onclick="addCheckedUsers(${indexUsers})">
                <label for="user_${indexUsers}"><img src="/assets/img/icon/checkbox.svg" alt=""></label>
            </label>`
}

function getCheckedAvatar(indexUsers) {
    return `<div id="user_checked_${indexUsers}" class="user-logo-small no-margin" style="background-color:${contactsFirebase[indexUsers].color}">${contactsFirebase[indexUsers].avatar}</div>`
    
}

function getTaskUsersOverlayTemplate(taskIndex, indexUser) {
    return `<tr>
                <td>
                    <div class="user overlay-user" style="background-color: ${tasks[taskIndex].assignedTo[indexUser].color}">${tasks[taskIndex].assignedTo[indexUser].avatar}</div>
                </td>
                <td>${tasks[taskIndex].assignedTo[indexUser].username}</td>
            </tr>`
}

function getTaskSubtaskOverlayTemplate(taskIndex, indexSubtask) {
    return `<label for="task_${taskIndex}_checkbox_${indexSubtask}" class="subtask-overlay">
                <input type="checkbox" class="checkbox" id="task_${taskIndex}_checkbox_${indexSubtask}" onclick="addSubtaskChecked(${indexSubtask}, ${taskIndex})" >
                <div for="task_${taskIndex}_checkbox_${indexSubtask}" class="subtask-img"><img src="/assets/img/icon/checkbox.svg" alt=""></div>
            
                <div class="subtask-label">${tasks[taskIndex].subtask[indexSubtask].subtaskName}</div>
            </label>`  
}


function showSuccessfulClear() {
    return `<p>Task successfully cleared! </p><img src="/assets/img/icon/close_white.svg">`;
}

function showSuccessfulAddedTask() {
    return `<p>Task added to board! </p><img class="feedback-img" src="/assets/img/icon/board_icon.svg">`;
}

function showErrorAddedTask() {
    return `<p>There was an error saving the data</p><img class="feedback-img" src="/assets/img/icon/close_white.svg">`;
}

function showTaskDeleted() {
    return `<p>Task deleted successfully!</p><img class="feedback-img" src="/assets/img/icon/delete.svg">`;
}


/* contact page */


function showUserInformation(contact, initials) {
    return `
        <div class="contact" id="contact${contact.id}" onclick="chooseContact(${contact.id}); showRespUserInfo()">
            <div class="avatar flex-box-center-center" style="background-color: ${contact.color}">${initials}</div>
            <div class="contact-info">
                <strong>${contact.username}</strong>
                <p class="accessibility">${contact.email}</p>
            </div>
        </div>
        `;
}


function showContact(individualContact) {
    return `
    <div id="slide" class="user-slide-in">
        <div class="user-info-header">
            <div class="info-initial flex-box-center-center" style="background-color: ${individualContact.color}">${individualContact.username.split(" ").map(n => n[0]).join("")}</div>
                <div class="info-name">
                    <h4>${individualContact.username}</h4>
                    <div class="container-editing-tools">
                        <div class="dpl-fl-al-cetr tools" onclick="editContact(${individualContact.id})"><img class="icon tools-edit" src="../assets/img/icon/edit.svg" alt=""><span>edit</span></div>
                        <div class="dpl-fl-al-cetr tools" onclick="deleteContact(event, ${individualContact.id})"><img class="icon tools-delete" src="../assets/img/icon/delete.svg" alt=""><span>delete</span></div>
                    </div>
                </div>
            </div>
            <div >
                <div>
                    <p class="user-contact-info">Contact Information</p>
                </div>
                <div class="contact-box">
                    <div class="contact-info-box">
                        <p class="accessibility-description">Email</p>
                        <a class="accessibility" href="mailto:${individualContact.email}"> ${individualContact.email}</a>
                    </div>
                    <div class="contact-info-box">
                        <p class="accessibility-description">Phone</p>
                        <a class="accessibility" href="tel:${individualContact.phone}">${individualContact.phone}</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="toolsRespContainer" class="tools-overlay-Container d-none" onclick="closeToolsresp()">
        <div id="toolsResp" class="editing-tools-resp d-none">
            <div class="dpl-fl-al-cetr tools tools-resp" onclick="editRespContact(${individualContact.id})"><img class="icon tools-edit" src="../assets/img/icon/edit.svg" alt=""><span>edit</span></div>
            <div class="dpl-fl-al-cetr tools tools-resp" onclick="deleteContact(event, ${individualContact.id})"><img class="icon tools-delete" src="../assets/img/icon/delete.svg" alt=""><span>delete</span></div>
        </div>
    </div>
    `;
}


function showOverlayAddContact() {
    return `
        <div id="overlay" class="overlay-contact flex-box-center-center d-none" onclick="eventBubbling(event)">
            <div class="close-container" onclick="closeOverlay(event)"><img class="close-btn" src="../assets/img/icon/close.svg" alt=""></div>
            <div class="overlay-cover">
                <img class="logo-img" src="../assets/img/logo/cover_join_white.svg" alt="">
                <div class="card-title">
                    <h5>Add contact</h5>
                    <p class="motivation-text">Tasks are better with a Team!</p>
                </div>
            </div>
            <div class="overlay-main-container flex-box-center-center">
                <div class="profil-img-container flex-box-center-center"><img class="profil-img" src="../assets/img/icon/person.svg" alt=""></div>
                <form onsubmit="createNewContact(); return false">
                    <div class="dpl-fl-colu input-container">
                        <label class="input-field">
                            <div class="input-content">
                                <input id="contactname" type="text" placeholder="Name" required>
                                <img class="input-icon" src="../assets/img/icon/person.svg" alt="">
                            </div>
                        </label>
                        <label class="input-field">
                            <div class="input-content">
                                <input id="email" type="email" placeholder="E-mail">
                                <img class="input-icon" src="../assets/img/icon/mail.svg" alt="">
                            </div>
                        </label>
                        <label class="input-field">
                            <div class="input-content">
                                <input id="phone" type="tel" placeholder="Phone">
                                <img class="input-icon" src="../assets/img/icon/call.svg" alt="">
                            </div>
                        </label>
                    </div>
                    <div class="submit-container">
                        <button class="blue-white-btn cancel" onclick="closeOverlay(event)">Cancel</button>
                        <button class="white-blue-btn">Create contact</button>
                    </div>
                </form>
            </div>
        </div>`;
}


function overlayEditContact(individualUser) {
    return `
        <div id="overlay" class="overlay-contact flex-box-center-center d-none" onclick="eventBubbling(event)">
            <div class="close-container" onclick="closeOverlay(event)"><img class="close-btn" src="../assets/img/icon/close.svg" alt=""></div>
            <div class="overlay-cover">
                <img class="logo-img" src="../assets/img/logo/cover_join_white.svg" alt="">
                <div class="card-title">
                    <h5>Edit Contact</h5>
                    <p class="motivation-text">Tasks are better with a Team!</p>
                </div>
            </div>
            <div class="overlay-main-container flex-box-center-center">
                <div class="info-initial info-initial-overlay flex-box-center-center" style="background-color: ${individualUser.color}">${individualUser.username.split(" ").map(n => n[0]).join("")}</div>
                <form onsubmit="saveContact(${individualUser.id}); return false">
                    <div class="dpl-fl-colu input-container">
                        <label class="input-field">
                            <div class="input-content">
                                <input id="contactname" type="text" value="${individualUser.username}" placeholder="Name" required>
                                <img class="input-icon" src="../assets/img/icon/person.svg" alt="">
                            </div>
                        </label>
                        <label class="input-field">
                            <div class="input-content">
                                <input id="email" type="email" value="${individualUser.email}" placeholder="E-mail">
                                <img class="input-icon" src="../assets/img/icon/mail.svg" alt="">
                            </div>
                        </label>
                        <label class="input-field">
                            <div class="input-content">
                                <input id="phone" type="tel" value="${individualUser.phone}" placeholder="Phone">
                                <img class="input-icon" src="../assets/img/icon/call.svg" alt="">
                            </div>
                        </label>
                    </div>
                    <div class="submit-container">
                        <button class="blue-white-btn" onclick="deleteContact(event, ${individualUser.id}); closeOverlay()">Delete</button>
                        <button class="white-blue-btn">Save</button>
                    </div>
                </form>
            </div>
        </div>`;
}


function showSuccessfulCreated() {
    return `<p>Contact successfully created </p>`;
}


function showSuccessfulDeleted() {
    return `<p>Contact successfully deleted </p>`;
}


function changeBtnMore() {
    return `
        <div class="add-btn-resp" onclick="openToolsResp()">
            <img class="contact-img" src="../assets/img/icon/more_vert.svg" alt="">
        </div>`;
}



function changeAddBtnPerson() {
    return `
        <div class="add-btn-resp" onclick="addRespContact()">
            <img class="contact-img" src="../assets/img/icon/person_add.svg" alt="">
        </div>`;
}



function showOverlayAddResp() {
    return `
    <div id="overlay" class="overlay-contact overlay-contact-resp d-none" onclick="eventBubbling(event)">
            <div class="overlay-cover-resp">
                <div class="close-resp-overlay" onclick="closeOverlay(event)"><img class="close-btn" src="../assets/img/icon/close_white.svg" alt=""></div>    
                <div class="card-title">
                    <h5>Add contact</h5>
                    <p class="motivation-text">Tasks are better with a Team!</p>
                </div>
            </div>
            <div class="overlay-main-container-resp">
                <div class="profil-img-container flex-box-center-center profil-img-resp"><img class="profil-img" src="../assets/img/icon/person.svg" alt=""></div>
                <form onsubmit="createNewContact(); return false">
                    <div class="dpl-fl-colu input-container-resp">
                        <label class="input-field input-field-resp">
                            <div class="input-content-resp">
                                <input id="contactname" type="text" placeholder="Name" required>
                                <img class="input-icon" src="../assets/img/icon/person.svg" alt="">
                            </div>
                        </label>
                        <label class="input-field input-field-resp">
                            <div class="input-content-resp">
                                <input id="email" type="email" placeholder="E-mail">
                                <img class="input-icon" src="../assets/img/icon/mail.svg" alt="">
                            </div>
                        </label>
                        <label class="input-field input-field-resp">
                            <div class="input-content-resp">
                                <input id="phone" type="tel" placeholder="Phone" pattern="[0-9]+$" inputmode="numeric">
                                <img class="input-icon" src="../assets/img/icon/call.svg" alt="">
                            </div>
                        </label>
                    </div>
                    <div class="submit-container submit-container-resp">    
                        <button class="white-blue-btn white-blue-btn-resp">Create contact</button>
                    </div>
                </form>
            </div>
        </div>`;
}


function showOverlayEditResp(individualContact) {
    return `
    <div id="overlay" class="overlay-contact overlay-contact-resp" onclick="eventBubbling(event)">
            <div class="overlay-cover-resp">
                <div class="close-resp-overlay" onclick="closeOverlay(event)"><img class="close-btn" src="../assets/img/icon/close_white.svg" alt=""></div>    
                <div class="card-title">
                    <h5>Add contact</h5>
                    <p class="motivation-text">Tasks are better with a Team!</p>
                </div>
            </div>
            <div class="overlay-main-container-resp">
                <div class="profil-img-container flex-box-center-center profil-img-resp" style="background-color: ${individualContact.color}">${individualContact.username.split(" ").map(n => n[0]).join("")}</div>
                <form onsubmit="saveContact(${individualContact.id}); return false">
                    <div class="dpl-fl-colu input-container-resp">
                        <label class="input-field input-field-resp">
                            <div class="input-content-resp">
                                <input id="contactname" type="text" value="${individualContact.username}" placeholder="Name" required>
                                <img class="input-icon" src="../assets/img/icon/person.svg" alt="">
                            </div>
                        </label>
                        <label class="input-field input-field-resp">
                            <div class="input-content-resp">
                                <input id="email" type="email" value="${individualContact.email}" placeholder="E-mail">
                                <img class="input-icon" src="../assets/img/icon/mail.svg" alt="">
                            </div>
                        </label>
                        <label class="input-field input-field-resp">
                            <div class="input-content-resp">
                                <input id="phone" type="tel" value="${individualContact.phone}" placeholder="Phone" pattern="[0-9]+$" inputmode="numeric">
                                <img class="input-icon" src="../assets/img/icon/call.svg" alt="">
                            </div>
                        </label>
                    </div>
                    <div class="submit-container submit-container-resp">
                        <button class="blue-white-btn" onclick="deleteContact(event, ${individualContact.id}); closeOverlay()">Delete</button>
                        <button class="white-blue-btn white-blue-btn-resp">Save</button>
                    </div>
                </form>
            </div>
        </div>`;
}