import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    const res = await axios.get("http://backend:5000/tasks");
    setTasks(res.data);
  };

  const addTask = async () => {
    await axios.post("http://backend:5000/tasks", { title });
    setTitle("");
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Task Manager</h1>
      <input value={title} onChange={e => setTitle(e.target.value)} />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
