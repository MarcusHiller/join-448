// let  tasks = [
//   {
//     title: "Kochwelt Page Testing",
//     descripton: "Lorem ipsum dolor sit amet consectetur adipisicin",
//     date: "2025-03-14",
//     priority: 1,
//     category: "User Story",
//     assignedTo: [
//       {
//         user: 
//           {
//             name: "Muster Mann",
//             logo: "MM",
//           }
        
//       },
//       {
//         user: 
//           {
//             name: "Max Testing",
//             logo: "MT",
//           }
        
//       }
//     ],
//     subtasks: [
//       "Testing",
//       "Testing",
//       "Testing"
//     ],
//     condition: "ToDo"
//   }
// ]


let tasks = [
  {
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




document.querySelectorAll("select").forEach(select => {
    select.addEventListener("change", () => {
      select.blur();
    });
  });


   function AddTask() {
    alert("Yes");
  }

  // function renderTaskInToColumn() {
  //     let toDoColumnRef = document.getElementById("toDo_column");
  //     let inProgColumnRef = document.getElementById("inProg_column");
  //     let feedbackColumnRef = document.getElementById("feedback_column");
  //     let doneColumnRef = document.getElementById("done_column");

  //     for (let taskIndex = 0; taskIndex < tasks.length; taskIndex++) {
  //       let taskCondition = tasks[taskIndex].condition;

  //       if(taskCondition == "ToDo") {
  //         toDoColumnRef.innerHTML += getTaskTemplate(taskIndex);
  //       } else if (taskCondition == "inProgress") {
  //         inProgColumnRef.innerHTML += getTaskTemplate(taskIndex);
  //       } else if (taskCondition == "feedback") {
  //         feedbackColumnRef.innerHTML += getTaskTemplate(taskIndex);
  //       } else if (taskCondition == "done") {
  //         doneColumnRef.innerHTML += getTaskTemplate(taskIndex);
  //       }
  //     }
  // }


  function creatOverlayFromTask(taskIndex) {
    document.getElementById("overlay_category").innerHTML = tasks[taskIndex].category;
    document.getElementById("overlay_titel").innerHTML = tasks[taskIndex].title;
    document.getElementById("overlay_description").innerHTML = tasks[taskIndex].descripton
    document.getElementById("overlay_date").innerHTML = tasks[taskIndex].date;
  }


  function addUserDropMenu() {
    document.getElementById("add_user_list").classList.toggle("d_none");
    document.getElementById("dropdown_menu_arrow").classList.toggle("rotate-img");


   

  
  }

  



