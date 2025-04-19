function getTaskTemplate(taskIndex) {
    return `<div draggable="true" id="task_index_${taskIndex}" class="task" ondragstart="startDragging(${taskIndex}); addHighlight()" ondragend="removeHighlight()" onclick="openOverlayTask(${taskIndex})">
                <div class="task-cat-technical">
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
                </div>
            </div>`
}

function getUserInTaskTemplate(indexUser, userList) {
    return `<div class="user" style="background-color:${userList[indexUser].color}">${userList[indexUser].avatar}</div>`
}

function getSubtaskTemplate(indexSubTask, subtaskValue, taskIndex) {
    return `<div id="subtask_${indexSubTask}" class="list-element-div" onmouseover="showEditIcons(${indexSubTask})" onmouseout="blindEditIcons(${indexSubTask})"><div class="list-subtask-element"><div>&#x1F784 <input id="editable_input_${indexSubTask}" readonly onchange="emptySubtaskDelete(${indexSubTask})" onblur="editSubmit(${indexSubTask})" value="${subtaskValue}"></div><div id="edit_and_delete_icons_${indexSubTask}"  class="delete-and-add-icon d_none"><img src="/assets/img/icon/edit.svg" onclick="editSubtask(${indexSubTask})">
    <div class="placholder-for-icons"></div><img src="/assets/img/icon/delete.svg" onclick="removeSubtask(${indexSubTask}, ${taskIndex})" alt=""></div></div></div>`
}

function getUserListTemplate(indexUsers) {
    return `<label for="user_${indexUsers}" class="user-dropmenu">
                <div class="user-logo-container">
                    <div id="avatar_user_${indexUsers}" class="user-logo-small" style="background-color:${users[indexUsers].color}">${users[indexUsers].avatar}</div>
                    <span>${users[indexUsers].username}</span>
                </div>
                <input id="user_${indexUsers}" type="checkbox" class="checkbox" onclick="addCheckedUsers(${indexUsers})">
                <label for="user_${indexUsers}"><img src="/assets/img/icon/checkbox.svg" alt=""></label>
            </label>`
}

function getCheckedAvatar(indexUsers) {
    return `<div id="user_checked_${indexUsers}" class="user-logo-small no-margin" style="background-color:${users[indexUsers].color}">${users[indexUsers].avatar}</div>`
    
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
                <label for="task_${taskIndex}_checkbox_${indexSubtask}" class="subtask-img"><img src="/assets/img/icon/checkbox.svg" alt=""></div>
            
                <div class="subtask-label">${tasks[taskIndex].subtask[indexSubtask].subtaskName}</div>
            </label>`  
}
