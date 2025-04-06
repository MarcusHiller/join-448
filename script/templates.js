function getTaskTemplate(taskIndex) {
    return `<div draggable="true" id="task_index_${taskIndex}" class="task" ondragstart="startDragging(${taskIndex}); addHighlight()" ondragend="removeHighlight()" onclick="openOverlayTask(${taskIndex})">
                <div class="task-cat-technical">
                    <p>${tasks[taskIndex].category}</p>
                </div>
                <div class="task-title"><span class="task-title">${tasks[taskIndex].title}</span></div>
                <div class="task-description"><span>${tasks[taskIndex].descripton}</span></div>
                <div class="progress">
                    <progress max="2" value="1"></progress>
                        <span>1/2 Subtasks</span>
                </div>
                <div class="task-footer">
                    <div class="task-users">
                        <div class="user">${tasks[taskIndex].assignedTo[0].user.logo}</div>
                        <div class="user">${tasks[taskIndex].assignedTo[1].user.logo}</div>
                    </div>
                    <div class="priority">
                        <img src="/assets/img/icon/prio_medium.svg" alt="">
                    </div>
                </div>
            </div>`
}

function getSubtaskTemplate(indexSubTask, subtaskValue) {
    return `<li id="subtask_${indexSubTask}"><div class="list-subtask-element"><div>${subtaskValue}</div ><div class="delete-and-add-icon"><img src="/assets/img/icon/edit.svg" alt="">
    <div class="placholder-for-icons"></div><img src="/assets/img/icon/delete.svg" oncilck="deleteSubtask(${indexSubTask})" alt=""></div></div></li>`
}