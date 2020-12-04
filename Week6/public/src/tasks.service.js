const TASKS_API = `${BASE_API_URL}/tasks`; // http://localhost:3000/api/tasks

const getTasks = () => _get(TASKS_API, OPTIONS_WITH_AUTH);


const getTaskIDByUserAndTaskName = (taskName) => 
_get_with_params(`${TASKS_API}/getTaskIdByName/${taskName}`, DEFAULT_OPTIONS_WITH_AUTH);


const addTask = (formData) =>
  _post(TASKS_API, formData, DEFAULT_OPTIONS_WITH_AUTH);

  const updateTask = (formData, taskId) =>
  _put(`${TASKS_API}/${taskId}`, formData, DEFAULT_OPTIONS_WITH_AUTH);


const deleteTask = (taskId) =>
  _delete(`${TASKS_API}/${taskId}`, OPTIONS_WITH_AUTH);
