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
      if (res.msg == 'Cannot process response at the time. Please try again shortly.') {
        alert("Can't add item at this time. Possible duplicate entry?")
      } else {
        alert(res.msg);
      }
      inst.generateTasks();
    }
    taskInput.value = '';
  };


  const doUpdateTask = async (e) => {
    e.preventDefault();

    const oldTaskNameSelect = document.getElementById('formTaskToEditName');
    const oldTaskSelectOptions = oldTaskNameSelect.options;
    const oldTaskSelectedIndex = oldTaskNameSelect.selectedIndex;
    var task_name = oldTaskSelectOptions[oldTaskSelectedIndex].text;

    const taskinfo = await getTaskIDByUserAndTaskName(task_name).catch((err) => {
      throw err;
    });

    var taskIDOfUpdatedTask = taskinfo[0].task_id;
  
    const taskInput = document.getElementById('formUpdatedTaskName');
    task_name = taskInput.value;
    const statusSelect = document.getElementById('formUpdatedSelectStatus');
    const options = statusSelect.options;
    const selectedIndex = statusSelect.selectedIndex;
    const status = options[selectedIndex].text;
  
    if (!task_name) {
      alert('Please enter an updated task name.');
      return;
    }
  
    const res = await updateTask({ task_name, status }, taskIDOfUpdatedTask);
  
    if (res !== null) {
      inst.generateTasks();
    }
    taskInput.value = '';
  };
  