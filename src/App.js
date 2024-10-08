import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AddTaskPage from './AddTaskPage';
import Dashboard from './Dashboard'; 
import TaskManager from './TaskManager';
import ScreenDemarrage from './ScreenDemarrage';
import TaskManagement from './TaskManagement';

const App = () => {
  const [tasks, setTasks] = useState([]);

  const handleTaskAdded = (task) => {
    // Ajoute la tâche à la liste des tâches
    setTasks((prevTasks) => [...prevTasks, task]);
    // Stocke la tâche dans le localStorage
    localStorage.setItem('tasks', JSON.stringify([...tasks, task]));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/screenDemarrage"/>} />
        <Route path="/screenDemarrage" element={<ScreenDemarrage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-task" element={<AddTaskPage onTaskAdded={handleTaskAdded} />} />
        <Route path="/task-management" element={<TaskManagement />} />
        <Route path="/task-manager" element={<TaskManager tasks={tasks} />} />
      </Routes>
    </Router>
  );
};

export default App;
