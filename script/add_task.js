let tasks = [
  {
    id: 1,
    title: "Kochwelt Page Testing",
    descripton: "Lorem ipsum dolor sit amet consectetur adipisicin",
    date: "2025-03-14",
    priority: 1,
    category: "User Story",
    assignedTo: [
      { user: { name: "Muster Mann", logo: "MM" } },
      { user: { name: "Max Testing", logo: "MT" } }
    ],
    subtasks: ["Testing", "Testing", "Testing"],
    condition: "ToDo"
  },
  {
    id: 2,
    title: "Dashboard UI Fixes",
    descripton: "Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.",
    date: "2025-03-15",
    priority: 2,
    category: "Bug Fix",
    assignedTo: [
      { user: { name: "Lisa Dev", logo: "LD" } },
      { user: { name: "John Doe", logo: "JD" } }
    ],
    subtasks: ["Fix layout", "Adjust colors", "Optimize performance"],
    condition: "feedback"
  },
  {
    id: 3,
    title: "Backend API Update",
    descripton: "Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.",
    date: "2025-03-16",
    priority: 3,
    category: "Feature",
    assignedTo: [
      { user: { name: "Backend Guru", logo: "BG" } },
      { user: { name: "API Tester", logo: "AT" } }
    ],
    subtasks: ["Update endpoints", "Improve security", "Add logging"],
    condition: "inProgress"
  },
  {
    id: 4,
    title: "Mobile App Testing",
    descripton: "Pellentesque in ipsum id orci porta dapibus.",
    date: "2025-03-17",
    priority: 1,
    category: "done",
    assignedTo: [
      { user: { name: "QA Expert", logo: "QE" } },
      { user: { name: "Mobile Dev", logo: "MD" } }
    ],
    subtasks: ["Run test cases", "Report bugs", "Verify fixes"],
    condition: "done"
  }
];

let nextTaskId = 5;

let subtasks = [];
let subtaskIndex = 0;




document.querySelectorAll("select").forEach(select => {
    select.addEventListener("change", () => {
      select.blur();
    });
  });


  function AddTask() {
    alert("Yes");
  }

  function creatOverlayFromTask(taskIndex) {
    document.getElementById("overlay_category").innerHTML = tasks[taskIndex].category;
    document.getElementById("overlay_titel").innerHTML = tasks[taskIndex].title;
    document.getElementById("overlay_description").innerHTML = tasks[taskIndex].descripton
    document.getElementById("overlay_date").innerHTML = tasks[taskIndex].date;
  }


  function openUserDropMenu() {
    document.getElementById("dropdown_menu_arrow").classList.toggle("rotate-img");
    document.getElementById("assigned_select").classList.toggle("blue-border");
    document.getElementById("add_user_list").classList.toggle("dropdown-animation-user");
    
  }

   function openCatDropMenu() {
    document.getElementById("dropdown_menu_arrow_select").classList.toggle("rotate-img");
    document.getElementById("category_input").classList.toggle("blue-border");
    document.getElementById("category_list").classList.toggle("dropdown-animation");
   }


   function selectCategory(category) {
    document.getElementById("category_select_input").value = category;
    openCatDropMenu();
   }

   function addBorder() {
    document.getElementById("subtask_input_label").classList.add("blue-border");
   }

function removeBorder() {
  document.getElementById("subtask_input_label").classList.remove("blue-border");
}

function addTask() {
    let newTask = {}
    let titel = document.getElementById("titel_input");
    let descripton = document.getElementById("description_input");
    let date = document.getElementById("date_input");
    let category = document.getElementById("category_input");
    let priority = "medium";

    let urgent = document.getElementById("prio_urgent");
    let medium = document.getElementById("prio_medium");
    let low = document.getElementById("prio_low");
    let prio = [urgent, medium, low];
    
    for (i = 0; i < prio.length; i++) {
      if (prio[i].checked) {
        priority = prio[i].value;
    }
  }
  newTask = {
      titel: titel.value,
      descripton: descripton.value,
      date: date.value,
      category: category.value,
      priority: priority
    }

    console.log(newTask);

  }

  function showAddSubtaskButton() {
    let subtask = document.getElementById("subtask_input");

    if(subtask.value) {
      document.getElementById("delete_and_add_icon").classList.remove("d_none");
      document.getElementById("subtask_plus_icon").classList.add("d_none")
    } else {
      document.getElementById("delete_and_add_icon").classList.add("d_none");
      document.getElementById("subtask_plus_icon").classList.remove("d_none");

    }
  }


  function clearSubtaskInput() {
    document.getElementById("subtask_input").innerHTML = "";
  }


  function addSubtask() {
    let subtask = document.getElementById("subtask_input");
    let listRef = document.getElementById("sub_list");
    let subtaskValue = subtask.value;

      if(subtask.value) {
        subtaskIndex++;
        listRef.innerHTML += getSubtaskTemplate(subtaskIndex, subtaskValue);
        subtask.value = "";
        document.getElementById("delete_and_add_icon").classList.add("d_none");
        document.getElementById("subtask_plus_icon").classList.remove("d_none");
      } 
  }

  function showEditIcons(indexSubTask) {
    document.getElementById("edit_and_delete_icons_" + indexSubTask).classList.remove("d_none")
  }

  function blindEditIcons(indexSubTask) {
    document.getElementById("edit_and_delete_icons_" + indexSubTask).classList.add("d_none")
  }

  function editSubtask(indexSubTask) {
    let input = document.getElementById("editable_input_" + indexSubTask);
    const len = input.value.length;

    input.readOnly = false;
    input.setSelectionRange(len, len);
    input.focus();
  }

  function emptySubtaskDelete(indexSubTask) {
    let input = document.getElementById("editable_input_" + indexSubTask).value;

    if (!input) {
      removeSubtask(indexSubTask);
    }
  }

  function editSubmit(indexSubTask) {
    document.getElementById("editable_input_" + indexSubTask).readOnly = true;
  }

  function removeSubtask(indexSubTask) {
    document.getElementById("subtask_" + indexSubTask).remove();
  }

  function searchContactToTask() {  // not avalieble yet
    let input = document.getElementById("assigned_select_input").value;
  }

  function clearAddTaskField() {
    document.getElementById("titel_input").value = "";
    document.getElementById("description_input").value = "";
    document.getElementById("date_input").value = "";


  }
   
  


  



