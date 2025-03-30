 function openOverlayTask() {
    document.getElementById("board_overlay").classList.remove("d_none")
    setTimeout(() => {document.getElementById("overlay_container").classList.remove("overlay-container-sliding")}, 1)   
}

    

   


function closeOverlayTask() {
    document.getElementById("overlay_container").classList.add("overlay-container-sliding")
    setTimeout(() => {document.getElementById("board_overlay").classList.add("d_none")}, 50)
}
   