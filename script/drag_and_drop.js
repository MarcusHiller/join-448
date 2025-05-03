//   Drag and Drop  //

function dragoverHandler(ev) {
    ev.preventDefault();

    const scrollZone = 30; // Abstand zum Rand
    const scrollSpeed = 30;

    // vertikal scrollen
    if (ev.pageY < scrollZone) { // Scrollt, wenn Y-Position der Maus < 30px vom oberen Rand
        window.scrollBy(0, -scrollSpeed);
    } else if (window.innerHeight - ev.pageY < scrollZone) { // Scrollt, wenn Y-Position der Maus < 30px vom unteren Rand
        window.scrollBy(0, scrollSpeed);
    }
}


function startDragging(taskIndex) {
    currentDraggableTask = taskIndex;
}


function moveTo(condition) {
    tasks[currentDraggableTask].condition = condition;
    saveCondition(condition);
    renderTaskInToColumn();
}


function saveCondition(condition) {
    let taskID = tasks[currentDraggableTask].id;
    let toCondition = { condition: condition }
    patchDataToServer(`/join/tasks/${taskID}`, toCondition)
}


function addHighlight() {

    // if (tasks[currentDraggableTask].condition == "ToDo") {
    //   document.getElementById("empty_task_inProg").classList.remove("d_none");
    // } else if (tasks[currentDraggableTask].condition == "inProgress") {
    //   document.getElementById("empty_task_toDo").classList.remove("d_none");
    //   document.getElementById("empty_task_feedback").classList.remove("d_none");
    // } else if (tasks[currentDraggableTask].condition == "feedback") {
    //   document.getElementById("empty_task_inProg").classList.remove("d_none");
    //   document.getElementById("empty_task_done").classList.remove("d_none");
    // } else if (tasks[currentDraggableTask].condition == "done") {
    //   document.getElementById("empty_task_feedback").classList.remove("d_none");
    // }
}


function removeHighlight() {
    // document.querySelector('.board-distribution').classList.remove('lock-layout');
    // document.getElementById("empty_task_toDo").classList.add("d_none");
    // document.getElementById("empty_task_inProg").classList.add("d_none");
    // document.getElementById("empty_task_feedback").classList.add("d_none");
    // document.getElementById("empty_task_done").classList.add("d_none");
}