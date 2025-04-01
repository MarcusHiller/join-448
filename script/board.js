 function openOverlayTask() {
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
