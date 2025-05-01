async function getAddTaskHTML() {
    await Promise.all([
      loadHTML("add_task_overlay.html", "addTask_container"),
    ]);
    await loadContactsFromFirebase();
    renderUserList();
  }