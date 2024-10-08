import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Ensure you've installed axios using 'npm install axios'
import './TaskManager.css';

const TaskManager = () => {
  const [tasksToday, setTasksToday] = useState([]);
  const [tasksLater, setTasksLater] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskName, setEditTaskName] = useState('');
  const [editTaskDescription, setEditTaskDescription] = useState('');
  const [editDueDate, setEditDueDate] = useState('');
  const [currentSection, setCurrentSection] = useState('today');

  // Fetch existing tasks from the database when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const responseToday = await axios.get('/api/taches?statut=à faire aujourd hui');
        const responseLater = await axios.get('/api/taches?statut=à faire plus tard');
        setTasksToday(responseToday.data);
        setTasksLater(responseLater.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des tâches:', error);
      }
    };
    
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (taskName.trim() === '' || dueDate.trim() === '') {
      alert("Veuillez remplir tous les champs obligatoires !");
      return;
    }

    const newTask = {
      name: taskName,
      description: taskDescription,
      dueDate,
      section: currentSection,
    };

    try {
      const response = await axios.post('/api/taches', newTask);
      if (response.status === 201) {
        const taskWithId = { ...newTask, id: response.data.taskId };

        if (currentSection === 'today') {
          setTasksToday([...tasksToday, taskWithId]);
        } else if (currentSection === 'later') {
          setTasksLater([...tasksLater, taskWithId]);
        }

        // Reset the input fields
        setTaskName('');
        setTaskDescription('');
        setDueDate('');
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la tâche:', error);
      alert("Erreur lors de l'ajout de la tâche");
    }
  };

  const deleteTask = async (id, section) => {
    if (!id) return;

    try {
      await axios.delete(`/api/taches/${id}`); // Assuming you have a DELETE endpoint set up
      if (section === 'today') {
        setTasksToday(tasksToday.filter(task => task.id !== id));
      } else if (section === 'later') {
        setTasksLater(tasksLater.filter(task => task.id !== id));
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de la tâche:', error);
    }
  };

  const startEditing = (id, name, description, dueDate, section) => {
    setEditTaskId(id);
    setEditTaskName(name);
    setEditTaskDescription(description);
    setEditDueDate(dueDate);
    setCurrentSection(section);
  };

  const saveEdit = async () => {
    if (editTaskName.trim() === '' || editTaskDescription.trim() === '') return;

    const updatedTask = {
      id: editTaskId,
      name: editTaskName,
      description: editTaskDescription,
      dueDate: editDueDate,
      section: currentSection,
    };

    try {
      await axios.put(`/api/taches/${editTaskId}`, updatedTask); // Assuming you have a PUT endpoint set up
      if (currentSection === 'today') {
        setTasksToday(tasksToday.map(task => (task.id === editTaskId ? updatedTask : task)));
      } else if (currentSection === 'later') {
        setTasksLater(tasksLater.map(task => (task.id === editTaskId ? updatedTask : task)));
      }

      setEditTaskId(null);
      setEditTaskName('');
      setEditTaskDescription('');
      setEditDueDate('');
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la tâche:', error);
    }
  };

  return (
    <div className="task-manager">
      <h1>Gestion de Tâches</h1>
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Nom de la tâche"
      />
      <input
        type="text"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        placeholder="Description de la tâche"
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <div className="task-inputs">
        <div className="section-selectors">
          <button onClick={() => setCurrentSection('today')}>À faire aujourd'hui</button>
          <button onClick={() => setCurrentSection('later')}>À faire plus tard</button>
          <button onClick={addTask}>Ajouter</button>
        </div>
      </div>

      <div className="task-sections">
        <div className="task-section">
          <h2>À faire aujourd'hui</h2>
          <ul>
            {tasksToday.map(task => (
              <li key={task.id}>
                {editTaskId === task.id ? (
                  <>
                    <input
                      type="text"
                      value={editTaskName}
                      onChange={(e) => setEditTaskName(e.target.value)}
                    />
                    <input
                      type="text"
                      value={editTaskDescription}
                      onChange={(e) => setEditTaskDescription(e.target.value)}
                    />
                    <input
                      type="date"
                      value={editDueDate}
                      onChange={(e) => setEditDueDate(e.target.value)}
                    />
                    <button onClick={saveEdit}>Enregistrer</button>
                  </>
                ) : (
                  <>
                    {task.name}: {task.description} - {task.dueDate}
                    <button onClick={() => startEditing(task.id, task.name, task.description, task.dueDate, 'today')}>Modifier</button>
                    <button onClick={() => deleteTask(task.id, 'today')}>Supprimer</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="task-section">
          <h2>À faire plus tard</h2>
          <ul>
            {tasksLater.map(task => (
              <li key={task.id}>
                {editTaskId === task.id ? (
                  <>
                    <input
                      type="text"
                      value={editTaskName}
                      onChange={(e) => setEditTaskName(e.target.value)}
                    />
                    <input
                      type="text"
                      value={editTaskDescription}
                      onChange={(e) => setEditTaskDescription(e.target.value)}
                    />
                    <input
                      type="date"
                      value={editDueDate}
                      onChange={(e) => setEditDueDate(e.target.value)}
                    />
                    <button onClick={saveEdit}>Enregistrer</button>
                  </>
                ) : (
                  <>
                    {task.name}: {task.description} - {task.dueDate}
                    <button onClick={() => startEditing(task.id, task.name, task.description, task.dueDate, 'later')}>Modifier</button>
                    <button onClick={() => deleteTask(task.id, 'later')}>Supprimer</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
