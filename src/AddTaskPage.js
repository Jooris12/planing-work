import React, { useState } from 'react';
import axios from 'axios'; // Importez axios pour faire des requêtes HTTP
import './AddTaskPage.css';

const AddTaskPage = ({ onTaskAdded }) => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isToday, setIsToday] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation des champs
    if (!taskName.trim() || !dueDate) {
      alert("Veuillez remplir tous les champs nécessaires !");
      return;
    }

    const newTask = {
      id: Date.now(),// Ajout d'un ID unique (peut ne pas être nécessaire côté serveur)
      name: taskName,
      description: taskDescription,
      dueDate,
      section: isToday ? 'today' : 'later',
    };

    try {
      // Envoi de la tâche à l'API
      const response = await axios.post('/api/taches', newTask);
      if (response.status === 201) {
        console.log("Tâche ajoutée avec succès :", response.data);
        
        // Vous pouvez également ajouter la tâche au localStorage ici si nécessaire
        // const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        // existingTasks.push(newTask);
        // localStorage.setItem('tasks', JSON.stringify(existingTasks));

        // Appeler la fonction de rappel si nécessaire
        if (onTaskAdded) {
          onTaskAdded();
        }

        // Réinitialiser les champs du formulaire
        setTaskName('');
        setTaskDescription('');
        setDueDate('');
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de la tâche :", error);
      alert("Erreur lors de l'ajout de la tâche");
    }
  };

  return (
    <div className="add-task-page">
      <h1>Ajouter une tâche</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="taskName">Nom de la tâche</label>
          <input
            type="text"
            id="taskName"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="taskDescription">Description</label>
          <textarea
            id="taskDescription"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="dueDate">Date d'échéance</label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div className="button-group">
          <button type="button" onClick={() => setIsToday(true)}>À faire aujourd'hui</button>
          <button type="button" onClick={() => setIsToday(false)}>À faire plus tard</button>
          <button type="submit">Ajouter la tâche</button>
        </div>
      </form>
    </div>
  );
};

export default AddTaskPage;
