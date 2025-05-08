/**
 * Shows or removes a feedback message if no users were found.
 * @param {string} input - Search input string.
 * @param {number} userFoundCounter - Number of unmatched users.
 * @param {HTMLElement} list - DOM element of the user list.
 */
function checkUserFound(input, userFoundCounter, list) {
    let existingFeedback = document.getElementById("no_user_feedback");
  
    if (userFoundCounter === contactsFirebase.length && input !== "") {
      const message = `No user found: "${input}"`;
      if (!existingFeedback) {
        const feedback = createFeedback(message, "initial");
        list.appendChild(feedback);
      } else {
        existingFeedback.textContent = message;
      }
    } else {
      if (existingFeedback) {
        existingFeedback.remove();
      }
    }
  }
  
  /**
   * Creates a styled feedback element when no user is found.
   * @param {string} message - Message to show.
   * @returns {HTMLElement} Feedback element.
   */
  function createFeedback(message, position) {
    const feedback = document.createElement("div");
    feedback.id = "no_user_feedback";
    feedback.textContent = message;
    Object.assign(feedback.style, {
      fontStyle: "italic",
      color: "#888",
      padding: "6px 10px",
      position: position
    });
    return feedback;
  }
  
  /**
   * Toggles the style of a user label to indicate selection.
   * @param {number} indexUsers - Index of the user.
   */
  function checkedStyle(indexUsers) {
    document.getElementById("user_" + indexUsers + "_label").classList.toggle("user-dropmenu-hover-effekt");
  }
  
  /**
   * Adds a subtask when Enter key is pressed.
   * @param {KeyboardEvent} event - Key press event.
   */
  function checkEnterAddSubtask(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      addSubtask();
    }
  }
  
  /**
   * Finalizes subtask editing when Enter key is pressed.
   * @param {KeyboardEvent} event - Key press event.
   * @param {number} indexSubTask - Index of the subtask.
   */
  function checkEnterEditSubtask(event, indexSubTask) {
    if (event.key === 'Enter') {
      event.preventDefault();
      editSubmit(indexSubTask);
    }
  }
  
  /**
   * Prevents default behavior when Enter is pressed.
   * @param {KeyboardEvent} event - Key press event.
   */
  function checkEnter(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }
  
  /**
   * Sets the minimum selectable date of the input field with ID 'date_input' to today's date.
   * 
   * This prevents users from selecting a past date in the date picker.
   */
  function showDateToday() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date_input').setAttribute('min', today);
  }
  
  
  function maxChar() {
    let input = document.getElementById("titel_input");
    let errorField =  document.getElementById("error-title");
  
    if (input.value.length === 40) {
      errorField.innerHTML = 'Titel too long. Max 40 character!';
      errorField.style.color = "#d1d1d1";
      errorField.classList.add('visible');
    } else {
      errorField.classList.remove('visible');
      errorField.style.color = "red";
      errorField.innerHTML = 'This field is required';
    }
  }

  /**
 * Animates a temporary success message to the user.
 */
function userFeedback() {
    setTimeout(() => {
      let success = document.getElementById('success');
      success.classList.remove('d-none');
      setTimeout(() => { success.classList.add('show-successful'); }, 1);
      setTimeout(() => { success.classList.remove('show-successful'); }, 1510);
      setTimeout(() => { success.classList.add('d-none'); }, 1730);
    }, 200);
  }

