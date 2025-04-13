let currentDraggableTask;

async function getAddTaskHTML() {
 await Promise.all([
   loadHTML("add_task_overlay.html", "add_container"),
 ]);
}
// Overlay functions

function openOverlayTask(taskIndex) {
   creatOverlayFromTask(taskIndex);

   document.getElementById("board_overlay").classList.remove("d_none")
   document.getElementById("overlay_container").classList.remove("d_none")
   setTimeout(() => {document.getElementById("overlay_container").classList.remove("overlay-container-sliding")}, 1)   
}

function openAddTask() {
   document.getElementById("cancel_button").classList.remove("d_none");
   document.getElementById("clear_button").classList.add("d_none");
   document.getElementById("close_add_task_overlay").classList.remove("d_none");
   document.getElementById("board_overlay").classList.remove("d_none");
   document.getElementById("add_container").classList.remove("d_none");
   setTimeout(() => {document.getElementById("add_container").classList.remove("overlay-container-sliding")}, 1);
}

function creatOverlayFromTask(taskIndex) {
 document.getElementById("overlay_category").innerHTML = tasks[taskIndex].category;
 document.getElementById("overlay_titel").innerHTML = tasks[taskIndex].title;
 document.getElementById("overlay_description").innerHTML = tasks[taskIndex].descripton
 document.getElementById("overlay_date").innerHTML = tasks[taskIndex].date;
}

function closeOverlayTask() {
   document.getElementById("overlay_container").classList.add("overlay-container-sliding");
   setTimeout(() => {document.getElementById("board_overlay").classList.add("d_none"),
        document.getElementById("overlay_container").classList.add("d_none")
       }, 100);

}

function closeAddTask() {
   document.getElementById("add_container").classList.add("overlay-container-sliding");
   setTimeout(() => {document.getElementById("board_overlay").classList.add("d_none"),
        document.getElementById("add_container").classList.add("d_none")
       }, 100);

}

function searchTask() {
   const input = document.getElementById("search_task");
   input.blur();
   input.value = "";
   document.activeElement.blur();
 }





 // Render //



 function renderTaskInToColumn() {
   let toDoColumnRef = document.getElementById("toDo_column");
   let inProgColumnRef = document.getElementById("inProg_column");
   let feedbackColumnRef = document.getElementById("feedback_column");
   let doneColumnRef = document.getElementById("done_column");

   toDoColumnRef.innerHTML = "";
   inProgColumnRef.innerHTML = "";
   feedbackColumnRef.innerHTML = "";
   doneColumnRef.innerHTML = "";

   

   for (let taskIndex = 0; taskIndex < tasks.length; taskIndex++) {
     let taskCondition = tasks[taskIndex].condition;

     if(taskCondition == "ToDo") {
       toDoColumnRef.innerHTML += getTaskTemplate(taskIndex);
     } else if (taskCondition == "inProgress") {
       inProgColumnRef.innerHTML += getTaskTemplate(taskIndex);
     } else if (taskCondition == "feedback") {
       feedbackColumnRef.innerHTML += getTaskTemplate(taskIndex);
     } else if (taskCondition == "done") {
       doneColumnRef.innerHTML += getTaskTemplate(taskIndex);
     }
   }

  

   if(toDoColumnRef.innerHTML == "") {
       toDoColumnRef.innerHTML = "<div class='empty-column'><p>No task To do</p></div>"
   }

   if(inProgColumnRef.innerHTML == "") {
       inProgColumnRef.innerHTML = "<div class='empty-column'><p>No task in Progress</p></div>"
   }

   if(feedbackColumnRef.innerHTML == "") {
       feedbackColumnRef.innerHTML = "<div class='empty-column'><p>No task waiting</p></div>"
   }

   if(doneColumnRef.innerHTML == "") {
       doneColumnRef.innerHTML = "<div class='empty-column'><p>No task is done</p></div>"
   };

   toDoColumnRef.innerHTML += "<div id='empty_task_toDo' class='empty-task d_none'></div>";
   inProgColumnRef.innerHTML += "<div id='empty_task_inProg' class='empty-task d_none'></div>";
   feedbackColumnRef.innerHTML += "<div id='empty_task_feedback' class='empty-task d_none'></div>";
   doneColumnRef.innerHTML += "<div id='empty_task_done' class='empty-task d_none'></div>";
}


//   Drag and Drop  //



function dragoverHandler(ev) {
   ev.preventDefault();
 }

 function startDragging(taskIndex) {
   currentDraggableTask = taskIndex;
 }



 function moveTo(condition) {
   tasks[currentDraggableTask].condition = condition;
   renderTaskInToColumn();
 }


 function addHighlight() {

   if (tasks[currentDraggableTask].condition == "ToDo") {
     document.getElementById("empty_task_inProg").classList.remove("d_none");
   } else if (tasks[currentDraggableTask].condition == "inProgress") {
     document.getElementById("empty_task_toDo").classList.remove("d_none");
   document.getElementById("empty_task_feedback").classList.remove("d_none");
   } else if (tasks[currentDraggableTask].condition == "feedback") {
     document.getElementById("empty_task_inProg").classList.remove("d_none");
     document.getElementById("empty_task_done").classList.remove("d_none");
   } else if (tasks[currentDraggableTask].condition == "done") {
     document.getElementById("empty_task_feedback").classList.remove("d_none");
   }
 }
 

 function removeHighlight() {
   document.getElementById("empty_task_toDo").classList.add("d_none");
   document.getElementById("empty_task_inProg").classList.add("d_none");
   document.getElementById("empty_task_feedback").classList.add("d_none");
   document.getElementById("empty_task_done").classList.add("d_none");
 }