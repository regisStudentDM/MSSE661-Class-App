/**
 * AJAX add new tasks to task list on save.
 */
const doAddTask = async (e) => {
    e.preventDefault();
  
    const taskInput = document.getElementById('formInputTaskName');
    const task_name = taskInput.value;
    const statusSelect = document.getElementById('formSelectStatus');
    const options = statusSelect.options;
    const selectedIndex = statusSelect.selectedIndex;
    const status = options[selectedIndex].text;
  
    if (!task_name) {
      alert('Please enter a task name.');
      return;
    }
  
    const res = await addTask({ task_name, status });
  
    if (res !== null) {
      inst.generateTasks();
    }
    taskInput.value = '';
  };


  const doUpdateTask = async (e) => {
    e.preventDefault();
  
    const taskOrigName = document.getElementById('formTaskToEditName').value;

    const taskNewName = document.getElementById('formUpdatedTaskName').value;

    const statusSelect = document.getElementById('formUpdatedSelectStatus');
    const options = statusSelect.options;
    const selectedIndex = statusSelect.selectedIndex;
    const taskNewStatus = options[selectedIndex].text;
  
    if (!taskNewName) {
      alert('Please enter an updated task name.');
      return;
    }

    const taskOrigID = 1;
  
    const res = await updateTask({ taskNewName, taskNewStatus }, taskOrigID);
  
    if (res !== null) {
      inst.generateTasks();
    }
    taskInput.value = '';
  };
  