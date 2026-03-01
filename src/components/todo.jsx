import React, { useState } from "react";

function Todo() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  // Add new task
  const addTask = () => {
    if (!task.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
    setTask("");
  };

  // Toggle complete
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">My To-Do App</h1>

      {/* Input */}
      <div className="flex mb-4 w-full max-w-md">
        <input
          type="text"
          placeholder="Add a new task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="flex-grow px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addTask}
          className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      {/* Task List */}
      <ul className="w-full max-w-md space-y-2">
        {tasks.map((t) => (
          <li
            key={t.id}
            className={`flex justify-between items-center p-3 rounded-lg ${
              t.completed ? "bg-green-100 line-through" : "bg-white"
            }`}
          >
            <span
              onClick={() => toggleComplete(t.id)}
              className="cursor-pointer flex-1"
            >
              {t.text}
            </span>
            <button
              onClick={() => deleteTask(t.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </li>
        ))}
        {tasks.length === 0 && (
          <p className="text-gray-500 text-center">No tasks yet</p>
        )}
      </ul>
    </div>
  );
}

export default Todo;
