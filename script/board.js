 let currentDraggableTask;


 // Overlay functions
 
 function openOverlayTask(taskIndex) {
    creatOverlayFromTask(taskIndex);

    document.getElementById("board_overlay").classList.remove("d_none")
    document.getElementById("overlay_container").classList.remove("d_none")
    setTimeout(() => {document.getElementById("overlay_container").classList.remove("overlay-container-sliding")}, 1)   
}

function openAddTask() {
    document.getElementById("board_overlay").classList.remove("d_none")
    document.getElementById("add_container").classList.remove("d_none")
    setTimeout(() => {document.getElementById("add_container").classList.remove("overlay-container-sliding")}, 1)   
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
    }
}


//   Drag and Drop  //



function dragoverHandler(ev) {
    ev.preventDefault();
  }

  function startDragging(taskIndex) {
    currentDraggableTask = taskIndex;
  }



  function moveTo(conditon) {
    tasks[currentDraggableTask].condition = conditon;
    renderTaskInToColumn();
  }
