/**
 * Sets draggable state on task elements depending on screen width.
 * Disables dragging on mobile (< 900px).
 */
function updateDraggableState() {
    const isMobile = window.matchMedia("(max-width: 900px)").matches;

    tasks.forEach((_, index) => {
        const taskElement = document.getElementById(`task_index_${index}`);
        if (taskElement) {
            taskElement.draggable = !isMobile;
        }
    });
}

// Initialize draggable state on load and on resize
window.addEventListener("DOMContentLoaded", updateDraggableState);
window.addEventListener("resize", updateDraggableState);

/**
 * Handles dragover event, allowing drop and triggers auto-scroll when near window edge.
 * @param {DragEvent} ev - The drag event.
 */
function dragoverHandler(ev) {
    ev.preventDefault();

    const scrollZone = 100;
    const scrollSpeed = 30;

    if (ev.pageY < scrollZone) {
        window.scrollBy(0, -scrollSpeed);
    } else if (window.innerHeight - ev.pageY < scrollZone) {
        window.scrollBy(0, scrollSpeed);
    }
}

/**
 * Sets the currently dragged task by index and adds the visual dragging class.
 * @param {number} taskIndex - Index of the task being dragged.
 */
function startDragging(taskIndex) {
    currentDraggableTask = taskIndex;
    document.getElementById(`task_index_${taskIndex}`).classList.add('dragging');
}

/**
 * Changes the condition (column) of the dragged task and re-renders board.
 * @param {string} condition - New task condition ("ToDo", "inProgress", etc.).
 */
function moveTo(condition) {
    tasks[currentDraggableTask].condition = condition;
    saveCondition(condition);
    renderTaskInToColumn();
}

/**
 * Persists the new task condition to the backend (Firebase).
 * @param {string} condition - The new task condition.
 */
function saveCondition(condition) {
    const taskID = tasks[currentDraggableTask].id;
    const toCondition = { condition };
    patchDataToServer(`/join/tasks/${taskID}`, toCondition);
}

/**
 * Highlights drop zones based on current task's condition.
 */
function addHighlight() {
    const condition = tasks[currentDraggableTask].condition;

    if (condition === "ToDo") {
        document.getElementById("empty_task_inProg").classList.remove("d_none");
    } else if (condition === "inProgress") {
        document.getElementById("empty_task_toDo").classList.remove("d_none");
        document.getElementById("empty_task_feedback").classList.remove("d_none");
    } else if (condition === "feedback") {
        document.getElementById("empty_task_inProg").classList.remove("d_none");
        document.getElementById("empty_task_done").classList.remove("d_none");
    } else if (condition === "done") {
        document.getElementById("empty_task_feedback").classList.remove("d_none");
    }

    document.getElementById("scroll-highlight").classList.remove("d_none");
}

/**
 * Removes all drag-and-drop visual highlights and resets layout.
 */
function removeHighlight() {
    document.getElementById(`task_index_${currentDraggableTask}`).classList.remove('dragging');
    document.querySelector('.board-distribution').classList.remove('lock-layout');

    document.getElementById("empty_task_toDo").classList.add("d_none");
    document.getElementById("empty_task_inProg").classList.add("d_none");
    document.getElementById("empty_task_feedback").classList.add("d_none");
    document.getElementById("empty_task_done").classList.add("d_none");
    document.getElementById("scroll-highlight").classList.add("d_none");
}
