document.querySelectorAll("select").forEach(select => {
    select.addEventListener("change", () => {
      select.blur();
    });
  });


  function searchTask() {
    const input = document.getElementById("search_task");
    input.value = "";
    input.blur();
}
